import { storage } from "@/libs/util.js";
import { indexPage } from "@/router/routes.js";
import router from "@/router";

export default {
  state: {
    activeTab: {},
    openTabs: storage.get("openTabs") || []
  },
  getters: {
    activeTab: state => {
      return state.activeTab;
    },
    openTabs: state => {
      const openTabs = state.openTabs.filter(item => item.meta.title);
      const index = openTabs.some(item => item.name === "index");
      if (index) {
        return openTabs;
      } else {
        return [indexPage, ...openTabs];
      }
    }
  },
  actions: {
    openTab({ commit, state }, to) {
      const hasTab = state.openTabs.some(item => item.name === to.name);
      if (!hasTab) {
        commit("SET_TABS", [...state.openTabs, { ...to, matched: undefined }]);
      }
      commit("SET_ACTICE_TAB", to);
    },
    closeTab({ commit, state }, tabName) {
      if (tabName === state.activeTab.name) {
        const prevIndex =
          (state.openTabs.findIndex(tab => tab.name === tabName) || 1) - 1;
        router.push(state.openTabs[prevIndex]);
      }
      const filterTabs = state.openTabs.filter(tab => tab.name !== tabName);
      commit("SET_TABS", filterTabs);
    },
    closeAllTabs({ commit }) {
      commit("SET_TABS", []);
      router.push({ name: "index" });
    },
    closeOtherTabs({ commit, state }) {
      const filterTabs = state.openTabs.filter(
        item => item.name === state.activeTab.name
      );
      commit("SET_TABS", filterTabs);
    }
  },
  mutations: {
    SET_TABS(state, data) {
      state.openTabs = data;
      storage.set("openTabs", state.openTabs);
    },
    SET_ACTICE_TAB(state, data) {
      state.activeTab = data;
    }
  }
};
