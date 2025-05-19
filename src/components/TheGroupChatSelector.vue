<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoomsStore } from '../stores/rooms'

import RoomButton from './RoomButton.vue'

const roomsStore = useRoomsStore()
const { rooms } = storeToRefs(roomsStore)

const search = ref('')

const filteredRooms = computed(() => {
  if (!search.value) return rooms.value
  return rooms.value.filter((room) => room.name.toLowerCase().includes(search.value.toLowerCase()))
})
</script>

<template>
  <v-container>
    <h4 class="text-h4 mb-6">Messages</h4>

    <v-text-field
      v-model="search"
      append-inner-icon="mdi-magnify"
      variant="solo"
      class="custom-input"
      placeholder="Search"
    />

    <RoomButton
      v-for="room in filteredRooms"
      :key="room.id"
      :room="room"
      :search="search"
    />
  </v-container>
</template>

<style scoped>
.custom-input:deep(.v-field) {
  border-radius: 16px;
  box-shadow: none;
}
</style>
