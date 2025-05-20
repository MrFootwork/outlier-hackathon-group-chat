<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'

import CardMessage from './CardMessage.vue'

import { useRoomsStore } from '../stores/rooms'
import { useUsersStore } from '../stores/users'
import { useMessagesStore } from '../stores/messages'

import { useOpenAI } from '../composables/useOpenAI'

const theme = useTheme()
// useOpenAI needs to be called so the timer for random messages runs
useOpenAI()

/***************
 * Stores
 **************/
const roomsStore = useRoomsStore()
const { rooms, selectedRoomID, roomMembers, roomMessages, typingInRoom } = storeToRefs(roomsStore)

const messagesStore = useMessagesStore()
const { messages } = storeToRefs(messagesStore)

const usersStore = useUsersStore()
const { typingUser } = storeToRefs(usersStore)

/***************************
 * Component states & Refs
 **************************/
const inputMessage = ref('')

const messagesContainer = ref(null)

const scrollDownButtonColor = computed(() => {
  return theme.global.current.value.dark ? 'rgba(34,34,34, 0.9)' : 'rgba(255,255,255, 0.9)'
})
const sendButtonColor = computed(() => {
  return theme.global.current.value.dark ? 'rgba(255,255,255, 1)' : 'rgba(0,0,0, 1)'
})
const cardColor = computed(() => (theme.global.current.value.dark ? '#222' : '#fff'))

/***************
 * SCROLLING
 **************/
const scrolledUp = ref(false)
const scrollThreshold = 150

function handleScroll() {
  if (!messagesContainer.value) return

  const el = messagesContainer.value.$el || messagesContainer.value
  // 150px threshold for "at bottom"
  scrolledUp.value = el.scrollTop + el.clientHeight < el.scrollHeight - scrollThreshold
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      const el = messagesContainer.value.$el || messagesContainer.value
      el.scrollTop = el.scrollHeight
      scrolledUp.value = false
    }
  })
}

// Scroll to bottom when new messages are added
watch(() => roomMessages.value.length, scrollToBottom)

// Scroll to bottom when the selected room changes
watch(() => selectedRoomID.value, scrollToBottom)

// Scroll to bottom on page load
onMounted(() => {
  scrollToBottom()
  const el = messagesContainer.value?.$el || messagesContainer.value
  if (el) el.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  const el = messagesContainer.value?.$el || messagesContainer.value
  if (el) el.removeEventListener('scroll', handleScroll)
})

/********************
 * Message handling
 *******************/
// BUG breaks when sending a message while sendMessage is processing
async function sendMessage() {
  if (!inputMessage.value) return

  // Add Message
  messagesStore.addMessage({
    id: Date.now(),
    text: inputMessage.value,
    senderID: usersStore.myUserID,
    roomID: selectedRoomID.value,
    time: new Date().toISOString(),
  })

  // Reset input
  inputMessage.value = ''
}
</script>

<template>
  <v-container class="chat-area">
    <v-container class="header">
      <v-container class="room-info pa-0 d-flex flex-row align-center">
        <v-avatar
          :image="rooms.find(r => r.id === selectedRoomID).avatar"
          size="48"
        />
        <v-container>
          <h4>{{ rooms.find(r => r.id === selectedRoomID).name }}</h4>
          <p class="text-grey text-caption">{{ roomMembers.length }} members</p>
        </v-container>
      </v-container>

      <v-container class="room-members d-flex flex-row align-center justify-end">
        <v-tooltip
          v-for="member in roomMembers.slice(0, 3)"
          :text="member.name"
          location="bottom"
          offset="20"
        >
          <template v-slot:activator="{ props }">
            <v-avatar
              v-bind="props"
              :key="member.id"
              class="member-avatar"
              :image="member.avatar"
              size="24"
            />
          </template>
        </v-tooltip>

        <!-- Show "+N" avatar if there are more than 3 members -->
        <v-avatar
          v-if="roomMembers.length > 3"
          class="member-avatar"
          size="24"
          color="grey-lighten-2"
        >
          <span class="text-caption text-grey-darken-3 font-weight-bold">
            +{{ roomMembers.length - 3 }}
          </span>
        </v-avatar>
      </v-container>
    </v-container>

    <v-container class="display">
      <v-container
        ref="messagesContainer"
        class="messages d-flex flex-column align-stretch"
      >
        <CardMessage
          v-for="(message, i) in roomMessages"
          :key="message.id"
          :messages="{
            pre: messages[i - 1],
            this: message,
            next: messages[i + 1],
          }"
          :sender="roomMembers.find(member => member.id === message.senderID)"
          :isMine="message.senderID === usersStore.myUserID"
          class="mb-2"
        />
      </v-container>

      <v-container
        class="message-input pt-10"
        width="90%"
      >
        <v-text-field
          v-model="inputMessage"
          class="custom-input"
          variant="solo"
          hide-details
          placeholder="Start typing..."
          autocomplete="off"
          @keydown.enter="sendMessage"
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
                :color="scrollDownButtonColor"
              />
            </v-btn>
          </template>
        </v-text-field>

        <!-- Scroll Down Button -->
        <v-btn
          v-if="scrolledUp"
          class="scroll-to-bottom rounded"
          icon="mdi-arrow-down"
          :color="scrollDownButtonColor"
          @click="scrollToBottom"
        />
      </v-container>

      <!-- Typing Indicator -->
      <v-container
        v-if="typingUser && typingInRoom === selectedRoomID"
        class="typing-indicator__wrapper d-flex flex-row align-center"
        width="90%"
      >
        <v-avatar
          v-if="typingUser"
          class="member-avatar"
          :image="typingUser.avatar || ''"
          size="24"
        />

        <v-container class="typing-indicator__bubble">
          <div class="dot-elastic"></div>
        </v-container>
      </v-container>
    </v-container>
  </v-container>
</template>

<style lang="scss" scoped>
@use 'three-dots' with (
  $dot-color: #999
);

.scroll-to-bottom {
  position: absolute;
  bottom: 6rem;
  right: 3rem;
  z-index: 500;
  background-color: v-bind(scrollDownButtonColor);

  height: 3.5rem;
  width: 3.5rem;
  border-radius: 12px;
}

.typing-indicator__wrapper {
  z-index: 400;
  width: 5rem !important;
  position: absolute;
  bottom: 4.5rem;
  left: 2rem;
  gap: 1rem;

  .typing-indicator__bubble {
    background-color: v-bind(cardColor);
    padding: 1rem 2rem;
    width: 5rem;
    border-radius: 12px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.chat-area {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  padding: 0;

  .header {
    flex: 0 0 auto;
    padding: 0;

    display: flex;
    justify-content: space-between;

    & .member-avatar {
      margin-left: -0.25rem;
      transition: all 0.2s ease-in-out;

      &:hover {
        cursor: pointer;
        transform: scale(1.7);
        margin: 0 0.2rem;
        transition: all 0.2s ease-in-out;
      }
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
      background-image: url('../assets/chat-background.png');
      background-size: cover;
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
      scroll-behavior: smooth;
      padding: 0 clamp(2rem, calc(100% - 58vw), 20rem);

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
        background-color: v-bind(sendButtonColor);
        height: 3.5rem;
        width: 3.5rem;
        translate: 0.75rem;
        border-radius: 12px;
      }
    }
  }
}
</style>
