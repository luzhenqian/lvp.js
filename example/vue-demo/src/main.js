import Vue from "vue";
import App from "./App.vue";
import Lvpfrom "../../../lib/lvp";

const lvp = new Lvp();
Vue.prototype.$lvp = lv;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
