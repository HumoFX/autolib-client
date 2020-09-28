import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vue-datetime/dist/vue-datetime.css'
import './plugins/vuetify-mask.js'
import apiService from '@/services/ApiService'

Vue.config.productionTip = false

const token = localStorage.getItem('authUser')
let access = null
let refresh = localStorage.getItem('refresh')
if (token) {
  const userData = JSON.parse(token)
  access = userData.access
}
if (access) {
  store.commit('auth/SET_AUTH_USER', access)
}
apiService.apiService.defaults.headers.common[
  'Authorization'
] = `Bearer ${access}`
apiService.apiService.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      if (refresh) {
        store.dispatch('auth/refreshToken', { refresh: refresh }).then(() => {
          location.reload()
        })
      } else {
        router.push('/login')
        store.dispatch('auth/logout')
      }
    }
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  data() {
    return {
      timeout: null
    }
  },
  created() {
    this.timeout = setInterval(
      () => this.$store.dispatch('auth/refreshToken', { refresh: refresh }),
      270000
    )
  },
  beforeDestroy() {
    this.timeout = null
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
