import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiServerUrl = 'http://127.0.0.1:8000/'

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      username: null
    }
  },
  getters: {
    user: state => {
      return state.user
    }
  },
  mutations: {
    LOGIN (state, data) {
      state.user.id = data.user.pk
      state.user.username = data.user.username
      localStorage.setItem('honbob_token', data.token)
    },
    LOGOUT (state) {
      localStorage.removeItem('honbob_token')
      state.user = {
        id: null,
        username: null
      }
    },
    CHECK (state, data) {
      state.user.id = data.pk
      state.user.username = data.username
    }
  },
  actions: {
    async register ({ commit }, { username, password1, password2 }) {
      const response = await axios.post(`${apiServerUrl}auth/registration/`, { username, password1, password2 })
      const data = response.data
      axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`
      commit('LOGIN', data)
    },
    async login ({ commit }, { username, password }) {
      const response = await axios.post(`${apiServerUrl}auth/login/`, { username, password })
      const data = response.data
      axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`
      commit('LOGIN', data)
      location.href = '/'
    },
    async logout ({ commit }) {
      await axios.get(`${apiServerUrl}auth/logout/`)
      commit('LOGOUT')
    },
    async check ({ commit }) {
      if (localStorage.getItem('honbob_token') !== null) {
        axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('honbob_token')}`
        try {
          const response = await axios.get(`${apiServerUrl}auth/user/`)
          const data = response.data
          commit('CHECK', data)
        } catch (e) {
          axios.defaults.headers.common['Authorization'] = null
        }
      }
    }
  }
})
