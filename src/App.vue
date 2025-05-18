<script setup>
import { useTheme } from 'vuetify'
import TheNavigationDrawer from './components/TheNavigationDrawer.vue'

const theme = useTheme()
</script>

<template>
  <v-app :theme="theme.global.name.value">
    <TheNavigationDrawer />

    <v-main>
      <v-container>
        <h1>Main Content</h1>
      </v-container>
      <!-- <h1>Main Content</h1> -->
    </v-main>
  </v-app>
</template>

<style scoped></style>
