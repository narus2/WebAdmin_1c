import Vue from 'vue'
import App from './App.vue'
//import store from './store'
import 'vue-material/dist/vue-material.min.css'
//import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/theme/default-dark.css'


import VueMaterial from 'vue-material'
import {APIService} from "./plugin/APIService";

Vue.use(VueMaterial)

Vue.config.productionTip = false

export let apiService = new APIService();
export const bus = new Vue();


import i18n  from './plugin/i18n.js'

new Vue({
  i18n,
   // store,
  render: h => h(App)
}).$mount('#app')
