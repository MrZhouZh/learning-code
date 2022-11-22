/**
 * 实现防抖
 */
function debounce(fn, delay) {
    let timer
    return function(...args) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay);
    }
}