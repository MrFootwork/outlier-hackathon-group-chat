<script setup>
import RoomButton from './SelectorGroupButton.vue'

const items = [
  {
    id: 1,
    name: 'Group Chat 1',
    lastMessage: 'Hello, how are you?',
    time: '10:30 AM',
  },
  {
    id: 2,
    name: 'Group Chat 2',
    lastMessage: 'See you later!',
    time: '11:00 AM',
  },
  {
    id: 3,
    name: 'Group Chat 3',
    lastMessage: "Let's meet tomorrow.",
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
      v-for="item in items"
      :key="item.id"
      :room="item"
    />
  </v-container>
</template>

<style scoped>
.custom-input ::v-deep .v-field {
  border-radius: 16px;
  box-shadow: none;
}
</style>
