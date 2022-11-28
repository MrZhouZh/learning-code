/**
 * Vue@2.6.x 之前响应式原理: 结合 Object.defineProperty 的数据劫持, 以及发布订阅模式
 *  数据劫持通过递归遍历 data 中的数据, 用 Object.defineProperty 给每个属性添加 getter 和 setter.
 *  并且把 data 中的属性挂在到 Vue 实例中, 修改 Vue 实例的属性时, 就会触发 setter 向 Dep 订阅器发布更新消息.
 *  对应的 Watcher 订阅者会收到通知, 调用自身的回调函数, 让编译器更新视图
 */
const obj = {
  name: "jace",
  age: 12,
};

const p = {};
for (const key in obj) {
  Object.defineProperty(p, key, {
    get() {
      console.log(`读取 p 对象中的 ${key} 属性`);
      return obj[key];
    },
    set(val) {
      console.log(`修改 p 对象中 ${key} 属性, 值为 ${val}`);
      obj[key] = val;
    },
  });
}

console.log(p.age);
console.log(p);
