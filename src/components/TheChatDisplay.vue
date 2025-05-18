<script setup>
import { ref } from 'vue'

const message = ref('')

function sendMessage() {
  // Logic to send a message
  console.log('Message sent!', message.value)
}

const members = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: 4,
    name: 'Bob Brown',
    avatar: 'https://i.pravatar.cc/300',
  },
]
</script>

<template>
  <v-container class="chat-area">
    <v-container class="header">
      <v-container class="room-info pa-0 d-flex flex-row align-center">
        <v-avatar
          image="https://i.pravatar.cc/300"
          size="48"
        />
        <v-container>
          <h4>Room Name</h4>
          <p class="text-grey text-caption">6 members</p>
        </v-container>
      </v-container>

      <v-container class="room-members d-flex flex-row align-center justify-end">
        <v-avatar
          v-for="member in members.slice(0, 3)"
          :key="member.id"
          class="member-avatar"
          :image="member.avatar"
          size="24"
        />
        <!-- Show "+N" avatar if there are more than 3 members -->
        <v-avatar
          v-if="members.length > 3"
          class="member-avatar"
          size="24"
          color="grey-lighten-2"
        >
          <span class="text-caption text-grey-darken-3 font-weight-bold">
            +{{ members.length - 3 }}
          </span>
        </v-avatar>
      </v-container>
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

    & .member-avatar {
      margin-left: -0.25rem;
    }
  }

  & .display {
    flex: 1 1 0%;
    min-height: 0;
    padding: 0;

    display: flex;
    flex-direction: column;

    outline: 1px solid #e0e0e0;

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
