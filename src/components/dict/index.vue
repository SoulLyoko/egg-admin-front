<script>
/**
 * 字典组件 支持el-select,el-radio,el-checkbox,el-cascader的所有属性
 * el-cascader中，props的emitPath已被强制设置成false
 * @description 先在字典表中添加字典和数据,该组件已注册为全局组件,无需重复引用
 * eg:<dict v-model="form.status" code="status"></dict>
 * 使用 window.Dict[code] 可获取到当前字典项
 */
import { getDictType } from "@/api/sys/dict.js";
import dictSelect from "./components/dict-select";
import dictRadio from "./components/dict-radio";
import dictCheckbox from "./components/dict-checkbox";
import dictCascader from "./components/dict-cascader.vue";

export default {
  name: "dict",
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
      case "cascader":
        return <dictCascader {...attrs} onChange={this.handleChange}></dictCascader>;
      case "text":
        return <span>{this.selectedLabel}</span>;
      default:
        return <span>{this.$attrs.value}</span>;
    }
  },
  computed: {
    selectedLabel() {
      const { value } = this.$attrs;
      if (value instanceof Array) {
        return (
          this.flatOptions()
            .filter(item => value.some(val => val === item.value))
            .map(item => item.label)
            .join(this.join) || value
        );
      } else {
        return this.flatOptions().find(item => item.value === value)?.label || value;
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
      if (window.DictRequesting) {
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
      window.DictRequesting = true;
      getDictType(this.code)
        .then(res => {
          this.options = res.data;
          let dict = window.Dict || {};
          window.Dict = {
            ...dict,
            [this.code]: [...this.options]
          };
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          window.DictRequesting = false;
        });
    },
    flatOptions(arr = this.options) {
      return arr
        .map(item => {
          if (item.children && item.children.length) {
            return [item, this.flatOptions(item.children)];
          } else {
            return item;
          }
        })
        .flat(Infinity);
    }
  }
};
</script>
