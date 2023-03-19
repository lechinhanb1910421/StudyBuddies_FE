import { defineStore } from 'pinia'
import PostServiceOffline from '@/services/Post.service.offline'
export const postStorage = defineStore('post', {
  state: () => ({
    posts: []
  }),
  actions: {
    async getAllPosts() {
      const payload = await PostServiceOffline.getAllPosts()
      this.posts = payload
    },
    getPostsById(id) {
      return this.posts[id]
    }
  }
})
