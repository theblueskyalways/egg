/**
 * Created by dell on 2018/9/19.
 */
var time = null;
var time2 = null;
var arrViedo = document.getElementsByClassName('show-video');
var oShowButton = document.getElementById('buttonlist');
var arrShowButton = oShowButton.getElementsByTagName('li');
var arrLine =document.getElementsByClassName('progress-svg');
var arrH4 = document.getElementsByClassName('ability-name')[0];
var oTab = document.getElementsByClassName('detail-tabs')[0];
var arrTab = oTab.getElementsByTagName('li');
var arrCon = document.getElementsByClassName('detail-content');
var arrBg = document.getElementsByClassName('hero-detail-bg');
var oMore = document.getElementById('more');
var arrMedia = document.getElementsByClassName('hero-media-content');
var arrPho = document.getElementsByClassName('media-content');
var oCloseBtn = document.getElementById('close');
var oPhotoBg = document.getElementById('photo-box-bg');
var oPhotoBox= document.getElementById('photo-box');
var oPhotoContent = document.getElementById('photo-content-picture');
var oNext = document.getElementById('next');
var oPrev = document.getElementById('prev');
var oPohIndex = document.getElementById('photo-index');
var oPohName = document.getElementById('photo-name');
var index = 0;
var pIndex = 0;
    function  turnon(){
        if(index > arrShowButton.length-1){
            index = 0;
            for (var j = 0; j < arrShowButton.length; j++) {
                arrShowButton[j].classList.remove('is-select');
                arrViedo[j].classList.remove('is-select');
                arrViedo[j].pause();
                arrViedo[j].currentTime = 0;
                arrLine[j].classList.remove('is-select');
            }
            arrShowButton[index].classList.add('is-select');
            arrViedo[index].classList.add('is-select');
            arrViedo[index].play();
            arrH4.innerHTML = arrName[index];
            arrLine[index].classList.add('is-select');
            index++;
            clearTimeout(time2);
            time2 = setTimeout("turnon()",arrTime[index-1])
        }else if(index < arrShowButton.length){

            for (var j = 0; j < arrShowButton.length; j++) {
                arrShowButton[j].classList.remove('is-select');
                arrViedo[j].classList.remove('is-select');
                arrViedo[j].pause();
                arrViedo[j].currentTime = 0;
                arrLine[j].classList.remove('is-select');
            }
            arrShowButton[index].classList.add('is-select');
            arrViedo[index].classList.add('is-select');
            arrViedo[index].play();
            arrH4.innerHTML = arrName[index];
            arrLine[index].classList.add('is-select');
            index++;
            clearTimeout(time2);
            time2 = setTimeout("turnon()",arrTime[index-1])
        }
    }
    function qiehuan(){
    if(index < arrShowButton.length){
        for (var j = 0; j < arrShowButton.length; j++) {
            arrShowButton[j].classList.remove('is-select');
            arrViedo[j].classList.remove('is-select');
            arrViedo[j].pause();
            arrViedo[j].currentTime = 0;
            arrLine[j].classList.remove('is-select');
        }
        arrShowButton[index].classList.add('is-select');
        arrViedo[index].classList.add('is-select');
        arrViedo[index].play();
        arrH4.innerHTML = arrName[index];
        arrLine[index].classList.add('is-select');
        index++;
        clearTimeout(time);
        time = setTimeout("qiehuan()",arrTime[index-1])
    } else if(index > arrShowButton.length-1){
        index = 0;
        for (var j = 0; j < arrShowButton.length; j++) {
            arrShowButton[j].classList.remove('is-select');
            arrViedo[j].classList.remove('is-select');
            arrViedo[j].pause();
            arrViedo[j].currentTime = 0;
            arrLine[j].classList.remove('is-select');
        }
        arrShowButton[index].classList.add('is-select');
        arrViedo[index].classList.add('is-select');
        arrViedo[index].play();
        arrH4.innerHTML = arrName[index];
        arrLine[index].classList.add('is-select');
        index++;
        clearTimeout(time);
        time = setTimeout("qiehuan()",arrTime[index-1])
    }
}
    //点击切换
function clickturn(){
    for (var i = 0; i < arrShowButton.length; i++) {
        arrShowButton[i].index = i;
        arrShowButton[i].onclick = function(){
            clearTimeout(time);clearTimeout(time2);clearTimeout(time2);
            for (var j = 0; j < arrShowButton.length; j++) {
                arrShowButton[j].classList.remove('is-select');
                arrViedo[j].classList.remove('is-select');
                arrViedo[j].pause();
                arrViedo[j].currentTime= 0;
//            arrLine[this.index].style.animation = '';
                arrLine[j].classList.remove('is-select');
            }
            arrShowButton[this.index].classList.add('is-select');
            arrViedo[this.index].classList.add('is-select');
            arrH4.innerHTML = arrName[this.index];
            arrViedo[this.index].play();
            arrLine[this.index].classList.add('is-select');
//        arrLine[this.index].style.animation = 'dash ' + (arrTime[this.index]/1000)+'s '+'linear';
            index = this.index;
            index++;
            time2 = setTimeout("turnon()",arrTime[index-1])
        }
    }
}

//点击之后的计时器

//内容选项卡
function photo(){//浏览图片
    for (var e = 0; e < arrTab.length; e++) {
        arrTab[e].index = e;
        arrTab[e].onclick = function(){
            for (var j = 0; j < arrTab.length; j++) {
                arrCon[j].classList.remove('is-select');
                arrTab[j].classList.remove('is-select');
                arrBg[j].classList.remove('is-select')
            }
            arrCon[this.index].classList.add('is-select');
            arrTab[this.index].classList.add('is-select');
            arrBg[this.index].classList.add('is-select')
        }

    }
    for (var i = 0; i < arrImg.length; i++) {
        arrPho[i].index = i;
        arrPho[i].onclick = function (){
            oPhotoBg.classList.add('open');
            oPhotoBox.classList.add('open');
            oPhotoContent.style.backgroundImage = arrImg[this.index];
            oPohIndex.innerHTML = this.index+1 + '/6';
            name(this.index);

            pIndex = this.index
        }
    }
}

//more点击加载
    oMore.onclick = function(){
        for (var i = 0; i < arrMedia.length; i++) {
            arrMedia[i].style.display = 'block'
        }
        oMore.style.display = 'none'
    };


//关闭盒子
    oCloseBtn.onclick = function(){
        oPhotoBg.classList.remove('open');
        oPhotoBox.classList.remove('open');
        oPhotoBg.classList.add('close');
        oPhotoBox.classList.add('close')
    }
//点击切换图片
    oNext.onclick = function(){
        console.log(pIndex);
        pIndex++;
        if (pIndex ==arrImg.length){
            pIndex = 0;
        }

        oPhotoContent.style.backgroundImage = arrImg[pIndex];
        oPohIndex.innerHTML = pIndex+1 + '/6';
        name(pIndex);

    };
    oPrev.onclick = function(){
        pIndex--;
        if (pIndex == -1){
            pIndex =arrImg.length-1;
        }
        console.log(pIndex);
        oPhotoContent.style.backgroundImage = arrImg[pIndex];
        oPohIndex.innerHTML = pIndex+1 + '/6';
        name(pIndex);
    };
    function name(index){
        if(index==0){
            oPohName.innerHTML = '壁纸';
        }else if(index==5){
            oPohName.innerHTML = '原画';
        }else {
            oPohName.innerHTML = '游戏截图';
        }
    }

