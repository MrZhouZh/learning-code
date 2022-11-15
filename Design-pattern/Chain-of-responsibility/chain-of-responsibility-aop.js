/**
 * AOP 实现职责链
 * 
 * 修改 Function 原型链
 */
Function.prototype.after = function(fn) {
    const self = this
    return function() {
        let ret = self.apply(this, arguments)
        if (ret === 'nextSuccessor') {
            return fn.apply(this, arguments)
        }

        return ret
    }
}

const order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log(`500元定金预购, 得到100优惠券`)
    } else {
        return 'nextSuccessor'
    }
}

const order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log(`200元定金预购, 得到50优惠券`)
    } else {
        return 'nextSuccessor'
    }
}

const orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log(`普通购买, 无优惠券`)
    } else {
        console.log(`手机库存不足`)
    }
}

const order = order500.after(order200).after(orderNormal)

order(1, true, 500)     // 500元定金预购, 得到100优惠券
order(2, true, 500)     // 200元定金预购, 得到50优惠券
order(3, false, 500)    // 普通购买, 无优惠券
