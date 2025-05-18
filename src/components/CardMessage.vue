<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const { messages, sender } = defineProps({
  messages: {
    pre: { text: String, senderID: Number, time: String },
    this: { text: String, senderID: Number, time: String },
    next: { text: String, senderID: Number, time: String },
  },
  sender: {
    id: Number,
    name: String,
    avatar: String,
  },
})

const badgeBorderColor = computed(() => (theme.global.current.value.dark ? '#222' : '#fff'))
</script>

<template>
  <v-container class="message-item pa-0 d-flex flex-row align-start">
    <v-avatar
      :image="sender.avatar"
      size="48"
    />

    <v-container class="pt-0">
      <h5>{{ sender.name }}</h5>
      <p class="card-message pa-3">{{ messages.this.text }}</p>
    </v-container>
  </v-container>
</template>

<style scoped>
.card-message {
  background-color: v-bind(badgeBorderColor);
  border-radius: 12px;
}
</style>
