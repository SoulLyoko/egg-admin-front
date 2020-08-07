export const indexPage = {
  path: "/index",
  name: "index",
  meta: {
    title: "首页"
  },
  component: () => import("@/pages/page-index")
};

export const frameIn = [
  {
    path: "/",
    redirect: "/index",
    component: () => import("@/pages/page-layout"),
    children: [indexPage]
  }
];

export const frameOut = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: () => import("@/pages/page-login")
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "找不到页面"
    },
    component: () => import("@/pages/page-error/404")
  }
];

export const errorRoutes = [
  {
    path: "*",
    redirect: "/404"
  }
];

export default [...frameIn, ...frameOut];
