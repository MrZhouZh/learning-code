/**
 * 实现数组 push
 * refs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push
 *
 */
// const mypush = function () {
Array.prototype.mypush = function () {
  for (let i = 0, len = arguments.length; i < len; i++) {
    this[this.length] = arguments[i];
  }
  return this.length;
};

let arr = [];

arr.mypush(1);
arr.mypush(2);
arr.mypush(3);
console.log(arr.mypush(4, 5)); // 5
console.log(arr); // [1, 2, 3, 4, 5]
