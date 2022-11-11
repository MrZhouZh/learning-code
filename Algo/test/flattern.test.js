const flattern = require("../flattern");

const arr = [1, [2, [3, 4], 5], 6, [7, 8], 9, [{ a: 1 }, [{ aa: 1 }]]];
const ret = flattern(arr);

console.log(ret, "-- ret");
// output:
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, { a: 1 }, { aa: 1 } ] -- ret
