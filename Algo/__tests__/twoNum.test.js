const twoNum = require('../twoSum')

describe('algo twoNum test', () => {
    test('it will be equals [0, 1]', () => {
        const nums = [2,7,11,15],
            target = 9

        expect(twoNum(nums, target)).toContain(0)
        expect(twoNum(nums, target)).toContain(1)
    })

    test('it will be return empty array', () => {
        const nums = [2,7,11,15],
            target = 19

        expect(twoNum(nums, target)).toHaveLength(0)
    })
})
