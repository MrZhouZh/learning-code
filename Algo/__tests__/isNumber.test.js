const isNumber = require('../isNumber')
// * 部分有效数字列举如下：["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]
// * 部分无效数字列举如下：["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]

describe('algo isNumber tesst', () => {
    test('it will be true when s is equals 0', () => {
        expect(isNumber('0')).toBeTruthy()
    })

    test('it will be false when s\'value is "e"', () => {
        expect(isNumber('e')).toBeFalsy()
    })

    test('it will be false when s\'value is "."', () => {
        expect(isNumber('.')).toBeFalsy()
    })

    test('it will be true when s\'value is "0089"', () => {
        expect(isNumber('0089')).toBeTruthy()
    })

    test('it will be false when s\'value is "95a54e53"', () => {
        expect(isNumber('95a54e53')).toBeFalsy()
    })

    test('it will be true when s\'value is "-123.456e789"', () => {
        expect(isNumber('-123.456e789')).toBeTruthy()
    })

    test('it will be true when s\'value is "-123."', () => {
        expect(isNumber('-123.')).toBeTruthy()
    })

    test('it will be false when s\'value is "-+3"', () => {
        expect(isNumber('-+3')).toBeFalsy()
    })

    test('it will be false when s\'value is " "', () => {
        expect(isNumber(' ')).toBeFalsy()
    })

    test('it will be false when s\'value is "12313.0xefa122"', () => {
        expect(isNumber('12313.0xefa122')).toBeFalsy()
    })

    // 如果使用的是职责链的方式, 则该规则有效
    test('it will be false when s\'value is "0xefa122"', () => {
        expect(isNumber('0xefa122')).toBeFalsy()
    })

    test('it will be true when s\'value is "0x"', () => {
        expect(isNumber('0x')).toBeTruthy()
    })

    test('it will be false when s\'value is "90 E 3"', () => {
        expect(isNumber('90 E 3')).toBeFalsy()
    })

    test('it will be false when s\'value is " E 312"', () => {
        expect(isNumber(' E 312')).toBeFalsy()
    })

    test('it will be false when s\'value is "123E"', () => {
        expect(isNumber('123E')).toBeFalsy()
    })

    test('it will be false when s\'value is "123E 1221y"', () => {
        expect(isNumber('123E 1221y')).toBeFalsy()
    })

    test('it will be false when s\'value is "123E1221y"', () => {
        expect(isNumber('123E1221y')).toBeFalsy()
    })
})
