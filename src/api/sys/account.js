import request from "@/libs/axios";

export function userLogin(data) {
  return request({
    url: "/account/login",
    method: "post",
    data
  });
}

export function resetPassword(data) {
  return request({
    url: "/account/resetPsw",
    method: "put",
    data
  });
}

export function getCurrent() {
  return request({
    url: "/account/current",
    method: "get"
  });
}

export function getCaptcha() {
  return request({
    url: "/account/captcha",
    method: "get"
  });
}
