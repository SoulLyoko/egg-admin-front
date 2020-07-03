import { setStorage, getStorage } from "@/libs/util.js";
import { indexPage } from "@/router/routes.js";
import router from "@/router";

export default {
  state: {
    activeTab: {},
    openTabs: getStorage("openTabs") || []
  },
  getters: {
    activeTab: state => {
      return state.activeTab;
    },
    tabs: state => {
      const index = state.openTabs.some(item => item.name === "index");
      if (index) {
        return state.openTabs;
      } else {
        return [indexPage, ...state.openTabs];
      }
    }
  },
  actions: {
    openTab({ commit, state }, to) {
      const hasTab = state.openTabs.some(item => item.name === to.name);
      if (!hasTab) {
        commit("ADD_TAB", to);
      }
      commit("SET_ACTICE_TAB", to);
    },
    closeTab({ commit }, tab) {
      commit("REMOVE_TAB", tab);
    }
  },
  mutations: {
    ADD_TAB(state, data) {
      state.openTabs.push({ ...data, matched: undefined });
      setStorage("openTabs", state.openTabs);
    },
    REMOVE_TAB(state, tabName) {
      const prevIndex = state.openTabs.findIndex(tab => tab.name !== tabName);
      state.openTabs = state.openTabs.filter(tab => tab.name !== tabName);
      setStorage("openTabs", state.openTabs);
      router.push(state.openTabs[prevIndex]);
    },
    SET_ACTICE_TAB(state, data) {
      console.log("SET_ACTICE_TAB -> state", state);
      state.activeTab = data;
    }
  }
};
