/**
 * 数组铺平
 * 
 * 实现原理: map 高阶函数 + 递归调用
 * 
 */
const flattern = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? flattern(v) : v)));

module.exports = flattern;
