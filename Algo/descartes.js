/**
 * 笛卡尔积
 *
 * 应用场景: SKU 选择器
 */
const descartes = function (skuAttrs = []) {
  if (skuAttrs.length < 2) return skuAttrs[0] || [];
  // 暴力法
  return skuAttrs.reduce((total, current) => {
    const res = [];
    total.forEach((t) => {
      current.forEach((c) => {
        const temp = Array.isArray(t) ? [...t] : [t];
        temp.push(c);
        res.push(temp);
      });
    });

    return res;
  });
};

module.exports = descartes;
// export default descartes;
