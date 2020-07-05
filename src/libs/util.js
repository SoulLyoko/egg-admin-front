import pageLayout from "@/pages/page-layout";
import pageIframe from "@/pages/page-iframe";
import pageMain from "@/pages/page-main";
import jscookie from "js-cookie";

export const storage = {
  set(key, value) {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  get(key) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return value;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

export const cookie = {
  set(key, value) {
    if (typeof value === "string") {
      jscookie.set(key, value);
    } else {
      jscookie.set(key, JSON.stringify(value));
    }
  },
  get(key) {
    const value = jscookie.get(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return value;
    }
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
    const children =
      menu.children && menu.children.length
        ? generateRoutes(menu.children, menu)
        : [];
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
