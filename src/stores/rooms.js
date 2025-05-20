import { defineStore } from 'pinia'
import { ref } from 'vue'

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
