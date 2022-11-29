/**
 * setTimeout 实现 setInterval
 *
 */
function mySetInterval(fn, timeout) {
  let timer = { flag: true };
  function interval() {
    if (timer.flag) {
      fn();
      setTimeout(interval, timeout);
    }
  }
  setTimeout(interval, timeout);

  return timer;
}

// Test
const timer = mySetInterval(() => {
  console.log(`定时器`);
}, 1000);

console.log(timer);
