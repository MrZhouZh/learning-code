const descartes = require('../descartes')

// import descartes from '../descartes'


const colors = ["黑色", "白色"],
    length = ["长款", "短款"],
    material = ["棉质", "涤纶"],
    sizes = ["S", "M", "L"];

describe('generate descartes', () => {
    test('generate two-dimensional array', () => {
        const res = descartes([colors, length, material, sizes]);
        expect(res[0]).toContain('黑色')
        expect(res[0]).toContain('长款')
        expect(res[0]).toContain('棉质')
        expect(res[0]).toContain('S')
        expect(res[0]).toHaveLength(4)
    })
})

// const res = descartes([colors, length, material, sizes]);

// console.log(res, '-- descartes res')

// output:
// [
//   [ '黑色', '长款', '棉质', 'S' ],
//   [ '黑色', '长款', '棉质', 'M' ],
//   [ '黑色', '长款', '棉质', 'L' ],
//   [ '黑色', '长款', '涤纶', 'S' ],
//   [ '黑色', '长款', '涤纶', 'M' ],
//   [ '黑色', '长款', '涤纶', 'L' ],
//   [ '黑色', '短款', '棉质', 'S' ],
//   [ '黑色', '短款', '棉质', 'M' ],
//   [ '黑色', '短款', '棉质', 'L' ],
//   [ '黑色', '短款', '涤纶', 'S' ],
//   [ '黑色', '短款', '涤纶', 'M' ],
//   [ '黑色', '短款', '涤纶', 'L' ],
//   [ '白色', '长款', '棉质', 'S' ],
//   [ '白色', '长款', '棉质', 'M' ],
//   [ '白色', '长款', '棉质', 'L' ],
//   [ '白色', '长款', '涤纶', 'S' ],
//   [ '白色', '长款', '涤纶', 'M' ],
//   [ '白色', '长款', '涤纶', 'L' ],
//   [ '白色', '短款', '棉质', 'S' ],
//   [ '白色', '短款', '棉质', 'M' ],
//   [ '白色', '短款', '棉质', 'L' ],
//   [ '白色', '短款', '涤纶', 'S' ],
//   [ '白色', '短款', '涤纶', 'M' ],
//   [ '白色', '短款', '涤纶', 'L' ]
// ] -- descartes res
