import createApiClient from '@/services/api.service'
class PostService {
  constructor(baseURL = '/post_resources') {
    this.api = createApiClient(baseURL)
  }
  async getAllPosts(access_token) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get()).data
  }
  async getPostById(access_token, postId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/' + postId)).data
  }
  async createPost(access_token, payload) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.post('/', payload)).data
  }
  async getPostComments(access_token, postId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/' + postId + '/comments')).data
  }
}
export default new PostService()
