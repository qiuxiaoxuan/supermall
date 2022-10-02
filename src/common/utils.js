// 封装一个公共的工具类和公共的方法
// 函数防抖,传递一个函数和一个时间
export const debounce = (func, delay) => {
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
