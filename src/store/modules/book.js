import ApiService from '@/services/ApiService.js'
export const namespaced = true

export const state = {
  books: [],
  book: {}
}
export const mutations = {
  SET_BOOKS(state, books) {
    state.books = books
  },
  SET_BOOK(state, book) {
    state.book = book
  },
  ORDER_BOOK(state, book) {
    state.books.push(book)
  }
}
export const actions = {
  orderBook({ commit }, order) {
    return ApiService.orderBook(order)
      .then(() => {
        commit('ORDER_BOOK', order)
      })
      .catch(error => {
        throw error
      })
  },
  fetchBooks({ commit }) {
    return ApiService.getBooks()
      .then(response => {
        commit('SET_BOOKS', response.data)
      })
      .catch(error => {
        throw error
      })
  },
  fetchBook({ commit }, id) {
    return ApiService.getBook(id)
      .then(response => {
        commit('SET_BOOK', response.data)
      })
      .catch(error => {
        throw error
      })
  },
  searchBooks({ commit }, search) {
    return ApiService.searchBooks(search)
      .then(response => {
        commit('SET_BOOKS', response.data)
      })
      .catch(error => {
        throw error
      })
  }
}
export const getters = {}
