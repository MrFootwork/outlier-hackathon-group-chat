<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const badgeBorderColor = computed(() => (theme.global.current.value.dark ? '#222' : '#fff'))

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-container class="d-flex flex-row align-center px-0 py-2">
    <v-badge
      dot
      location="bottom end"
      color="primary"
      :offset-x="4"
      :offset-y="4"
      class="online-badge"
    >
      <v-avatar
        image="https://i.pravatar.cc/300"
        size="48"
      />
    </v-badge>

    <v-container class="pa-2">
      <h4>{{ props.room.name }}</h4>
      <p class="text-grey text-caption">{{ props.room.lastMessage }}</p>
    </v-container>
  </v-container>
</template>

<style scoped>
.v-badge.online-badge:deep(.v-badge__badge) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid v-bind('badgeBorderColor');
}
</style>
