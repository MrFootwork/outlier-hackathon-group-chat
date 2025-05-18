<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()
</script>

<template>
  <v-container class="chat-area">
    <v-container class="header">
      <div class="room-info">info</div>
      <div class="room-members">members</div>
    </v-container>

    <v-container
      class="display"
      :style="{ backgroundColor: theme.current.value.colors.primary }"
    >
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

      <v-container class="message-input">
        <v-text-field class="input-field">Input</v-text-field>
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

      & .input-field {
        width: 80%;
      }
    }
  }
}
</style>
