/**
 * Created by dell on 2018/9/13.
 */
// 高级单例模式 结合闭包 对象
const fn = ~(function() {
  // 获取css中的样式
  function getstyle(ele, attr) { // 解决兼容
    if (ele.currentStyle) {
      return ele.currentStyle[attr];
    }
    return getComputedStyle(ele)[attr]; // 获取计算后的样式

  }
  // 可以获取到行内还有css中的样式
  function setstyle(ele, attr, val) {
    ele.style[attr] = val;
  }
  // 给一个元素批量改变属性
  function group(ele, obj) {
    for (const key in obj) {
      ele.style[key] = obj[key];
    }
  }
  // 三合一
  function css() {
    const arr = [].slice.call(arguments);
    if (arr.length == 2) {
      if (typeof arr[1] === 'object') {
        group(arr[0], arr[1]);
      } else {
        // 获取
        return getstyle(arr[0], arr[1]);
      }// 解决兼容
    } else if (arr.length == 3) {
      setstyle(arr[0], arr[1], arr[2]);
    }
  }
  return {
    css,
  };
})();
function scroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
  };
}
function client() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
  };
}

function animate(obj, step, target) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    let leader = obj.offsetLeft;
    step = Math.abs(step);
    step = leader < target ? step : -step;
    // Math.abs(target - leader)  当前位置到目标的位置
    if (Math.abs(target - leader) > Math.abs(step)) {
      leader += step;
      obj.style.left = leader + 'px';
    } else {
      obj.style.left = target + 'px';
      clearInterval(obj.timer);
    }
  }, 15);
}

function responsive() {
  if (client().width > 960) {
    document.body.style.backgroundColor = 'red';
    document.body.innerHTML = 'diannao';
  } else if (client().width > 640) {

  } else {

  }
}
// 旋转木马封装
function animatemu(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    let flag = true;
    for (const k in json) {
      if (k === 'opacity') {
        obj.style.opacity = json[k];

        // var leader = getStyle(obj, k) * 100;
        // var target = json[k] * 100;
        // var step = (target - leader) / 10;
        // step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // leader = leader + step;
        // obj.style[k] = leader / 100;
      } else if (k === 'zIndex') {
        obj.style.zIndex = json[k];
      } else {
        var leader = parseInt(getStyle(obj, k)) || 0;
        var target = json[k];
        let step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style[k] = leader + 'px';
      }
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
  }, 15);
}
function getStyle(obj, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[attr];
  }
  return obj.currentStyle[attr];

}
// 解除事件绑定
function removeEvent(ele, e, fn) {
  if (ele.removeEventListener) {
    ele.removeEventListener(e, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent('on' + e, fn);
  } else {
    ele['on' + e] = null;
  }
}
// /阻止冒泡
// .onclick = function (ev) {
//    var oEven = window.event||ev;
//    oEven.stopImmediatePropagation();}//阻止冒泡
function ajaxs(url, fnSucc, fnFaild) {

  try {

    var xml = new XMLHttpRequest();
  } catch (e) {
    xml = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xml.open('GET', url, true);
  xml.send();
  xml.onreadystatechange = function() {
    if (xml.status == 200 && xml.readyState == 4) {
      fnSucc(xml.responseText);
    } else if (fnFaild) {
      fnFaild();
    }
  };

}
