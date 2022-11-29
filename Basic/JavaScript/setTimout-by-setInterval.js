/**
 * setInterval 实现 setTimeout
 */
function mySetTimeout(fn, timeout) {
  const timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, timeout);
}

mySetTimeout(() => {
  console.log("setTimeout");
}, 1000);
