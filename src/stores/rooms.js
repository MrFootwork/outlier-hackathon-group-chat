import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useUsersStore } from './users'
import { useMessagesStore } from './messages'

const defaultRooms = [
  {
    id: 1,
    name: 'Project Alpha Team',
    time: '10:30 AM',
    members: [1, 2, 3, 4],
    avatar: 'https://cdn.pixabay.com/photo/2015/02/07/10/10/giraffes-627031_1280.jpg',
  },
  {
    id: 2,
    name: 'Family Group',
    time: '11:00 AM',
    members: [4, 5, 6],
    avatar:
      'https://media.istockphoto.com/id/2186721397/de/foto/hands-holding-paper-family-cutout-family-home-life-insurance-adoption-foster-care-homeless.jpg?s=2048x2048&w=is&k=20&c=5S0Oh7j3-MiMT-7kukIeU3i5A04iPvZ3I6dP5mMV7Y0=',
  },
]

export const useRoomsStore = defineStore('rooms', () => {
  // Dependencies
  const usersStore = useUsersStore()
  const { users } = storeToRefs(usersStore)

  const messagesStore = useMessagesStore()
  const { messages } = storeToRefs(messagesStore)

  // State
  const rooms = ref(defaultRooms)
  const selectedRoomID = ref(1)
  const typingInRoom = ref(null)

  // Computed Values
  const roomMembers = computed(() => {
    return rooms.value
      .find(room => room.id === selectedRoomID.value)
      ?.members.map(memberID => {
        return users.value.find(user => user.id === memberID)
      })
  })

  const roomMessages = computed(() => {
    return messages.value.filter(message => message.roomID === selectedRoomID.value)
  })

  // Actions
  function selectRoom(roomID) {
    selectedRoomID.value = roomID
  }

  function setTypingInRoom(roomID) {
    if (!roomID) typingInRoom.value = null
    typingInRoom.value = roomID
  }

  return {
    rooms,
    selectedRoomID,
    selectRoom,
    roomMembers,
    roomMessages,
    typingInRoom,
    setTypingInRoom,
  }
})
