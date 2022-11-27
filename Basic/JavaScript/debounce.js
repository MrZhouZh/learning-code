/**
 * 实现防抖
 *
 * 实现原理: 事件在一定时间内执行, 如果在这段时间内被多次触发, 将重新计时
 *
 * 实际场景: 接口调用, 防止用户误操作导致多次请求
 *
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
