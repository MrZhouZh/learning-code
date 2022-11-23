/**
 * 实现节流
 * 
 * 实现原理: 在一定时间内仅执行一次回调
 * 
 * 实际场景: 监听页面滚动, 降低事件调用的频率
 * 
 */
function throttle(fn, delay) {
    let timer = +new Date()
    return function(...args) {
        let newTimer = +new Date()
        if (newTimer - timer >= delay) {
            fn.apply(this, args)
            timer = +new Date()
        }
    }
}