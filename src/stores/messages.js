import { defineStore } from 'pinia'
import { ref } from 'vue'

const now = new Date()

const startingMessagesRoom1 = Array.from({ length: 17 }, (_, i) => {
  const texts = [
    // Bob Brown (4)
    'Hey fam, anyone home yet?',
    // Mommy Doe (5)
    'Just got back from the store. Do we need anything else for dinner?',
    // Bro Doe (6)
    'Can we have pizza instead of pasta tonight?',
    // Bob Brown (4)
    'Pizza sounds good to me!',
    // Mommy Doe (5)
    'We had pizza two days ago! How about homemade burgers?',
    // Bro Doe (6)
    'Deal! Can I help with the fries?',
    // Bob Brown (4)
    "I'll set the table. What time are we eating?",
    // Mommy Doe (5)
    "Let's aim for 7pm. Bob, can you pick up some lettuce on your way?",
    // Bob Brown (4)
    'Sure thing, Mom. Anything else?',
    // Mommy Doe (5)
    'Maybe some ice cream for dessert?',
    // Bro Doe (6)
    'Yes! Chocolate, please!',
    // Bob Brown (4)
    'Chocolate it is. See you all soon.',
    // Mommy Doe (5)
    "Thanks, Bob! You're the best.",
    // Bro Doe (6)
    "I'll help clean up after dinner, promise.",
    // Mommy Doe (5)
    "That's what I like to hear!",
    // Bob Brown (4)
    'Family teamwork for the win.',
    // Mommy Doe (5)
    'Love you both. See you at dinner!',
  ]
  const senderIDs = [4, 5, 6, 4, 5, 6, 4, 5, 4, 5, 6, 4, 5, 6, 5, 4, 5]
  return {
    id: i + 1,
    text: texts[i],
    roomID: 2,
    senderID: senderIDs[i],
    time: new Date(now.getTime() - (24 - i) * 60000).toISOString(), // Each message 1 min apart
  }
})

const startingMessagesRoom2 = Array.from({ length: 17 }, (_, i) => {
  const texts = [
    // John Doe (1)
    'Hey everyone, how was your weekend?',
    // Jane Smith (2)
    'Pretty good! I went hiking. How about you all?',
    // Alice Johnson (3)
    'I finally finished that project I was working on. Feels great!',
    // Bob Brown (4)
    'Nice! I mostly relaxed and watched some movies.',
    // John Doe (1)
    'That sounds awesome. Alice, what project was it?',
    // Alice Johnson (3)
    'Just a small coding challenge. Learned a lot!',
    // Jane Smith (2)
    'Congrats! Maybe you can share some tips with us.',
    // Bob Brown (4)
    "Yeah, I'd love to see what you built.",
    // John Doe (1)
    'Anyone up for a group call later this week?',
    // Jane Smith (2)
    "I'm in! Thursday works for me.",
    // Alice Johnson (3)
    'Thursday is perfect.',
    // Bob Brown (4)
    'Count me in too!',
    // John Doe (1)
    "Great, I'll set it up and send the invite.",
    // Jane Smith (2)
    'Thanks, John!',
    // Alice Johnson (3)
    'Looking forward to it.',
    // Bob Brown (4)
    'Same here. See you all then!',
    // John Doe (1)
    'By the way, has anyone tried the new coffee place downtown?',
  ]
  const senderIDs = [1, 2, 3, 4, 1, 3, 2, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1]
  return {
    id: i + 1,
    text: texts[i],
    roomID: 1,
    senderID: senderIDs[i],
    time: new Date(now.getTime() - (24 - i) * 60000).toISOString(), // Each message 1 min apart
  }
})

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref([...startingMessagesRoom1, ...startingMessagesRoom2])

  function addMessage(message) {
    messages.value.push(message)
  }

  return {
    messages,
    addMessage,
  }
})
