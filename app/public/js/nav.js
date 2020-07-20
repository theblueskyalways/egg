/**
 * Created by dell on 2018/9/18.
 */
const oTop = document.getElementById('gotop');
let topPart = document.getElementById('topPart');
const mainPart = document.getElementById('mainPart');
const navBar = document.getElementById('navBar');
let toptime = null;
let topnow = 0;
const topitem = 0;
let topstep = 0;
// 导航吸附
window.onscroll = function() {
  if (scroll().top > topPart.offsetHeight) {
    navBar.className = 'content-nav fixed';
    // mainPart.style.paddingTop = navBar.offsetHeight + "px";//记得加单位
  } else {
    navBar.className = 'content-nav';
  }
  if (scroll().top > 800) {
    oTop.style.display = 'block';
  } else {
    oTop.style.display = 'none';
  }
};
oTop.onclick = function() {
  clearInterval(toptime);
  topnow = Math.ceil(scroll().top);
  toptime = setInterval(function() {
    topstep = (topnow - topitem) / 10;
    topstep > 0 ? topstep = Math.ceil(topstep) : topstep = Math.floor(topstep);
    topnow = topnow - topstep;
    window.scrollTo(0, topnow);
    if (topnow === topitem) {
      clearInterval(toptime);
    }
  }, 10);
  page = 0;
};
function scroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
  };
}
const oNav = document.getElementById('nav-menu');
const arrNav = oNav.getElementsByClassName('m-menu');
const arrL = oNav.getElementsByClassName('m-sub-menu');
let fl = true;
for (let i = 0; i < arrNav.length; i++) {
  arrNav[i].parentElement.onclick = function() {
    for (let j = 0; j < arrNav.length; j++) {
      arrNav[j].parentElement.classList.remove('active');
      arrL[j].classList.remove('m-open');
    }
    if (fl == true) {
      arrNav[i].parentElement.classList.add('active');
      arrL[i].classList.add('m-open');
    } else {
      arrNav[i].parentElement.classList.remove('active');
      arrL[i].classList.remove('m-open');
    }
    fl = !fl;
  };

}
// top 选项卡
function tap() {
  const arrPlaylist = document.querySelectorAll('.play-list-box .list'),
    oWall = document.querySelector('.window-wall'),

    oPlaybox = document.querySelector('.play-list-box'),
    arrToptab = document.querySelectorAll('.main-nav .maintab');
  function click(i) {
    arrToptab[i].onclick = function() {
      for (let j = 0; j < arrToptab.length; j++) {
        arrPlaylist[j].classList.remove('is-select');
      }
      if (oPlaybox.style.display == 'none' && oWall.style.display == 'none') {
        oPlaybox.style.display = 'block';
        oWall.style.display = 'block';
        oWall.style.opacity = 1;
      } else {
        oPlaybox.style.display = 'none';
        oWall.style.display = 'none';
      }
      arrPlaylist[i].classList.add('is-select');
      arrToptab[i].classList.add('is-select');
    };
  }
  function num(i) {
    return i;
  }
  return function() {
    for (let i = 0; i < arrToptab.length; i++) {

      click(num(i));
    }
    oWall.onclick = function() {
      console.log(1);
      oPlaybox.style.display = 'none';
      oWall.style.display = 'none';
    };
  };
}

// 主选项卡

// 回到顶部


// match 选项卡
