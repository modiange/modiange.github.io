//get new bing photo   
var today = new Date();
var days = String(today.getDate()).padStart(2, '0');
var mouths = String(today.getMonth() + 1).padStart(2, '0'); // 注意月份是从0开始的
var years = today.getFullYear();
var hours = String(today.getHours());
var good = document.querySelector('.good');
var bizhi=document.getElementById('bizhi');
var version = 8.8;
bizhi.src='https://dailybing.com/api/v1/'+years+mouths+days+'zh-cnUHD';
function laiyuan(){
    window.open('https://dailybing.com/api/v1/'+years+mouths+days+'zh-cnMRK');
}
function about(){
    alert('©'+years+' modiange');
    alert('好看视频大赏版本：'+version);
    alert('浏览器内核：'+navigator.userAgent);
}
function help(){
    if(navigator.language=='zh-CN'||navigator.language=='zh-HK'||navigator.language=='zh-TW'){
        window.location.href='help.html';
    }else{
        window.location.href='helpen.html';
    }
    
}
// 搜索
function searchFunction() {
    var input = document.querySelector('.soinput');
    var filter = input.value.toLowerCase();
    var cards = document.querySelectorAll('.card');
    var noResults = document.getElementById('no-results');
    var zhuyao = document.getElementById('zhuyao');
    var found = false;
    if(filter){
        good.style.display = "none";
    }else{
        good.style.display = "block";
    }
    cards.forEach(function(card) {
        var title = card.querySelector('.card-title');
        var description = card.querySelector('.card-des');

        // 先移除高亮
        removeHighlight(title);
        removeHighlight(description);

        var titleText = title.innerText.toLowerCase();
        var descriptionText = description.innerText.toLowerCase();

        if (fuzzyMatch(titleText, filter) || fuzzyMatch(descriptionText, filter)) {
            card.style.display = "";
            highlightText(title, filter);
            highlightText(description, filter);
            found = true;
        } else {
            card.style.display = "none";
        }
    });
    if (!found && filter !== "") {
        noResults.style.display = "block";
        noResults.innerText = `暂时还没有找到“${input.value}”这条视频`;
    } else {
        noResults.style.display = "none";
        zhuyao.style.height = "100%";
    }
}

function highlightText(element, filter) {
    var innerHTML = element.innerHTML;
    var lowerHTML = innerHTML.toLowerCase();
    var indices = [];

    // 找到每个字符的位置
    var pos = 0;
    filter.split('').forEach(char => {
        pos = lowerHTML.indexOf(char, pos);
        if (pos !== -1) {
            indices.push(pos);
            pos++;
        }
    });

    // 按位置高亮字符
    var highlightedHTML = '';
    for (let i = 0; i < innerHTML.length; i++) {
        if (indices.includes(i)) {
            highlightedHTML += `<span class='highlight'>${innerHTML[i]}</span>`;
        } else {
            highlightedHTML += innerHTML[i];
        }
    }

    element.innerHTML = highlightedHTML;
}
function removeHighlight(element) {
    var innerHTML = element.innerHTML;
    element.innerHTML = innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, "$1");
}

function fuzzyMatch(text, filter) {
    var regex = new RegExp(filter.split('').join('.*?'), 'i');
    return regex.test(text);
}
setTimeout(() => {
    if(good.innerHTML == "欢迎！"){
        if(hours>=0&&hours<=6){
            good.innerHTML="😴晚上好";
        }else if(hours>=7&&hours<=8){
            good.innerHTML="🥱早上好";
        }else if(hours>=9&&hours<=11){
            good.innerHTML="🫠上午好";
        }else if(hours==12){
            good.innerHTML="😪中午好";
        }else if(hours>=13&&hours<=18){
            good.innerHTML="🥹下午好";
        }else if(hours>=19){
            good.innerHTML="😴晚上好";
        }
    }else{
       if (good.innerHTML==undefined) {
            good.style.display='none';
       }
    }
}, 1000);
const bizhilogo = {
    1: '🏞️',
    2: '🌁',
    3:'🌃',
    4:'🏙️',
    5:'🌄',
    6:'🌆',
    7:'🌆',
    8:'🌉',
    9:'🌅'
};
var logobizhi = document.getElementById('logobizhi');
var bzan = document.getElementById('bzan');
var lologobizhiid = Math.floor(Math.random() * 9) + 1;
logobizhi.innerText = bizhilogo[lologobizhiid];
bzan.title = bizhilogo[lologobizhiid] + "壁纸";
