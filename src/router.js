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
      component: Home,
      meta: {
        login: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginPage.vue'),
      meta: {
        login: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/RegisterPage.vue'),
      meta: {
        login: false
      }
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('./views/MyPage.vue'),
      meta: {
        login: true
      }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      meta: {
        login: true
      }
    },
    {
      path: '/entrance',
      name: 'entrance',
      component: () => import('./views/EntrancePage.vue'),
      meta: {
        login: false
      }
    },
    {
      path: '/matching_register',
      name: 'matchinng_register',
      component: () => import('./views/MatchingRegisterPage.vue'),
      meta: {
        login: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    await store.dispatch('check')
    await store.dispatch('getMyProfile')
  } catch {
    // nothing
    if (to.matched.some(m => m.meta.login)) {
      next({ path: '/entrance' })
    } else {
      next()
    }
  }
  if (to.matched.some(m => m.meta.login) && store.state.user.id === null) {
    next({ path: '/entrance' })
  } else {
    next()
  }
})

export default router
