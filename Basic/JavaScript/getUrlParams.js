/**
 * 实现从地址中获取参数
 *
 */
const getUrlParams = function (url) {
  let reg = /([^?&=]+)=([^?&=]+)/g;
  let ret = {};
  url.replace(reg, function () {
    ret[arguments[1]] = arguments[2];
  });
  // or
  // const search = window.location.search
  // search.replace(reg, (m, $1, $2) => {
  //     ret[$1] = decodeURIComponent($2)
  // })

  return ret;
};

// Test
let url = "https://www.example.com?a=1&b=2";
console.log(getUrlParams(url));
// output: { a: '1', b: '2' }
