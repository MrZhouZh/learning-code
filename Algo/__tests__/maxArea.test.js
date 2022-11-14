const maxArea = require('../maxArea')

describe('algo maxArea tesst', () => {
    test('it will be equals 49', () => {
        const data = [1, 8, 6, 2, 5, 4, 8, 3, 7]
        expect(maxArea(data)).toBe(49)
    })

    test('it will be equals 1', () => {
        const data = [1, 1]
        expect(maxArea(data)).toBe(1)
    })
})
