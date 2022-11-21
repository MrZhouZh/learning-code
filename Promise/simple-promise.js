/**
 * 简版 Promise
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isPromise = p =>
    p &&
    (typeof p === 'object' || typeof p === 'function') && 
    typeof p.then === 'function'

class JPromise {
    constructor(executor) {
        this.status = PENDING
        this.onFulfilledCallback = []
        this.onRejectedCallback = []
        function _resolve(value) {
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
                this.onFulfilledCallback.forEach(function(fn) {
                    return fn()
                })
            }
        }

        function _rejected(reason) {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCallback.forEach(function(fn) {
                    return fn()
                })
            }
        }
        try {
            // 防止 this 指针丢失
            executor(_resolve.bind(this), _rejected.bind(this))
        } catch(err) {
            _rejected(err)
        }
    }

    then(onFulfilled, onRejected) {
        const onFullfilledFn = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }
        const self = this
        const promise2 = new JPromise((resolve, reject) => {
            if (self.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFullfilledFn(self.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                });
            } else if (self.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejectedFn(self.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                });
            } else if (self.status === PENDING) {
                self.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFullfilledFn(self.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    })
                })

                self.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejectedFn(self.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    })
                })
            }
        })

        return promise2
    }

    resolve(value) {
        if (value instanceof JPromise) return value
        return new JPromise((resolve, reject) => {
            if (isPromise(value)) {
                setTimeout(() => {
                   value.then(resolve, reject)
                });
            } else {
                resolve(value)
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    // reject(reason) {
    //     return new JPromise((_, reject) => {
    //         reject(reason)
    //     })
    // }

    finally(onFinally) {
        return this.then(
            (value) => JPromise.resolve(
                typeof onFinally === 'function' ? onFinally() : onFinally
            ).then(() => value),
            (reason) => JPromise.resolve(
                typeof onFinally === 'function' ? onFinally() : onFinally
            ).then(() => { throw reason })
        )
    }

    static all(promises) {
        return new JPromise((resolve, reject) => {
            let index = 0,
                result = []
            
            function processValue(i, value) {
                result[i] = value
                if (++index === promises.length) {
                    resolve(result)
                }
            }

            if (promises.length === 0) {
                resolve(result)
            } else {
                for (let i = 0, len = promises.length; i < len; i++) {
                    JPromise.resolve(promises[i]).then(
                        value => {
                            processValue(i, value)
                        },
                        reason => {
                            reject(reason)
                            return
                        }
                    )
                    
                }
            }
        })
    }

    static any(promises) {
        return new JPromise((resolve, reject) => {
            let count = 0,
                result = []
            
            function processReason(i, reason) {
                result[i] = reason
                if (++count === promises.length) {
                    return reject(result)
                }
            }

            if (promises.length === 0) {
                resolve(result)
                return
            }

            for (let i = 0, len = promises.length; i < len; i++) {
                JPromise.resolve(promises[i]).then(
                    value => {
                        resolve(value)
                    },
                    reason => {
                        processReason(i, reason)
                    }
                )
            }
        })
    }

    static race(promises) {
        return new JPromise((resolve, reject) => {
            for (let i = 0, len = promises.length; i < len; i++) {
                JPromise.resolve(promises[i]).then(
                    value => {
                        resolve(value)
                        return
                    },
                    reason => {
                        reject(reason)
                        return
                    }
                )
            }
        })
    }

    static allSettled(promises) {
        return new JPromise((resolve) => {
            let count = 0,  result = []
            // 如果为空
            if (promises.length === 0) {
                resolve(result)
                return
            }
            function processRes(i, res, isFulfilled) {
                result[i] = {
                  status: isFulfilled ? FULFILLED : REJECTED,
                  [isFulfilled ? 'value': 'reason']: res
                }
                if (++count === promises.length) {
                  resolve(result)
                }
            }
            for (let i = 0, len = promises.length; i < len; i++) {
                Promise.resolve(promise[i]).then(
                    value => processRes(i, value, true),
                    reason => processRes(i, reason, false)
                )
            }
        })
    }

}

function resolvePromise(promise2, x, resolve, reject) {
    let self = this;
    if (promise2 === x) {
        reject(new TypeError(`Chaining cycle detected for promise #<JPromise>`));
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
        let used = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(
                    x,
                    (y) => {
                        if (used) return;
                        used = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    (r) => {
                        if (used) return;
                        used = true;
                        reject(r);
                    }
                );
            } else {
                if (used) return;
                used = true;
                resolve(x);
            }
        } catch (e) {
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}


JPromise.defer = JPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new JPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
  
    return dfd;
};

module.exports = JPromise
