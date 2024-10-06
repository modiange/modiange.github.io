const taglist = {
    1:[0,18,10],
    2:[1,5,7,10,12,13,17,18,22,23],
    3:[3,4,5,6,7,10,11],
    4:[7],
    5:[9,15,16,18],
    6:[0,10,18,19,21],
    7:[8,10,12,13,17,18,20,22,23],
    8:[4,5,23], //必须要选择用动作表达出来的！
    9:[2,6],
    10:[0,5,10,11]
};
function updatetime(){
    alert('分类更新时间：2024年9月14日')
}
const tagdata = [
    {title:"👋欢迎使用发现！",jj:"您可以在这里查看您想看的类型与内容，视频由作者分类。"},
    {title:"🏆排行榜",jj:"这些视频在好看视频大赏内十分出名，排行榜只显示前3名，顺序为从左到右。🏆"},
    {title:"🤣搞笑",jj:"笑掉大牙！这些搞笑瞬间你确定不看吗？"},
    {title:"🧐名场面",jj:"这些视频你肯定在其他地方看过，保证每一个都是名场面！"},
    {title:"😋烹饪",jj:"烹饪与我们的生活息息相关。"},
    {title:"🎶音乐",jj:"音乐，离不开我们的生活，并且这里面的音乐非常豪庭。🤓"},
    {title:"🎮游戏",jj:"游戏，是人们消遣的方式之一，游戏的种类繁多，不同的种类适合不同的人群游玩。"},
    {title:"💻网络流行",jj:"网络流行语，是指从网络中产生或应用于网络交流的一种语言。"},
    {title:"😐情绪",jj:"情绪是以主体的需要、愿望等倾向为中介的一种心理现象。😁😅🥹🤪😭🥺🤬"},
    {title:"🏃‍♂️锻炼",jj:"锻炼是指通过体育运动使身体强壮。💪"},
    {title:"📖故事",jj:"这里面的剧本和故事十分精彩，你确定不看吗？🥹"},
];
const tagbtn = [
    {logo:"👋",name:"欢迎页"},
    {logo:"🏆",name:"排行榜"},
    {logo:"🤣",name:"搞笑"},
    {logo:"🧐",name:"名场面"},
    {logo:"😋",name:"烹饪"},
    {logo:"🎶",name:"音乐"},
    {logo:"🎮",name:"游戏"},
    {logo:"💻",name:"网络流行"},
    {logo:"😐",name:"情绪"},
    {logo:"🏃‍♂️",name:"锻炼"},
    {logo:"📖",name:"故事"},
];
var nowtag=0;
var cards = document.getElementsByClassName('card');
var tagtitle = document.getElementById('tagtitle');
var tagjj = document.getElementById('tagjj');
function showbtn(){
    for (let index = 1; index < tagbtn.length; index++) {
        const listsDiv = document.querySelector('.btntags');
        const newDiv = document.createElement('div');
        newDiv.className = 'barbutton';
        newDiv.id = 'tagbtn';
        newDiv.title = tagdata[index].title;
        newDiv.setAttribute('onclick', 'opentag('+index+')');
        const newP = document.createElement('p');
        newP.className = 'barbuttontext';
        newP.innerHTML = tagbtn[index].logo+'<br>'+tagbtn[index].name;
        newDiv.appendChild(newP);
        listsDiv.appendChild(newDiv);
    }
}
function showtag(tagid){
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('404notfound').style.display = "none";
    var barbutton = document.getElementsByClassName('barbutton');
    var barbuttontext = document.getElementsByClassName('barbuttontext');
    //初始化
    for (let index = 1; index < barbutton.length; index++) { //从6开始是因为前面有6个（从0开始）按钮
        if(barbutton[index].id == 'tagbtn'){
            barbutton[index].style.background = 'azure';
            barbuttontext[index].style.color = 'black';
        }
    }
    for (let index = 0; index < cards.length; index++) {
        cards[index].style.display = "none";
    }
    //判断一下是否可用
    if(tagdata[tagid]==undefined){
        document.getElementById('404notfound').style.display = "flex";
        document.title = "一个未知的境界…-好看视频大赏";
        tagtitle.innerHTML = "一个未知的境界…";
        tagjj.innerHTML = "你来到了一个神秘的地方，此地不宜久留，请离开此地。";
        return false;
    }
    nowtag = tagid;
    tagtitle.innerHTML = tagdata[tagid].title;
    tagjj.innerHTML = tagdata[tagid].jj;
    if(tagid>0){
        document.title = tagdata[tagid].title + "-好看视频大赏";
    }else{
        document.title = "分类-好看视频大赏";
    }
    //特判
    if(tagid == 0){
        document.getElementById('welcome').style.display = 'flex';  
        return true;
    }
    //显示特定
    for (let index = 0; index < taglist[tagid].length; index++) {
        cards[taglist[tagid][index]].style.display = "block";
    }
    //添加选中
    barbutton[Number(tagid)+5].style.background = 'linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%)';
    barbuttontext[Number(tagid)+5].style.color = 'white';
}
if(window.location.hash.substring(1)){
    showbtn();
    showtag(window.location.hash.substring(1));
}else{
    showbtn();
    showtag(0);
}
window.addEventListener('hashchange', function() {
    if(window.location.hash.substring(1)){
        showtag(window.location.hash.substring(1));
    }
});
function opentag(tagid){
    location.hash = tagid;
}
