import { defineStore } from 'pinia'
import UserService from '@/services/User.service'
export const usersStorage = defineStore('users', {
  state: () => ({
    users: {}
  }),
  actions: {
    async getStoredUser(userId) {
      const key = userId.toString()
      return this.users[key]
    },
    async getUserById(access_token, id) {
      const user = await this.getStoredUser(id)
      if (user == undefined) {
        const newUser = await UserService.getUserById(access_token, id)
        var key = id.toString()
        this.users[key] = newUser
        return this.users[key]
      } else {
        return user
      }
    }
  }
})
