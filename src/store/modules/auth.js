import apiService from '@/services/ApiService.js'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export const namespaced = true

export const state = {
  authUser: null,
  authUser_id: null
}
export const mutations = {
  SET_AUTH_USER_DATA(state, data) {
    state.authUser = data
    state.authUser_id = jwtDecode(data.access).user_id
    apiService.apiService.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${data.access}`
  },
  SET_AUTH_USER(state, data) {
    state.authUser = data
    state.authUser_id = jwtDecode(data).user_id
  },
  LOGOUT() {
    localStorage.removeItem('authUser')
    localStorage.removeItem('refresh')
    location.reload()
  },
  REFRESH_TOKEN(state, access) {
    state.accessToken = access
  }
}
export const actions = {
  login(context, credentials) {
    return apiService.login(credentials).then(({ data }) => {
      localStorage.setItem('refresh', data.refresh)
      localStorage.setItem('authUser', JSON.stringify(data))
      context.commit('SET_AUTH_USER_DATA', data)
    })
  },
  register(context, credentials) {
    return axios.post(
      'https://whispering-fortress-52261.herokuapp.com/auth/users/',
      credentials
    )
  },
  emailConfirm(context, credentials) {
    return axios.post(
      'https://whispering-fortress-52261.herokuapp.com/auth/users/activation/',
      credentials
    )
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  resetPassword(context, credentials) {
    return apiService
      .resetPassword(credentials)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(error => {
        throw error
      })
  },
  resetPasswordConfirm(context, credentials) {
    return apiService
      .resetPasswordConfirm(credentials)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(error => {
        throw error
      })
  },
  refreshToken(context, refresh) {
    return apiService.refreshToken(refresh).then(({ data }) => {
      localStorage.setItem('authUser', JSON.stringify(data))
      context.commit('SET_AUTH_USER_DATA', data)
    })
  }
}
export const getters = {}
