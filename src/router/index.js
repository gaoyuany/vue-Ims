import Vue from 'vue'

import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import Login from '@/components/login/Login'
import Users from '@/components/users/Users'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/home',
    component: Home,
    children: [{
      path: '/users',
      component: Users
    }]
  },
  {
    path: '/login',
    component: Login
  }
  ]
})
// 添加导航守卫
// router.beforeEach((to, form, next) => {
//   // 如果当前访问的是登录页面，则跳转到登录页面
//   if (to.path === '/login') {
//     return next()
//   }
//   // 如果不是登录页面
//   const token = localStorage.getItem('token')
//   if (token) {
//     next()
//   } else {
//     next('/login')
//   }
// })
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = localStorage.getItem('token')

  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
