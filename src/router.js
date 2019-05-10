import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/RegisterPage.vue')
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('./views/MyPage.vue')
    },
    {
      path: '/entrance',
      name: 'entrance',
      component: () => import('./views/EntrancePage.vue')
    }
  ]
})
