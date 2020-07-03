import pageLayout from "@/pages/page-layout";
import pageIframe from "@/pages/page-iframe";
import pageMain from "@/pages/page-main";

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

export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return value;
  }
}
