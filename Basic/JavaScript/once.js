/**
 * 函数仅执行一次
 * 
 * refs: https://juejin.cn/post/6981664519244218382
 * 
 * 实现原理: 声明一个标识符来判断是否被调用过, 这里使用闭包来实现
 */
const once = function(fn) {
    let called = false
    return function _once(...args) {
        if (called) {
            return _once.value
        }
        called = true
        _once.value = fn.apply(this, args)
    }
}

// Test
let index = 0;
const increment = () => index++;
const onceIncrement = once(increment);
onceIncrement();
onceIncrement();
onceIncrement();
console.log(index); // 1
