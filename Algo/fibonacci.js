/**
 * 斐波那契数列
 *
 */
const fibonacci = function (n, sum1 = 1, sum2 = 1) {
  // 普通递归
  //    if (n <= 1) return 1
  //    return fibonacci(n - 1) + fibonacci(n - 2)

  // 尾递归
  if (n <= 1) return sum2;
  return fibonacci(n - 1, sum2, sum1 + sum2);
};

// Test
console.log(fibonacci(10)); // 89
console.log(fibonacci(100)); // 573147844013817200000
console.log(fibonacci(1000)); // 7.0330367711422765e+208
