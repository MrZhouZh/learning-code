/**
 * 深度拷贝
 *
 * 主要还是将引用类型进行深度遍历最终拷贝的是基本类型
 */
const deepClone = function (obj) {
  if (obj instanceof Object) {
    if (Array.isArray(obj)) {
      let result = [];
      obj.forEach((item) => result.push(item));
      return result;
    } else {
      let result = {};
      for (const k in obj) {
        result[k] = deepClone(obj[k]);
      }
      return result;
    }
  }

  return obj;
};
