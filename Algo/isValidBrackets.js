/**
 * 检查括号是否有效
 *
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 * 3. 每个右括号都有一个对应的相同类型的左括号。
 *
 * https://leetcode.cn/problems/valid-parentheses/
 *
 * 输入：s = "()"
 * 输出：true
 *
 * 输入：s = "()[]{}"
 * 输出：true
 *
 * 输入：s = "(]"
 * 输出：false
 */
const isValidBrackets = function (str = "") {
  // 奇数的情况下肯定是无效的
  if (str.length % 2 === 1) return false;

  const map = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  const stack = [];
  // const len = str.length
  for (const char of str) {
    if (map[char]) {
      stack.push(char);
      console.log(stack);
    } else {
      if (stack.length === 0 || char !== map[stack.pop()]) {
        return false;
      }
    }
  }

  return !stack.length;
};

// Test
// const str = '([)]'   // false
// const str = '{[]}'  // true
const str = "{]()}[}[{])(()"; // false
console.log(isValidBrackets(str));
