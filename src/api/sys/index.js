import request from "@/libs/axios";

export function getLoginLog(params) {
  return request({
    url: "/log/login/get",
    params
  });
}
export function getActionLog(params) {
  return request({
    url: "/log/action/get",
    params
  });
}
export function getErrorLog(params) {
  return request({
    url: "/log/error/get",
    params
  });
}
