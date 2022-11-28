/**
 * 实现 Array.from
 * refs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 *
 */
const myfrom = function (arrayLike, fn) {
  let res = [];
  for (let i = 0, len = arrayLike.length; i < len; i++) {
    if (fn) {
      res.push(fn(arrayLike[i], i));
    } else {
      res.push(arrayLike[i]);
    }
  }
  return res;
};

// test
const a = Object.assign({}, [1, 2, 3]);
a.length = 3; // {0: 1, 1: 2, 2: 3, length: 3}
myfrom(a); // [1, 2, 3]
