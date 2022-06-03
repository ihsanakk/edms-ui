import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Router from 'vue-router'
import {routes} from "@/routes";

Vue.config.productionTip = false
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
