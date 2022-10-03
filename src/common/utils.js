// 封装一个公共的工具类和公共的方法
// 1、函数防抖,传递一个函数和一个时间 (简单的说，当一个动作连续触发，只执行最后一次)
export const debounce = (func, delay = 100) => {
  // 先定义一个变量用于保存定时器
  let timer = null;
  return (...args) => {
    // 判断定时器是否有值，有值就把定时器清除(关闭上一次开启的定时器)
    if (timer) clearTimeout(timer);
    // 重新开一个定时器
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// 2、函数节流  限制一个函数在一定时间内只能执行一次
export const throttle = (func, delay = 200) => {
  let timer = null;
  return (...args) => {
    // 如果timer存在，就继续执行已经存在的timer
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay);
  };
};

export function formatDate(date, fmt) {
  // 1、获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substring(4 - RegExp.$1.length)
    );
  }
  // 2、获取
  // M+  正则的一个规则：+  表示一个或多个
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substring(str.length);
}
