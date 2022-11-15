/**
 * 职责链模式
 * 
 * 定义: 使多个对象都有机会处理请求, 从而避免请求的发送者和接收者之间的耦合关系, 将这些对象连成一条链, 并沿着这条链传递该请求, 直到有个对象处理它为止
 * 
 * 请求 -> A -> B -> C -> D
 * 
 * 优点:
 * 1. 灵活拆分重组节点, 耦合性低
 * 2. 处理函数各不影响, 相互隔离
 * 3. 可手动指定起始节点
 * 
 * 缺点:
 * 1. 不能保证某个请求都会被链中的节点处理, 需要增加一个兜底的节点处理
 * 2. 从性能方面考虑, 需要避免过长的职责链带来的性能损耗
 * 
 * 例子: 假设负责一个售卖手机的电商网站, 经过分别交纳 500 元定金和 200 元定金的两轮预定后(订单已在此时生成), 现在处于正式购买阶段. 公司针对支付过定金的用户有一定的优惠政策.
 * 正式购买之后, 
 * 已经支付过 500 元定金的用户会收到 100 元商城优惠券,
 * 200 元定金的用户会收到 50 元商城优惠券
 * 没支付定金的则进入普通购买模式, 没有优惠券, 而且在库存有限的情况下不一定保证能买到
 * 
 */

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

class Chain {
    constructor(fn) {
        this.fn = fn
        this.successor = null
    }

    setNextSuccessor(successor) {
        return this.successor = successor
    }

    passRequest() {
        const ret = this.fn.apply(this, arguments)
        if (ret === 'nextSuccessor') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments)
        }

        return ret
    }

    // 处理异步
    next() {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
}

const chainOrder500 = new Chain(order500)
const chainOrder200 = new Chain(order200)
const chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200).setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500) // 500元定金预购, 得到100优惠券
chainOrder500.passRequest(2, true, 500) // 200元定金预购, 得到50优惠券
chainOrder500.passRequest(3, true, 500) // 普通购买, 无优惠券
chainOrder500.passRequest(1, false, 0)  // 手机库存不足

// 异步
const fn1 = new Chain(function() {
    console.log(1);
    return `nextSuccessor`
})

const fn2 = new Chain(function() {
    console.log(2);
    const self = this
    setTimeout(function() {
        self.next()
    }, 1000);
})

const fn3 = new Chain(function() {
    console.log(3);
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)

fn1.passRequest()


