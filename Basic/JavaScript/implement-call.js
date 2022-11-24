/**
 * 实现 call 函数
 * refs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 *
 * 实现原理: 改变 this 指针, 并执行函数返回其结果, 参数可多个
 *  判断调用函数是否是对象
 *  判断上下文是否存在, 否则设置为 window
 *  处理传入的函数, 截取第一个参数后的所有参数
 *  将函数作为上下文的一个属性
 *  通过上下文来调用这个犯法, 并保存返回结果
 *  删除新增的属性, 返回结果
 */
Function.prototype.mycall = function (ctx) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  let rest = [...arguments].slice(1),
    result = null;

  context = ctx || window;
  context.fn = this;
  result = context.fn(...rest);

  delete context.fn;
  return result;
};

// Test
let obj = {
  a: 10,
  b: 20,
};

function tester(a, b) {
  return `a: ${this.a} and b: ${this.b} | curr args a: ${a} and b: ${b}`;
}

console.log(tester.mycall(obj, 30, 40));
console.log(tester.call(obj, 30, 40));
// both output: a: 10 and b: 20 | curr args a: 30 and b: 40
