export const tableOption = {
  rowKey: "_id",
  align: "center",
  index: true,
  searchMenuSpan: 6,
  column: [
    {
      label: "用户名",
      prop: "username",
      search: true,
      rules: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "change"
        }
      ]
    },
    {
      label: "密码",
      prop: "password",
      type: "password",
      hide: true,
      editDisplay: false,
      rules: [
        {
          required: true,
          message: "请输入密码",
          trigger: "change"
        }
      ]
    },
    {
      label: "部门",
      prop: "deptId",
      slot: true,
      formslot: true,
      search: true,
      searchslot: true
    },
    {
      label: "角色",
      prop: "roleIds",
      slot: true,
      formslot: true
    },
    {
      label: "真实姓名",
      prop: "realName"
    },
    {
      label: "性别",
      prop: "gender",
      type: "select",
      dicUrl: "/dict/type/gender"
    },
    {
      label: "邮箱",
      prop: "email"
    },
    {
      label: "手机号",
      prop: "mobile"
    },
    {
      label: "状态",
      prop: "status",
      type: "switch",
      value: "1",
      dicUrl: "/dict/type/status"
    }
  ]
};
