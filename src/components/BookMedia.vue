<template>
  <v-card class="d-flex flex-column" height="100%" width="100%">
    <v-img
      width="90"
      height="150"
      src="https://images-na.ssl-images-amazon.com/images/I/31o6m4snULL.jpg"
      class="mx-auto"
    />
    <v-card-text class="fill-height black--text flex-column text-body-1">
      <p class="text-body-1 font-weight-regular">
        <span class="font-weight-medium">Название: </span>{{ book.title }}
      </p>
      <p class="text-body-1 font-weight-regular">
        <span class="font-weight-medium">Автор: </span>{{ book.author }}
      </p>
    </v-card-text>
    <v-card-actions class="mx-auto mb-3">
      <book-dialog :book="book" />
    </v-card-actions>
  </v-card>
</template>

<script>
import BookDialog from '@/components/BookDialog.vue'
export default {
  name: 'BookMedia',
  components: {
    BookDialog
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>
