import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/store/modules/auth.js'
import * as order from '@/store/modules/order.js'
import * as book from '@/store/modules/book.js'
import * as category from '@/store/modules/category.js'
import * as notification from '@/store/modules/notification.js'
import * as user from '@/store/modules/user.js'
import * as university from '@/store/modules/university.js'
import * as faculty from '@/store/modules/faculty.js'
import * as snackbar from '@/store/modules/snackbar.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    order,
    book,
    category,
    notification,
    user,
    university,
    faculty,
    snackbar
  }
})
