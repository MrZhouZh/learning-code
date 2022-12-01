/**
 * 插入排序
 */
const insertSort = function (arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    let j = i - 1;
    if (arr[i] < arr[j]) {
      let temp = arr[i];
      while (j >= 0 && temp < arr[j]) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
    }
  }

  return arr;
};

// Test
console.log(insertSort([1, 3, 4, 2]));
