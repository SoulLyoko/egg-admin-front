import { storage } from "@/libs/util";
import screenfull from "screenfull";

export default {
  state: {
    themeName: storage.get("themeName") || "default", //主题名称
    isFullscreen: false //是否全屏
  },
  getters: {
    themeName: state => state.themeName,
    isFullscreen: state => state.isFullscreen
  },
  actions: {
    /** 切换全屏 */
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
