export const tableOption = {
  rowKey: "_id",
  align: "center",
  index: true,
  addBtn: false,
  editBtn: false,
  selection: true,
  column: [
    {
      label: "文件名称",
      prop: "filename"
    },
    {
      label: "文件扩展名",
      prop: "extname"
    },
    {
      label: "文件类型",
      prop: "mime"
    },
    {
      label: "文件大小",
      prop: "size"
    },
    {
      label: "上传时间",
      prop: "createTime"
    },
    {
      label: "上传用户",
      prop: "createBy"
    }
  ]
};
