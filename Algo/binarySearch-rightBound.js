/**
 * 二分法查找右边界
 *
 *
 */
const binarySearchRightBound = function (nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    const mid = left + ((right - left) >> 1) + 1;
    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }

  return nums[right] === target ? right : -1;
};

// Test
const nums = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 6];
const target = 5;

console.log(binarySearchRightBound(nums, target)); // 9
