/**
 * 实现 Object.create
 * refs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 *
 * 实现原理: 将传入的对象作为原型
 */
const implementCreate = function (obj) {
  function F() {}
  F.prototype = obj;
  return new F();
};

const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = implementCreate(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// output: "My name is Matthew. Am I human? true"
