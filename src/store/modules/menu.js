import { getMenu, getPermissions } from "@/api/sys/menu.js";
import { generateRoutes } from "@/libs/util.js";
import router from "@/router/index.js";

export default {
  state: {
    asideMenu: [],
    headerMenu: [],
    activeMenu: {},
    isCollapse: false,
    perms: []
  },
  getters: {
    asideMenu: state => {
      return state.asideMenu;
    },
    headerMenu: state => {
      return state.headerMenu;
    },
    activeMenu: state => {
      return state.activeMenu;
    },
    isCollapse: state => {
      return state.isCollapse;
    },
    perms: state => {
      return state.perms;
    }
  },
  actions: {
    async getMenu({ commit, state }) {
      await getMenu().then(res => {
        commit("SET_HEADER_MENU", res);
        const routes = generateRoutes(res);
        router.addRoutes(routes);
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
    }
  }
};
