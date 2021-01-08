import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import scss from "./styles/index.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  scss,
  render: h => h(App)
}).$mount("#app");
