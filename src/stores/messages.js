import { defineStore } from 'pinia'
import { ref } from 'vue'

const now = new Date()
const defaultMessages = Array.from({ length: 25 }, (_, i) => {
  // Message data from your original array
  const texts = [
    'Hello, how are you?',
    'I am good, thanks! How about you?',
    "Let's meet tomorrow.",
    'Sure, sounds good!',
    'See you later!',
    'Goodbye!',
    'Take care!',
    'See you soon!',
    'Have a great day!',
    'You too!',
    'Thanks!',
    'No problem!',
    'What are you working on?',
    'Just some code for a project.',
    'Sounds interesting!',
    'Yeah, it is!',
    'Let me know if you need help.',
    'Thank you!',
    'Will do!',
    'Great!',
    'How was your weekend?',
    'It was good, thanks!',
    'Did you do anything fun?',
    'Went hiking!',
    'Nice! I love hiking.',
  ]
  const senderIDs = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1]
  return {
    id: i + 1,
    text: texts[i],
    roomID: 1,
    senderID: senderIDs[i],
    time: new Date(now.getTime() - (24 - i) * 60000).toISOString(), // Each message 1 min apart
  }
})

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref(defaultMessages)

  function addMessage(message) {
    messages.value.push(message)
  }

  return {
    messages,
    addMessage,
  }
})
