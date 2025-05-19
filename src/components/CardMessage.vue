<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const { messages, sender, isMine } = defineProps({
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
  isMine: {
    type: Boolean,
    default: false,
  },
})

const badgeBorderColor = computed(() => (theme.global.current.value.dark ? '#222' : '#fff'))
const alignment = computed(() => (isMine ? 'flex-end' : 'flex-start'))
</script>

<template>
  <div :style="{ alignSelf: alignment }">
    <v-container
      class="message-item w-auto pa-0 d-flex flex-row"
      :style="{ alignSelf: alignment }"
    >
      <v-avatar
        v-if="sender && sender.avatar"
        :image="sender.avatar"
        size="48"
      />

      <v-container class="pt-0">
        <h5 v-if="sender && sender.name">{{ sender.name }}</h5>
        <p class="card-message pa-3">{{ messages.this.text }}</p>
      </v-container>
    </v-container>
  </div>
</template>

<style scoped>
.card-message {
  background-color: v-bind(badgeBorderColor);
  border-radius: 12px;
}
</style>
