<template>
  <v-app-bar app color="indigo" dark height="72">
    <v-btn to="/" icon class="mr-6 ml-3 v-btn">
      <v-avatar tile size="96">
        <v-img contain src="@/assets/white_logo.png" />
      </v-avatar>
    </v-btn>
    <v-spacer />
    <p
      v-if="userUniversity"
      class="text-center mb-0 hidden-sm-and-down text-h6"
    >
      {{ userUniversity.name }}
    </p>
    <v-spacer />
    <v-form v-if="isAuth" @submit.prevent="searchBooks">
      <div class="d-flex align-center">
        <v-text-field
          placeholder="Поиск  . . ."
          v-model="searchBook"
          flat
          solo-inverted
          hide-details
        />
        <v-btn icon @click.prevent="searchBooks">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-form>
    <v-toolbar-items>
      <div v-if="isAuth" class="d-flex align-center ml-1">
        <v-btn to="/profile" text icon>
          <v-avatar size="48">
            <v-img v-if="hasAvatar" :src="user.user.avatar"></v-img>
            <v-img v-else src="@/assets/avatar2.png" />
          </v-avatar>
        </v-btn>
      </div>
      <div v-if="!isAuth" class="d-flex align-center">
        <v-btn to="/login" text>Вход</v-btn>
        <v-btn to="/register" text>Регистрация</v-btn>
      </div>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
export default {
  name: 'AppBar',
  data() {
    return {
      searchBook: ''
    }
  },
  created() {
    if (this.isAuth) {
      store.dispatch('user/fetchUser', store.state.auth.authUser_id)
      store.dispatch('university/fetchUniversities')
    }
  },
  computed: {
    ...mapState(['user', 'university']),
    isAuth() {
      return this.$store.state.auth.authUser
    },
    hasAvatar() {
      return this.user.user.avatar
    },
    userUniversity() {
      return this.university.universities.find(university => {
        return university.id === this.user.user.university_id
      })
    }
  },
  methods: {
    searchBooks() {
      store.dispatch('book/searchBooks', this.searchBook).then(() => {
        this.searchBook = ''
        this.$router.push({ name: 'book-list' }, () => {})
      })
    }
  }
}
</script>
