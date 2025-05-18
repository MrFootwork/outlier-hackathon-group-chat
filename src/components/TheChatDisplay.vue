<script setup>
import { ref } from 'vue'

const message = ref('')

function sendMessage() {
  // Logic to send a message
  console.log('Message sent!', message.value)
}
</script>

<template>
  <v-container class="chat-area">
    <v-container class="header">
      <div class="room-info">info</div>
      <div class="room-members">members</div>
    </v-container>

    <v-container class="display">
      <v-container class="messages d-flex flex-column">
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>

        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
        <v-card>Message</v-card>
      </v-container>

      <v-container
        class="message-input"
        width="90%"
      >
        <v-text-field
          v-model="message"
          class="custom-input"
          variant="solo"
          hide-details
          placeholder="Start typing..."
        >
          <template #append-inner>
            <v-btn
              variant="plain"
              class="send-button"
              @click="sendMessage"
              icon
            >
              <v-icon
                class="send-icon-bg"
                icon="mdi-send"
              />
            </v-btn>
          </template>
        </v-text-field>
      </v-container>
    </v-container>
  </v-container>
</template>

<style scoped>
.chat-area {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  padding: 0;

  & .header {
    flex: 0 0 auto;
    padding: 0;

    display: flex;
    justify-content: space-between;
  }

  & .display {
    flex: 1 1 0%;
    min-height: 0;
    padding: 0;

    display: flex;
    flex-direction: column;

    & .messages {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;

      & > * {
        min-height: 2rem;
      }
    }

    & .message-input {
      flex: 0 0 auto;
      display: flex;
      justify-content: center;

      & .custom-input:deep(.v-field) {
        border-radius: 12px;
        box-shadow: none;
        border: none;
      }

      & .send-button {
        height: 3.5rem;
        width: 3.5rem;
        translate: 1rem;
        background-color: #1976d2;
        border-radius: 12px;
      }
    }
  }
}
</style>
