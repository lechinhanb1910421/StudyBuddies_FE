import createApiClient from '@/services/api.service'
class PostService {
  constructor(baseURL = '/resources') {
    this.api = createApiClient(baseURL)
  }
  async getAllPosts(access_token) {
    console.log('TOKEN IN SERVICE', access_token)
    this.api.defaults.headers.common = { Authorization: `bearer + ${access_token}` }
    return (await this.api.get('/')).data
  }
}
export default new PostService()
