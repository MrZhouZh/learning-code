/**
 * 实现 instanceof
 * 
 * 实现原理: 只要右边变量的 prototype 在左边变量的原型链(__proto__)上即可
 */
const implementInstanceOf = function(L, R) {
    // while 循环
    // if (L === null || typeof L !== 'object') return false

    // let LProto = L.__proto__
    // while(LProto) {
    //     if (LProto === R.prototype) return true
    //     LProto = LProto.__proto__
    // }

    // return false


    // 递归
    if (L === null || typeof L !== 'object') return false
    if (!R.prototype) throw Error

    if (Object.getPrototypeOf(L) === R.prototype) return true

    return implementInstanceOf(Object.getPrototypeOf(L), R)
}

class A {}
class B extends A {}

const b = new B()
console.log(implementInstanceOf(b, B))   // true
console.log(implementInstanceOf(b, A))   // true
console.log(implementInstanceOf(b, Object))   // true

function C() {}
console.log(implementInstanceOf(b, C))   // false
C.prototype = B.prototype
console.log(implementInstanceOf(b, C))   // true
C.prototype = {}
console.log(implementInstanceOf(b, C))   // false
