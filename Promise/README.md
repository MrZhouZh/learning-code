---
title: 实现符合 Promise/A+ 规范的 Promise (中文翻译)
---

<!--
  reference: https://promisesaplus.com/
  https://juejin.cn/post/6844903649852784647
-->

> 原文: https://promisesaplus.com/

## 1. 术语

1.1. "promise" 是遵循本规范的一个有 `then` 方法的对象或函数.

1.2. "thenable" 是一个定义 `then` 方法的对象或函数.

1.3. "value" 是任何合法的 JavaScript 值(包括 `undefined`, thenable 或 promise).

1.4. "exception" 是使用 `throw` 语句抛出的值.

1.5. "reason" 表示 promise 状态为 rejected 的值.

## 2. 要求

### 2.1. Promise 状态

promise 必须处于以下三种状态之一: pending, fulfilled 或 rejected.

2.1.1. 当 promise 处于 pending 状态时:

2.1.1.1. 可以过渡为 fulfilled 或 rejected 状态

2.1.2. 当 promise 处于 fulfilled 状态时:

2.1.2.1. 不会过渡到其他状态

2.1.2.2. 必须有一个不可变的 value 值

2.1.3. 当 promise 处于 rejected 状态时:

2.1.3.1. 不会过渡到其他状态

2.1.3.2. 必须有一个不可变的 reason 值

这里的 "不可变" 指的是恒等式(例如: `===`), 但并不意味着深层的不可变性

### 2.2. `then` 方法

promise 必须提供一个 `then` 方法来获取当前或最终的 value 或者 reason

Promise then 方法传入两个参数:

```js
promise.then(onFulfilled, onRejected);
```

2.2.1. `onFulfilled` 和 `onRejected` 参数都是可选

2.2.1.1. 如果 `onFulfilled` 必须是一个函数类型

2.2.1.2. 如果 `onRejected` 必须是一个函数类型

2.2.2. 如果 `onFulfilled` 是函数类型

2.2.2.1. 必须在 promise 变成 fulfilled 时调用 `onFulfilled`, 参数是 promise 的 value

2.2.2.2. 必须在 promise 状态不是 fulfilled 之前, 不能调用

2.2.2.3. `onFulfilled` 只能调用一次

2.2.3. 如果 `onRejected` 是函数类型

2.2.3.1. 必须在 promise 变成 rejected 时调用 `onRejected`, 参数是 promise 的 reason

2.2.3.2. 必须在 promise 状态不是 rejected 之前, 不能调用

2.2.3.3. `onRejected` 只能被调用一次

2.2.4. 除非执行[上下文](https://es5.github.io/#x10.3)栈只包含"平台代码"[[3.1](#31)], 否则不能调用 `onFulfilled` 或 `onRejected`. 微任务

2.2.5. `onFulfilled` 和 `onRejected` 必须作为函数被调用.[[3.2](#32)]

2.2.6. `then` 方法可能被多次调用

2.2.6.1. 如果当 `promise` 是 fulfilled 状态时, 所有的 `onFulfilled` 回调都必须按照 `then` 的顺序执行

2.2.6.2. 如果当 `promise` 是 rejected 状态时, 所有的 `onRejected` 回调都必须按照 `then` 的顺序执行

2.2.7. `then` 必须返回一个 promise [[3.3](#33)]

```js
promise2 = promise1.then(onFulfilled, onRejected);
```

2.2.7.1. 如果 `onFulfilled` 或 `onRejected` 执行返回结果为 `x`, 调用 `[[Resolve]](promise2, x)`.

2.2.7.2. 如果 `onFulfilled` 或 `onRejected` 执行抛出异常 `e`, `promise2` 必须以 `e` 作为 reason rejected.

2.2.7.3. 如果 `onFulfilled` 不是一个 `function` 类型, 并且 `promise1` 是 fulfilled 状态, `promise2` 必须以 `promise1` 的 value fulfilled.

2.2.7.4. 如果 `onRejected` 不是一个 `function` 类型, 并且 `promise1` 是 rejected 状态, `promise2` 必须以 `promise1` 的 value rejected.

### 2.3. Promise 执行程序

`Promise 执行程序` 是一个以 `promise` 和 `value` 为入参的抽象操作, 我们用 `[[Resolve]](promise, x)` 表示. 如果 `x` 是一个 `thenable`, 假设 `x` 类似于 `promise`, 它会尝试让 `promise` 采用 `x` 的状态. 否则将以值 `x` fulfilled.

只要暴露了符合 **Promise/A+** 的 `then` 方法, 对 thenables 的这种处理就允许 promise 来实现交互. 它还允许 **Promise/A+** 实现带有 reasonable 的 `then` 方法来 "规避" 不合规范的实现.

要实现 `[[Resolve]](promise, x)` 请遵循以下步骤:

2.3.1. 如果 `promise` 和 `x` 相等, 那么 reject 一个 `TypeError` 的 `promise`.

2.3.2. 如果 `x` 是一个 promise, 采取其状态[[3.4](#34)]:

2.3.2.1. 如果 `x` 是 `pending` 状态, `promise` 必须保持 `pending` 状态直到 `x` 变成 `fulfilled` 或 `rejected` 状态.

2.3.2.2. 如果当 `x` 是 `fulfilled` 状态, fulfill `promise` 相同的 `value`.

2.3.2.3. 如果当 `x` 是 `rejected` 状态, reject `promise` 相同的 `reason`.

2.3.3. 另外, 如果 `x` 是一个 `object` 或 `function` 类型,

2.3.3.1. 让 `then` = `x.then`. [[3.5](#35)]

2.3.3.2. 如果 `x.then` 抛出异常 `e`, reject `reason` 为 `e` 的 `promise`.

2.3.3.3. 如果 `x.then` 是 `function` 类型, 则调用 `then.call(promise, x, resolvePromise, rejectPromise)`.

2.3.3.3.1. 如果当 `resolvePromise` 的入参是 `y`, 执行 `[[Resolve]](promise, y)`.

2.3.3.3.2. 如果当 `rejectPromise` 的入参是 `r`, 执行 `reject(r)`.

2.3.3.3.3. 如果 `resolvePromise` 和 `rejectPromise` 都调用过或多次调用, 那么第一个调用优先, 后面的调用忽略.

2.3.3.3.4. 如果调用 `then` 抛出异常 `e`,

2.3.3.3.4.1. 如果 `resolvePromise` 或 `rejectPromise` 已经被调用, 则忽略.

2.3.3.3.4.2. 否则, 执行 `reject(e)`.

2.3.3.4. 如果 `then` 不是 `function` 类型, fulfill `value` 为 `x` 的 `promise`.

2.3.4. 如果 `x` 不是 `object` 或 `function` 类型, fulfill `value` 为 `x` 的 `promise`.

## 3. 笔记

### 3.1.

这里的 "平台代码" 指的是 引擎, 环境, 以及 promise 的实现代码. 实践中要确保 `onFulfilled` 和 `onRejected` 异步执行, 并且应该在 `then` 被调用的那一轮事件循环之后的新调用栈中调用.这个事件队列可以采用例如 `setTimeout` "宏任务(marco-task)" 机制或 "微任务(micro-task)"机制来实现. 由于 promise 的实现代码本身就是平台代码(即都是 JavaScript), 所以代码自身在处理程序时可能已经包含一个任务调度队列.

### 3.2.

没有 this 的情况

也就是说, 在严格模式下, this 是未定义的; 在宽松模式下, 它将成为全局对象

### 3.3.

then 必须返回 promise

在实例满足所有要求的情况下, 可以允许 `promise2 === promise1`. 每个实例都必须标明是否能实现, 以及在什么情况下, `promise2 === promise1` ???

### 3.4.

关于 x

通常, 当 `x` 来自当前的实例时, `x` 才是真正的 `promise`

### 3.5.

关于 x.then

这个流程首先保存 `x.then` 的引用, 然后测试这个引用, 然后调用这个引用, 避免多次获取 `x.then` 属性. 这些预防措施对于确保访问者属性的一致性非常重要, 访问者属性的值可能在检索间发生变化

### 3.6.

如何对待 thenable chain

实例不应该对 thenable 链的深度设置任意限制, 并假设递归超出任意限制, 递归会无穷. 只有真正的循环才会导致 `TypeError`. 如果遇到 thenables 的无限链, 那么永远递归就是正确的行为
