import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

// Agregar URL de la API cambiar tal vez
axios.defaults.baseURL = 'http://localhost:4000';

new Vue({
  vuetify,
  router,
  axios,
  render: h => h(App)
}).$mount("#app");