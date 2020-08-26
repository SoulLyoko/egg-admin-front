import pageLayout from "@/pages/page-layout";
import pageIframe from "@/pages/page-iframe";
import pageMain from "@/pages/page-main";
import jscookie from "js-cookie";
import packageJson from "@/../package.json";
const appPrefix = `${packageJson.name}-${packageJson.version}`;

/**
 * 浏览器本地缓存封装
 * @method get(key) 设置数据
 * @method get(key) 获取数据
 * @method remove(key) 删除数据
 */
export const storage = {
  set(key, value) {
    if (!value) return;
    localStorage.setItem(`${appPrefix}-${key}`, JSON.stringify(value));
  },
  get(key) {
    const value = localStorage.getItem(`${appPrefix}-${key}`);
    return value ? JSON.parse(value) : value;
  },
  remove(key) {
    localStorage.removeItem(`${appPrefix}-${key}`);
  }
};

/**
 * 浏览器cookie封装
 * @method get(key) 设置数据
 * @method get(key) 获取数据
 * @method remove(key) 删除数据
 */
export const cookie = {
  set(key, value, config) {
    if (!value) return;
    jscookie.set(`${appPrefix}-${key}`, value, { expires: 1, ...config });
  },
  get(key) {
    return jscookie.get(`${appPrefix}-${key}`);
  },
  remove(key) {
    jscookie.remove(`${appPrefix}-${key}`);
  }
};

/**
 * @function 生成vue-router使用的路由格式
 * @param {Array} menuArr 从后端获取的源数据
 * @param {Object} parent  上级
 * @returns {Array} 生成的路由数据
 */
export function generateRoutes(menuArr, parent = { path: "" }) {
  const componentMap = {
    Layout: pageLayout,
    Main: pageMain,
    Iframe: pageIframe
  };
  return menuArr.map(menu => {
    menu.path = parent.path + menu.path;
    let path = menu.path;
    let component = componentMap[menu.component] || (() => import("@/views/" + menu.component));
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
