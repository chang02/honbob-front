import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      username: null
    },
    profile: {}
  },
  getters: {
    user: state => {
      return state.user
    },
    profile: state => {
      return state.profile
    },
    myMatchings: state => {
      return state.profile.matchings
    },
    myRequests: state => {
      return state.profile.requests
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
      state.profile = {}
      state.matching = []
      state.matchingrequest = []
    },
    CHECK (state, data) {
      state.user.id = data.pk
      state.user.username = data.username
    },
    UPDATE_MY_PROFILE (state, data) {
      state.profile = data
    }
  },
  actions: {
    async register ({ commit }, { username, password1, password2 }) {
      const response = await axios.post('/auth/registration/', { username, password1, password2 })
      const data = response.data
      axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`
      commit('LOGIN', data)
      location.href = '/'
    },
    async login ({ commit }, { username, password }) {
      const response = await axios.post('/auth/login/', { username, password })
      const data = response.data
      axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`
      commit('LOGIN', data)
      location.href = '/'
    },
    async logout ({ commit }) {
      await axios.post('/auth/logout/')
      commit('LOGOUT')
      location.href = '/'
    },
    async check ({ commit }) {
      if (localStorage.getItem('honbob_token') !== null) {
        axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('honbob_token')}`
        try {
          const response = await axios.get('/auth/user/')
          const data = response.data
          await axios.get(`/api/user/${data.pk}/`)
          commit('CHECK', data)
        } catch (e) {
          axios.defaults.headers.common['Authorization'] = null
        }
      }
    },
    async getMyProfile ({ commit }) {
      const response = await axios.get('/api/profile/self/')
      const data = response.data
      commit('UPDATE_MY_PROFILE', data)
    },
    async getProfile ({ commit }, { id }) {
      const response = await axios.get(`/api/profile/${id}/`)
      const data = response.data
      return data
    },
    async updateProfile ({ dispatch }, { id, payload }) {
      await axios.patch(`/api/profile/${id}/`, payload)
      dispatch('getMyProfile')
    },
    async getRestaurantList ({ commit }, { name }) {
      const response = await axios.get(`/api/restaurants?name=${name}`)
      const data = response.data
      return data
    },
    async getMatchingList ({ commit, state }) {
      const response = await axios.get('/api/matchings/')
      const data = response.data
      data.forEach((element) => {
        const f = element.requests.find((element2) => {
          return element2.user === state.user.id
        })
        if (f === undefined) {
          element.selfParticipated = false
        } else {
          element.selfParticipated = true
        }
      })
      return data
    },
    async createMatching ({ commit }, { payload }) {
      await axios.post('/api/matchings/', payload)
      location.href = '/'
    },
    async deleteMatching ({ commit }, { matchingId }) {
      await axios.delete('/api/matching/', {
        data: {
          matchingId
        }
      })
    },
    async createRequest ({ commit }, { payload }) {
      await axios.post('/api/requests/', payload)
    },
    async deleteMatchingRequest ({ commit }, { id }) {
      await axios.delete('/lapi/matchingrequest/', {
        data: {
          id
        }
      })
    }
  }
})
