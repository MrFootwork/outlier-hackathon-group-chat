import { defineStore } from 'pinia'
import { ref } from 'vue'

const myUserID = 4

const defaultUsers = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=64',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
  {
    id: 4,
    name: 'Bob Brown',
    avatar: 'https://i.pravatar.cc/150?img=54',
  },
  {
    id: 5,
    name: 'Mommy Doe',
    avatar: 'https://i.pravatar.cc/150?img=22',
  },
  {
    id: 6,
    name: 'Bro Doe',
    avatar: 'https://i.pravatar.cc/150?img=51',
  },
]

export const useUsersStore = defineStore('users', () => {
  const users = ref(defaultUsers)
  const typingUser = ref(null)

  function setTypingUser(user) {
    if (!user) typingUser.value = null
    typingUser.value = user
  }

  return {
    users,
    myUserID,
    typingUser,
    setTypingUser,
  }
})
