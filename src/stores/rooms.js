import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultRooms = [
  {
    id: 1,
    name: 'Project Alpha Team',
    lastMessage: 'The latest draft is ready for review.',
    time: '10:30 AM',
    members: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: 'Family Group',
    lastMessage: 'Dinner at 7 tonight?',
    time: '11:00 AM',
    members: [4, 5, 6],
  },
]

export const useRoomsStore = defineStore('rooms', () => {
  const rooms = ref(defaultRooms)
  const selectedRoomID = ref(1)

  function selectRoom(roomID) {
    selectedRoomID.value = roomID
  }

  return {
    rooms,
    selectedRoomID,
    selectRoom,
  }
})
