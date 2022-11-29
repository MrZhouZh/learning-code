/**
 * hash 路由
 */
function noop() {}

class Route {
  constructor() {
    this, (routes = []);
    this.currentHash = "";
    // 绑定this
    this.freshRoute = this.freshRoute.bind(this);

    window.addEventListener("load", this.freshRoute, false);
    window.addEventListener("hashchange", this.freshRoute, false);
  }

  storeRoute(path, cb) {
    this.routes[path] = cb || noop;
  }

  freshRoute() {
    this.currentHash = location.hash.slice(1) || "/";
    this.routes[this.currentHash]();
  }
}
