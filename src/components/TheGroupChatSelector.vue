<script setup>
import { storeToRefs } from 'pinia'
import { useRoomsStore } from '../stores/rooms'

import RoomButton from './RoomButton.vue'

const roomsStore = useRoomsStore()
const { rooms } = storeToRefs(roomsStore)
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
