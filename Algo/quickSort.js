/**
 * 快速排序(二分排序)
 *
 * 实现原理: 选择一个 "中轴", 所有小于 "中轴" 的移动到 "中轴" 的左侧, 大于则移动到右侧
 */
const quickSort = function (arr) {
  if (arr.length === 0) return [];

  // const mid = Math.floor(arr.length / 2)
  const pivotIndex = arr.length >> 1;
  const pivot = arr.splice(pivotIndex, 1)[0];

  const left = [],
    right = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
};

// Test
const arr = [76, 123, 21, 34, 55, 98];

console.log(quickSort(arr)); // [ 21, 34, 55, 76, 98, 123 ]
