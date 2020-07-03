import request from "@/libs/axios";

// 获取列表
export function getList(params) {
  return request({
    url: "/role",
    params
  });
}

// 获取单条信息
export function getInfo(id) {
  return request({
    url: `/role/${id}`
  });
}

// 新增
export function create(data) {
  return request({
    url: "/role",
    method: "post",
    data
  });
}

// 修改
export function update(id, data) {
  return request({
    url: "/role/" + id,
    method: "put",
    data
  });
}

// 删除
export function remove(id) {
  return request({
    url: `/role/${id}`,
    method: "delete"
  });
}
