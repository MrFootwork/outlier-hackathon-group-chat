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
    members: [1, 2, 3],
  },
  {
    id: 3,
    name: 'Book Club',
    lastMessage: "Don't forget to bring your notes!",
    time: '11:30 AM',
    members: [2, 3, 4],
  },
]

export const useRoomsStore = defineStore('rooms', () => {
  const rooms = ref(defaultRooms)
  const selectedRoomID = ref(1)

  return {
    rooms,
    selectedRoomID,
  }
})
