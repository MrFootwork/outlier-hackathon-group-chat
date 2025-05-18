<script setup>
import RoomButton from './SelectorGroupButton.vue'

const rooms = [
  {
    id: 1,
    name: 'Project Alpha Team',
    lastMessage: 'The latest draft is ready for review.',
    time: '10:30 AM',
  },
  {
    id: 2,
    name: 'Family Group',
    lastMessage: 'Dinner at 7 tonight?',
    time: '11:00 AM',
  },
  {
    id: 3,
    name: 'Book Club',
    lastMessage: "Don't forget to bring your notes!",
    time: '11:30 AM',
  },
]
</script>

<template>
  <v-container>
    <h4 class="text-h4 mb-6">Messages</h4>

    <v-text-field
      append-inner-icon="mdi-magnify"
      variant="solo"
      class="custom-input"
      placeholder="Search"
    />

    <RoomButton
      v-for="room in rooms"
      :key="room.id"
      :room="room"
    />
  </v-container>
</template>

<style scoped>
.custom-input:deep(.v-field) {
  border-radius: 16px;
  box-shadow: none;
}
</style>
