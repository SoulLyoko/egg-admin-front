<script>
/**
 * @component 字典组件,支持el-select,el-radio,el-checkbox,el-cascader的所有属性
 * @desc 先在字典表中添加字典和数据,该组件已注册为全局组件,无需重复引用,使用 window.Dict[code] 可获取到当前字典项
 * el-cascader中，props的emitPath已被强制设置成false
 * @prop {String} code 请求字典接口的字典名称
 * @prop {String} type 默认为select:select下拉选择,radio单选框,checkbox多选框,cascader级联,text文字
 * @prop {String} join 默认为",",type为text时,数组转换成字符串的分隔符
 * @prop {String} dictData 自定义字典数据，当传入时，将不发code请求，字典格式：[{label:"",value:""}]
 */
import { getDictType } from "@/api/sys/dict.js";
const files = require.context("./components", false, /\.vue$/);
const components = {};
files.keys().forEach(key => {
  components[key.replace(/(\.\/|\.vue)/g, "")] = files(key).default;
});

export default {
  name: "sys-dict",
  components,
  props: ["code", "type", "join", "dictData"],
  data() {
    return {
      options: []
    };
  },
  render() {
    const attrs = { attrs: this.$attrs };
    const component = "dict-" + (this.type || "select");
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({ options: this.options });
    } else if (components[component]) {
      return <component {...attrs} onChange={this.handleChange}></component>;
    } else {
      return <span>{this.$attrs.value}</span>;
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
      let dict = window.Dict;
      if (window.DictRequesting) {
        setTimeout(this.getDict);
      } else if (dict?.[this.code]) {
        this.options = dict[this.code];
      } else {
        this.requestDict();
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
    }
  }
};
</script>
