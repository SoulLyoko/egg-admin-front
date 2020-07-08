import request from "@/libs/axios";

// 获取字典树
export function getTree(params) {
  return request({
    url: "/dict/get/tree",
    params
  });
}

// 获取字典type
export function getDictType(type) {
  return request({
    url: "/dict/type/" + type
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
