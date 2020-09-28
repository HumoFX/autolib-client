import apiService from '@/services/ApiService.js'

export const namespaced = true

export const state = {
  user: {}
}
export const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}
export const actions = {
  fetchUser(context, id) {
    return apiService.getUser(id).then(response => {
      context.commit('SET_USER', response.data)
    })
  },
  updateUser(context, { id, newUserData }) {
    return apiService.updateUser(id, newUserData)
  }
}
export const getters = {}
