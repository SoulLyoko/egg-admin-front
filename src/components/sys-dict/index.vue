<script>
/**
 * 字典组件
 * @description 先在字典表中添加字典和数据,该组件已注册为全局组件,无需重复引用
 * eg:<Dict v-model="form.orderType" code="order_type"></Dict>
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
    value: { type: String || Array }, //双向绑定的值
    type: { type: String, default: "select" }, //select下拉选择,selectInput下拉选择可输入,radio单选框,checkbox多选框,text文字
    //type为select时生效
    multiple: { type: Boolean, default: false }, //多选
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
  render(h) {
    return (
      <dictSelect
        {...{ attrs: this.$attrs }}
        value={this.value}
        options={this.options}
      ></dictSelect>
    );
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
