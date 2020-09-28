import apiService from '@/services/ApiService.js'

export const namespaced = true

export const state = {
  universities: []
}
export const mutations = {
  SET_UNIVERSITIES(state, universities) {
    state.universities = universities
  }
}
export const actions = {
  fetchUniversities({ commit }) {
    return apiService
      .getUniversities()
      .then(response => {
        commit('SET_UNIVERSITIES', response.data)
      })
      .catch(error => {
        throw error
      })
  }
}
export const getters = {}
