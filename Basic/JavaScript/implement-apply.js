/**
 * 实现 apply
 * refs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
 *
 * 实现原理: 改变 this 指针, 并执行函数返回其结果, 入参仅接收一个参数
 *  判断调用对象是否是函数
 *  判断传入的上下文是否存在, 否则设置为 window
 *  将函数作为上下文的一个属性
 *  判断参数值是否传入
 *  使用上下文调用这个方法, 并返回结果
 *  删除新增的属性, 返回结果
 */
Function.prototype.myapply = function (ctx) {
  if (typeof this !== "function") {
    throw new TypeError(`Type Error`);
  }
  let result = null;
  let context = ctx || window;
  context.fn = this;

  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
};

// Test
const obj = {
  a() {
    console.log("a");
  },
  b: "b",
};

function x(...names) {
  console.log(this.b, names);
}

x.myapply(obj, ["PETER PARKER", "TONY STARK", "DISNEY"]);
x.apply(obj, ["PETER PARKER", "TONY STARK", "DISNEY"]);

const nums = [5, 6, 2, 3, 7];
console.log(Math.max.myapply(this, nums), "-- max");
console.log(Math.max.apply(this, nums), "-- max");

console.log(Math.min.myapply(this, nums), "-- min");
console.log(Math.min.apply(this, nums), "-- min");

// both output: b [ 'PETER PARKER', 'TONY STARK', 'DISNEY' ]
