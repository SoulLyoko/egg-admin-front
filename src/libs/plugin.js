// Element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// Avue
import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";

// 全局组件
import "@/components";

// 全局样式
import "@/assets/style/public.scss";

// util
import * as util from "@/libs/util";
import dayjs from "dayjs";

export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false;
    // util
    Vue.prototype.$util = util;
    Vue.prototype.$day = dayjs;

    Vue.use(ElementUI);
    Vue.use(Avue);
  }
};
