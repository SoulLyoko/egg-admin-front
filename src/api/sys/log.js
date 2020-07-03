import request from "@/libs/axios";

export function getList(params) {
  return request({
    url: "/log",
    params
  });
}
export function getLoginLog(params) {
  return request({
    url: "/log",
    params: {
      ...params,
      type: "login"
    }
  });
}
export function getActionLog(params) {
  return request({
    url: "/log",
    params: {
      ...params,
      type: "action"
    }
  });
}
export function getErrorLog(params) {
  return request({
    url: "/log",
    params: {
      ...params,
      status: 0
    }
  });
}
export const getLogList = {
  login: getLoginLog,
  action: getActionLog,
  error: getErrorLog
};
