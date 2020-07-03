import request from "@/libs/axios";

// 获取导航菜单
export function getMenu() {
  return request({
    url: "/menu/nav/get"
  });
}

// 获取权限
export function getPermissions() {
  return request({
    url: "/menu/permissions/get"
  });
}

// 获取菜单管理列表树
export function getTree(params) {
  return request({
    url: "/menu/tree/get",
    params
  });
}

export function getInfo(id) {
  return request({
    url: "/menu/" + id
  });
}

export function create(data) {
  return request({
    url: "/menu",
    method: "post",
    data
  });
}

export function update(id, data) {
  return request({
    url: "/menu/" + id,
    method: "put",
    data
  });
}

export function remove(id) {
  return request({
    url: "/menu/" + id,
    method: "delete"
  });
}
