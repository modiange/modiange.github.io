import customtkinter as ctk
from tkinter import messagebox as msg
import tkinter as tk
import time
from manage_window import ManageWindow
import threading
import urllib.request
import ntplib
import json
import os
import sys
import copy
import subprocess # 用于重启
import earthquake_api
import math

try:
    import simpleaudio
except Exception:
    simpleaudio = None
"""可选音频库：保留为兜底方案，但不再依赖它作为主播放器。"""

# ==========================================
if getattr(sys, 'frozen', False):
    # 如果是打包后的 .exe 运行
    application_path = os.path.dirname(sys.executable)
else:
    # 如果是普通 .py 脚本运行
    application_path = os.path.dirname(os.path.abspath(__file__))
# 切换工作目录到程序所在文件夹
os.chdir(application_path)
# ==========================================

# --- 设置 ---
ctk.set_default_color_theme("blue")

# 全局变量
scale_factor = 1.2
now_time = time.localtime()
is_connect_internet = True
sys_tx_time_offset = 0
all_update_time = 75
show_different = False
earthquake_url = "wss://ws-api.wolfx.jp/cenc_eew"
earthquake_alert = None
current_event_id = None
current_event_report_num = None
ip_address = {"latitude": None, "longitude": None}
sound_file_path = os.path.join(application_path, "sounds", "warning-beep.wav")
wave_obj = None
if simpleaudio is not None and os.path.exists(sound_file_path):
    try:
        wave_obj = simpleaudio.WaveObject.from_wave_file(sound_file_path)
    except Exception as exc:
        print(f"初始化 warning-beep 失败: {exc}")
        wave_obj = None

# --- 网络与时间处理 ---

def get_internet_time():
    global sys_tx_time_offset, is_connect_internet, show_different, ip_address
    while True:
        try:
            if ip_address.get("latitude") is None or ip_address.get("longitude") is None:
                try:
                    with urllib.request.urlopen("https://api.wolfx.jp/geoip.php", timeout=5) as response:
                        ip_address = json.loads(response.read().decode("utf-8"))
                        earthquake_api.set_user_location(
                            ip_address.get("latitude"),
                            ip_address.get("longitude"),
                        )
                except Exception:
                    ip_address = {"latitude": None, "longitude": None}

            ntp_server = data.get("ntp_server", "ntp.aliyun.com")
            client = ntplib.NTPClient()
            response = client.request(ntp_server, timeout=3)
            current_system_time = time.time()
            sys_tx_time_offset = current_system_time - response.tx_time
            is_connect_internet = True
            
            if not show_different and abs(sys_tx_time_offset) > 60:
                # 使用 root.after 确保在主线程弹窗
                if 'root' in globals():
                    root.after(0, lambda: msg.showinfo("提示", f"系统时间与网络时间差异过大({sys_tx_time_offset:.2f}s)，建议校正"))
                show_different = True
            
            time.sleep(600) 
        except Exception:
            is_connect_internet = False
            time.sleep(30)

def timing():
    global now_time
    while True:
        if is_connect_internet:
            net_time = time.time() - sys_tx_time_offset
            now_time = time.localtime(net_time)
        else:
            now_time = time.localtime()
        time.sleep(0.05)


            
# 启动线程
t_timing = threading.Thread(target=timing)
t_timing.daemon = True
t_timing.start()

t_net = threading.Thread(target=get_internet_time)
t_net.daemon = True
t_net.start()

# --- 数据处理 ---

if not os.path.exists("data.txt"):
    default_data = {
        "countdowns": {
            "1": [
                "示例倒计时",
                int(time.time()),
                int(time.time()) + 3600
            ]
        },

        "ntp_server": "ntp.aliyun.com",

        "user_settings": {
            "window_mode": 2,
            "window_alpha": 0.8,

            "always_on_top": True,
            "appearance_mode": "System",

            "ntp_interval": 600,

            "earthquake_enabled": True,
            "earthquake_sound": True,
            "earthquake_popup": True,
            "show_unix": True,
            "show_earthquake": True,
            "show_seconds": True,
            "show_weekday": True,
            "show_date": True
        }
    }
    with open("data.txt", "w", encoding="utf-8") as f:
        json.dump(default_data, f, indent=2, ensure_ascii=False)

try:
    with open("data.txt", "r", encoding="utf-8") as f:
        data = json.load(f)
except (json.JSONDecodeError, OSError) as e:
    msg.showwarning(
        "配置文件异常",
        "data.txt 无法读取，程序将恢复默认设置。\n\n"
        f"原因：{e}"
    )

    data = copy.deepcopy(default_data)

    try:
        with open("data.txt", "w", encoding="utf-8") as f:
            json.dump(
                data,
                f,
                indent=2,
                ensure_ascii=False
            )
    except OSError:
        pass
settings = data.get("user_settings", {})

appearance_mode = settings.get(
    "appearance_mode",
    "System"
)

ctk.set_appearance_mode(appearance_mode)

# --- 主界面逻辑 ---

def get_now_ts():
    if is_connect_internet:
        return time.time() - sys_tx_time_offset
    return time.time()


def format_earthquake_text(alert):
    global ip_address
    if not alert:
        return "信息: 无"

    raw = alert.get("raw", {}) if isinstance(alert, dict) else {}
    if not isinstance(raw, dict):
        return f"信息: {alert.get('summary', '收到预警')}"

    alert_type = raw.get("type")
    if alert_type == "heartbeat":
        return "收到心跳包：预警服务连接正常"

    report_num = raw.get("ReportNum")
    report_suffix = f" 第{report_num}报" if report_num is not None else ""
    origin_time = raw.get("OriginTime", "")
    hypo_center = raw.get("HypoCenter", "未知")
    magnitude = raw.get("Magnitude", "?")
    depth = raw.get("Depth", "?")
    max_intensity = raw.get("MaxIntensity", "?")
    alert_from = "未知来源"
    if(alert_type == "cenc_eew"):
        alert_from = "中国地震台网"
    elif(alert_type == "sc_eew"):
        alert_from = "四川省地震局"
    elif(alert_type == "fj_eew"):
        alert_from = "福建省地震局"
    elif(alert_type == "cq_eew"):
        alert_from = "重庆市地震局"

    #=====计算距离与温馨提示（由 earthquake_api.process_earthquake 计算）=====
    processed = alert.get("processed") if isinstance(alert, dict) else None

    prefix = "测试预警" if alert_type == "test" else "地震预警"
    lines = [
        f"{prefix}{report_suffix}: 来自{alert_from} 在{origin_time} {hypo_center} \n 发生{magnitude}级地震，震源深度{depth}km，最大烈度{max_intensity}"
    ]

    if processed:
        lines.append(
            f"震中距您约{processed['HorizontalDistance']}公里，"
            f"震源距您约{processed['HypocentralDistance']}公里，"
            f"本地预估烈度{processed['IntensityLevel']}度（{processed['EstimatedIntensity']}）"
        )
        lines.append(f"{processed['WarningTitle']}")
        lines.append(processed["WarningMessage"])
        lines.append(f"避险建议：{processed['WarningAction']}")
    else:
        lines.append("震中距您约未知公里，本地预估烈度未知")

    return "\n".join(lines)


def update_earthquake_label(alert=None):
    if 'lbl_earthquake' in globals():
        lbl_earthquake.configure(text=format_earthquake_text(alert))


def play_warning_sound():
    try:
        user_settings = data.get("user_settings", {})
        if not user_settings.get("earthquake_sound", True):
            return

        if not os.path.exists(sound_file_path):
            return

        # 优先使用系统自带播放器，兼容 Windows / macOS / Linux
        try:
            if sys.platform.startswith("win"):
                import winsound
                winsound.PlaySound(str(sound_file_path), winsound.SND_FILENAME | winsound.SND_ASYNC)
                return
            if sys.platform == "darwin":
                subprocess.Popen(["afplay", str(sound_file_path)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, close_fds=True)
                return
            for cmd in (
                ["ffplay", "-nodisp", "-autoexit", "-loglevel", "quiet", str(sound_file_path)],
                ["paplay", str(sound_file_path)],
                ["aplay", str(sound_file_path)],
            ):
                try:
                    subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, close_fds=True)
                    return
                except OSError:
                    continue
        except Exception as exc:
            print(f"system player error: {exc}")

        # 兜底：simpleaudio
        if 'wave_obj' in globals() and wave_obj is not None:
            wave_obj.play()
    except Exception as exc:
        print(f"play_warning_sound error: {exc}")


def on_earthquake_alert(alert):
    global earthquake_alert, current_event_id, current_event_report_num
    earthquake_alert = alert
    raw = alert.get("raw", {}) if isinstance(alert, dict) else {}
    event_id = raw.get("EventID") or raw.get("ID")
    report_num = raw.get("ReportNum")

    if event_id != current_event_id:
        threading.Thread(target=play_warning_sound, daemon=True).start()
        current_event_id = event_id
        current_event_report_num = report_num
    elif report_num is not None:
        current_event_report_num = report_num

    alert_type = raw.get("type", "unknown")
    print(f"Received msg type: {alert_type}, EventID={event_id}, ReportNum={report_num}")
    if 'root' in globals() and root.winfo_exists():
        root.after(0, lambda: update_earthquake_label(alert))
        if alert_type != "heartbeat":
            root.after(0, lambda: msg.showinfo("地震预警", format_earthquake_text(alert)))

def close_app():
    if sys.platform == "darwin":
        root.destroy()
        sys.exit()
    if msg.askyesno("提示", "确定要关闭吗？"):
        root.destroy()
        sys.exit()

root = ctk.CTk()
settings = data.get("user_settings", {})
root.attributes("-alpha", settings.get("window_alpha", 0.8))

# 默认置顶
is_topmost = settings.get("always_on_top",True)
root.attributes("-topmost",is_topmost)

win_mode = settings.get("window_mode", 2)
if win_mode == 1:
    if sys.platform == "darwin":
        msg.showinfo("提示", "全屏模式：按 ⌘+Q 关闭")
        root.attributes("-fullscreen", True)
    else:
        root.geometry(f"{root.winfo_screenwidth()}x{root.winfo_screenheight()}+0+0")
        root.overrideredirect(True)
        msg.showinfo("提示", "全屏模式：按 Alt+F4 关闭")
else:
    root.geometry(f"{int(800 * scale_factor)}x{int(600 * scale_factor)}")

root.title("倒计时工具")
root.protocol("WM_DELETE_WINDOW", close_app)

main_frame = ctk.CTkFrame(root)
main_frame.pack(fill="both", expand=True, padx=20, pady=20)

# 时间显示标签
lbl_time = ctk.CTkLabel(main_frame, text="Loading", font=("MiSans VF Medium", int(60 * scale_factor)))
lbl_time.pack(pady=(20, 10))
lbl_date = ctk.CTkLabel(main_frame, text="Loading", font=("MiSans VF Medium", int(20 * scale_factor)))
lbl_date.pack(pady=5)
lbl_unix = ctk.CTkLabel(main_frame,text="Loading",font=("MiSans VF Medium",int(14 * scale_factor)))
if settings.get("show_unix", True):
    lbl_unix.pack(pady=5)
lbl_earthquake = ctk.CTkLabel(main_frame, text="地震预警: 无", font=("MiSans VF Medium", int(14 * scale_factor)), text_color="#d32f2f")
lbl_earthquake.pack(pady=5)

countdown_widgets = []

def refresh_ui_loop():
    global earthquake_alert
    try:
        ts = get_now_ts()
        if settings.get("show_unix", True):
            lbl_unix.configure(text=f"Unix: {ts:.2f}")
        lt = time.localtime(ts)
        wday_map = ["周一","周二","周三","周四","周五","周六","周日"]
        
        time_format = "%H:%M:%S" if settings.get("show_seconds", True) else "%H:%M"
        lbl_time.configure(text=time.strftime(time_format, lt))

        date_parts = []
        if settings.get("show_date", True):
            date_parts.append(time.strftime("%Y-%m-%d", lt))
        if settings.get("show_weekday", True):
            date_parts.append(wday_map[lt.tm_wday])
        lbl_date.configure(text="  ".join(date_parts))
        lbl_unix.configure(text=f"Unix: {ts:.2f}")
        update_earthquake_label(earthquake_alert)
        # 同步更新倒计时进度条
        try:
            update_countdown_progress(ts)
        except Exception as e:
            print(f"update_countdown_progress error: {e}")
    except Exception as exc:
        print(f"refresh_ui_loop error: {exc}")
    finally:
        if 'root' in globals() and root.winfo_exists():
            root.after(all_update_time, refresh_ui_loop)

def init_countdowns():
    for widget_group in countdown_widgets:
        widget_group[0].destroy()
    countdown_widgets.clear()

    for key in sorted(data.get("countdowns", {}).keys(), key=lambda x: int(x) if x.isdigit() else 0):
        item = data["countdowns"][key]
        prefix, start_ts, target_ts = item
        
        frame = ctk.CTkFrame(main_frame)
        frame.pack(fill="x", padx=10, pady=5)
        
        lbl_title = ctk.CTkLabel(frame, text=prefix, font=("MiSans VF Medium", int(14 * scale_factor)))
        lbl_title.pack(anchor="w", padx=10, pady=(5,0))
        
        canvas = ctk.CTkCanvas(frame, height=int(14 * scale_factor), highlightthickness=0)
        canvas.pack(fill="x", padx=15, pady=(5, 5))
        
        progress = ctk.CTkProgressBar(frame, height=int(15 * scale_factor))
        progress.pack(fill="x", padx=10, pady=(0, 5))
        progress.set(0)
        
        lbl_info = ctk.CTkLabel(frame, text="", font=("MiSans VF Medium", int(12 * scale_factor)))
        lbl_info.pack(anchor="e", padx=10, pady=(0, 5))
        
        countdown_widgets.append([frame, progress, lbl_info, start_ts, target_ts, canvas])

def update_countdown_progress(now_ts):
    colors = {"red": "#F44336", "orange": "#FF9800", "yellow": "#FFEB3B", "green": "#4CAF50"}
    
    for _, progress, lbl, start_ts, target_ts, canvas in countdown_widgets:
        try:
            canvas.delete("all")
            w = canvas.winfo_width()
            
            duration = max(target_ts - start_ts, 1)
            elapsed = now_ts - start_ts
            
            if elapsed < 0:
                percent = 0
            else:
                percent = (elapsed / duration) * 100
            
            for p, col in [(80, "gold"), (90, "orange"), (96, "red")]:
                x = (p / 100) * w
                canvas.create_line(x, 0, x, 20, fill=col, width=2)
                canvas.create_text(x, 0, text=f"{p}%", anchor="sw", fill=col, font=("Arial", 8))

            val = max(0, min(1, percent / 100))
            progress.set(val)
            
            if percent >= 96: progress.configure(progress_color=colors["red"])
            elif percent >= 90: progress.configure(progress_color=colors["orange"])
            elif percent >= 80: progress.configure(progress_color=colors["yellow"])
            else: progress.configure(progress_color=colors["green"])
            
            remaining = target_ts - now_ts
            if remaining <= 0:
                lbl.configure(text="已结束")
            elif elapsed < 0:
                lbl.configure(text=f"未开始 (还有 {int(abs(elapsed))}秒)")
            else:
                d = int(remaining // 86400)
                h = int((remaining % 86400) // 3600)
                m = int((remaining % 3600) // 60)
                s = int(remaining % 60)
                lbl.configure(text=f"剩余: {d}天 {h:02d}:{m:02d}:{s:02d} ({percent:.2f}%)")
        except:
            pass

# --- 管理窗口 ---

def open_manager():
    ManageWindow(root, data)

button_frame = ctk.CTkFrame(main_frame, fg_color="transparent")
button_frame.pack(side="bottom", pady=10)

btn_test_alert = ctk.CTkButton(button_frame, text="测试预警", command=earthquake_api.publish_test_earthquake_alert)
btn_test_alert.pack(side="left", padx=5)

btn_manage = ctk.CTkButton(button_frame, text="管理 / 设置", command=open_manager)
btn_manage.pack(side="left", padx=5)

init_countdowns()
refresh_ui_loop()
earthquake_api.start_earthquake_listener(earthquake_url, callback=on_earthquake_alert)

if __name__ == "__main__":
    root.mainloop()
