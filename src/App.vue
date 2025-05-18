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
      <TheGroupChatSelector class="group-selector" />
      <TheChatDisplay class="chat-display" />
    </v-main>
  </v-app>
</template>

<style scoped>
.group-selector {
  max-width: 350px;
  width: 100%;
  flex-shrink: 0;
}

.chat-display {
  flex: 1;
  min-width: 0;
}
</style>
