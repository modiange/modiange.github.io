        // 初始化
        var video = document.getElementById('myVideo');
        var videoTitle = document.getElementById('videoTitle');
        var hash = window.location.hash;
        var discover = document.getElementById("sx");
        var jcpd = 0;
        // 判断
        if (hash === '#1') {
            video.src = 'video/----------掠夺----------.mp4';
            video.title = '----------掠夺----------';
            jcpd=140;
        } else if (hash === '#2'){
            video.src = 'video/搞笑视频1.mp4';
            video.title = '搞笑视频1';
            jcpd=40;
        } else if (hash === '#3'){
            video.src = 'video/搞笑视频2.mp4';
            video.title = '搞笑视频2';
            jcpd=4;
        }else if (hash === '#4'){
            video.src = 'video/好，想骂你。.mp4';
            video.title = '好，想骂你。';
            jcpd=48;
        }else if (hash === '#5'){
            video.src = 'video/我好悲伤.mp4';
            video.title = '我好悲伤';
            jcpd=14;
        }else if(hash === '#6'){
            video.src = 'video/我扇你脸了.mp4';
            video.title = '我扇你脸了';
            jcpd=34;
        }else if(hash === '#7'){
            video.src = 'video/小胖跳舞.mp4';
            video.title = '小胖跳舞';
            jcpd=10;
        }else if(hash ==='#8'){
            video.src = 'video/一非洲帅哥在BBC干了件事.mp4';
            video.title = '一非洲帅哥在BBC干了件事';
            jcpd=32;
        }else if(hash === '#9'){
            video.src = 'video/一火柴人斗舞火爆全网.mp4';
            video.title = '一火柴人斗舞火爆全网';
            jcpd=0;
        }else if(hash === '#10'){
            video.src = 'video/音乐.mp4';
            video.title = '音乐';
            jcpd=38;
        }else if(hash === '#11'){
            video.src = 'video/Emotional Damge.mp4';
            video.title = 'Emotional Damge';
            jcpd=67;
        }else if(hash === '#12'){
            video.src = 'video/nice!.mp4';
            video.title = 'nice！';
            jcpd=13;
        }else if(hash === '#13'){
            video.src = 'video/哪里贵了？.mp4';
            video.title = '哪里贵了？';
            jcpd=23;
        }else if(hash === '#14'){
            video.src = 'video/学校停电了.mp4';
            video.title = '学校停电了';
            jcpd=36;
        }else if(hash === '#15'){
            video.src = 'video/iWurenji 14 Pro Max.mp4';
            video.title = 'iWurenji 16 Pro Max';
            jcpd=3;
        }else if(hash === '#16'){
            video.src = 'video/这条视频将看哭中国14亿人.mp4';
            video.title = '这条视频将看哭中国14亿人';
            jcpd=0;
        }else if(hash === '#17'){
            video.src = 'video/世界上最好听的歌曲！.mp4';
            video.title = '世界上最好听的歌曲！';
            jcpd=36;
        }else if(hash === '#18'){
            video.src = 'video/我是梁志超他奶奶.mp4';
            video.title = '我是梁志超他奶奶';
            jcpd=7;
        }else if(hash === '#19'){
            video.src = 'video/还是PVP大佬.mp4';
            video.title = '还是PVP大佬';
            jcpd=37;
        }else if(hash === '#20'){
            video.src = 'video/噪音代言人.mp4';
            video.title = '噪音代言人';
            jcpd=16;
            alert('好看视频大赏提醒您：此视频音量较高，且有爆音效果，我们已为您调低音量。若您想用高音量播放，请摘下耳机，并且不要在公共场合大声播放此视频。')
            alert('NB:The volume of this video is high and we have reduced the volume for you. If you want to play it at a higher volume, please remove your headphones and do not play this video loudly in public.')
            video.volume=0.03;
        }else if(hash ==='#21'){
            video.src = 'video/菜！就多练！.mp4';
            video.title = '菜！就多练！';
            jcpd=2;
        }else{
            video.src = 'null.mp4';
            video.title = '输入的编号无效';
        }
        videoTitle.textContent = video.title;
        if(hash!='#20'){
            video.volume=0.5;
        }
        // 收藏
        function shoucang(){
            alert('收藏失败！')
        };
        // 精彩片段
        function skip(){
            video.currentTime =jcpd;
            video.play();
        };
        //标题
        if(video.title!="输入的编号无效"){
            document.title="正在观看"+video.title+"-好看视频大赏";
        }else{
            document.title="编号无效-好看视频大赏";
        }
        // 控制
        document.addEventListener('keydown', function(event) {
            switch (event.key) {
                case 'ArrowUp':
                    // 增加音量，但不超过1
                    video.volume = Math.min(video.volume + 0.1, 1);
                    break;
                case 'ArrowDown':
                    // 减小音量，但不低于0
                    video.volume = Math.max(video.volume - 0.1, 0);
                    break;
                case 'ArrowLeft':
                    // 后退5秒，但不早于视频开始
                    video.currentTime = Math.max(video.currentTime - 5, 0);
                    break;
                case 'ArrowRight':
                    // 前进10秒，但不超过视频总长度
                    video.currentTime = Math.min(video.currentTime + 10, video.duration);
                    break;
                case ' ':
                    // 空格键按下时，暂停或继续播放视频
                    if (video.paused || video.ended) {
                        video.play();
                    } else {
                        video.pause();
                    }
                    event.preventDefault();
                    break;
                default:
                    // 其他按键不做处理
                    return;
            }
            // 阻止默认行为，比如页面滚动
            event.preventDefault();
        });
        //tips
        var volumeChangeTimeout=0; // 用于存储音量调整定时器的变量
        var seekChangeTimeout=0; // 用于存储快进快退定时器的变量
        document.addEventListener('keydown', function(event) {
            switch (event.key) {
                case 'ArrowUp':
                    video.volume = Math.min(video.volume + 0.1, 1);
                    break;
                case 'ArrowDown':
                    video.volume = Math.max(video.volume - 0.1, 0);
                    clearTimeout(volumeChangeTimeout);
                    break;
                case 'ArrowLeft':
                    video.currentTime = Math.max(video.currentTime - 5, 0);
                    break;
                case 'ArrowRight':
                    video.currentTime = Math.min(video.currentTime + 10, video.duration);
                    break;
                case ' ':
                    if (video.paused || video.ended) {
                        video.play();
                    } else {
                        video.pause();
                    }
                    break;
                default:
                    return;
            }
        });
        //字幕
        const subtitlesData = {
            '#1':[
                { start: 0, end: 300, text: "这条视频的字幕为AI生成并翻译，可能会有不准确的地方。The subtitles for this video are AI generated and translated and may be inaccurate." },
                { start: 301, end: 2133, text: "来吧，我需要一个村庄" },
                { start: 2133, end: 2966, text: "走吧" },
                { start: 3000, end: 5333, text: "你们都是我的，嘿，听好了" },
                { start: 5966, end: 7800, text: "你们现在要为我工作了" },
                { start: 8933, end: 10500, text: "所以你们想玩吗" },
                { start: 10566, end: 13533, text: "所以我只是你们的大笑话，对吗" },
                { start: 13900, end: 15100, text: "我会拉这个杠杆吗" },
                { start: 15100, end: 16533, text: "或者你们都听我的" },
                { start: 19066, end: 20533, text: "这太糟糕了" },
                { start: 20566, end: 23200, text: "哦，另一个村庄，开始给我找资源" },
                { start: 23200, end: 24733, text: "哦，我们今天要破纪录了" },
                { start: 24733, end: 27933, text: "快点，快点，嘿，我可以奴役你们的孩子吗" },
                { start: 30200, end: 31533, text: "好，继续来" },
                { start: 31533, end: 32566, text: "走吧" },
                { start: 36333, end: 40333, text: "我打赌我们有钻石了，天哪，停下" },
                { start: 40333, end: 43066, text: "我们有足够的钻石了，我的天，这是什么" },
                { start: 43200, end: 45000, text: "这其实没必要，但嘿" },
                { start: 45600, end: 46400, text: "什么" },
                { start: 46600, end: 47966, text: "你为什么跑" },
                { start: 49066, end: 51733, text: "我们需要去下界，找个熔岩池" },
                { start: 51766, end: 52300, text: "嘿" },
                { start: 52300, end: 54300, text: "有人有水桶吗" },
                { start: 54533, end: 56400, text: "走吧，做个传送门" },
                { start: 57666, end: 60900, text: "兄弟，这家伙太慢了，我们就自己建一个" },
                { start: 60900, end: 62300, text: "最后一块来了" },
                { start: 63066, end: 64533, text: "兄弟，你傻吗" },
                { start: 64600, end: 67600, text: "哦，我的天，你真的是，我觉得你最好呆在这里" },
                { start: 69400, end: 72133, text: "走走走，走吧" },
                { start: 72200, end: 74766, text: "等等，我们被困住了，嘿" },
                { start: 74966, end: 76066, text: "我们需要你的帮助" },
                { start: 76066, end: 77900, text: "太好了，它们不会太重吧" },
                { start: 78133, end: 79200, text: "嘿" },
                { start: 79366, end: 81400, text: "为什么看起来你在挣扎" },
                { start: 81533, end: 82500, text: "冷静，冷静" },
                { start: 82500, end: 85200, text: "好吧，我们就这样搭桥" },
                { start: 86066, end: 87333, text: "嘿，跑酷" },
                { start: 88700, end: 89800, text: "哦，天哪" },
                { start: 90666, end: 92300, text: "别碰僵尸猪人" },
                { start: 92533, end: 94466, text: "嘿，他不能伤害你，如果你不碰他" },
                { start: 95700, end: 96500, text: "哟" },
                { start: 96566, end: 98300, text: "他只是想引诱你" },
                { start: 98333, end: 99900, text: "嘿，这不会有效的，兄弟" },
                { start: 100300, end: 101100, text: "哦" },
                { start: 102466, end: 103966, text: "哦，我的天" },
                { start: 104866, end: 106300, text: "哦，另一个要塞" },
                { start: 107666, end: 110166, text: "凋灵骷髅啊，伙计们，我来了" },
                { start: 110366, end: 113166, text: "嘿，兄弟们，你们好吗，我和我的朋友们可以进来吗" },
                { start: 113800, end: 117366, text: "嘿，他们说好，他们甚至想要过夜" },
                { start: 120166, end: 121733, text: "好的，够了" },
                { start: 122400, end: 123466, text: "我们有足够的末影之眼了" },
                { start: 124700, end: 126500, text: "好吧，准备好打末影龙了吗" },
                { start: 127133, end: 127466, text: "好吧" },
                { start: 127466, end: 129800, text: "谁准备好打末影龙了" },
                { start: 130533, end: 131800, text: "哦" },
                { start: 132000, end: 134066, text: "老实说，我们浪费了太多时间" },
                { start: 134100, end: 135533, text: "我知道我们可以做什么" },
                { start: 135733, end: 137166, text: "时间机器" },
                { start: 137166, end: 138866, text: "你们擅长红石" },
                { start: 140066, end: 142800, text: "保留重要的红石，我想看看" },
                { start: 145900, end: 149566, text: "启动它，好吧，再见" },
                { start: 150333, end: 151933, text: "哦，我在哪" },
                { start: 151933, end: 153333, text: "我需要一个村庄" },
                { start: 153333, end: 155766, text: "走吧，哦，我打赌" },
                { start: 156766, end: 159300, text: "我要拉这个杠杆，还是你们听我" },
                { start: 160333, end: 161066, text: "听我的" },
                { start: 161066, end: 162566, text: "该我出场了" },
                { start: 162566, end: 163366, text: "嘿" },
                { start: 164066, end: 165166, text: "等等，这是什么" },
                { start: 165266, end: 166300, text: "来吧，走吧" },
                { start: 166300, end: 167400, text: "我们没有时间了" },
                { start: 170200, end: 170766, text: "哦" },
                { start: 170766, end: 172133, text: "拿个金苹果" },
                { start: 172166, end: 174900, text: "小心点，有金苹果吗" },
                { start: 175366, end: 176566, text: "哦，走吧" },
                { start: 178500, end: 180300, text: "哦，这家伙又回来了" },
                { start: 185200, end: 186966, text: "好，开始挖" },
                { start: 188100, end: 189400, text: "哦，就在那里" },
                { start: 189400, end: 191366, text: "快，我们必须找到传送门" },
                { start: 192566, end: 193866, text: "好吧" },
                { start: 195966, end: 197000, text: "走吧" },
                { start: 197300, end: 198300, text: "你们准备好了吗"},
                { start: 201333, end: 202466, text: "请放回去" },
                { start: 202966, end: 204333, text: "我们该怎么办" },
                { start: 204400, end: 206000, text: "只要交易传送门块" },
                { start: 206666, end: 208300, text: "走吧兄弟" },
                { start: 208333, end: 210466, text: "你在占便宜啊" },
                { start: 210933, end: 212333, text: "嘿哟放下杆子" },
                { start: 213733, end: 214600, text: "嘿嘿" },
                { start: 214600, end: 215733, text: "走吧" },
                { start: 217133, end: 218300, text: "你准备好了吗" },
                { start: 229500, end: 231400, text: "别害怕去战斗" },
                { start: 235966, end: 237200, text: "哦天啊" },
                { start: 237866, end: 241333, text: "你们在干什么，现在不是时候" },
                { start: 243300, end: 244100, text: "哦" },
                { start: 244133, end: 245500, text: "哦，那是最后一个" },
                { start: 245800, end: 247200, text: "现在是我们的机会" },
                { start: 250200, end: 251666, text: "哦走吧" },
                { start: 251733, end: 252966, text: "把他带到这里" },
                { start: 253100, end: 254466, text: "确保他不动" },
                { start: 256066, end: 257733, text: "好现在按住他" },
                { start: 259566, end: 263500, text: "走吧走吧世界纪录" },
                { start: 263500, end: 266733, text: "速通结束了大家可以休息了" },
                { start: 266733, end: 267533, text: "哈" },
            ],
            '#2':[
                {start:0,end:0,text:"no"}
            ],
            '#3':[
                { start: 0, end: 299, text: "歌词提供商：网易云音乐。 Lyrics provided by: Netease Cloud Music." },
                { start: 300, end: 3300, text: "♪(能出发了吗？来飙车啊)I wanna race for you shall I go now?♪" },
                { start: 3300, end: 5133, text: "♪gas gas gas♪" },
                { start: 5133, end: 6766, text: "♪(我要加大油门)I'm gonna step from the gas♪" },
                { start: 6933, end: 9566, text: "♪(今夜我要飙上天)tonight is ours and be a lover♪" },
                { start: 9566, end: 11400, text: "♪yeah yeah yeah♪" },
                { start: 11400, end: 12833, text: "♪(我现在快如闪电)I'll be so quick as a flash♪" },
                { start: 13053, end: 15000, text: "♪(我会成为你的英雄)And I'll be your hero♪" },
            ],
            '#4':[
                { start: 1766, end: 3100, text: "我是迈克尔-乔丹" },
                { start: 3566, end: 7133, text: "麦当劳餐厅给了我这个时间来和你们谈谈" },
                { start: 7133, end: 10133, text: "我们都非常关心的孩子" },
                { start: 10466, end: 11333, text: "因为有了孩子" },
                { start: 11333, end: 14266, text: "麦当劳赞助商获得直通车计划" },
                { start: 14500, end: 16766, text: "在全国禁毒宣传活动中" },
                { start: 16766, end: 17866, text: "想想看" },
                { start: 18500, end: 21733, text: "你们中的许多人现在都未满 18 岁" },
                { start: 22466, end: 26633, text: "你知道吗，18 岁的你只活了人生的四分之一" },
                { start: 27300, end: 28800, text: "当你吸毒时" },
                { start: 28866, end: 34133, text: "你只是在欺骗自己，让自己失去了发现真正自我的机会，相信我" },
                { start: 34266, end: 35866, text: "如果你不吸毒" },
                { start: 35866, end: 38300, text: "你可以成为任何你想成为的人" },
                { start: 39100, end: 39900, text: "听着" },
                { start: 39966, end: 42200, text: "你至少还有四分之三的人生要走" },
                { start: 42700, end: 44700, text: "那你就多活三辈子了" },
                { start: 45000, end: 46100, text: "别搞砸了" },
                { start: 46366, end: 47533, text: "不吸毒" },
                { start: 47666, end: 49533, text: "如果你正在这样做，请停止" },
                { start: 50000, end: 50866, text: "并求助" },
                { start: 51366, end: 53733, text: "麦当劳希望您给自己一个机会" },
                { start: 53933, end: 58533, text: "让我有机会发现你的所有精彩之处，我也是如此" }
            ],
            '#5':[
                { start: 0, end: 5400, text: "因为我知道在我内心深处的某个地方" },
                { start: 9933, end: 12266, text: "我依然爱你" },
                { start: 14866, end: 26966, text: "QAQ" },
                { start: 29366, end: 37266, text: "QAQ" },
            ],
            '#6':[
                { start: 1066, end: 3533, text: "来自最成功的制造商之一" },
                { start: 3533, end: 5500, text: "近代戏剧" },
                { start: 5600, end: 7400, text: "后续系列来了" },
                { start: 7566, end: 9600, text: "耳光第2部分" },
                { start: 9900, end: 10700, text: "你知道吗？" },
                { start: 10800, end: 11966, text: "他们已经开始修理了" },
                { start: 11966, end: 13400, text: "所以我们不能带它去别的地方" },
                { start: 13400, end: 14800, text: "是的，他们这样做的方式" },
                { start: 14966, end: 15900, text: "说说吧。" },
                { start: 18366, end: 20366, text: "两千五百块之后   -爸爸" },
                { start: 21566, end: 23733, text: "嘿嘿嘿怎么回事" },
                { start: 23866, end: 26966, text: "这是我的，爸爸，没有人一直从我身边拿走。" },
                { start: 26966, end: 27866, text: "诺亚还给我" },
                { start: 27866, end: 30100, text: "不，诺亚，还给我。" },
                { start: 30100, end: 31866, text: "不，我说现在就还给你。" },
                { start: 33100, end: 33900, text: "诺亚" },
                { start: 34966, end: 37200, text: "拉里你到底在干什么拉里" },
                { start: 37200, end: 38133, text: "拉里你不能就这样" },
                { start: 38133, end: 40066, text: "哦，巴掌！哦，你没事吧？" },
                { start: 40066, end: 40866, text: "怎么" },
                { start: 40900, end: 41700, text: "拉里" },
                { start: 55933, end: 56266, text: "好吧好吧" },
                { start: 56266, end: 56933, text: "这是怎么回事？" },
                { start: 56933, end: 59333, text: "哦，先生，我是一个…巴掌，哦，一个巴掌" },
                { start: 61066, end: 61266, text: "噢" },
                { start: 66766, end: 71186, text: "巴掌第2部分即将来到福克斯，啊！我***" },
            ],
            '#7':[
                { start: 69633, end: 83566, text: "♪" },
                { start: 366, end: 1166, text: "大块头" },
                { start: 1166, end: 1600, text: "怎么了？" },
                { start: 1600, end: 3400, text: "你听到那辆新车了吗Franklin    -nah" },
                { start: 4400, end: 5133, text: "出现" },
                { start: 5133, end: 6166, text: "♪(every tear from that)每一滴眼泪♪" },
                { start: 6166, end: 6933, text: "哦，s*it" },
                { start: 6933, end: 8066, text: "现代亲王" },
                { start: 8300, end: 9100, text: "哦耶" }
            ],
            '#8':[
                { start: 533, end: 3366, text: "现在捣碎的辣椒，一整根洋葱切碎" },
                { start: 3533, end: 6066, text: "和一枝新鲜百里香" },
                { start: 6100, end: 7800, text: "我要放进搅拌机" },
                { start: 7966, end: 9200, text: "用手指和一切" },
                { start: 9200, end: 10966, text: "就像你写下来那么简单" },
                { start: 11500, end: 13200, text: "所以给它融资" },
                { start: 14366, end: 17866, text: "其他成分是50毫升老抽" },
                { start: 19533, end: 21566, text: "只知道这是最重要的" },
                { start: 22733, end: 23700, text: "那很漂亮" },
                { start: 23733, end: 27066, text: "好吧，在我上面给你一块肉，好好按摩一下。" },
                { start: 27766, end: 29966, text: "就这样又好又热" },
                { start: 30400, end: 32300, text: "又热又辣的肉" },
                { start: 32466, end: 33933, text: "hiehie boy" },
                { start: 34200, end: 35566, text: "就这样把它翻过来" },
                { start: 35566, end: 38166, text: "不要14、40分钟甚至一个小时" },
            ],
            '#9':[
                { start: 0, end: 210000, text: "no" },
            ],
            '#10':[
                { start: 0, end: 899, text: "歌词提供商：QQ音乐。Lyrics provider: QQ Music." },
                { start: 900, end: 3166, text: "♪blood blood blood blood♪" },
                { start: 4200, end: 7100, text: "♪blood blood blood blood blood blood♪" },
                { start: 8433, end: 9800, text: "♪火力掩护♪" },
                { start: 10100, end: 11400, text: "♪我需要谣言四起♪" },
                { start: 11800, end: 13300, text: "♪你是个校园枪手♪" },
                { start: 13733, end: 15466, text: "♪怀揣着扭曲的渴望♪" },
                { start: 15466, end: 17366, text: "♪我只是个受雇的枪手♪" },
                { start: 17366, end: 19100, text: "♪枪打爆你的脑袋和你的轮胎♪" },
                { start: 19100, end: 23000, text: "♪我渴望了解的感受以及你心里的一点一滴♪" },
                { start: 23933, end: 27433, text: "♪扔着飞刀仿佛你要奋力抗争，怂货 我渴望看到我的新娘♪" },
                { start: 27466, end: 29266, text: "♪我感觉像 Xzibit—我疯狂飙车♪" },
                { start: 29366, end: 31366, text: "♪独一无二的存在 集中注意力♪" },
                { start: 31366, end: 32900, text: "♪深谋远虑♪" },
                { start: 32900, end: 35900, text: "♪在你心中 我永远一无是处♪" },
                { start: 35900, end: 38766, text: "♪难以再留恋这个世界♪" },
                { start: 38999, end: 53166, text: "♪" },
            ],
            '#11':[ 
                { start: 20733, end: 23533, text: "树枝上的高台阶是什么？" },  
                { start: 23533, end: 24400, text: "哦，那是一个新的水平" },  
                { start: 24400, end: 25200, text: "他们刚刚发布了它" },  
                { start: 25200, end: 27166, text: "很多亚洲人抱怨这太容易了" },  
                { start: 27166, end: 28933, text: "所以他们做了这个" },  
                { start: 43000, end: 46700, text: "一片叶子有毒吗？我想你按l2。" },  
                { start: 55500, end: 57200, text: "我得挡住阳光" },  
                { start: 59500, end: 61166, text: "终于有行动了" },  
                { start: 61166, end: 62900, text: "史蒂文，当你变得这么胖的时候" },  
                { start: 67700, end: 69866, text: "情感伤害" },  
                { start: 69866, end: 71000, text: "你想要一些治疗" },  
                { start: 71000, end: 73000, text: "你也许可以按住阻止按钮" },  
                { start: 73000, end: 74366, text: "当你变得这么胖的时候" },  
                { start: 75300, end: 77600, text: "你还想当演员" },  
                { start: 109966, end: 112500, text: "唐·史蒂文得到了作弊代码，你不想成为什么？" },  
                { start: 112500, end: 114900, text: "我会把你送到耶稣那里，好吗？" },  
                { start: 114900, end: 117933, text: "这是一个l2圆圆三角形，好的。" },  
                { start: 117933, end: 121333, text: "l三角形正方形圆形哇" },  
                { start: 121400, end: 123000, text: "哇，那是作弊码吗？" },  
                { start: 124666, end: 125333, text: "看起来像你" },  
                { start: 125333, end: 127566, text: "我的朋友难度不对，请参阅" },  
                { start: 127566, end: 130000, text: "我们为亚洲的5岁小孩设计了这个游戏" },  
                { start: 130000, end: 133333, text: "谁一直在五种苦涩中击败我们的游戏" },  
                { start: 134666, end: 136000, text: "他们怎么会这么好？" },  
                { start: 136200, end: 137766, text: "我们不断提高难度" },  
                { start: 137766, end: 142136, text: "但这还不够，我甚至不能玩得那么好，我做了一个该死的游戏。" },  
                { start: 143313, end: 147000, text: "让我们回到你应该放松的状态" },
                { start: 172500, end: 183300, text: "※这里是花絮" },
            ],
            '#12':[
                { start: 800, end: 1666, text: "《Hot Food》" },
                { start: 2566, end: 5666, text: "我们坐下来吃饭，土豆有点热" },
                { start: 6066, end: 8700, text: "所以我只在叉子上放了一点就吹了" },
                { start: 9366, end: 12966, text: "直到它凉爽，然后进入嘴里呼" },
                { start: 14466, end: 17366, text: "nice！还有我哥哥，他也在做同样的事情。" },
                { start: 17533, end: 22000, text: "呼呼，直到它凉爽放到嘴里呼呼" },
                { start: 23566, end: 26866, text: "nice！这是我妈妈，她也在做同样的事情。" },
                { start: 26866, end: 27666, text: "呼呼呼呼呼" },
                { start: 28666, end: 29600, text: "直到它凉爽" },
                { start: 29766, end: 32900, text: "只是凉爽放到嘴里呼呼" },
                { start: 34400, end: 35200, text: "nice！" },
                { start: 35766, end: 39566, text: "但是我爸爸是怎么做的？" },
                { start: 39566, end: 43300, text: "他把一大块土豆塞进嘴里" },
                { start: 43300, end: 44600, text: "这真的做到了。" },
                { start: 44700, end: 46066, text: "他的眼睛突出来" },
                { start: 46066, end: 47500, text: "他拍打着双手" },
                { start: 47500, end: 49266, text: "他吹气，吹气，大喊大叫" },
                { start: 49266, end: 51200, text: "他上下摆动着头" },
                { start: 51266, end: 54066, text: "他把土豆吐得满盘子都是" },
                { start: 54066, end: 55500, text: "然后他转向我们说" },
                { start: 56200, end: 59666, text: "大家小心，土豆真的很热。" },
            ],
            '#13':[
                { start: 333, end: 1400, text: "花西子越来越贵了" },
                { start: 1400, end: 2366, text: "哪里贵了" },
                { start: 2366, end: 2766, text: "（不明所以的笑声）" },
                { start: 2800, end: 4766, text: "这么多年都是这个价格好吧" },
                { start: 4766, end: 6166, text: "不要睁着眼睛乱说" },
                { start: 6166, end: 8966, text: "国货品牌很难的哦" },
                { start: 8966, end: 10200, text: "而且花西子真的不是那种" },
                { start: 10200, end: 11700, text: "随便买原料就做的品牌" },
                { start: 11700, end: 14000, text: "哎我跟花西子跟了多少年" },
                { start: 14000, end: 15900, text: "他怎么起来的我是最知道的一个人" },
                { start: 15900, end: 16700, text: "是" },
                { start: 17133, end: 18966, text: "他们都差点把他们家掏给我了" },
                { start: 18966, end: 19533, text: "（不明所以的笑声）" },
                { start: 19533, end: 20600, text: "好不好真的乱说" },
                { start: 20600, end: 22300, text: "这么多年都是79块钱" },
                { start: 22300, end: 23333, text: "哪里贵了" },
                { start: 23400, end: 24900, text: "有的时候找找自己原因好吧" },
                { start: 24900, end: 25366, text: "这么多年了" },
                { start: 25366, end: 26066, text: "工资涨没涨" },
                { start: 26066, end: 28266, text: "有没有认真工作好不好" },
                { start: 28866, end: 29966, text: "这么多年都是这个价格" },
                { start: 29966, end: 30900, text: "我真的快疯掉了" },
            ],
            '#14':[
                { start: 1200, end: 3166, text: "阿姨宿舍停电了" },
                { start: 3866, end: 6700, text: "阿姨宿舍停电了" },
                { start: 8066, end: 8866, text: "阿姨" },
                { start: 10100, end: 11066, text: "阿姨啊" },
                { start: 12266, end: 13300, text: "不要问不要问" },
                { start: 13300, end: 14666, text: "在检修哈" },
                { start: 15733, end: 16566, text: "马上就好" },
                { start: 17133, end: 19533, text: "阿姨阿姨" },
                { start: 19533, end: 21133, text: "我游戏打不了啦" },
                { start: 21700, end: 24966, text: "阿姨手机充不了电啦" },
                { start: 26166, end: 28400, text: "阿姨手机没电啦" },
                { start: 29666, end: 31600, text: "阿姨CSGO掉帧了" },
                { start: 32766, end: 34266, text: "阿姨受不了了" },
                { start: 34266, end: 38600, text: "好热啊阿姨我内裤都脱了" },
                { start: 38733, end: 40566, text: "还是好热啊" },
                { start: 41533, end: 43333, text: "我真的笑死了" },
                { start: 43966, end: 46733, text: "阿姨中暑了" },
                { start: 49066, end: 50500, text: "阿姨电好了" },
                { start: 54866, end: 56566, text: "阿姨想你了" },
                { start: 58133, end: 61000, text: "阿姨来…" },
                { start: 61733, end: 64200, text: "阿姨来电了" },
                { start: 65766, end: 67900, text: "阿姨怎么来电了" },
                { start: 69133, end: 70900, text: "阿姨OK了" },
                { start: 71166, end: 72766, text: "空调开起来了" },
                { start: 74466, end: 76766, text: "终于有电了热死啦" },
            ],
            '#15':[
                { start: 0, end: 6000, text: "no" },
            ],
            '#16':[
                { start: 0, end: 10000, text: "这条视频的字幕为AI生成并翻译，可能会有不准确的地方。 The subtitles for this video are AI generated and translated and may be inaccurate." },
                { start: 10000, end: 18866, text: "由于字幕太多了所以没加♪。 There were too many subtitles so I didn't add ♪." },
                { start: 18866, end: 21200, text: "我们并不陌生爱情" },
                { start: 22933, end: 26100, text: "你知道规则我也一样" },
                { start: 27166, end: 30600, text: "我在考虑的是全身心的承诺" },
                { start: 31300, end: 34933, text: "你不会从其他任何人那里得到这一切" },
                { start: 35266, end: 39600, text: "我只想告诉你我的感受" },
                { start: 40500, end: 43166, text: "必须让你明白" },
                { start: 43166, end: 45466, text: "永远不会放弃你" },
                { start: 45466, end: 47400, text: "永远不会让你失望" },
                { start: 47400, end: 51466, text: "永远不会四处奔波和抛弃你" },
                { start: 51600, end: 53766, text: "永远不会让你哭泣" },
                { start: 53766, end: 55866, text: "永远不会说再见" },
                { start: 55900, end: 59733, text: "永远不会说谎伤害你" },
                { start: 60866, end: 64400, text: "我们彼此相识已久" },
                { start: 65066, end: 66500, text: "你的心一直在痛" },
                { start: 66500, end: 69900, text: "但你太害羞不敢表达" },
                { start: 69900, end: 72800, text: "我们都知道发生了什么" },
                { start: 73666, end: 77500, text: "我们知道规则，也将玩它" },
                { start: 77500, end: 81800, text: "如果你问我感觉如何" },
                { start: 82466, end: 85366, text: "别告诉我你太盲目看不见" },
                { start: 85366, end: 87400, text: "永远不会放弃你" },
                { start: 87666, end: 89666, text: "永远不会让你失望" },
                { start: 89666, end: 93500, text: "永远不会四处奔波和抛弃你" },
                { start: 93900, end: 96000, text: "永远不会让你哭泣" },
                { start: 96000, end: 98100, text: "永远不会说再见" },
                { start: 98133, end: 102166, text: "永远不会说谎伤害你" },
                { start: 102333, end: 104300, text: "永远不会放弃你" },
                { start: 104400, end: 106533, text: "永远不会让你失望" },
                { start: 106533, end: 110600, text: "永远不会四处奔波和抛弃你" },
                { start: 110733, end: 112900, text: "永远不会让你哭泣" },
                { start: 112900, end: 114966, text: "永远不会说再见" },
                { start: 115000, end: 119066, text: "永远不会说谎伤害你" },
                { start: 120966, end: 123166, text: "哦放弃你" },
                { start: 124133, end: 127500, text: "哦放弃你" },
                { start: 128466, end: 129300, text: "永远不会放弃" },
                { start: 129300, end: 130200, text: "永远不会放弃" },
                { start: 131200, end: 132533, text: "放弃你" },
                { start: 132666, end: 134533, text: "永远不会放弃，永远不会放弃" },
                { start: 136800, end: 140466, text: "我们彼此相识已久" },
                { start: 141100, end: 142466, text: "你的心一直在痛" },
                { start: 142466, end: 145800, text: "但你太害羞不敢表达" },
                { start: 145800, end: 148666, text: "我们都知道发生了什么" },
                { start: 149533, end: 152766, text: "我们知道规则，也将玩它" },
                { start: 152766, end: 157766, text: "它我只是想告诉你我的感受" },
                { start: 158666, end: 161366, text: "必须让你明白" },
                { start: 161366, end: 163400, text: "永远不会放弃你" },
                { start: 163566, end: 165600, text: "永远不会让你失望" },
                { start: 165600, end: 169466, text: "永远不会四处奔波和抛弃你" },
                { start: 169866, end: 171933, text: "永远不会让你哭泣" },
                { start: 171966, end: 173866, text: "永远不会说再见" },
                { start: 174066, end: 177966, text: "永远不会说谎伤害你" },
                { start: 178333, end: 180266, text: "永远不会放弃你" },
                { start: 180500, end: 182600, text: "永远不会让你失望" },
                { start: 182600, end: 186400, text: "永远不会四处奔波和抛弃你" },
                { start: 186800, end: 188800, text: "永远不会让你哭泣" },
                { start: 188933, end: 190866, text: "永远不会说再见" },
                { start: 191066, end: 195100, text: "永远不会说谎伤害你" },
                { start: 195101, end: 200000, text: "后面一直在重复三句话就不写了。The three sentences that keep repeating after that will not be translated." },
            ],
            '#17':[
                { start: 666, end: 3733, text: "♪在大洋彼岸的土地上♪" },
                { start: 4133, end: 7333, text: "♪美丽的景色 欢乐的旅程♪" },
                { start: 7566, end: 10566, text: "♪浪花如此高 海水如此蓝♪" },
                { start: 10933, end: 14933, text: "♪一个奇妙的世界 只属于我和你♪" },
                { start: 14933, end: 21433, text: "♪" },
                { start: 21500, end: 24900, text: "♪被大自然环绕 如此辽阔壮观♪" },
                { start: 24900, end: 26400, text: "♪辽阔的海洋♪" },
                { start: 26400, end: 29933, text: "♪横跨大地 从日出到日落♪" },
                { start: 29933, end: 32066, text: "♪这是个神奇的景象♪" },
                { start: 32066, end: 35633, text: "♪色彩交响纯粹愉悦♪" },
                { start: 36266, end: 38700, text: "♪胖大海 胖大海♪" },
                { start: 38700, end: 40266, text: "♪cico          -胖大海♪" },
                { start: 40266, end: 44266, text: "♪胖大海 胖大海 游戏学堂        -胖大海♪" },
                { start: 44266, end: 48166, text: "♪胖大海照亮你 照亮你的脸庞♪" },
                { start: 49733, end: 54366, text: "♪胖大海 胖大海 我的心下起了雪♪" },
            ],
            '#18':[
                { start: 2800, end: 5000, text: "我是梁志超他奶奶" },
                { start: 5000, end: 6333, text: "你们怎么教育的" },
                { start: 6333, end: 8700, text: "梁志超梁志超骂我大傻*" },
                { start: 10500, end: 11300, text: "老师" },
                { start: 12600, end: 14300, text: "这孩子咋整吧" },
                { start: 14533, end: 16166, text: "你们怎么教育的" },
                { start: 16933, end: 18566, text: "他爹他妈不在家" },
                { start: 19466, end: 20866, text: "管也那啥" },
                { start: 20866, end: 21666, text: "挺远" },
                { start: 22700, end: 23700, text: "我也说不听" },
                { start: 23700, end: 26566, text: "他一天一天净玩手机" },
                { start: 26566, end: 28100, text: "我丈夫吃饭回来" },
                { start: 28500, end: 30200, text: "我他妈不吃就能咋地" },
                { start: 30200, end: 31966, text: "我就不吃能把我咋地" },
                { start: 31966, end: 33666, text: "我吃能咋地说吧" },
                { start: 36133, end: 38500, text: "这大伙都是70来岁" },
                { start: 38500, end: 39800, text: "我该他妈的" },
                { start: 41766, end: 43400, text: "我他妈一小下就揪" },
                { start: 43400, end: 46200, text: "他三岁我就揪了他" },
                { start: 46200, end: 47800, text: "一揪到这些年" },
                { start: 49100, end: 50000, text: "这孩子就骂" },
                { start: 50000, end: 52600, text: "我也他妈像个小菜似的操" },
            ],
            '#19':[
                { start: 0, end: 533, text: "以下文本来自微软Azure语音转文本服务。 The following text is from the Microsoft Azure speech-to-text service." },
                { start: 533, end: 4366, text: "(本周，俄罗斯俱乐部曲目列表中新增了 4 首曲目。)На этой неделе стоповые список русских клубных треков попали 4 новинки." },
                { start: 4366, end: 9733, text: "(我们将按顺序一一介绍，但现在我们继续前往宫城。)Обо всех узнаем по порядку, но прямо сейчас продолжаем наши партии под мияги." },
                { start: 9733, end: 11066, text: "(没听懂) (I didn't understand)" },
                { start: 11066, end: 11866, text: "I Got Love" },
                { start: 11866, end: 12600, text: "※以下歌词来自网易云音乐。The following lyrics are from Net Ease Cloud Music" },
                { start: 12600, end: 12900, text: "歌名：I Got Love。Song title: I Got Love." },
                { start: 12900, end: 13200, text: "歌词核对：modiange。Lyrics check: modiange." },
                { start: 13200, end: 13566, text: "为了核对歌词把歌听了几十次。 In order to check the lyrics, I listened to the song dozens of times." },
                { start: 13566, end: 15666, text: "♪(笼罩着我,铺天盖地)Окутала меня, окутала.♪" },
                { start: 15666, end: 17600, text: "♪(你如同我的顽童)Ты будто мой сорт - мариуанна.♪" },
                { start: 17600, end: 19533, text: "♪(钻石在天空飞翔)Небо в алмазах - лето летало.♪" },
                { start: 19533, end: 21500, text: "♪(你就是我的宝贝女儿)Ты моя бэйби - дочь карнавала.♪" },
                { start: 21500, end: 23466, text: "♪(舞动吧宝贝，在这公主晚会)Двигайся крошка, принцесса бала.♪" },
                { start: 23466, end: 25433, text: "♪(改变这夜晚，夜晚是个播放器)Ночь перемен - мысли растамана.♪" },
                { start: 25433, end: 27400, text: "♪(一直到玩累了这播放器的音乐)Пока не устал - музыка играла.♪" },
                { start: 27400, end: 29366, text: "♪(有人抽烟，还有人敬礼)Кто-то курил - кого-то впирало!♪" },
                { start: 29366, end: 31333, text: "♪(这个傻瓜,我们尽情享受吧)Эта дура дуремара, а нам она.♪" },
                { start: 31333, end: 33300, text: "♪(而你在温暖的边缘飞走)Было думал, улетала в теплые края.♪" },
                { start: 33300, end: 35266, text: "♪(夏天，大海，沙滩，两小无猜)Лето, море, песок, но мне тебя мало.♪" },
                { start: 35266, end: 37233, text: "♪(在大厅，在天花板上跳舞)Танцую в пол - руки в потолок зала.♪" },
                { start: 37233, end: 39200, text: "♪(去更多的地方，不再回来)Туда куда пал больше не вернусь.♪" },
                { start: 39200, end: 41166, text: "♪(奇迹带走了你的忧伤)Чудом умотал и забрал с ней грусть.♪" },
                { start: 41166, end: 43133, text: "♪(这就是我们的生活，她总是嫌少)Это наша жизнь и ей всегда мало.♪" },
                { start: 43133, end: 45000, text: "♪(在大厅，在天花板上跳舞)Танцую в пол - руки в потолок зала.♪" },
                { start: 45000, end: 46500, text: "♪(大家一起扭动屁股吧)Go everybody shake your ass.♪" },
                { start: 46500, end: 48566, text: "♪(让大家一起动起来是我最喜欢的节目)Go, move everybody мое - любимое шоу.♪" },
                { start: 48566, end: 50633, text: "♪(嗯哼，来晃动你的脑袋)Голова качала пощада давала маннама.♪" },
                { start: 50633, end: 52533, text: "♪(嗯哼，甩掉你的脂肪)Блавовал планна в налы навара.♪" },
                { start: 52533, end: 54433, text: "♪(这天赐的盛宴)Бутора валом подавай нам!♪" },
                { start: 54433, end: 56200, text: "♪(有一天你会对自己唱道)Когда будет этот день ты пой про себя.♪" },
                { start: 56200, end: 58166, text: "♪(关于我的爱，妈妈，弟弟)Про меня, за любовь, за маму, за брата,♪" },
                { start: 58166, end: 60133, text: "♪(这无常的命运啊)А то судьба загнет ата - ата!♪" },
                { start: 60133, end: 63033, text: "♪(嗯哼，来吧)А-ТА-МАН... я типа А-ТА-МАН..♪" },
                { start: 63033, end: 67500, text: "♪(我喜欢在炽热的探戈中征服坏男人)В жарком танго- меломан мною правит bad man.♪" },
                { start: 67500, end: 71100, text: "♪(舞动吧！原始的躁动吧！舞动吧！释放你的冲动吧)Танцуй! Так примитивно! Танцуй! Так импульсивно!♪" },
                { start: 71100, end: 73266, text: "♪(舞动吧！这是女人的狂欢)Танцуй! Дочь карнавала.♪" },
                { start: 73266, end: 75633, text: "♪(而你在舞池中如此独特)Тут на танцполе тебя было мало.♪" },
                { start: 75933, end: 77466, text: "♪(我感觉在被爱)I got love a feel.♪" },
                { start: 77800, end: 79600, text: "♪(我感觉在被你在乎)I got you my mind.♪" },
                { start: 80000, end: 81666, text: "♪(我被自己的技巧陶醉)I got love my skill.♪" },
                { start: 81833, end: 83766, text: "♪(我的爱啊)My la-la-la-love♪" },
                { start: 83966, end: 85500, text: "♪(我感觉在被爱)I got love a feel.♪" },
                { start: 85800, end: 87400, text: "♪(我感觉在被你在乎)I got you my mind.♪" },
                { start: 87700, end: 89366, text: "♪(我被自己的技巧陶醉)I got love my skill.♪" },
                { start: 89733, end: 91333, text: "♪(我的爱啊)My la-la-la-love♪" },
                { start: 91333, end: 93533, text: "♪(窗幕，公主与暴君再度结合)Окна завесим, будем опять принцесса и деспот.♪" },
                { start: 93533, end: 96133, text: "♪(然而她将你的荣誉视作尘土)Лаврами не взять твой пыл, куралесим.♪" },
                { start: 96133, end: 98400, text: "♪(我们一起摘下意志)Мы на волю по годам сорвемся вместе.♪" },
                { start: 99100, end: 110000, text: "♪" },
            ],
            '#20':[
                { start: 0, end: 99999, text: "no" },
            ],
            '#21': [
                { start: 0, end: 699, text: "励志名言建议收藏。Inspirational Quotes Suggested Collection。" },
                { start: 700, end: 2133, text: "菜就多练" },
                { start: 2366, end: 4100, text: "输不起就别玩" },
                { start: 5166, end: 6366, text: "以前是以前" },
                { start: 6366, end: 7533, text: "现在是现在" },
                { start: 7533, end: 9966, text: "你要是一直拿以前当做现在" },
                { start: 9966, end: 10266, text: "哥们" },
                { start: 10266, end: 12833, text: "你怎么不拿你刚出生的时候对比啊" },
            ],
        };
        const subtitles = subtitlesData[hash];
        //手控党云玩家第五人格超霸洗发水火腿肠王中王一节更比六节强
        const subtitleContainer = document.getElementById('subtitle-container');
        // 根据视频的当前时间显示相应的字幕
        function displaySubtitle() {
            const currentTime = video.currentTime * 1000; // 转换为毫秒
            var nowm = document.getElementById('subb');
            const currentSubtitle = subtitles.find(subtitle => 
                currentTime >= subtitle.start && currentTime <= subtitle.end
            );

            if (currentSubtitle && currentSubtitle.text != "no" && nowm.innerHTML != "❎字幕") {
                subtitleContainer.innerText = currentSubtitle.text;
                subtitleContainer.style.display = 'block';
            } else {
                subtitleContainer.style.display = 'none';
        }
        }
        // 设置视频的事件监听器
        video.addEventListener('timeupdate', displaySubtitle);
        //分享
        function share(){
            var hash = window.location.hash.substring(1);
            if(hash){
                alert('分享给你的朋友：https://modiange.github.io/lookvideo.html#'+hash);
            }else{
                alert('分享给你的朋友：https://modiange.github.io/lookvideo.html');
            }
        }
//字幕
var sub = document.getElementById('subtitle-container');
var nowm = document.getElementById('subb');
var subsize = document.getElementById('subsize');
var smap = document.getElementById('smap');
var op = document.getElementById('op');
var bar = document.getElementById('bar');
var showbar = document.getElementById('showbar');
var body = document.body;
//检测有没有字幕
const ccurrentTime = 0; // 转换为毫秒
const zmzt = subtitles.find(subtitle => 
    ccurrentTime >= subtitle.start && ccurrentTime <= subtitle.end
);
if (zmzt.text == "no") {
    //没有字幕
    sub.style.display = 'none';
    nowm.innerHTML = "❌没有字幕"
}
function opcosu() {
    if(nowm.innerHTML=="❌没有字幕"){
        if(hash == "#2"){
            alert("这条视频太长了，懒得做字幕。 This video is too long and I don't want to subtitle it.");
        }else{
            alert('此视频没有字幕。')
        }
    }else{
        if(nowm.innerHTML == "❎字幕"){
            sub.style.display = "flex";
            nowm.innerHTML = "✅字幕"
        }else{
            sub.style.display = "none";
            nowm.innerHTML = "❎字幕"
        }
    }   
}
function xunhuan(){
    var xh = document.getElementById('xh');
    if(video.loop){
        video.loop=false;
        xh.innerHTML='❎循环播放';
    }else{
        video.loop=true;
        xh.innerHTML='✅循环播放';
    }
}
const videoElement = document.getElementById('myVideo');
videoElement.addEventListener('fullscreenchange', handleFullscreenChange);
videoElement.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari 和 Chrome
videoElement.addEventListener('mozfullscreenchange', handleFullscreenChange); // Firefox
videoElement.addEventListener('MSFullscreenChange', handleFullscreenChange); // IE11
function handleFullscreenChange(event) {
    if (document.fullscreenElement === videoElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
      // 视频进入全屏模式
      console.log('123');
    } else {
      // 视频退出全屏模式
      console.log('456');
    }
}
document.addEventListener ('fullscreenchange', function() {
    if (document.fullscreenElement ) {
    console.log ('已进入全屏模式');
    } else {
    console.log ('已退出全屏模式');
    }
});
function sumap(){
    sub.style.bottom=smap.value +'vh';
}
function tmd(){
    sub.style.background='rgba(0, 0, 0,'+op.value/100+')';
}
function bars(){
    var vvv = document.getElementById("vvv");
    var aking = document.getElementById("aking");
    if(bar.style.display == "none"){
        bar.style.display = "block";
        showbar.innerHTML = "✅边栏";
        vvv.style.width ="calc(99vw - 114px)";
        aking.style.marginRight = "99px";
        video.style.marginLeft = "99px";
        sub.style.marginLeft = "48.5px";
    }else{
        bar.style.display = "none";
        showbar.innerHTML = "❎边栏";
        vvv.style.width ="99vw";
        aking.style.marginRight = "0";
        video.style.marginLeft = "0";
        sub.style.marginLeft = "0";
    }
}
