/**
 * 实现 new
 * refs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
 *
 *
 * 实现原理:
 *  创建一个新的空对象
 *  将对象的原型设置为函数的 prototype 对象.
 *  让函数的 this 指向这个对象, 执行构造函数的代码
 *  判断函数的返回值类型, 值类型返回创建的对象; 引用类型返回这个引用类型的对象
 */
const implementNew = (constructor, ...args) => {
  const that = Object.create(constructor.prototype);
  const obj = constructor.apply(that, args);
  if (obj && typeof obj === "object") {
    return obj;
  } else {
    return that;
  }
};

function Car() {}

const car1 = implementNew(Car);
const car2 = implementNew(Car);

console.log(car1.year); // undefined
Car.prototype.year = "1990";
car1.year = "1993";
console.log(car1.year); // '1993'
console.log(car2.year); // '1990'
