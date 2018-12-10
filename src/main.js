// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 配置axios请求拦截器
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, (error) => {
  return Promise.reject(error)
})

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
