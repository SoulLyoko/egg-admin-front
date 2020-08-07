import { storage } from "@/libs/util.js";
import { indexPage } from "@/router/routes.js";
import router from "@/router";
import { frameOut } from "@/router/routes.js";

export default {
  state: {
    activeTab: {}, //当前激活的标签页
    openTabs: storage.get("openTabs") || [] //已打开的标签页
  },
  getters: {
    activeTab: state => state.activeTab,
    openTabs: state => state.openTabs,
    keepAliveList: state => state.openTabs.filter(item => item.meta.cache).map(item => item.name)
  },
  actions: {
    /**
     * 打开标签页
     * @param {Object} to 路由信息
     */
    openTab({ commit, state, getters }, to) {
      const hasTab = state.openTabs.some(item => item.path === to.path);
      const isFrameOut = frameOut.some(item => item.path === to.path);
      const currentHeader = getters.headerMenu.find(menu => menu.path === to.matched[0].path);
      if (!hasTab && !isFrameOut) {
        commit("SET_TABS", [...state.openTabs, { ...to, matched: undefined }]);
      }
      commit("SET_ACTIVE_TAB", to);
      commit("SET_ACTIVE_MENU", to, { root: true });
      commit("SET_ASIDE_MENU", currentHeader?.children || [], { root: true });
    },
    /**
     * 关闭单个标签
     * @param {String} tabName tab绑定的value
     */
    closeTab({ commit, state }, tabName) {
      if (tabName === state.activeTab.path) {
        const prevIndex = (state.openTabs.findIndex(tab => tab.path === tabName) || 1) - 1;
        router.push(state.openTabs[prevIndex]);
      }
      const filterTabs = state.openTabs.filter(tab => tab.path !== tabName);
      commit("SET_TABS", filterTabs);
    },
    /** 关闭所有标签 */
    closeAllTabs({ commit }) {
      commit("SET_TABS", []);
      router.push("/index");
    },
    /**
     * 关闭其他标签
     * @param {String} path 传值则切换到该标签
     */
    closeOtherTabs({ commit, state }, path) {
      path = path || state.activeTab.path;
      router.push(path);
      const filterTabs = state.openTabs.filter(item => item.path === path);
      commit("SET_TABS", filterTabs);
    },
    /**
     * 关闭左侧标签
     * @param {String} path 传值则切换到该标签
     */
    closeLeftTabs({ commit, state }, path) {
      path = path || state.activeTab.path;
      router.push(path);
      const findIndex = state.openTabs.findIndex(item => item.path === path);
      const filterTabs = state.openTabs.filter((item, index) => index >= findIndex);
      commit("SET_TABS", filterTabs);
    },
    /**
     * 关闭右侧标签
     * @param {String} path 传值则切换到该标签
     */
    closeRightTabs({ commit, state }, path) {
      path = path || state.activeTab.path;
      router.push(path);
      const findIndex = state.openTabs.findIndex(item => item.path === path);
      const filterTabs = state.openTabs.filter((item, index) => index <= findIndex);
      commit("SET_TABS", filterTabs);
    }
  },
  mutations: {
    SET_TABS(state, data) {
      if (data.some(item => item.name === indexPage.name)) {
        state.openTabs = data;
      } else {
        state.openTabs = [indexPage, ...data];
      }
      storage.set("openTabs", state.openTabs);
    },
    SET_ACTIVE_TAB(state, data) {
      state.activeTab = data;
    }
  }
};
