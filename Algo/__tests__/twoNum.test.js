const twoNum = require('../twoSum')

describe('algo twoNum test', () => {
    test('it will be equals ', () => {
        const nums = [2,7,11,15],
            target = 9

        expect(twoNum(nums, target)).toContain(0)
        expect(twoNum(nums, target)).toContain(1)
    })
})
