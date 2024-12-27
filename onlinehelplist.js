const helplists = [
    {title:"如何将好看视频大赏投屏到电视上？",svg:"M0 18.5455v3.2727h3.2727c0-1.811-1.4618-3.2727-3.2727-3.2727zm0-4.3637v2.1818c3.011 0 5.4545 2.4437 5.4545 5.4546h2.1819c0-4.2218-3.4146-7.6364-7.6364-7.6364zm0-4.3636V12c5.4218 0 9.8182 4.3964 9.8182 9.8182H12c0-6.6327-5.3782-12-12-12zm21.8182-7.6364H2.1818C.9818 2.1818 0 3.1636 0 4.3636v3.2728h2.1818V4.3636h19.6364v15.2728h-7.6364v2.1818h7.6364c1.2 0 2.1818-.9818 2.1818-2.1818V4.3636c0-1.2-.9818-2.1818-2.1818-2.1818Z",docs:"若您想将视频投射到其他设备（如电视、显示器等），您可以参阅此教程。<br>1.点击地址栏右侧的“自定义及控制Google Chrome”。<br>2.点击“投放、保存和分享”（老版本的Google Chrome为“保存和分享”）<br>3.点击“投放”，然后在设备列表里选择设备。"},
    {title:"使用收藏功能时显示“收藏失败”",svg:"M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339",docs:"作者压根没做这个功能……"},
    {title:"好看视频大赏的视频都是从哪来的？",svg:"m23.99 13.543-.007-.288c-.015-1.122-.645-6.495-.999-7.457-.41-1.111-.974-1.945-1.675-2.48-1.143-.873-2.115-1.063-3.313-1.087h-.03c-.51 0-3.848.415-6.642.801-2.797.387-6.303.915-7.14 1.227-1.153.432-2.07.997-2.796 1.728C.05 7.332-.113 8.731.054 10.553c.13 1.412.875 6.975 1.302 8.248.574 1.717 1.694 2.75 3.154 2.909.36.039.704.059 1.045.059 1.28 0 2.295-.278 3.47-.598 1.848-.505 4.147-1.13 8.893-1.13h.14c1.162 0 4.008-.263 5.303-2.687.693-1.297.652-2.87.629-3.811zm-7.719-1.67-.105.066c-.274.185-.547.373-.819.563l-4.298 2.975c-.27.21-.748.521-1.016.521a.236.236 0 0 1-.107-.024c-.226-.12-.303-.94-.356-1.34l-.011-.087c-.065-.478-.594-5.035-.654-5.535-.017-.142-.105-.663.055-.781.05-.037.12-.05.2-.05.195 0 .442.083.549.118.845.272 5.083 1.774 6.4 2.448.038.02.079.04.122.057.188.08.446.192.452.51.004.304-.225.446-.412.56z",docs:"好看视频大赏中所有的视频都来自于以下的平台<br><p>1.<a href='https://www.youtube.com' style='color: inherit;'>YouTube</a></p><p>2.<a href='https://www.bilibili.com' style='color:inherit;'>Bilibili</a></p><p>3.<a href='https://www.douyin.com/' style='color: inherit;'>抖音</a></p><p>4.<a href='https://modiange.github.io/photo/help/yuan1.png' style='color: inherit;'>作者自制</a></p>"},
    {title:"好看视频大赏用了什么字体？",svg:"M4 8L5 4H12M20 8L19 4H12M12 4V20M12 20H8M12 20H16",docs:"在制作好看视频大赏时，我们使用了以下字体：<br><p>1.<a href='https://github.com/atelier-anchor/smiley-sans' style='color: inherit;'>得意黑</a></p><p>2.<a href='https://hyperos.mi.com/font' style='color:inherit;'>MiSans VF</a></p><p>3.<a href='https://github.com/GORAlexComp/AppleColorEmojiFont/' style='color: inherit;'>(From Github)Apple Color Emoji</a></p>"},
];
for (let index = 0; index < helplists.length; index++) {
    // 创建 helpxuanxiang 容器
    const helpXuanXiang = document.createElement('div');
    helpXuanXiang.classList.add('helpxuanxiang');
    helpXuanXiang.setAttribute('onclick', 'views('+index+')');

    // 创建内部的 flex 容器
    const flexContainer = document.createElement('div');
    flexContainer.style.display = 'flex';
    flexContainer.style.flexDirection = 'row';

    // 创建自定义的 SVG 内容
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('viewBox', '0 0 24 24');
    svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg1.style.blockSize = '38px';
    svg1.style.stroke = '#333';
    svg1.style.strokeWidth = '1';
    svg1.style.strokeLinecap = 'square';
    svg1.style.strokeLinejoin = 'miter';
    svg1.style.fill = 'none';
    svg1.style.alignItems = 'center';
    svg1.style.transform = 'translate(0%, 40%)';
    svg1.style.marginLeft = '10px';
    // 添加自定义路径或形状到这个 SVG
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', helplists[index].svg);
    svg1.appendChild(path1);

    // 创建 h2 标题并设置自定义内容
    const h2 = document.createElement('h2');
    h2.textContent = helplists[index].title;

    // 将 SVG 和 h2 添加到 flex 容器
    flexContainer.appendChild(svg1);
    flexContainer.appendChild(h2);

    // 创建展开 SVG
    const expandSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expandSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expandSvg.setAttribute('id', 'zhankai');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', '36 40 42 46 48 40');
    expandSvg.appendChild(polyline);

    // 将 flex 容器和展开 SVG 添加到 helpXuanXiang
    helpXuanXiang.appendChild(flexContainer);
    helpXuanXiang.appendChild(expandSvg);

    // 创建分割线
    const divider = document.createElement('div');
    divider.style.width = '100%';
    divider.style.backgroundColor = 'gray';
    divider.style.height = '1px';

    // 创建 helpneirong 容器
    const helpneirong = document.createElement('div');
    helpneirong.innerHTML = helplists[index].docs;
    helpneirong.classList.add('helpneirong');
    helpneirong.style.display = 'none';
    helpneirong.style.flexDirection = 'column';

    // 将所有内容添加到 helplists div
    const helplistsDiv = document.getElementById('helplists');
    helplistsDiv.appendChild(helpXuanXiang);
    helplistsDiv.appendChild(helpneirong);
    if(index<helplists.length-1){
        helplistsDiv.appendChild(divider);
    }
}
var viewing = undefined;
function views(index){
    var viewer = document.getElementsByClassName('helpneirong');
    var anniustyle = document.querySelectorAll('#zhankai');
    if(viewing != undefined && viewing != index){
        //隐藏
        anniustyle[viewing].style.transform = 'translate(-50%, -15%)';
        viewer[viewing].style.display = "none";
        viewing = undefined;
    }
    if (viewer[index].style.display == "none") {
        //显示
        anniustyle[index].style.transform = 'translate(20%, 55%) rotate(-180deg)';
        viewer[index].style.display = "flex";
        viewing = index;
    } else {
        //隐藏
        anniustyle[index].style.transform = 'translate(-50%, -15%)';
        viewer[index].style.display = "none";
        viewing = undefined;
    }
}
if(window.location.hash){
    views(window.location.hash.substring(1));
}
