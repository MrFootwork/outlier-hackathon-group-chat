<script setup>
import { ref } from 'vue'

const theme = ref('light')
const drawer = ref(true)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-app :theme="theme">
    <v-navigation-drawer
      v-model="drawer"
      app
      permanent
      :width="80"
      color="highlight-dark"
    >
      <v-list class="d-flex flex-column align-center">
        <v-list-item>
          <v-btn
            icon
            variant="plain"
            slim
            @click="toggleTheme"
          >
            <v-icon :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <h1>Main Content</h1>
      </v-container>
      <!-- <h1>Main Content</h1> -->
    </v-main>
  </v-app>
</template>

<style scoped></style>
