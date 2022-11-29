/**
 * 数组去重
 *
 */
function unique(arr = []) {
  // filter
  // 当前元素在原始数组中的第一个索引 !== 当前索引值, 否则返回当前元素
  // return arr.filter((item, index, arr) => arr.indexOf(item) === index)
  // Set
  // return Array.from(new Set(arr))
  // 两层循环在使用 splice 去重
  let clone = arr.slice(0);
  for (let i = 0, len = clone.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (clone[i] == clone[j]) {
        clone.splice(j, 1);
      }
    }
  }
  return clone;
}

// Test
const arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];

console.log(unique(arr));
// output:
// [
//   1,     'true',
//   true,  15,
//   false, undefined,
//   null,  NaN,
//   NaN,   'NaN',
//   0,     'a',
//   {},    {}
// ]
