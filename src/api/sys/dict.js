import request from "@/libs/axios";

// 获取字典树
export function getTree(params) {
  return request({
    url: "/dict/tree/get",
    params
  });
}

export function getInfo(id) {
  return request({
    url: "/dict/" + id
  });
}

export function create(data) {
  return request({
    url: "/dict",
    method: "post",
    data
  });
}

export function update(id, data) {
  return request({
    url: "/dict/" + id,
    method: "put",
    data
  });
}

export function remove(id) {
  return request({
    url: "/dict/" + id,
    method: "delete"
  });
}
