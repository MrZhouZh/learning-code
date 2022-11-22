/**
 * 实现节流
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