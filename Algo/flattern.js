const flattern = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? flattern(v) : v)));

module.exports = flattern;
