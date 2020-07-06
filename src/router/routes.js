export const indexPage = {
  path: "/index",
  name: "index",
  meta: {
    title: "首页"
  },
  component: () => import("@/views/system/index")
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
    component: () => import("@/views/system/login")
  }
];

export default [...frameIn, ...frameOut];
