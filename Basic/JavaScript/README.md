---
title: JavaScript 基础
---

## 代码示例

- [数组铺平实现](./flattern.js)

- [new 实现](./implement-new.js)

- [instanceOf 实现](./implement-instanceof.js)

- [Object.create 实现](./implement-create.js)

- [debounce 防抖实现](./debounce.js)

- [throttle 节流实现](./throttle.js)

- [once 函数仅调用一次](./once.js)

- [sleep 函数实现](./sleep.js)

- [平铺数组转树状结构](./array2Tree.js)

- [apply 实现](./implement-apply.js)

- [call 实现](./implement-call.js)

- [bind 实现](./implement-bind.js)

- [curry 函数柯里化](./curry.js)

- [深拷贝实现](./deepClone.js)

- [Array.from 实现](./array-from.js)

- [Array map 实现](./array-map.js)

- [Array filter 实现](./array-filter.js)

- [Array push 实现](./array-push.js)

- [数组去重](./array-unique.js)

- [寄生组合式继承](./parasitic-combination-inheritance.js)

- [hash route 实现](./route.js)

- [setTimeout 实现 setInterval](./setInterval-by-setTimeout.js)

- [setInterval 实现 setTimeout](./setTimeout-by-setInterval.js)

- [数组随机顺序](./shuffle.js)

- [获取地址参数并返回对象格式](./getUrlParams.js)

- [简易原生 ajax 实现](./pure-ajax.js)

- [promise 封装 ajax](./promise-ajax.js)



## 常见问题

<!-- 解答疑问 -->

- [JavaScript 隐式类型转化, 一篇就够了](https://www.freecodecamp.org/chinese/news/javascript-implicit-type-conversion/)

    `==` 比较 **5** 大规则:

    1. `NaN` 和其他任何类型(包括他自己)比较永远返回 `false`

    2. `Boolean` 和其他任何类型比较, `Boolean` 首先被转换为 `Number` 类型

    3. `String` 和 `Number` 比较, 先将 `String` 转换为 `Number` 类型

    4. 除了 `null == undefined` 返回 `true` 之外, `null`, `undefined` 和其他任何类型比较都返回 `false`

    5. `原始类型` 和 `引用类型` 比较时, `引用类型` 会依照 **`ToPrimitive`** 规则转换为 `原始类型`

        **`ToPrimitive`** 规则遵循先 `valueOf` 后 `toString` 的模式期望得到一个原始类型. 如果还是没法得到一个 `原始类型`, 就会抛出 `TypeError`

## 参考链接

- [js源码在哪里](https://juejin.cn/post/6986099390884610079)

- [chrome v8](https://github.com/v8/v8)

- [ECMA规范](https://tc39.es/ecma262/#sec-intro)

- [如何在源码中找到某个方法实现](https://www.zhihu.com/question/59792274)

> 深入的话可通过结合规范查看 JavaScript 源码

> *TO BE CONTINUED...*
