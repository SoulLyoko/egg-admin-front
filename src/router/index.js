import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { frameOut } from "./routes";
import store from "../store";
import cookie from "js-cookie";
import NProgress from "nprogress";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start();
  const isLogin = cookie.get("token"); // 是否已登录
  const isFrameOut = frameOut.some(item => item.name === to.name); // 是否框架外页面
  const hasMenu = store.state.menu.headerMenu.length; // 是否已获取菜单
  if (isFrameOut) {
    if (isLogin && to.name === "login") {
      // 已登录且前往页面时登录页时，跳转到首页
      next({ name: "index" });
    }
  } else {
    if (!isLogin) {
      // 未登录，跳转到登录页，携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else if (!hasMenu) {
      // 已登录，未获取到菜单
      await store.dispatch("getMenu");
      next({ ...to, replace: true });
    }
  }
  next();
});

router.afterEach(to => {
  // 进度条
  NProgress.done();
  // 多页控制 打开新的页面
  store.dispatch("openTab", to);
  // 更改标题
});

export default router;
