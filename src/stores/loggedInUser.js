import { defineStore } from 'pinia'
import UserService from '@/services/User.service'
export const loggedInUserStorage = defineStore('loggedInUser', {
  state: () => ({
    user: {
      userId: '',
      userName: '',
      loginName: '',
      givenName: '',
      familyName: '',
      fullName: '',
      createdDate: '',
      isActive: '',
      activeAvatar: '',
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
      if (this.user.isActive == '') {
        this.user = await UserService.getCurrentUser(access_token)
      }
    },
    async getUserActiveAvatar() {
      for (let i = 0; i < this.user.avatars.length; i++) {
        const avatar = this.user.avatars[i]
        if (avatar.isActive == 1) {
          return avatar.avaUrl
        }
      }
      return '';
    }
  }
})
