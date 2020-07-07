<template>
  <el-cascader
    ref="userSelect"
    v-model="model"
    filterable
    :options="options"
    :props="{ multiple: multiple, emitPath: false, label: 'name', value: 'id' }"
    :show-all-levels="false"
    :placeholder="placeholder || '选择用户，输入名字搜索'"
    :size="size || 'small'"
    :disabled="disabled"
    :clearable="clearable"
    style="width:100%"
    @change="handleChange"
  >
    <template #default="{node,data}">
      <span>
        <i :class="data.isLeaf ? 'el-icon-user' : 'el-icon-share'"></i>
        {{ data.name }}
      </span>
    </template>
  </el-cascader>
</template>

<script>
/**
 * @description 选择用户组件
 * @attrs value:双向绑定的值;size:组件大小;multiple:是否多选;disabled:是否禁用;clearable:是否可清空;placeholder:占位符;
 * @events change:选择的数据变化时触发,回调参数为已选择节点的[data]，即用户信息;
 */
import { fetchList as getUserList } from "@/api/sys/user";
import { fetchTree as getDeptTree } from "@/api/sys/dept";

export default {
  name: "user-select",
  props: ["value", "size", "multiple", "disabled", "clearable", "placeholder"],
  data() {
    return {
      model: [],
      options: [],
      userList: [],
      deptList: []
    };
  },
  watch: {
    value: {
      handler(val) {
        if (this.multiple) {
          this.model = val ? val.split(",") : [];
        } else {
          this.model = val ? val + "" : "";
        }
      },
      immediate: true
    }
  },
  async created() {
    await this.getDeptTree();
    await this.getUserList();
    this.getOptions(this.options);
  },
  methods: {
    getDeptTree() {
      return getDeptTree().then(res => {
        this.options = res.data.data;
      });
    },
    getUserList(size = 10) {
      return getUserList({ size }).then(res => {
        if (res.data.data.total > size) {
          return this.getUserList(size * 10);
        } else {
          this.userList = res.data.data.records.map(item => {
            return {
              ...item,
              id: item.userId + "",
              name: item.actualName,
              isLeaf: true
            };
          });
        }
      });
    },
    getOptions(arr) {
      arr.forEach(item => {
        if (!item.isLeaf) {
          if (!item.children) {
            item.children = [];
          }
          item.children.push(
            ...this.userList.filter(user => user.deptId === item.id)
          );
          this.getOptions(item.children);
        }
      });
    },
    handleChange(val) {
      if (this.multiple) {
        this.$emit("input", val ? val.join(",") : "");
      } else {
        this.$emit("input", val + "");
      }
      const checked = this.$refs.userSelect.getCheckedNodes(true);
      this.$emit(
        "change",
        checked.map(item => item.data)
      );
    }
  }
};
</script>
