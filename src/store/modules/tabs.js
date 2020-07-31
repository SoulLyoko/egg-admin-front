import { storage } from "@/libs/util.js";
import { indexPage } from "@/router/routes.js";
import router from "@/router";
import { frameOut } from "@/router/routes.js";

export default {
  state: {
    activeTab: {},
    openTabs: storage.get("openTabs") || []
  },
  getters: {
    activeTab: state => state.activeTab,
    openTabs: state => state.openTabs,
    keepAliveList: state => state.openTabs.filter(item => item.meta.cache).map(item => item.name)
  },
  actions: {
    openTab({ commit, state, getters }, to) {
      const hasTab = state.openTabs.some(item => item.path === to.path);
      const isFrameOut = frameOut.some(item => item.path === to.path);
      const currentHeader = getters.headerMenu.find(menu => menu.path === to.matched[0].path);
      if (!hasTab && !isFrameOut) {
        commit("SET_TABS", [...state.openTabs, { ...to, matched: undefined }]);
      }
      commit("SET_ACTIVE_TAB", to);
      commit("SET_ACTIVE_MENU", to, { root: true });
      commit("SET_ASIDE_MENU", currentHeader ? currentHeader.children : [], {
        root: true
      });
    },
    closeTab({ commit, state }, tabName) {
      if (tabName === state.activeTab.path) {
        const prevIndex = (state.openTabs.findIndex(tab => tab.path === tabName) || 1) - 1;
        router.push(state.openTabs[prevIndex]);
      }
      const filterTabs = state.openTabs.filter(tab => tab.path !== tabName);
      commit("SET_TABS", filterTabs);
    },
    closeAllTabs({ commit }) {
      commit("SET_TABS", []);
      router.push("/index");
    },
    closeOtherTabs({ commit, state }, path) {
      path = path || state.activeTab.path;
      router.push(path);
      const filterTabs = state.openTabs.filter(item => item.path === path);
      commit("SET_TABS", filterTabs);
    },
    closeLeftTabs({ commit, state }, path) {
      path = path || state.activeTab.path;
      router.push(path);
      const findIndex = state.openTabs.findIndex(item => item.path === path);
      const filterTabs = state.openTabs.filter((item, index) => index >= findIndex);
      commit("SET_TABS", filterTabs);
    },
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
