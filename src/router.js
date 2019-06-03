import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

export const router = new Router({
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
    },
    {
      path: '/matching_register',
      name: 'matchinng_register',
      component: () => import('./views/MatchingRegisterPage.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    await store.dispatch('check')
    await store.dispatch('getMyProfile')
  } catch {
    // nothing
  }
  next()
})

export default router
