<script>
import UserPost from './UserPost.vue'
// import PostService from '@/services/Post.service'
import AddPostModal from '@/components/AddPostModal.vue'
import { postStorage } from '@/stores/post'
import { userStorage } from '@/stores/user'
export default {
  components: { UserPost, AddPostModal },
  data() {
    return {
      currentAva: ''
    }
  },
  setup() {
    const postStore = postStorage()
    const userStore = userStorage()
    return {
      postStore,
      userStore
    }
  },
  methods: {
    // async getAllPost_Offline() {
    //   await this.postStore.getAllPosts()
    // },
    async getAllPost() {
      let access_token = this.$keycloak.token
      await this.postStore.getAllPosts(access_token)
    },
    async getCurrentUser() {
      let access_token = this.$keycloak.token
      await this.userStore.getCurrentUser(access_token)
      this.currentAva = this.userStore.user.avatars[0].avaUrl
    },
    // async getPostById() {
    //   let access_token = this.$keycloak.token
    //   var post = await PostService.getPostById(10)
    // },
    showAddPostModal() {
      console.log('NEW POST WAS CALLED')
      // let elem = this.$refs.addNoteModal
      // console.log(elem)
      // $(elem).modal('show')
    }
  },
  async mounted() {
    await this.getAllPost()
    await this.getCurrentUser()
    // await this.getPostById()
    // await this.getAllPost_Offline()
  }
}
</script>
<template>
  <AddPostModal ref="addNoteModal"></AddPostModal>
  <div class="container">
    <div class="crePost_ctn">
      <div class="crePost_ava">
        <img :src="this.currentAva" class="posts_ava" alt="..." />
      </div>
      <div class="crePost_input" data-bs-toggle="modal" data-bs-target="#addPostModal">
        <input type="text" class="form-control" @click="showAddPostModal()" placeholder="Hello Everett, how is your study?" disabled />
      </div>
    </div>
    <hr class="hr-white" />
    <div v-for="post in this.postStore.posts" :key="post">
      <div v-if="post">
        <UserPost :post="post"></UserPost>
      </div>
    </div>
  </div>
</template>
<style scoped>
hr.hr-white {
  margin-inline: 10px;
  border-top: 1px solid white;
}
.crePost_ctn {
  margin-top: 15px;
  color: white;
  background-color: rgb(255 255 255 /0.1);
  display: flex;
  justify-content: center;
  border-radius: 0.75rem;
  padding: 12px;
  gap: 10px;
}
.crePost_ava {
  display: flex;
  justify-content: center;
  align-items: center;
}
.posts_ava {
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.crePost_input {
  flex-shrink: 0;
  flex-grow: 1;
}
.crePost_input input {
  height: 45px;
  background-color: rgb(255 255 255 /0.15);
  box-shadow: none;
  border: none;
  font-size: 17px;
  border-radius: 1.5rem;
}
.crePost_input input::placeholder {
  color: white;
  opacity: 0.7;
}
.container {
  padding-inline: 12%;
  padding-bottom: 5%;
}
</style>
