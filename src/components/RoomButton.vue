<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'
import { useRoomsStore } from '../stores/rooms'
import { useMessagesStore } from '../stores/messages'

const theme = useTheme()

const roomsStore = useRoomsStore()
const { typingInRoom } = storeToRefs(roomsStore)

const messagesStore = useMessagesStore()
const { messages } = storeToRefs(messagesStore)

const badgeBorderColor = computed(() => (theme.global.current.value.dark ? '#222' : '#fff'))

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
  search: String,
})

function selectRoom() {
  console.log(`Selected room: ${props.room.id}`)
  roomsStore.selectRoom(props.room.id)
}

const lastMessage = computed(() =>
  messages.value.filter(message => message.roomID === props.room.id).at(-1)
)

// Highlight matching part of room name
const highlightedName = computed(() => {
  if (!props.search) return props.room.name
  const search = props.search.trim()
  if (!search) return props.room.name
  const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')
  return props.room.name.replace(regex, '<span class="highlight">$1</span>')
})

const messageCaption = computed(() => {
  if (typingInRoom.value === props.room.id) return '... typing'
  return lastMessage.value.text || ''
})
</script>

<template>
  <v-btn
    class="group-btn d-flex flex-row align-center justify-start px-0 py-2 mb-2 h-auto"
    variant="plain"
    @click="selectRoom"
  >
    <v-badge
      dot
      location="bottom end"
      color="primary"
      :offset-x="4"
      :offset-y="4"
      class="online-badge pl-2"
    >
      <v-avatar
        :image="room.avatar"
        size="48"
      />
    </v-badge>

    <v-container class="group-btn__content pa-2 d-flex flex-column align-start">
      <h3
        class="group-btn__name text-none"
        v-html="highlightedName"
      ></h3>
      <p
        class="group-btn__last-message text-grey text-caption"
        :class="{ typing: typingInRoom === props.room.id }"
      >
        {{ messageCaption }}
      </p>
    </v-container>
  </v-btn>
</template>

<style>
.highlight {
  background: yellow;
  color: inherit;
  border-radius: 3px;
  padding: 0 2px;
}

.v-theme--dark .highlight {
  background: hsl(60, 65%, 20%);
}
</style>

<style scoped>
.typing {
  color: var(--primary) !important;
}

.group-btn.v-btn.v-btn--variant-plain:not(.v-btn--active):not(.v-btn--disabled):not(:hover):not(
    :focus
  ) {
  opacity: 1 !important;
}

.group-btn {
  min-width: 0;
  width: 100%;
  height: 4rem;
  overflow: hidden;

  &:hover {
    background-color: var(--background-2);
  }

  &:active,
  &:focus {
    background-color: var(--background-3);
  }
}

.group-btn__content {
  flex: 1 1 0;
  overflow: hidden;
}

.group-btn__name,
.group-btn__last-message {
  white-space: nowrap;
  overflow: hidden;
  /* BUG ellipsis breaks because flex layouts with v-btn and v-container can't hide overflow correctly */
  text-overflow: ellipsis;
  margin: 0;
}

.v-badge.online-badge:deep(.v-badge__badge) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid v-bind(badgeBorderColor);
}
</style>
