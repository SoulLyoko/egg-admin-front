export const tableOption = {
  rowKey: "_id",
  align: "center",
  index: true,
  menuWidth: 300,
  column: [
    {
      label: "上级部门",
      prop: "parentId",
      value: "0",
      hide: true,
      formslot: true,
      span: 24,
      rules: [{ required: true, message: "请选择上级部门" }]
    },
    {
      label: "部门名称",
      prop: "name",
      span: 24,
      rules: [{ required: true, message: "请输入部门名称" }]
    },
    {
      label: "排序",
      prop: "sort",
      type: "number",
      span: 24
    }
  ]
};
