export const tableOption = {
  rowKey: "_id",
  align: "center",
  index: true,
  menuWidth: 300,
  column: [
    {
      label: "角色名称",
      prop: "name",
      span: 24,
      rules: [{ required: true, message: "请输入角色名称" }]
    },
    {
      label: "角色标识",
      prop: "code",
      span: 24,
      rules: [{ required: true, message: "请输入角色标识" }]
    },
    {
      label: "备注",
      prop: "remark",
      span: 24
    },
    {
      label: "菜单权限",
      prop: "menuIds",
      formslot: true,
      hide: true,
      span: 24
    }
  ]
};
