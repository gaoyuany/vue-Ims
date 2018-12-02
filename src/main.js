// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/home', component: Home},
    {path: '/login', component: Login}
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
