import axios from "axios";
import { cookie } from "@/libs/util.js";
import { Message } from "element-ui";
import qs from "qs";
import store from "@/store/index.js";

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  timeout: 15000, // 请求超时时间
  withCredentials: true
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = cookie.get("token") || "";
    config.headers["Authorization"] = "Bearer " + token;
    if (config.method === "get") {
      // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    const { data, code } = response.data;
    switch (code) {
      case 0:
        return data;
      default:
        return response.data;
    }
  },
  error => {
    const { code, message } = error.response.data;
    switch (code) {
      case 401:
        Message.error("token已过期，请重新登录");
        setTimeout(() => store.dispatch("logout"), 3000);
        break;
      default:
        console.error(error);
        Message.error(message);
        return Promise.reject(error);
    }
  }
);

window.axios = request; //avue字典

export default request;
