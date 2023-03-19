import { defineStore } from 'pinia'
import PostService from '@/services/Post.service'
export const postStorage = defineStore('post', {
  state: () => ({
    posts: []
  }),
  actions: {
    async getAllPosts(access_token) {
      var payload = await PostService.getAllPosts(access_token)
      this.posts = payload
    },
    getPostsById(id) {
      return this.posts[id]
    }
  }
})
