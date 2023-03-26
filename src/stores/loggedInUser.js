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
    }
    // async getUserAvatar() {
    //   let avatar = this.user.avatars[0]
    //   for (let i = 1; i < this.user.avatars.length; i++) {
    //     const elem = this.user.avatars[i]
    //     if (elem.avaId > avatar.avaId) {
    //       avatar = elem
    //     }
    //   }
    //   return avatar.avaUrl
    // }
  }
})
