<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="yellow darken-1" v-bind="attrs" v-on="on">Ещё</v-btn>
    </template>
    <v-card max-width="600">
      <div class="d-flex justify-end">
        <v-card-actions>
          <v-btn icon>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-avatar class="ma-3" width="72" height="72" tile>
                <v-img :src="book.img"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-title">
                <span class="text-body-1 font-weight-bold"
                  >Название книги:</span
                >
                {{ book.title }}
              </p>
              <p class="text-title">
                <span class="text-body-1 font-weight-bold">Автор книги:</span>
                {{ book.author }}
              </p>
              <p class="text-title red--text" v-if="book.special_books">
                <span class="text-body-1 font-weight-bol"
                  >Разрешено читать только в библиотеке</span
                >
              </p>
              <p class="text-title">
                <span class="text-body-1 font-weight-bold">В наличии:</span>
                {{ bookCount }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="center" align="center">
            <v-col>
              <v-btn
                :disabled="!book.e_book || !book.special_books"
                color="blue darken-1"
                text
                :href="book.file"
                target="_blank"
                >Скачать</v-btn
              >
            </v-col>
            <v-col>
              <Datetime
                type="datetime"
                v-model="orderTime"
                :min-datetime="minDate"
                value-zone="Asia/Tashkent"
                zone="Asia/Tashkent"
              />
            </v-col>
            <v-col>
              <v-btn
                color="blue darken-1"
                text
                @click.prevent="orderBook"
                :disabled="bookCount === 0"
                >Заказать</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Settings } from 'luxon'
Settings.defaultLocale = 'uz'
import { Datetime } from 'vue-datetime'
export default {
  name: 'BookDialog',
  data() {
    return {
      dialog: false,
      orderTime: null,
      minDate: new Date().toISOString(),
      bookCount: this.book.real_time_count
    }
  },
  components: {
    Datetime
  },
  methods: {
    orderBook() {
      this.$store
        .dispatch('book/orderBook', {
          time_of_get: this.orderTime,
          user: this.$store.state.auth.authUser_id,
          book: this.book.id
        })
        .then(() => {
          this.dialog = false
        })
    }
  },
  props: ['book']
}
</script>

<style lang="scss">
.vdatetime-input {
  border: 1px solid blue;
}
</style>
