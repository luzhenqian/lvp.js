import Vue from "vue";
import App from "./App.vue";
import Lv from "../../../lib/lv";

const lv = new Lv();
Vue.prototype.$lv = lv;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
