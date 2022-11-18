/**
 * 职责链处理不同情况
 */
class Chain {
    constructor(fn) {
        this.handler = fn
        this.next = null
    }

    setNext(h) {
        this.next = h
        return h
    }

    passRequest(...args) {
        const ret = this.handler.apply(this, args)
        // 提前结束
        if (ret) return ret

        // 向后传递
        if(this.next) {
            return this.next.passRequest.apply(this.next, args)
        }

        return ret
    }
}

module.exports = Chain
