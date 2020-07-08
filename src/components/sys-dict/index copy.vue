<template>
  <div style="display:inline-block;width:100%;">
    <el-select
      :value="value"
      :multiple="multiple"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :transfer="transfer"
      :size="size"
      @change="handleChange"
      @clear="handleClear"
      :filterable="type === 'selectInput'"
      :default-first-option="type === 'selectInput'"
      :allow-create="allowCreate && type === 'selectInput'"
      v-if="(type === 'select' || type === 'selectInput') && !isSlot"
    >
      <el-option
        :label="item.label"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      ></el-option>
    </el-select>
    <el-radio-group
      :value="value"
      @change="handleChange"
      v-if="type === 'radio'"
    >
      <el-radio
        :label="item.value"
        :disabled="disabled"
        :size="size"
        v-for="item in options"
        :key="item.value"
        >{{ item.label }}</el-radio
      >
    </el-radio-group>
    <el-checkbox-group
      :value="value"
      @change="handleChange"
      v-if="type === 'checkbox'"
    >
      <el-checkbox
        :label="item.value"
        :size="size"
        :disabled="disabled"
        v-for="item in options"
        :key="item.value"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
    <span v-if="type === 'text'">{{ selectedLabel }}</span>
    <slot :options="options" :value="value" :label="selectedLabel"></slot>
  </div>
</template>

<script>
/**
 * 字典组件
 * @description 先在字典表中添加字典和数据,该组件已注册为全局组件,无需重复引用
 * eg:<Dict v-model="form.orderType" code="order_type"></Dict>
 * 使用 window.dict[code] 可获取到当前字典项
 *
 */
//使用方法：先在字典表中添加字典和数据,该组件已注册为全局组件,无需重复引用
//eg:<Dict v-model="form.orderType" code="order_type"></Dict>
// 新增类型：可输入下拉框 selectInput;附带属性:allowCreate --是否允许创建(该操作不更新字典)
// 使用 window.dict[code] 可获取到当前字典项
import { getDictType } from "@/api/sys/dict.js";

export default {
  name: "sys-dict",
  props: {
    code: { type: String }, //请求字典接口的字典名称
    value: { type: String || Array }, //双向绑定的值
    type: { type: String, default: "select" }, //select下拉选择,selectInput下拉选择可输入,radio单选框,checkbox多选框,text文字
    size: { type: String, default: "medium" }, //组件尺寸：中 medium、小 small、迷你 mini
    disabled: { type: Boolean, default: false }, //是否禁用
    transfer: { type: Boolean, default: false }, //将弹层放置于 body 内
    //type为select时生效
    multiple: { type: Boolean, default: false }, //多选
    placeholder: { type: String, default: "请选择" },
    clearable: { type: Boolean, default: false }, //是否显示清空按钮
    //type为text时生效
    join: { type: String, default: "," },
    // type 为 selectInput时生效
    allowCreate: { type: Boolean, default: false },
    dictData: { type: Array, default: () => [] } // 自定义字典数据，当传入时，将不发code请求，字典格式：[{label:"",value:""}]
  },
  data() {
    return {
      options: []
    };
  },
  computed: {
    selectedLabel() {
      if (this.value instanceof Array && this.join) {
        let data = this.options
          .filter(item => this.value.some(val => val === item.value))
          .map(item => item.label);
        let labels = data.join(this.join);
        return labels || this.value;
      } else {
        const data =
          this.options.filter(item => item.value === this.value)[0] || {};
        return data.label || this.value;
      }
    },
    isSlot() {
      return (
        Object.keys(this.$slots).length !== 0 || !this.$scopedSlots.$stable
      );
    }
  },
  watch: {
    code: {
      handler(val) {
        if (!val) return;
        this.getDict();
      },
      immediate: true
    },
    dictData: {
      handler(val) {
        if (!val) return;
        this.options = this.deepClone(val);
      },
      immediate: true
    }
  },
  methods: {
    handleChange(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
    handleClear() {
      this.$emit("input", "");
    },
    getDict() {
      if (window.dictRequesting) {
        setTimeout(this.getDict);
      } else {
        let dict = window.dict;
        if (dict && dict[this.code]) {
          this.options = dict[this.code];
        } else {
          this.requestDict();
        }
      }
    },
    //请求字典并存在window中
    requestDict() {
      window.dictRequesting = true;
      getDictType(this.code)
        .then(res => {
          this.options = res.data.map(item => {
            return {
              label: item.label,
              value: item.value
            };
          });

          let dict = window.dict || {};
          window.dict = {
            ...dict,
            [this.code]: [...this.options]
          };
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          window.dictRequesting = false;
        });
    }
  }
};
</script>

<style lang="" scoped></style>
