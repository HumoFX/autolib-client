export const namespaced = true

export const state = {
  snackbars: []
}
export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbars.push(snackbar)
  }
}
export const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true
    snackbar.color = snackbar.color || 'success'
    commit('SET_SNACKBAR', snackbar)
  }
}
export const getters = {}
