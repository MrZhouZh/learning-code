/**
 * 实现 sleep 函数
 * 
 * 实现原理: 使用 async/await 结合 setTimeout, 这样的写法更符合
 */
const sleep = function(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay))
}

async function test() {
    console.log(1)
    await sleep(3000)
    console.log(2, 'printing in 3s')
}

test()
