import apiService from '@/services/ApiService.js'

export const namespaced = true

export const state = {
  faculties: []
}
export const mutations = {
  SET_FACULTIES(state, faculties) {
    state.faculties = faculties
  }
}
export const actions = {
  fetchFaculties({ commit }) {
    return apiService
      .getFaculties()
      .then(response => {
        commit('SET_FACULTIES', response.data)
      })
      .catch(error => {
        throw error
      })
  }
}
export const getters = {}
