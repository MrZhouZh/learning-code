/**
 * 寄生组合式继承 (Parasitic Combination Inheritance)
 *
 * 实现原理: 使用寄生式继承来继承父类原型, 然后将返回的新对象赋值给子类原型
 */
function inheritPrototype(subType, superType) {
  let prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "black", "blue"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);

  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
};
