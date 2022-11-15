const flattern = require("../flattern");

const arr = [1, [2, [3, 4], 5], 6, [7, 8], 9, [{ a: 1 }, [{ aa: 1 }]]];

describe('flattern array', () => {
    test('all flat, contains object', () => {
        const ret = flattern(arr);
        expect(ret[2]).toBe(3)
        expect(ret[ret.length - 1]['aa']).toBe(1)
        expect(ret).toHaveLength(11)
    })
})

// const ret = flattern(arr);
// console.log(ret, "-- ret");

// output:
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, { a: 1 }, { aa: 1 } ] -- ret
