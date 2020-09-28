import ApiService from '@/services/ApiService.js'
export const namespaced = true

export const state = {
  orders: [],
  booksInUse: [],
  order: {}
}
export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  SET_ORDER(state, order) {
    state.order = order
  },
  SET_BOOKS_IN_USE(state, booksInUse) {
    state.booksInUse = booksInUse
  }
}
export const actions = {
  fetchOrders({ commit }) {
    return ApiService.getOrders()
      .then(response => {
        commit('SET_ORDERS', response.data)
      })
      .catch(error => {
        throw error
      })
  },
  fetchOrder({ commit }, id) {
    return ApiService.getOrder(id)
      .then(response => {
        commit('SET_ORDER', response.data)
      })
      .catch(error => {
        throw error
      })
  },
  updateOrder(context, { id, order }) {
    return ApiService.updateOrder(id, order)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        throw error
      })
  },
  fetchBooksInUse({ commit }) {
    return ApiService.getBooksInUse()
      .then(response => {
        commit('SET_BOOKS_IN_USE', response.data)
      })
      .catch(error => {
        throw error
      })
  }
}
export const getters = {}
