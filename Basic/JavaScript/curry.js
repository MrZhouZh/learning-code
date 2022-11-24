/**
 * 函数柯里化: 将多个参数的一个函数转换成一系列使用一个参数的函数
 */
const curry = function (fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
};

// Test

