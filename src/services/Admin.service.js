import createApiClient from '@/services/api.service'
class AdminService {
  constructor(baseURL = '/admin_resources') {
    this.api = createApiClient(baseURL)
  }
  async getBriefStats(access_token) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get()).data
  }
  async getAllUsers(access_token) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/users')).data
  }
  async getUserPostsCount(access_token, userId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/users/' + userId + '/posts/count')).data
  }
  async deletePost(access_token, postId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.delete('/posts/' + postId)).data
  }
}
export default new AdminService()
