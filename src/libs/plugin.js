// Element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// Avue
import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";

// 全局组件
import "@/components";

// util
import * as util from "@/libs/util";

export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false;
    // util
    Vue.prototype.$util = util;

    Vue.use(ElementUI);
    Vue.use(Avue);
  }
};
