<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
  name: 'App',
  components: {
    AppBar,
    AppFooter
  }
}
</script>

<style lang="scss">
.v-btn--active {
  opacity: 1;
}
</style>
