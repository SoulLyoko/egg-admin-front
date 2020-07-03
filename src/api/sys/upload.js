import request from "@/libs/axios";

// 获取列表
export function getList(params) {
  return request({
    url: "/upload",
    params
  });
}

// 获取单条信息
export function getInfo(id) {
  return request({
    url: "/upload/" + id
  });
}

// 新增
export function uploadFile(data) {
  return request({
    url: "/upload",
    method: "post",
    data
  });
}
// 新增
export function uploadFiles(data) {
  return request({
    url: "/uploads",
    method: "post",
    data
  });
}

// 修改
export function update(id, data) {
  return request({
    url: "/upload/" + id,
    method: "put",
    data
  });
}

// 删除
export function remove(id) {
  return request({
    url: "/upload/" + id,
    method: "delete"
  });
}
