import request from "@/libs/axios";

export function getList(params) {
  return request({
    url: "/dept",
    params
  });
}

export function getTree(params) {
  return request({
    url: "/dept/get/tree",
    params
  });
}

export function getUserTree(params) {
  return request({
    url: "/dept/get/userTree",
    params
  });
}

export function getInfo(id) {
  return request({
    url: "/dept/" + id
  });
}

export function create(data) {
  return request({
    url: "/dept",
    method: "post",
    data
  });
}

export function update(id, data) {
  return request({
    url: "/dept/" + id,
    method: "put",
    data
  });
}

export function remove(id) {
  return request({
    url: "/dept/" + id,
    method: "delete"
  });
}
