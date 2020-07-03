import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";
import basicContainer from "@/components/basic-container";

Vue.use(ElementUI);
Vue.use(Avue);
Vue.component("basic-container", basicContainer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
