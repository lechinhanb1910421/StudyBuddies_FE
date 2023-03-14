import payload from '@/services/posts.json'
class PostService {
  async getAllPosts() {
    return payload
  }
  async getPostById(postId) {
    if (payload[postId] != undefined) {
      return payload[postId]
    } else {
      return null
    }
  }
}
export default new PostService()
