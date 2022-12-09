/**
 * 二分查找
 * 只能在升序的数组中使用
 *
 * 实现原理:
 *
 */
const binarySearch = function (nums, target) {
  if (nums.length === 0) return -1;
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    // let mid = left + Math.floor((right - left) / 2);
    let mid = left + ((right - left) >> 1);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  return -1;
};

// Test
const nums = [1, 2, 3, 4, 5, 6];
const target = 5;
const res = binarySearch(nums, target);

console.log(res); // 4
