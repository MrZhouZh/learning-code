/**
 * refs: https://leetcode.cn/problems/valid-number/
 *
 * 65. 有效数字
 * 有效数字（按顺序）可以分成以下几个部分：
 * 1. 一个 小数 或者 整数
 * 2.（可选）一个 'e' 或 'E' ，后面跟着一个 整数
 * 
 * 小数（按顺序）可以分成以下几个部分：
 * 1.（可选）一个符号字符（'+' 或 '-'）
 * 2. 下述格式之一：
 *   1. 至少一位数字，后面跟着一个点 '.'
 *   2. 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
 *   3. 一个点 '.' ，后面跟着至少一位数字
 * 
 * 整数（按顺序）可以分成以下几个部分：
 * 1.（可选）一个符号字符（'+' 或 '-'）
 * 2. 至少一位数字
 * 
 * 部分有效数字列举如下：["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]
 * 部分无效数字列举如下：["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]
 * 给你一个字符串 s ，如果 s 是一个 有效数字 ，请返回 true 。
 *
 * 输入：s = "0"
 * 输出：true
 * 
 * 输入：s = "e"
 * 输出：false
 * 
 * 输入：s = "."
 * 输出：false
 * 
 */
const Chain = require('../Design-pattern/Chain-of-responsibility/chain-of-responsibility.leetcode65')

function preProcessing(v) {
    let value = v.trim()
    if (value.startsWith('+') || value.startsWith('-')) {
        value = value.substring(1)
    }

    return value
}

// 整数
function isInteger(integer) {
    const _integer = preProcessing(integer)
    if (!_integer) return false
    for (let i = 0, len = _integer.length; i < len; i++) {
        if (!/[0-9]/.test(_integer.charAt(i))) {
            return false
        }   
    }

    return true
}

// 浮点数
function isFloat(floatNum) {
    const _floatNum = preProcessing(floatNum)
    if (!_floatNum) return false

    const pos = _floatNum.indexOf('.')

    if (pos === -1) return false

    if (_floatNum.length === 1) return false

    function checkPart(part) {
        if (part === '') return true

        if (
            !/[0-9]/.test(part.charAt(0)) ||
            !/[0-9]/.test(part.charAt(part.length - 1))
        ) {
            return false
        }

        if (!isInteger(part)) {
            return false
        }

        return true
    }

    const beforeVal = _floatNum.substring(0, pos)
    const afterVal = _floatNum.substring(pos + 1, _floatNum.length)

    if (checkPart(beforeVal) && checkPart(afterVal)) return true

    return false
}


// 科学计数法
function isScienceFormat(str) {
    const _str = preProcessing(str)
    if (!_str) return false

    const strLowerCase = _str.toLowerCase()
    let pos = strLowerCase.indexOf('e')
    if (pos === -1) return false
    if (strLowerCase.length === 1) return false

    function checkHeadAndEndForSpace(part) {
        if (part.startsWith(' ') || part.endsWith(' ')) return false
        return true
    }

    function validatePartrBeforeE(first) {
        if (!first) return false
        if (!checkHeadAndEndForSpace(first)) return false
        if(!isInteger(first) && !isFloat(first)) return false

        return true
    }

    function validatePartAfterE(second) {
        if (!second) return false
        if (!checkHeadAndEndForSpace(second)) return false
        if (!isInteger(second)) return false

        return true
    }

    const beforeVal = strLowerCase.substring(0, pos)
    const afterVal = strLowerCase.substring(pos + 1, strLowerCase.length)

    if (!validatePartrBeforeE(beforeVal) || !validatePartAfterE(afterVal)) return false

    return true
}

// 十六进制
function isHex(hex) {
    // const _hex = preProcessing(hex)
    // if (!_hex) return false
    // let hexLowerCase = _hex.toLowerCase()

    // function isValidChar(c) {
    //     const validChar = ['a', 'b', 'c', 'd', 'e', 'f']
    //     for (let i = 0, len = validChar.length; i < len; i++) {
    //         if (c === validChar[i]) return true
    //     }
    //     return false
    // }

    // if (hexLowerCase.startsWith('0x')) {
    //     hexLowerCase = hexLowerCase.substring(2)
    // } else {
    //     return false
    // }

    // for (let i = 0, len = hexLowerCase.length; i < len; i++) {
    //     if (!/[0-9]/.test(hexLowerCase.charAt(0)) && !isValidChar(hexLowerCase.charAt(i))) return false
    // }

    // return true

    function isValidChar(c) {
        const validChar = ["a", "b", "c", "d", "e", "f"];
        for (let i = 0; i < validChar.length; i++) {
            if (c === validChar[i]) {
                return true;
            }
        }

        return false;
    }
    hex = preProcessing(hex);
    if (!hex) {
        return false;
    }
    hex = hex.toLowerCase();
    if (hex.startsWith("0x")) {
        hex = hex.substring(2);
    } else {
        return false;
    }

    for (let i = 0; i < hex.length; i++) {
        if (!/[0-9]/.test(hex.charAt(0)) && !isValidChar(hex.charAt(i))) {
            return false;
        }
    }

    return true;
}

const isNumber = (s) => {
    const isIntegerHandler = new Chain(isInteger)
    const isFloatHandler = new Chain(isFloat)
    const isScienceFormatHandler = new Chain(isScienceFormat)
    const isHexHandler = new Chain(isHex)
    isIntegerHandler
        .setNext(isFloatHandler)
        .setNext(isScienceFormatHandler)
        .setNext(isHexHandler)

    return isIntegerHandler.passRequest(s)

    // 摘自: https://leetcode.cn/problems/valid-number/solution/biao-qu-dong-fa-by-user8973/
    // 有限状态机
    // let state = 0,
    //     finals = [0, 0, 0, 1, 0, 1, 1, 0, 1],
    //     transfer = [
    //         [0, 1, 6, 2, -1, -1],
    //         [-1, -1, 6, 2, -1, -1],
    //         [-1, -1, 3, -1, -1, -1],
    //         [8, -1, 3, -1, 4, -1],
    //         [-1, 7, 5, -1, -1, -1],
    //         [8,-1, 5,-1, -1, -1],
    //         [8, -1, 6, 3, 4, -1],
    //         [-1, -1, 5, -1, -1, -1],
    //         [8, -1, -1, -1, -1, -1]
    //     ],
    //     make = (c) => {
    //         switch (c) {
    //             case ' ': return 0;
    //             case '+':
    //             case '-': return 1;
    //             case '.': return 3;
    //             case 'e': return 4;
    //             default:
    //                 let code = c.charCodeAt();
    //                 if (code >= 48 && code <= 57) {
    //                     return 2
    //                 } else {
    //                     return 5
    //                 }
    //         }
    //     }
    // for (let i = 0, len = s.length; i < len; i++) {
    //     state = transfer[state][make(s[i])]
    //     if (state < 0) return false
    // }

    // return finals[state]
}

module.exports = isNumber
