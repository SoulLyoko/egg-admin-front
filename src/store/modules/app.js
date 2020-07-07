import { storage } from "@/libs/util";
import screenfull from "screenfull";

export default {
  state: {
    themeName: storage.get("themeName") || "default",
    isFullscreen: false
  },
  getters: {
    themeName: state => state.themeName,
    isFullscreen: state => state.isFullscreen
  },
  actions: {
    toggleFullscreen({ commit }) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
        commit("SET_FULLSCREEN", false);
      } else {
        screenfull.request();
        commit("SET_FULLSCREEN", true);
      }
    }
  },
  mutations: {
    SET_THEME_NAME(state, data) {
      state.themeName = data;
      document.body.className = "theme-" + data;
      storage.set("themeName", data);
    },
    SET_FULLSCREEN(state, data) {
      state.isFullscreen = data;
    }
  }
};
