/**
 * Vue3 数据劫持: 通过 Proxy 函数对代理对象的属性进行劫持, 通过 Reflect 对象里的方法对代理对象的属性进行修改
 *
 */
const obj = {
  name: "jace",
  age: 12,
};

const p = new Proxy(obj, {
  get(target, propName) {
    console.log(`读取 p 对象中的 ${propName} 属性`);
    return Reflect.get(target, propName);
  },
  set(target, propName, value) {
    console.log(`修改 p 对象中 ${propName} 属性, 值为 ${value}`);
    Reflect.set(target, propName, value);
  },
  deleteProperty(target, propName) {
    console.log(`删除 p 对象中 ${propName} 属性`);
    return Reflect.deleteProperty(target, propName);
  },
});

console.log(p.age); // 12
p.name = "Hello jace";
console.log(p.name); // Hello jace
console.log(p); // { name: 'jace', age: 12 }
