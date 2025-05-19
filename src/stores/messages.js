import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultMessages = [
  {
    id: 1,
    text: 'Hello, how are you?',
    roomID: 1,
    senderID: 1,
    time: '10:30 AM',
  },
  {
    id: 2,
    text: 'I am good, thanks! How about you?',
    roomID: 1,
    senderID: 2,
    time: '10:31 AM',
  },
  {
    id: 3,
    text: "Let's meet tomorrow.",
    roomID: 1,
    senderID: 3,
    time: '10:32 AM',
  },
  {
    id: 4,
    text: 'Sure, sounds good!',
    roomID: 1,
    senderID: 4,
    time: '10:33 AM',
  },
  {
    id: 5,
    text: 'See you later!',
    roomID: 1,
    senderID: 1,
    time: '10:34 AM',
  },
  {
    id: 6,
    text: 'Goodbye!',
    roomID: 1,
    senderID: 2,
    time: '10:35 AM',
  },
  {
    id: 7,
    text: 'Take care!',
    roomID: 1,
    senderID: 3,
    time: '10:36 AM',
  },
  {
    id: 8,
    text: 'See you soon!',
    roomID: 1,
    senderID: 4,
    time: '10:37 AM',
  },
  {
    id: 9,
    text: 'Have a great day!',
    roomID: 1,
    senderID: 1,
    time: '10:38 AM',
  },
  {
    id: 10,
    text: 'You too!',
    roomID: 1,
    senderID: 2,
    time: '10:39 AM',
  },
  {
    id: 11,
    text: 'Thanks!',
    roomID: 1,
    senderID: 3,
    time: '10:40 AM',
  },
  {
    id: 12,
    text: 'No problem!',
    roomID: 1,
    senderID: 4,
    time: '10:41 AM',
  },
  {
    id: 13,
    text: 'What are you working on?',
    roomID: 1,
    senderID: 1,
    time: '10:42 AM',
  },
  {
    id: 14,
    text: 'Just some code for a project.',
    roomID: 1,
    senderID: 2,
    time: '10:43 AM',
  },
  {
    id: 15,
    text: 'Sounds interesting!',
    roomID: 1,
    senderID: 3,
    time: '10:44 AM',
  },
  {
    id: 16,
    text: 'Yeah, it is!',
    roomID: 1,
    senderID: 4,
    time: '10:45 AM',
  },
  {
    id: 17,
    text: 'Let me know if you need help.',
    roomID: 1,
    senderID: 1,
    time: '10:46 AM',
  },
  {
    id: 18,
    text: 'Thank you!',
    roomID: 1,
    senderID: 2,
    time: '10:47 AM',
  },
  {
    id: 19,
    text: 'Will do!',
    roomID: 1,
    senderID: 3,
    time: '10:48 AM',
  },
  {
    id: 20,
    text: 'Great!',
    roomID: 1,
    senderID: 4,
    time: '10:49 AM',
  },
  {
    id: 21,
    text: 'How was your weekend?',
    roomID: 1,
    senderID: 1,
    time: '10:50 AM',
  },
  {
    id: 22,
    text: 'It was good, thanks!',
    roomID: 1,
    senderID: 2,
    time: '10:51 AM',
  },
  {
    id: 23,
    text: 'Did you do anything fun?',
    roomID: 1,
    senderID: 3,
    time: '10:52 AM',
  },
  {
    id: 24,
    text: 'Went hiking!',
    roomID: 1,
    senderID: 4,
    time: '10:53 AM',
  },
  {
    id: 25,
    text: 'Nice! I love hiking.',
    roomID: 1,
    senderID: 1,
    time: '10:54 AM',
  },
]

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref(defaultMessages)

  return {
    messages,
  }
})
