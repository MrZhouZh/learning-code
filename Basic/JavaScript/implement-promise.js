const { resolve } = require("path");

/**
 * 实现 promise
 */
class MyPromise {
  constructor(executor) {
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    function _resolve(value) {
      this.value = value;
      this.onFulfilledCallbacks.forEach((fn) => fn(value));
    }

    function _reject(reason) {
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn(reason));
    }

    try {
      executor(_resolve.bind(this), _reject.bind(this));
    } catch (err) {
      _reject(err);
    }
  }

  then(onFulfilled) {
    return new MyPromise((resolve) => {
      this.onFulfilledCallbacks.push(() => {
        const res = onFulfilled(this.value);
        if (res instanceof MyPromise) {
          res.then(resolve);
        } else {
          resolve(res);
        }
      });
    });
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0,
        result = [];
      if (promises.length === 0) {
        resolve(result);
        return;
      }
      for (let i = 0, len = promises.length; i < len; i++) {
        Promise.resolve(promises[i])
          .then((value) => {
            result[i] = value;
            if (++count === len) {
              resolve(result);
            }
          })
          .catch(reject);
      }
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0,
        result = [];
      if (promises.length === 0) {
        resolve(result);
        return;
      }
      for (let i = 0, len = promises.length; i < len; i++) {
        Promise.resolve(promises[i])
          .then((value) => {
            resolve(value);
          })
          .catch((err) => {
            result[i] = err;
            if (++count === len) {
              return reject(result);
            }
          });
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (const promise of promises) {
        promise.then(resolve, reject);
      }
    });
  }
}

// Test
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
})
  .then((res) => {
    console.log(res);
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 1000);
    });
  })
  .then((res) => console.log(res));
