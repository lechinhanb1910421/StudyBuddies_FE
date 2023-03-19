import createApiClient from '@/services/api.service'
class UserServiceOff {
  constructor(baseURL = '/user_resources') {
    this.api = createApiClient(baseURL)
  }
  async getAllUsers(access_token) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get()).data
  }
  async getAllUserById(access_token, userId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/id/' + userId)).data
  }
  async getCurrentUser(access_token) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/whoami')).data
  }
}
export default new UserServiceOff()
