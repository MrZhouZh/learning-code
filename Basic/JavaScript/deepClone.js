/**
 * 深度拷贝
 *
 * 主要还是将引用类型进行深度遍历最终拷贝的是基本类型
 */
const deepClone = function (obj) {
  //   if (obj instanceof Object) {
  //     if (Array.isArray(obj)) {
  //       let result = [];
  //       obj.forEach((item) => result.push(item));
  //       return result;
  //     } else {
  //       let result = {};
  //       for (const k in obj) {
  //         result[k] = deepClone(obj[k]);
  //       }
  //       return result;
  //     }
  //   }

  //   return obj;

  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }

  return clone;
};

// Test
const a = { foo: "bar", obj: { a: 1, b: 2 } };
const b = deepClone(a);

a.obj.a = 2;
console.log(a);
console.log(b);
// a !== b, a.obj !== b.obj
