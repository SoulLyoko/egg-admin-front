import pageLayout from "@/pages/page-layout";
import pageIframe from "@/pages/page-iframe";
import pageMain from "@/pages/page-main";
import jscookie from "js-cookie";

export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : value;
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

export const cookie = {
  set(key, value, config) {
    jscookie.set(key, value, { expires: 1, ...config });
  },
  get(key) {
    return jscookie.get(key);
  },
  remove(key) {
    jscookie.remove(key);
  }
};

export function generateRoutes(menuArr, parent = { path: "" }) {
  const componentMap = {
    Layout: pageLayout,
    Main: pageMain,
    Iframe: pageIframe
  };
  return menuArr.map(menu => {
    menu.path = parent.path + menu.path;
    let path = menu.path;
    let component =
      componentMap[menu.component] ||
      (() => import("@/views/" + menu.component));
    let children = [];
    if (menu.children?.length) {
      children = generateRoutes(menu.children, menu);
    }
    return {
      ...menu,
      path,
      component,
      children,
      meta: {
        title: menu.title,
        cache: menu.cache,
        url: menu.url,
        blank: menu.blank,
        query: menu.query
      }
    };
  });
}
