/**
 * 实现 Array.prototype.filter
 * refs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 *
 */
Array.prototype.myfilter = function (fn) {
  if (typeof fn !== "function") {
    throw TypeError(`parameter must be function type`);
  }
  const res = [];
  for (let i = 0, len = this.length; i < len; i++) {
    fn(this[i]) && res.push(this[i]);
  }

  return res;
};

// Test
const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];

const result = words.myfilter((word) => word.length > 6);

console.log(result);
// output: [ 'exuberant', 'destruction', 'present' ]
