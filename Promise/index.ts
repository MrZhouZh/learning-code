enum Status {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}

type TResolve<T> = (value: T | PromiseLike<T>) => void;
type TReject = (reason?: any) => void;
type TExecutor<T> = (resolve: TResolve<T>, reject: TReject) => void;
type TOnFulfilled<T, TResult1> =
    | ((value: T) => TResult1 | PromiseLike<TResult1>)
    | undefined
    | null;
type TOnRejected<TResult2> =
    | ((reason: any) => TResult2 | PromiseLike<TResult2>)
    | undefined
    | null;
type TOnFinally = (() => void) | undefined | null;

function isPromise(p: any): p is PromiseLike<any> {
    return (
        p &&
        (typeof p === "object" || typeof p === "function") &&
        typeof p.then === "function"
    );
}

class JPromise<T> {
    status = Status.PENDING;
    private value!: T;
    private reason?: any;
    private onFulfilledCallback: (() => void)[] = [];
    private onRejectedCallback: (() => void)[] = [];
  
    constructor(executor: TExecutor<T>) {
        const self = this
        function _resolve(value: T | PromiseLike<T>) {
            if (self.status === Status.PENDING) {
                self.status = Status.FULFILLED
                self.value = value as T
                self.onFulfilledCallback.forEach((fn) => fn())
            }
        }

        function _reject(reason: any) {
            if (self.status === Status.PENDING) {
              self.status = Status.REJECTED;
              self.reason = reason;
              self.onRejectedCallback.forEach((fn) => fn());
            }
        }
        try {
            // 防止 this 丢失
            executor(_resolve, _reject);
        } catch (error) {
            _reject(error);
        }
    }

    public then<TResult1 = T, TResult2 = never>(
        onFulfilled?: TOnFulfilled<T, TResult1>,
        onRejected?: TOnRejected<TResult2>
    ): JPromise<TResult1 | TResult2> {
        const onFulfilledFn =
            typeof onFulfilled === "function"
                ? onFulfilled
                : (value: T | TResult1) => value as TResult1;
        const onRejectedFn =
            typeof onRejected === "function"
                ? onRejected
                : (reason: any) => { throw reason; };
        const self = this
        const promise2 = new JPromise<TResult1 | TResult2>((resolve, reject) => {
            if (self.status === Status.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilledFn(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                });
            } else if (self.status === Status.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejectedFn(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                });
            } else if (self.status === Status.PENDING) {
                // pending 状态下等到状态都确定后再按顺序执行
                // 执行回调会有 setTimeout, 这块就不加了
                self.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilledFn(self.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    })
                });
                self.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejectedFn(self.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    })
                });
            }
        });
    
        return promise2;
    }

    public catch<TResult = never>(
        onrejected?: TOnRejected<TResult>
    ): JPromise<T | TResult> {
        return this.then(null, onrejected)
    }

    static resolve(): JPromise<void>;
    static resolve<T>(value: T | PromiseLike<T>): JPromise<T>
    static resolve<T>(value?: T | PromiseLike<T>): JPromise<T> {
        if (value instanceof JPromise) {
            return value
        }
        return new JPromise((resolve, reject) => {
            if (isPromise(value)) {
                setTimeout(() => {
                    (value as PromiseLike<T>).then(resolve, reject)
                });
            } else {
                resolve(value as T | PromiseLike<T>)
            }
        })
    }

    static reject<T = never>(reason?: any): JPromise<T> {
        return new JPromise((_, reject) => {
            reject(reason)
        })
    }

    public finally(onFinally?: TOnFinally): JPromise<T> {
        return this.then(
            (value) =>
                JPromise.resolve(
                    typeof onFinally === "function" ? onFinally() : onFinally
                ).then(() => value),
            (reason) =>
                JPromise.reject(
                    typeof onFinally === "function" ? onFinally() : onFinally
                ).then(() => reason)
        );
    }

    static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>,
            T4 | PromiseLike<T4>,
            T5 | PromiseLike<T5>,
            T6 | PromiseLike<T6>,
            T7 | PromiseLike<T7>,
            T8 | PromiseLike<T8>,
            T9 | PromiseLike<T9>,
            T10 | PromiseLike<T10>
        ]
    ): JPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
    static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>,
            T4 | PromiseLike<T4>,
            T5 | PromiseLike<T5>,
            T6 | PromiseLike<T6>,
            T7 | PromiseLike<T7>,
            T8 | PromiseLike<T8>,
            T9 | PromiseLike<T9>
        ]
    ): JPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
    static all<T1, T2, T3, T4, T5, T6, T7, T8>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>,
            T4 | PromiseLike<T4>,
            T5 | PromiseLike<T5>,
            T6 | PromiseLike<T6>,
            T7 | PromiseLike<T7>,
            T8 | PromiseLike<T8>
        ]
    ): JPromise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
    static all<T1, T2, T3, T4, T5, T6, T7>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>,
            T4 | PromiseLike<T4>,
            T5 | PromiseLike<T5>,
            T6 | PromiseLike<T6>,
            T7 | PromiseLike<T7>
        ]
    ): JPromise<[T1, T2, T3, T4, T5, T6, T7]>;
    static all<T1, T2, T3, T4, T5, T6>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>,
            T4 | PromiseLike<T4>,
            T5 | PromiseLike<T5>,
            T6 | PromiseLike<T6>
        ]
    ): JPromise<[T1, T2, T3, T4, T5, T6]>;
    static all<T1, T2, T3, T4, T5>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>,
            T4 | PromiseLike<T4>,
            T5 | PromiseLike<T5>
        ]
    ): JPromise<[T1, T2, T3, T4, T5]>;
    static all<T1, T2, T3, T4>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>,
            T4 | PromiseLike<T4>
        ]
    ): JPromise<[T1, T2, T3, T4]>;
    static all<T1, T2, T3>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>
        ]
    ): JPromise<[T1, T2, T3]>;
    static all<T1, T2>(
        values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]
    ): JPromise<[T1, T2]>;
    static all<T>(values: readonly (T | PromiseLike<T>)[]): JPromise<T[]>;
    static all<T>(values: Iterable<T | PromiseLike<T>>): JPromise<T[]>;
    static all<T>(values: Iterable<T | PromiseLike<T>>): JPromise<T[]> {
        return new JPromise((resolve, reject) => {
            const result: T[] = [];
            // 获取迭代器对象
            let iter = values[Symbol.iterator]();
            // 判断是否全部完成了
            const dones: boolean[] = [];
            // 获取值 { value: xxx, done: false }
            let cur = iter.next();
            // 判断迭代器是否迭代完毕同时将最后得到的值放入结果数组中
            const resolveResult = (value: T, index: number, done?: boolean) => {
                result[index] = value;
                dones[index] = true;
                if (done && dones.every((item) => item)) {
                    resolve(result);
                }
            };
            for (let i = 0; !cur.done; i++) {
                const value = cur.value;
                dones.push(false);
                cur = iter.next();
                if (isPromise(value)) {
                    value.then((v: T) => {
                        resolveResult(v, i, cur.done);
                    }, reject);
                } else {
                    resolveResult(value, i, cur.done);
                }
            }
        });
    }

    static race<T>(
        values: Iterable<T>
    ): JPromise<T extends PromiseLike<infer U> ? U : T>;
    static race<T>(
        values: readonly T[]
    ): JPromise<T extends PromiseLike<infer U> ? U : T>;
    static race<T>(
        values: Iterable<T>
    ): JPromise<T extends PromiseLike<infer U> ? U : T> {
        return new JPromise((resolve, reject) => {
            const iter = values[Symbol.iterator]();
            let cur = iter.next();
            while (!cur.done) {
                const value = cur.value;
                cur = iter.next();
                if (isPromise(value)) {
                    value.then(resolve, reject);
                } else {
                    // 普通值
                    resolve(value as T extends PromiseLike<infer U> ? U : T);
                }
            }
        });
    }

    static allSettled<T extends readonly unknown[] | readonly [unknown]>(
        values: T
      ): JPromise<
        {
          -readonly [P in keyof T]: PromiseSettledResult<
            T[P] extends PromiseLike<infer U> ? U : T[P]
          >;
        }
      >;
    static allSettled<T>(
        values: Iterable<T>
    ): JPromise<PromiseSettledResult<T extends PromiseLike<infer U> ? U : T>[]>;
    static allSettled<T>(values: Iterable<T>): JPromise<any> {
        return new JPromise((resolve) => {
            const result: any[] = [];
            const dones: boolean[] = [];
            const iter = values[Symbol.iterator]();
            let cur = iter.next();
            const resolveResult = (value: any, index: number, done?: boolean) => {
                result[index] = {
                    status: Status.FULFILLED,
                    value
                };
                dones[index] = true;
                if (done && dones.every((item) => item)) {
                    resolve(result);
                }
            };
        
            for (let i = 0; !cur.done; i++) {
                const value = cur.value;
                dones.push(false);
                cur = iter.next();
                if (isPromise(value)) {
                    value.then(
                        (v) => {
                            resolveResult(v, i, cur.done);
                        },
                        (reason) => {
                            result[i] = {
                                status: Status.REJECTED,
                                reason
                            };
                            dones[i] = true;
                            if (cur.done && dones.every((item) => item)) {
                                resolve(result);
                            }
                        }
                    );
                } else {
                    // 不是 thenable 直接存储
                    resolveResult(value, i, cur.done);
                }
            }
        });
    }

    static any<T>(
        values: (T | PromiseLike<T>)[] | Iterable<T | PromiseLike<T>>
    ): JPromise<T> {
        return new JPromise((resolve, reject) => {
            const iter = values[Symbol.iterator]();
            let cur = iter.next();
            const dones: boolean[] = [];
        
            for (let i = 0; !cur.done; i++) {
                const value = cur.value;
                cur = iter.next();
                dones.push(false);
                if (isPromise(value)) {
                    value.then(resolve, () => {
                        dones[i] = true;
                        if (cur.done && dones.every((item) => item)) {
                            const e = new Error(`All promises were rejected.`);
                            e.stack = "";
                            reject(e);
                        }
                    });
                } else {
                    resolve(value);
                }
            }
        });
    }
}

function resolvePromise<T>(
    promise2: JPromise<T>,
    x: T | PromiseLike<T>,
    resolve: TResolve<T>,
    reject: TReject
) {
    // 不能引用同一个对象, 不然会无限循环
    if (promise2 === x) {
        reject(new TypeError(`Chaining cycle detected for promise #<JPromise>`));
    }

    if (x && typeof x === "object" || typeof x === "function") {
        let called = false;
        try {
            let then = (x as PromiseLike<T>).then;
            if (typeof then === "function") {
                then.call(
                    x,
                    (y) => {
                        if (called) return;
                        called = true;
                        // 如果是 Promise, 递归获取到最终状态的值
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } else {
                // 不是 Promise, 当做普通值处理
                if (called) return
                called = true
                resolve(x);
            }
        } catch (err) {
            if (called) return;
            called = true;
            reject(err);
        }
    } else {
        resolve(x);
    }
}

  // @ts-ignore
JPromise.defer = JPromise.deferred = function () {
    let dfd: any = {};
    dfd.promise = new JPromise((resovle, reject) => {
      dfd.resolve = resovle;
      dfd.reject = reject;
    });
  
    return dfd;
};

module.exports = JPromise
