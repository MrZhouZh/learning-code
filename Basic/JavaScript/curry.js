/**
 * 函数柯里化: 将多个参数的一个函数转换成一系列使用一个参数的函数
 */
const curry = function (fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
};

// Test
function fn(a, b, c, d) {
  return a + b + c + d;
}

const add = curry(fn);
console.log(add(4)(3)(1)(2)); // 10
console.log(add(1, 3)(4)(2)); // 10
console.log(add(1)(4, 3, 2)); // 10
