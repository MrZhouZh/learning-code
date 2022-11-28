/**
 * 实现 Array.prototype.map
 * refs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 *
 */
Array.prototype.mymap = function (fn) {
  if (typeof fn !== "function")
    throw TypeError(`parameter must be function type`);
  const res = [];
  for (let i = 0, len = this.length; i < len; i++) {
    res.push(fn(this[i], i, this));
  }
  return res;
};

// Test
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.mymap((x, i, arr) => {
  console.log(x, i, arr);
  return x * 2;
});

console.log(map1);
// output: [ 2, 8, 18, 32 ]
