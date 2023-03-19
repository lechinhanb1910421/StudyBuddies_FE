import { defineStore } from 'pinia'
import UserServiceOff from '@/services/User.service.off'
export const userStorage = defineStore('user', {
  state: () => ({
    users: []
  }),
  actions: {
    async getAllUsers() {
      const payload = await UserServiceOff.getAllUsers()
      this.users = payload
    },
    async getUserById(id) {
      return await UserServiceOff.getAllUserById(id)
    }
  }
})
