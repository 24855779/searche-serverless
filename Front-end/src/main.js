import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = axios
Vue.use(Vuex)
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
