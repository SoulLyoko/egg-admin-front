import { storage } from "@/libs/util";

export default {
  state: {
    themeName: storage.get("themeName") || "default"
  },
  getters: {
    themeName: state => state.themeName
  },
  mutations: {
    SET_THEME_NAME(state, data) {
      state.themeName = data;
      document.body.className = "theme-" + data;
      storage.set("themeName", data);
    }
  }
};
