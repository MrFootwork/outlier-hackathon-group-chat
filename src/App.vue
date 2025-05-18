<script setup>
import { ref } from 'vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3">
      <v-spacer></v-spacer>

      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        slim
        @click="toggleTheme"
      >
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <h1>Main Content</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
