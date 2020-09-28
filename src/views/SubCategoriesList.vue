<template>
  <v-container fluid>
    <v-row v-if="subCategories.length > 0">
      <v-tabs
        optional
        align-with-title
        hide-slider
        dark
        background-color="indigo darken-3"
        height="100"
      >
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
        <v-tab
          aria-multiline="true"
          class="white--text"
          v-for="subCategory in subCategories"
          :key="subCategory.id"
          :href="'/subcategories-list/' + subCategory.id"
          >{{ subCategory.name }}</v-tab
        >
      </v-tabs>
    </v-row>
    <v-row v-if="paginatedItems.length > 0">
      <v-col
        v-for="book in paginatedItems"
        :key="book.id"
        cols="12"
        sm="4"
        md="3"
        class="d-flex flex-column align-center"
      >
        <BookMedia :book="book" />
      </v-col>
    </v-row>
    <div class="text-center" v-if="paginatedItems.length > 0">
      <v-pagination
        v-model="page"
        :length="Math.ceil(this.booksWithUDC.length / this.perPage)"
        :total-visible="7"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import store from '@/store'
import ApiService from '@/services/ApiService'
import BookMedia from '@/components/BookMedia.vue'
import { mapState } from 'vuex'
function bar(to, next) {
  store.dispatch('user/fetchUser', store.state.auth.authUser_id)
  store.dispatch('category/fetchCategories')
  store.dispatch('category/fetchCategory', to.params.id).then(category => {
    to.params.category = category
    next()
  })
}
export default {
  data() {
    return {
      categories: [],
      books: [],
      page: 1,
      perPage: 20
    }
  },
  components: {
    BookMedia
  },
  props: {
    category: {
      type: Object,
      required: true,
      default() {
        return {
          id: null
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    bar(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    bar(to, next)
  },
  created() {
    ApiService.getCategories().then(response => {
      this.categories = response.data
    })
    ApiService.getBooks().then(response => {
      this.books = response.data
    })
  },
  computed: {
    ...mapState(['user']),
    subCategories() {
      return this.categories.filter(subCategory => {
        return subCategory.parent === this.category.id
      })
    },
    universityBooks() {
      return this.books.filter(book => {
        return book.university === this.user.user.university_id
      })
    },
    booksWithUDC() {
      return this.universityBooks.filter(book => {
        return String(book.udc).startsWith(String(this.category.udc_id))
      })
    },
    paginatedItems() {
      return this.booksWithUDC.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    }
  }
}
</script>
