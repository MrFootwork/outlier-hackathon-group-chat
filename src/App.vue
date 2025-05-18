<script setup>
import { useTheme } from 'vuetify'
import TheNavigationDrawer from './components/TheNavigationDrawer.vue'
import TheGroupChatSelector from './components/TheGroupChatSelector.vue'
import TheChatDisplay from './components/TheChatDisplay.vue'

const theme = useTheme()
</script>

<template>
  <v-app
    :theme="theme.global.name.value"
    class="d-flex flex-column"
  >
    <TheNavigationDrawer />

    <v-main class="d-flex flex-row justify-space-between">
      <TheGroupChatSelector class="width-40" />
      <TheChatDisplay class="width-60" />
    </v-main>
  </v-app>
</template>

<style scoped>
.width-40 {
  width: 40%;
}
.width-60 {
  width: 60%;
}
</style>
