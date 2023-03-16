import createApiClient from '@/services/api.service'
class PostService {
  constructor(baseURL = '/picture_resources') {
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
  async createPost(access_token, picUrl, postId) {
    const json_body = JSON.stringify(payload)
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.post('/' + postId, { params: { picUrl: picUrl } })).data
  }
}
export default new PostService()
