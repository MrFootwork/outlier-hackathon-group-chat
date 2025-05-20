import { watch } from 'vue'
import OpenAI from 'openai'
import { storeToRefs } from 'pinia'

import { useRoomsStore } from '../stores/rooms'
import { useMessagesStore } from '../stores/messages'
import { useUsersStore } from '../stores/users'

/**
 * Composable for interacting with the OpenAI API in a group chat context.
 *
 * @returns {Object} - Contains the sendChat function.
 */
export function useOpenAI() {
  // State Dependencies
  const usersStore = useUsersStore()
  const { users } = storeToRefs(usersStore)

  const roomsStore = useRoomsStore()
  const { rooms } = storeToRefs(roomsStore)

  const messagesStore = useMessagesStore()
  const { messages } = storeToRefs(messagesStore)

  // Initialize OpenAI client with API keys
  const keys = {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    project: import.meta.env.VITE_OPENAI_PROJECT_ID,
    organization: import.meta.env.VITE_OPENAI_ORG_ID,
  }

  const client = new OpenAI({ ...keys, dangerouslyAllowBrowser: true })

  /*************************************************
   * Timer to send messages at random intervals.
   ************************************************/
  let timeoutId

  function startTimer() {
    if (timeoutId) clearTimeout(timeoutId)

    const delay = Math.floor(Math.random() * 2000) + 2000

    timeoutId = setTimeout(async () => {
      // Random room and responder
      const randomRoomsIndex = Math.floor(Math.random() * rooms.value.length)
      const randomRoom = rooms.value[randomRoomsIndex]
      const roomMessages = messages.value.filter(m => m.roomID === randomRoom.id)
      const roomMembers = randomRoom.members.map(m => users.value.find(user => user.id === m))
      const otherMembers = randomRoom.members.filter(m => m !== usersStore.myUserID)
      const membersWithoutLastSender = otherMembers.filter(m => m !== roomMessages.at(-1).senderID)
      const randomResponderIndex = Math.floor(Math.random() * membersWithoutLastSender.length)
      const responder = users.value.find(
        user => user.id === membersWithoutLastSender[randomResponderIndex]
      )

      const randomDelay = () => Math.floor(Math.random() * 2000) + 3000

      // Wait for responder to start typing
      await new Promise(resolve =>
        setTimeout(() => {
          // Start typing
          usersStore.setTypingUser(responder)
          roomsStore.setTypingInRoom(randomRoom.id)
          resolve()
        }, randomDelay())
      )

      // Wait for responder to finish typing
      await new Promise(resolve => setTimeout(resolve, randomDelay()))

      // Request chat response
      const response = await sendChat(responder, roomMessages, roomMembers)

      // Store response
      messagesStore.addMessage({
        id: Date.now() + 1,
        text: response,
        senderID: responder.id,
        roomID: randomRoom.id,
        time: new Date().toISOString(),
      })

      // Stop typing
      usersStore.setTypingUser(null)
      roomsStore.setTypingInRoom(null)
    }, delay)
  }

  // Run timer after initial load (messages initialized)
  if (messages.value.length > 0) startTimer()

  // Start timer when messages change
  watch(
    () => messages.value.length,
    (newVal, oldVal, onCleanup) => {
      console.log('MESSAGES CHANGED')
      startTimer()
      onCleanup(() => clearTimeout(timeoutId))
    }
  )

  /**
   * Sends a chat message to the OpenAI API and returns the AI's response.
   *
   * @param {Object} responder - The member object representing the AI responder (must have `id` and `name`).
   * @param {Array} contextMessages - Array of message objects in the chat context (each with `senderID` and `text`).
   * @param {Array} contextMembers - Array of all member objects in the chat (each with `id` and `name`).
   * @param {string} [model='gpt-4.1-nano'] - The OpenAI model to use.
   * @returns {Promise<string>} - The cleaned response text from the AI.
   */
  async function sendChat(responder, contextMessages, contextMembers, model = 'gpt-4.1-nano') {
    // Build context
    const systemMessage = `
    This is a group chat with ${contextMembers.map(m => m.name).join(', ')}.
    You are ${responder.name}.
    Please respond to the messages in the context of this group chat.
    Ask questions to keep the conversation engaging and flowing.`

    const reshapedMessages = contextMessages.map(message => {
      const role = message.senderID === responder.id ? 'assistant' : 'user'
      const authorName = contextMembers.find(m => m.id === message.senderID).name

      return { role, content: `[${authorName}]: ${message.text}` }
    })

    const chatContext = [
      {
        role: 'developer',
        content: systemMessage,
      },
      ...reshapedMessages,
      {
        role: 'assistant',
        content: '',
      },
    ]

    // Request response
    const response = await client.responses.create({
      input: chatContext,
      model,
      max_output_tokens: 1024,
      store: true,
    })

    // Cleanup response
    const cleanedResponse = response.output_text
      .replace(/^\s*\[[^\]]+\]:\s*/, '')
      .replace(/\n/g, ' ')
      .trim()

    return cleanedResponse
  }

  return { sendChat }
}
