export const tableOption = {
  rowKey: "_id",
  align: "center",
  index: true,
  searchMenuSpan: 6,
  menuWidth: 320,
  column: [
    {
      label: "字典类型",
      prop: "type",
      search: true,
      span: 24,
      rules: [
        {
          required: true,
          message: "请输入字典类型",
          trigger: "change"
        }
      ]
    },
    {
      label: "父节点ID",
      prop: "parentId",
      hide: true,
      display: false,
      value: "0"
    },
    {
      label: "字典名称",
      prop: "label",
      span: 24,
      rules: [
        {
          required: true,
          message: "请输入字典名称",
          trigger: "change"
        }
      ]
    },
    {
      label: "数据值",
      prop: "value",
      span: 24,
      rules: [
        {
          required: true,
          message: "请输入数据值",
          trigger: "change"
        }
      ]
    },
    {
      label: "备注",
      prop: "remark",
      span: 24
    },
    {
      label: "排序",
      prop: "sort",
      type: "number",
      span: 24
    }
  ]
};
