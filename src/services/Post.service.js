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
  async getSearchedPosts(access_token, sQuery) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/search', { params: { keywords: sQuery } })).data
  }
  async updatePost(access_token, payload, postId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.put('/' + postId, payload)).data
  }
  async deletePost(access_token, postId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.delete('/' + postId)).data
  }
  async getReactedUsers(access_token, postId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get('/' + postId + '/reacts')).data
  }
  async reactPost(access_token, postId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.post('/' + postId + '/react')).data
  }
  async unReactPost(access_token, postId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.delete('/' + postId + '/react')).data
  }
}
export default new PostService()
