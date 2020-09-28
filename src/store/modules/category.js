import ApiService from '@/services/ApiService.js'
export const namespaced = true

export const state = {
  categories: [],
  category: {}
}
export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_CATEGORY(state, category) {
    state.category = category
  }
}
export const actions = {
  fetchCategories({ commit, dispatch }) {
    return ApiService.getCategories()
      .then(response => {
        commit('SET_CATEGORIES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Упс, возникла проблема ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchCategory({ commit, dispatch }, id) {
    return ApiService.getCategory(id)
      .then(response => {
        commit('SET_CATEGORY', response.data)
        return response.data
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Упс, возникла проблема: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
export const getters = {}
