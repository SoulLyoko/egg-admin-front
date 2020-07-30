<script>
/**
 * 字典组件 支持el-select,el-radio,el-checkbox的所有属性
 * @description 先在字典表中添加字典和数据,该组件已注册为全局组件,无需重复引用
 * eg:<sys-dict v-model="form.status" code="status"></sys-dict>
 * 使用 window.dict[code] 可获取到当前字典项
 */
import { getDictType } from "@/api/sys/dict.js";
import dictSelect from "./components/dict-select";
import dictRadio from "./components/dict-radio";
import dictCheckbox from "./components/dict-checkbox";

export default {
  name: "sys-dict",
  props: {
    code: { type: String }, //请求字典接口的字典名称
    type: { type: String, default: "select" }, //select下拉选择,radio单选框,checkbox多选框,text文字
    join: { type: String, default: "," }, //type为text时，数组转换成字符串的分隔符
    dictData: { type: Array } //自定义字典数据，当传入时，将不发code请求，字典格式：[{label:"",value:""}]
  },
  data() {
    return {
      options: []
    };
  },
  render() {
    const attrs = { attrs: this.$attrs };
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({
        options: this.options,
        label: this.selectedLabel
      });
    }
    switch (this.type) {
      case "select":
        return <dictSelect {...attrs} onChange={this.handleChange}></dictSelect>;
      case "radio":
        return <dictRadio {...attrs} onChange={this.handleChange}></dictRadio>;
      case "checkbox":
        return <dictCheckbox {...attrs} onChange={this.handleChange}></dictCheckbox>;
      case "text":
        return <div>{this.selectedLabel}</div>;
      default:
        return <div>{this.$attrs.value}</div>;
    }
  },
  computed: {
    selectedLabel() {
      const { value } = this.$attrs;
      if (value instanceof Array) {
        return (
          this.options
            .filter(item => value.some(val => val === item.value))
            .map(item => item.label)
            .join(this.join) || value
        );
      } else {
        return this.options.find(item => item.value === value)?.label || value;
      }
    }
  },
  watch: {
    code: {
      handler(val) {
        if (!val || this.dictData) return;
        this.getDict();
      },
      immediate: true
    },
    dictData: {
      handler(val) {
        if (!val) return;
        this.options = JSON.parse(JSON.stringify(val));
      },
      immediate: true
    }
  },
  methods: {
    handleChange(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
    getDict() {
      if (window.dictRequesting) {
        setTimeout(this.getDict);
      } else {
        let dict = window.dict;
        if (dict?.[this.code]) {
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
