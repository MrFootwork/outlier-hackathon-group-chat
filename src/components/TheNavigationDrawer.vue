<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const drawer = ref(true)
const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
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
          <v-icon
            :icon="theme.global.name.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          />
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped></style>
