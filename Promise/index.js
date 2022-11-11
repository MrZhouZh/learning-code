"use strict";
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["FULFILLED"] = "fulfilled";
    Status["REJECTED"] = "rejected";
})(Status || (Status = {}));
function isPromise(p) {
    return (p &&
        (typeof p === "object" || typeof p === "function") &&
        typeof p.then === "function");
}
var JPromise = /** @class */ (function () {
    function JPromise(executor) {
        this.status = Status.PENDING;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        var self = this;
        function _resolve(value) {
            if (self.status === Status.PENDING) {
                self.status = Status.FULFILLED;
                self.value = value;
                self.onFulfilledCallback.forEach(function (fn) { return fn(); });
            }
        }
        function _reject(reason) {
            if (self.status === Status.PENDING) {
                self.status = Status.REJECTED;
                self.reason = reason;
                self.onRejectedCallback.forEach(function (fn) { return fn(); });
            }
        }
        try {
            // 防止 this 丢失
            executor(_resolve, _reject);
        }
        catch (error) {
            _reject(error);
        }
    }
    JPromise.prototype.then = function (onFulfilled, onRejected) {
        var onFulfilledFn = typeof onFulfilled === "function"
            ? onFulfilled
            : function (value) { return value; };
        var onRejectedFn = typeof onRejected === "function"
            ? onRejected
            : function (reason) { throw reason; };
        var self = this;
        var promise2 = new JPromise(function (resolve, reject) {
            if (self.status === Status.FULFILLED) {
                setTimeout(function () {
                    try {
                        var x = onFulfilledFn(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }
            else if (self.status === Status.REJECTED) {
                setTimeout(function () {
                    try {
                        var x = onRejectedFn(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }
            else if (self.status === Status.PENDING) {
                // pending 状态下等到状态都确定后再按顺序执行
                // 执行回调会有 setTimeout, 这块就不加了
                self.onFulfilledCallback.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onFulfilledFn(self.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                });
                self.onRejectedCallback.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejectedFn(self.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                });
            }
        });
        return promise2;
    };
    JPromise.prototype.catch = function (onrejected) {
        return this.then(null, onrejected);
    };
    JPromise.resolve = function (value) {
        if (value instanceof JPromise) {
            return value;
        }
        return new JPromise(function (resolve, reject) {
            if (isPromise(value)) {
                setTimeout(function () {
                    value.then(resolve, reject);
                });
            }
            else {
                resolve(value);
            }
        });
    };
    JPromise.reject = function (reason) {
        return new JPromise(function (_, reject) {
            reject(reason);
        });
    };
    JPromise.prototype.finally = function (onFinally) {
        return this.then(function (value) {
            return JPromise.resolve(typeof onFinally === "function" ? onFinally() : onFinally).then(function () { return value; });
        }, function (reason) {
            return JPromise.reject(typeof onFinally === "function" ? onFinally() : onFinally).then(function () { return reason; });
        });
    };
    JPromise.all = function (values) {
        return new JPromise(function (resolve, reject) {
            var result = [];
            // 获取迭代器对象
            var iter = values[Symbol.iterator]();
            // 判断是否全部完成了
            var dones = [];
            // 获取值 { value: xxx, done: false }
            var cur = iter.next();
            // 判断迭代器是否迭代完毕同时将最后得到的值放入结果数组中
            var resolveResult = function (value, index, done) {
                result[index] = value;
                dones[index] = true;
                if (done && dones.every(function (item) { return item; })) {
                    resolve(result);
                }
            };
            var _loop_1 = function (i) {
                var value = cur.value;
                dones.push(false);
                cur = iter.next();
                if (isPromise(value)) {
                    value.then(function (v) {
                        resolveResult(v, i, cur.done);
                    }, reject);
                }
                else {
                    resolveResult(value, i, cur.done);
                }
            };
            for (var i = 0; !cur.done; i++) {
                _loop_1(i);
            }
        });
    };
    JPromise.race = function (values) {
        return new JPromise(function (resolve, reject) {
            var iter = values[Symbol.iterator]();
            var cur = iter.next();
            while (!cur.done) {
                var value = cur.value;
                cur = iter.next();
                if (isPromise(value)) {
                    value.then(resolve, reject);
                }
                else {
                    // 普通值
                    resolve(value);
                }
            }
        });
    };
    JPromise.allSettled = function (values) {
        return new JPromise(function (resolve) {
            var result = [];
            var dones = [];
            var iter = values[Symbol.iterator]();
            var cur = iter.next();
            var resolveResult = function (value, index, done) {
                result[index] = {
                    status: Status.FULFILLED,
                    value: value
                };
                dones[index] = true;
                if (done && dones.every(function (item) { return item; })) {
                    resolve(result);
                }
            };
            var _loop_2 = function (i) {
                var value = cur.value;
                dones.push(false);
                cur = iter.next();
                if (isPromise(value)) {
                    value.then(function (v) {
                        resolveResult(v, i, cur.done);
                    }, function (reason) {
                        result[i] = {
                            status: Status.REJECTED,
                            reason: reason
                        };
                        dones[i] = true;
                        if (cur.done && dones.every(function (item) { return item; })) {
                            resolve(result);
                        }
                    });
                }
                else {
                    // 不是 thenable 直接存储
                    resolveResult(value, i, cur.done);
                }
            };
            for (var i = 0; !cur.done; i++) {
                _loop_2(i);
            }
        });
    };
    JPromise.any = function (values) {
        return new JPromise(function (resolve, reject) {
            var iter = values[Symbol.iterator]();
            var cur = iter.next();
            var dones = [];
            var _loop_3 = function (i) {
                var value = cur.value;
                cur = iter.next();
                dones.push(false);
                if (isPromise(value)) {
                    value.then(resolve, function () {
                        dones[i] = true;
                        if (cur.done && dones.every(function (item) { return item; })) {
                            var e = new Error("All promises were rejected.");
                            e.stack = "";
                            reject(e);
                        }
                    });
                }
                else {
                    resolve(value);
                }
            };
            for (var i = 0; !cur.done; i++) {
                _loop_3(i);
            }
        });
    };
    return JPromise;
}());
function resolvePromise(promise2, x, resolve, reject) {
    // 不能引用同一个对象, 不然会无限循环
    if (promise2 === x) {
        reject(new TypeError("Chaining cycle detected for promise #<JPromise>"));
    }
    if (x && typeof x === "object" || typeof x === "function") {
        var called_1 = false;
        try {
            var then = x.then;
            if (typeof then === "function") {
                then.call(x, function (y) {
                    if (called_1)
                        return;
                    called_1 = true;
                    // 如果是 Promise, 递归获取到最终状态的值
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called_1)
                        return;
                    called_1 = true;
                    reject(r);
                });
            }
            else {
                // 不是 Promise, 当做普通值处理
                if (called_1)
                    return;
                called_1 = true;
                resolve(x);
            }
        }
        catch (err) {
            if (called_1)
                return;
            called_1 = true;
            reject(err);
        }
    }
    else {
        resolve(x);
    }
}
// @ts-ignore
JPromise.defer = JPromise.deferred = function () {
    var dfd = {};
    dfd.promise = new JPromise(function (resovle, reject) {
        dfd.resolve = resovle;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = JPromise;
