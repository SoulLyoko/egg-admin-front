<template>
  <el-cascader
    ref="userSelect"
    v-model="model"
    filterable
    :options="options"
    :props="{ multiple: multiple, emitPath: false, label: 'username', value: '_id' }"
    :show-all-levels="false"
    :placeholder="placeholder || '选择用户，输入名字搜索'"
    :size="size || 'small'"
    :disabled="disabled"
    :clearable="clearable"
    @change="handleChange"
  >
    <template #default="{data}">
      <span>
        <i :class="data.username ? 'el-icon-user' : 'el-icon-share'"></i>
        {{ data.username || data.name }}
      </span>
    </template>
  </el-cascader>
</template>

<script>
/**
 * @component 选择用户组件
 * @prop {String} value 双向绑定的值
 * @prop {String} size 组件大小
 * @prop {String}  placeholder 占位符
 * @prop {Boolean} multiple 是否多选
 * @prop {Boolean} disabled 是否禁用
 * @prop {Boolean} clearable 是否可清空
 * @event change([data]) 选择的数据变化时触发,回调参数为已选择节点的[data],即用户信息
 */
import { getUserTree } from "@/api/sys/dept.js";

export default {
  name: "user-select",
  props: ["value", "size", "multiple", "disabled", "clearable", "placeholder"],
  data() {
    return {
      model: [],
      options: []
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
    getUserTree().then(res => {
      this.options = this.setOptions(res);
    });
  },
  methods: {
    setOptions(list) {
      return list.map(item => {
        let children = [];
        if (item.children?.length) {
          children = this.setOptions(item.children);
        }
        return {
          ...item,
          children: [...children, ...(item.users || [])]
        };
      });
    },
    async handleChange(val) {
      if (this.multiple) {
        this.$emit("input", val ? val.join(",") : "");
      } else {
        this.$emit("input", val + "");
      }
      await this.$nextTick();
      const checked = this.$refs.userSelect.getCheckedNodes(true);
      this.$emit(
        "change",
        checked.map(item => item.data)
      );
    }
  }
};
</script>
