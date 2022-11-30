let n = 0;
const bubbleSort = function (arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    for (let j = i; j > 0; j--) {
      n++;
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }
  return arr;
};

// Test
console.log(bubbleSort([1, 3, 4, 2]));
// output: [1, 2, 3, 4]
