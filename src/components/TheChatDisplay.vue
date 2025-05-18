<script setup>
import { ref, computed } from 'vue'
import CardMessage from './CardMessage.vue'

const message = ref('')

function sendMessage() {
  // Logic to send a message
  console.log('Message sent!', message.value)
}

const myUserId = 4

const members = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=64',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
  {
    id: 4,
    name: 'Bob Brown',
    avatar: 'https://i.pravatar.cc/150?img=54',
  },
]

const messages = [
  {
    id: 1,
    text: 'Hello, how are you?',
    senderID: 1,
    time: '10:30 AM',
  },
  {
    id: 2,
    text: 'I am good, thanks! How about you?',
    senderID: 2,
    time: '10:31 AM',
  },
  {
    id: 3,
    text: "Let's meet tomorrow.",
    senderID: 3,
    time: '10:32 AM',
  },
  {
    id: 4,
    text: 'Sure, sounds good!',
    senderID: 4,
    time: '10:33 AM',
  },
  {
    id: 5,
    text: 'See you later!',
    senderID: 1,
    time: '10:34 AM',
  },
  {
    id: 6,
    text: 'Goodbye!',
    senderID: 2,
    time: '10:35 AM',
  },
  {
    id: 7,
    text: 'Take care!',
    senderID: 3,
    time: '10:36 AM',
  },
  {
    id: 8,
    text: 'See you soon!',
    senderID: 4,
    time: '10:37 AM',
  },
  {
    id: 9,
    text: 'Have a great day!',
    senderID: 1,
    time: '10:38 AM',
  },
  {
    id: 10,
    text: 'You too!',
    senderID: 2,
    time: '10:39 AM',
  },
  {
    id: 11,
    text: 'Thanks!',
    senderID: 3,
    time: '10:40 AM',
  },
  {
    id: 12,
    text: 'No problem!',
    senderID: 4,
    time: '10:41 AM',
  },
  {
    id: 13,
    text: 'What are you working on?',
    senderID: 1,
    time: '10:42 AM',
  },
  {
    id: 14,
    text: 'Just some code for a project.',
    senderID: 2,
    time: '10:43 AM',
  },
  {
    id: 15,
    text: 'Sounds interesting!',
    senderID: 3,
    time: '10:44 AM',
  },
  {
    id: 16,
    text: 'Yeah, it is!',
    senderID: 4,
    time: '10:45 AM',
  },
  {
    id: 17,
    text: 'Let me know if you need help.',
    senderID: 1,
    time: '10:46 AM',
  },
  {
    id: 18,
    text: 'Thank you!',
    senderID: 2,
    time: '10:47 AM',
  },
  {
    id: 19,
    text: 'Will do!',
    senderID: 3,
    time: '10:48 AM',
  },
  {
    id: 20,
    text: 'Great!',
    senderID: 4,
    time: '10:49 AM',
  },
  {
    id: 21,
    text: 'How was your weekend?',
    senderID: 1,
    time: '10:50 AM',
  },
  {
    id: 22,
    text: 'It was good, thanks!',
    senderID: 2,
    time: '10:51 AM',
  },
  {
    id: 23,
    text: 'Did you do anything fun?',
    senderID: 3,
    time: '10:52 AM',
  },
  {
    id: 24,
    text: 'Went hiking!',
    senderID: 4,
    time: '10:53 AM',
  },
  {
    id: 25,
    text: 'Nice! I love hiking.',
    senderID: 1,
    time: '10:54 AM',
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
      <v-container class="messages d-flex flex-column align-stretch">
        <CardMessage
          v-for="(message, i) in messages"
          :key="message.id"
          :messages="{
            pre: messages[i - 1],
            this: message,
            next: messages[i + 1],
          }"
          :sender="members.find((member) => member.id === message.senderID)"
          :isMine="message.senderID === myUserId"
          class="mb-2"
        />
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

    overflow: hidden;
    border-top-left-radius: 1rem;

    display: flex;
    flex-direction: column;

    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;
      background-image: url('../assets/chat-background.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      filter: blur(4px);
      opacity: 0.5;
      pointer-events: none;
      border-top-left-radius: 1rem;
    }

    & .messages {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      /* display: flex;
      flex-direction: column;
      align-items: stretch; */
      gap: 8px;

      & > * {
        position: relative;
        z-index: 1;
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
        translate: 0.75rem;
        background-color: #1976d2;
        border-radius: 12px;
      }
    }
  }
}
</style>
