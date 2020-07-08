<template>
  <avue-input-tree
    :value="value"
    :dic="treeData"
    :props="{ label: 'name', value: '_id' }"
    :size="size"
    :placeholder="placeholder || '选择部门'"
    :disabled="disabled"
    :clearable="clearable"
    @input="$emit('input', $event)"
  ></avue-input-tree>
</template>

<script>
/**
 * 部门选择组件
 * @props value:双向绑定值;topLevel:是否显示一级部门;size:组件大小;placeholder:占位符;disabled:是否禁用;clearable:是否可清空;
 */
import { getTree } from "@/api/sys/dept";

export default {
  name: "dept-select",
  props: ["value", "topLevel", "size", "placeholder", "disabled", "clearable"],
  data() {
    return {
      treeData: []
    };
  },
  created() {
    getTree().then(res => {
      if (this.topLevel) {
        this.treeData = [
          {
            name: "一级部门",
            _id: "0",
            children: res.data
          }
        ];
      } else {
        this.treeData = res.data;
      }
    });
  }
};
</script>

<style lang="" scoped></style>
