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
    profile: {},
    matching: [],
    matchingrequest: []
  },
  getters: {
    user: state => {
      return state.user
    },
    profile: state => {
      return state.profile
    },
    matching: state => {
      return state.matching
    },
    matchingrequest: state => {
      return state.matchingrequest
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
    },
    UPDATE_MY_PROFILE (state, data) {
      state.profile = data
    },
    UPDATE_MATCHING_LIST (state, data) {
      state.matching = data
    },
    UPDATE_MATCHINGREQUEST_LIST (state, data) {
      state.matchingrequest = data
    }
  },
  actions: {
    async register ({ commit }, { username, password1, password2 }) {
      const response = await axios.post('/auth/registration/', { username, password1, password2 })
      const data = response.data
      axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`
      commit('LOGIN', data)
    },
    async login ({ commit }, { username, password }) {
      const response = await axios.post('/auth/login/', { username, password })
      const data = response.data
      axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`
      commit('LOGIN', data)
      location.href = '/'
    },
    async logout ({ commit }) {
      await axios.get('/auth/logout/')
      commit('LOGOUT')
    },
    async check ({ commit }) {
      if (localStorage.getItem('honbob_token') !== null) {
        axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('honbob_token')}`
        try {
          const response = await axios.get('/auth/user/')
          const data = response.data
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
    async editProfile ({ dispatch }, { id, name, age, school, major, description, contact }) {
      await axios.patch('/api/profile/', {
        id, name, age, school, major, description, contact
      })
      dispatch('getMyProfile')
    },
    async getMatchingList ({ commit }) {
      const response = await axios.get('/api/matching/')
      const data = response.data
      commit('UPDATE_MATCHING_LIST', data)
    },
    async createMatching ({ dispatch }, { ownerId, restaurantId, requestMessage, filter, totalNumber }) {
      await axios.post('/api/matching/', {
        ownerId, restaurantId, requestMessage, filter, totalNumber
      })
      dispatch('getMatchingList')
    },
    async deleteMatching ({ dispatch }, { matchingId }) {
      await axios.delete('/api/matching/', {
        data: {
          matchingId
        }
      })
      dispatch('getMatchingList')
    },
    async getMyMatchingRequestList ({ commit }) {
      const response = await axios.get('/api/matchingrequest/self/')
      const data = response.data
      commit('UPDATE_MATCHINGREQUEST_LIST', data)
    },
    async createMatchingRequest ({ dispatch }, { userId, matchingId, requestMessage }) {
      await axios.post('/api/matchingrequest/', {
        userId, matchingId, requestMessage
      })
      dispatch('getMyMatchingRequestList')
    },
    async deleteMatchingRequest ({ dispatch }, { id }) {
      await axios.delete('/lapi/matchingrequest/', {
        data: {
          id
        }
      })
      dispatch('getMyMatchingRequestList')
    }
  }
})
