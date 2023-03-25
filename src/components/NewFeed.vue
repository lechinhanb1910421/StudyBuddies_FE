<script>
import UserPost from './UserPost.vue'
// import PostService from '@/services/Post.service'
import '@/assets/preloader.css'
import AddPostModal from '@/components/AddPostModal.vue'
import { postStorage } from '@/stores/post'
import { loggedInUserStorage } from '@/stores/loggedInUser'
import { storeToRefs } from 'pinia'
export default {
  components: { UserPost, AddPostModal },
  data() {
    return {
      currentAva: '',
      pageLoaded: false,
      currentAvatar: ''
    }
  },
  setup() {
    const postStore = postStorage()
    const userStore = loggedInUserStorage()
    const { user } = storeToRefs(userStore)
    return {
      postStore,
      userStore,
      user
    }
  },
  methods: {
    async getAllPost() {
      let access_token = this.$keycloak.token
      await this.postStore.getAllPosts(access_token)
    }
  },
  async mounted() {
    await this.getAllPost()
    setTimeout(() => {
      // this.pageLoaded = true
    }, 272)
  },
  watch: {
    user: function (value) {
      let avatar = value.avatars[0]
      for (let i = 1; i < value.avatars.length; i++) {
        const elem = value.avatars[i]
        if (elem.avaId > avatar.avaId) {
          avatar = elem
        }
      }
      this.currentAvatar = avatar.avaUrl
    }
  }
}
</script>
<template>
  <Transition name="fade">
    <div v-if="!this.pageLoaded" class="preloader_ctn">
      <div class="loader">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
        <div class="four"></div>
        <div class="five"></div>
        <div class="six"></div>
        <div class="seven"></div>
        <div class="eight"></div>
      </div>
    </div>
  </Transition>
  <Transition name="fade">
    <div v-if="this.pageLoaded">
      <AddPostModal @postAdded="getAllPost"></AddPostModal>

      <div class="container" v-if="this.userStore.user.userId">
        <div class="crePost_ctn">
          <div class="crePost_ava" v-if="this.currentAvatar">
            <img :src="this.currentAvatar" class="posts_ava" alt="..." />
          </div>
          <div class="crePost_input" data-bs-toggle="modal" data-bs-target="#addPostModal">
            <input type="text" class="form-control" placeholder="Hello Everett, how is your study?" disabled />
          </div>
        </div>
        <hr class="hr-white" />
        <div v-for="post in this.postStore.posts" :key="post">
          <div v-if="post">
            <UserPost
              :post="post"
              :allowModify="post.userId == this.userStore.user.userId"
              @postDeleted="getAllPost"
              @postEdited="getAllPost"></UserPost>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <!--  -->
</template>
<style scoped>
.preloader_ctn {
  display: flex;
  align-items: center;
  height: 100%;
  padding-bottom: 200px;
  padding-left: 57%;
  transform: translate(-50%);
  position: fixed;
}
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
  padding-left: 15%;
  padding-right: 9%;
  padding-bottom: 5%;
  min-height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
