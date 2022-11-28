/**
 * 实现打乱数组顺序
 *
 * 实现思路:
 *  取出数组的第一个元素, 随机产生一个索引值, 将该第一个元素和这个索引对应的元素进行交换
 *  第二次去除数组第二个元素, 随机产生了一个除索引为 1 之外的索引值, 并将第二个元素与该索引值对应的元素进行交换
 *  循环遍历完成
 */
const randomOrder = function (arr) {
  let clone = arr.slice(0);
  for (let i = 0, len = clone.length; i < len; i++) {
    const randomIdx = Math.round(Math.random() * (len - 1 - i)) + i;
    // 与随机产生的索引值位置交换
    [clone[i], clone[randomIdx]] = [clone[randomIdx], clone[i]];
  }

  return clone;
};

let arr = [1, 2, 3, 4, 5, 6];
console.log(randomOrder(arr));
// output: [ 6, 3, 5, 2, 1, 4 ]
