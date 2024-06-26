import createApiClient from '@/services/api.service'
class PostService {
  constructor(baseURL = '/comment_resources') {
    this.api = createApiClient(baseURL)
  }
  async addCmtToPost(access_token, postId, cmt) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.post('/' + postId, null, { params: { content: cmt } })).data
  }
  async removeCmt(access_token, cmtId) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.delete('/' + cmtId)).data
  }
}
export default new PostService()
