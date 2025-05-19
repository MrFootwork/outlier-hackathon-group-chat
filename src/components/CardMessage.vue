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
  <div
    class="card-wrapper"
    :style="{ alignSelf: alignment }"
  >
    <v-container
      class="message-item w-auto pa-0 d-flex"
      :class="isMine ? 'flex-row-reverse' : 'flex-row'"
      :style="{ alignSelf: alignment }"
    >
      <v-avatar
        v-if="sender && sender.avatar"
        :image="sender.avatar"
        size="48"
      />

      <v-container
        class="ma-0 pt-0 pb-2 d-flex flex-column"
        :class="isMine ? 'align-end' : 'align-start'"
      >
        <h5
          v-if="sender && sender.name"
          class="pb-1"
          :class="isMine ? 'text-right' : 'text-left'"
        >
          {{ sender.name }}
        </h5>
        <p
          class="card-message pa-3"
          :class="isMine ? 'text-right' : 'text-left'"
        >
          {{ messages.this.text }}
        </p>
      </v-container>
    </v-container>
  </div>
</template>

<style scoped>
.card-wrapper {
  width: 100%;
}

.card-message {
  background-color: v-bind(badgeBorderColor);
  border-radius: 12px;
}
</style>
