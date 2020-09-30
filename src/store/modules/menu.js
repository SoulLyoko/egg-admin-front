import { getMenu, getPermissions } from "@/api/sys/menu.js";
import { generateRoutes } from "@/libs/util.js";
import router from "@/router/index.js";
import { errorRoutes } from "@/router/routes.js";

export default {
  state: {
    asideMenu: [], //左侧菜单
    headerMenu: [], //顶部菜单
    activeMenu: {}, //当前激活的菜单
    isCollapse: false, //是否折叠左侧菜单
    perms: [], //权限数组
    perm: {} //权限对象
  },
  getters: {
    asideMenu: state => state.asideMenu,
    headerMenu: state => state.headerMenu,
    activeMenu: state => state.activeMenu,
    isCollapse: state => state.isCollapse,
    perms: state => state.perms,
    perm: state => state.perm
  },
  actions: {
    /** 获取菜单并添加到路由，获取权限数据 */
    async getMenu({ commit, state }) {
      await getMenu().then(res => {
        const routes = generateRoutes(res);
        router.addRoutes(routes);
        router.addRoutes(errorRoutes);
        commit("SET_HEADER_MENU", routes);
        if (!state.asideMenu.length) {
          commit("SET_ASIDE_MENU", routes[0].children);
        }
      });
      await getPermissions().then(res => {
        commit("SET_PERMS", res);
      });
    }
  },
  mutations: {
    SET_ASIDE_MENU(state, data) {
      state.asideMenu = data;
    },
    SET_HEADER_MENU(state, data) {
      state.headerMenu = data;
    },
    CHANGE_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
    },
    SET_PERMS(state, data) {
      state.perms = data;
      const perm = {};
      data.forEach(item => {
        perm[item] = true;
      });
      state.perm = perm;
    },
    SET_ACTIVE_MENU(state, data) {
      state.activeMenu = data;
    }
  }
};
