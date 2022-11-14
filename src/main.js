import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '../node_modules/echarts-map/js/world.js' 
import './styles/font.less'
import axios from '@/plugins/axios/axios.js'
import qs from 'qs';

Vue.config.productionTip = false;
Vue.prototype.$qs=qs;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
