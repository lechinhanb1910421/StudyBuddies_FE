import createApiClient from '@/services/api.service'
import friends_payload from '@/assets/friend_list.json'
class UserServiceOff {
  constructor(baseURL = '/user_resources') {
    this.api = createApiClient(baseURL)
  }
  async getAllUsers(access_token) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get()).data
  }
  async getUserById(access_token, userId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/id/' + userId)).data
  }
  async getCurrentUser(access_token) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/whoami')).data
  }
  async getUserFriendsDemo() {
    return friends_payload
  }
  async getAllUserPosts(access_token, userId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/' + userId + '/posts')).data
  }
  async addUserAvatar(access_token, avaUrl) {
    const payload = { avaUrl: avaUrl }
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/avatars', payload)).data
  }
}
export default new UserServiceOff()
