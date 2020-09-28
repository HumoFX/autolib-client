import axios from 'axios'

const apiService = axios.create({
  baseURL: 'https://whispering-fortress-52261.herokuapp.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCategories() {
    return apiService.get('/category/')
  },
  getCategory(id) {
    return apiService.get('/category/' + id)
  },
  getUsers() {
    return apiService.get('/user/')
  },
  getUser(id) {
    return apiService.get('/user/' + id)
  },
  updateUser(id, newUserData) {
    return apiService.put('/user/' + id, newUserData)
  },
  getOrders() {
    return apiService.get('/orders/')
  },
  getOrder(id) {
    return apiService.get('/orders/' + id)
  },
  updateOrder(id, order) {
    return apiService.put('/orders/' + id, order)
  },
  getUniversities() {
    return apiService.get('/university/')
  },
  getUniversity(id) {
    return apiService.get('/university/' + id)
  },
  getFaculties() {
    return apiService.get('/faculty/')
  },
  getBooks() {
    return apiService.get('/books/?limit=')
  },
  getBook(id) {
    return apiService.get('/books/' + id)
  },
  orderBook(book) {
    return apiService.post('/orders/', book)
  },
  getBooksInUse() {
    return apiService.get('/book_in_use/')
  },
  getBookInUse(id) {
    return apiService.get('/book_in_use/' + id)
  },
  login(credentials) {
    return apiService.post('/api/token/', credentials)
  },
  register(credentials) {
    return apiService.post('/api/accounts/user/', credentials)
  },
  refreshToken(refresh) {
    return apiService.post('/api/token/refresh/', refresh)
  },
  resetPassword(credentials) {
    return apiService.post('/auth/users/reset_password/', credentials)
  },
  resetPasswordConfirm(credentials) {
    return apiService.post('/auth/users/reset_password_confirm/', credentials)
  },
  searchBooks(search) {
    return apiService.get('/books/?search=' + search)
  },
  emailConfirm(credentials) {
    return apiService.post('/email-confirm/', credentials)
  },
  apiService
}
