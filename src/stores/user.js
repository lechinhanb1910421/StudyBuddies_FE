import { defineStore } from 'pinia'
import UserService from '@/services/User.service'
export const userStorage = defineStore('user', {
  state: () => ({
    user: {
      userId: '',
      userName: '',
      loginName: '',
      givenName: '',
      familyName: '',
      fullName: '',
      avatars: []
    }
  }),
  actions: {
    // async getAllUsers() {
    //   this.users = await UserService.getAllUsers()
    // },
    async getUserById(access_token, id) {
      return await UserService.getUserById(access_token, id)
    },
    async getCurrentUser(access_token) {
      this.user = await UserService.getCurrentUser(access_token)
      this.user.fullName = this.user.givenName + ' ' + this.user.familyName
    }
  }
})
