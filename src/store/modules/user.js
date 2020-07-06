import { userLogin } from "@/api/sys/account.js";
import { cookie, storage } from "@/libs/util";
import router from "@/router/index.js";

export default {
  state: {
    userInfo: storage.get("userInfo") || {}
  },
  getters: {
    userInfo: state => state.userInfo
  },
  actions: {
    login({ commit }, data = {}) {
      return userLogin(data).then(res => {
        cookie.set("token", res.token);
        commit("SET_USER_INFO", res.info);
      });
    },
    logout({ commit }) {
      cookie.remove("token");
      commit("SET_USER_INFO", {});
      router.push("/login");
    }
  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo = data;
      storage.set("userInfo", data);
    }
  }
};