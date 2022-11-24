/**
 * 实现 bind
 * refs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 *
 * 实现原理: 事先将 fn 的 this 改变为要执行的上下文结果, 并把参数值准备好, 等到调用的时候直接执行函数即可
 *  判断调用对象是否为函数
 *  保存当前函数的引用, 获取其他传入的参数值
 *  创建一个函数返回
 *  函数内部使用 apply 绑定函数调用, 需要判断函数作为构造函数的情况, 这个时候需要传入当前的函数 this 指针
 *  其他情况都传入指定的上下文
 *
 */
Function.prototype.mybind = function (ctx) {
  if (typeof this !== "function") {
    throw new TypeError(`Type Error`);
  }

  let rest = [...arguments].slice(1),
    fn = this;
  return function Fn() {
    return fn.apply(this instanceof Fn ? this : ctx, rest.concat(...arguments));
  };
};

// Test
const bindmodule = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = bindmodule.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// output: undefined

const boundGetX = unboundGetX.mybind(bindmodule);
const boundGetX1 = unboundGetX.bind(bindmodule);
console.log(boundGetX(), "mybind --", boundGetX1());
// both output: 42
