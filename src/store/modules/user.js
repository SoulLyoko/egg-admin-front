import { userLogin } from "@/api/sys/account.js";
import cookie from "js-cookie";
import router from "@/router/index.js";

export default {
  state: {
    info: {}
  },
  getters: {
    userInfo: state => {
      return state.info;
    }
  },
  actions: {
    login({ commit }, data = {}) {
      return userLogin(data).then(res => {
        cookie.set("token", res.token);
        commit("SET_INFO", res.info);
      });
    },
    logout({ commit }) {
      cookie.remove("token");
      commit("SET_INFO", {});
      router.push("/login");
    }
  },
  mutations: {
    SET_INFO(state, data) {
      state.info = data;
    }
  }
};
