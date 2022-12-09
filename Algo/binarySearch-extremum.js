/**
 * 二分法查找极值
 *
 *
 */
const indexOf = function (nums, target) {
  //   let nIndex = 0,
  //     tIndex = 0,
  //     nLen = nums.length,
  //     tLen = target.length;

  //   while (nIndex < nLen && tIndex < tLen) {
  //     if (nums[nIndex] === target[tIndex]) {
  //       tIndex++;
  //       nIndex++;
  //     } else {
  //       nIndex = nIndex - tIndex + 1;
  //       tIndex = 0;
  //     }
  //   }

  //   return tIndex === tLen ? (tLen > 1 ? nIndex - tLen : nIndex - 1) : -1;

  // 第二种
  const reg = new RegExp(`${b}`, "gi");
  const c = reg.exec(nums);
  return c ? c.index : -1;
};

const a = "abcdefghijkl";
const b = "ghi";

console.log(indexOf(a, b));
