class Emitter {
    constructor() {
        this.emits = {}
    }

    on(emitName, callback) {
        if (!this.emits[emitName]) {
            this.emits[emitName] = []
        }

        if (this.emits[emitName].includes(callback)) {
            // 事件重复注册
        } else {
            this.emits[emitName].push({
                handler: callback
            })
        }
    }

    once(emitName, callback) {
        if (!this.emits[emitName]) {
            this.emits[emitName] = []
        }

        this.emits[emitName].push({
            handler: callback,
            once: true
        })
    }

    emit(emitName, ...args) {
        if (!this.emits[emitName]) return
        this.emits[emitName].forEach((item, index) => {
            item.handler(...args)

            if(item.once) {
                this.emits[emitName].splice(index, 1)
            }
        })
    }

    off(emitName, callback) {
        if (this.emits[emitName]) {
            if (callback && callback instanceof Function && this.emits[emitName].includes(callback)) {
                this.emits[emitName] = this.emits[emitName].filter((v) => v.handler !== callback)
            } else {
                delete this.emits[emitName]
            }
        }
    }
}