<script scoped>
import FriendBar from '../components/FriendBar.vue'
import UserPost from '@/components/UserPost.vue'
import { loggedInUserStorage } from '@/stores/loggedInUser'
import router from '@/routers/index'
import PostService from '@/services/Post.service'
import MyDateTimeService from '@/services/myDateTime.service'
import UserService from '@/services/User.service'
export default {
  props: ['id'],
  components: { FriendBar, UserPost },
  setup() {
    const userStore = loggedInUserStorage()
    return {
      userStore
    }
  },
  data() {
    return {
      post: '',
      createdDate: '',
      postOwner: ''
    }
  },
  methods: {
    async getPost() {
      this.post = await PostService.getPostById(this.$keycloak.token, this.id)
      this.createdDate = MyDateTimeService.parseTimeStringToDate({ timeString: this.post.createdTime })
      this.postOwner = await UserService.getUserById(this.$keycloak.token, this.post.userId)
    },
    goToMain() {
      router.push({ name: 'home' })
    },
    goToProfile() {
      const value = this.postOwner.userId
      router.push({ name: 'userProfile', params: { id: value } })
    }
  },
  async created() {
    await this.getPost()
  }
}
</script>
<template>
  <div class="container-fluid">
    <div class="main_page">
      <div class="detailBar">
        <div class="detailBar_titles">Post Onwer:</div>
        <div class="profile_tile" v-if="this.postOwner" @click="goToProfile">
          <img :src="this.postOwner.avatars[0].avaUrl" class="avatar_img" alt="Avatar" />
          <span class="profile_name">{{ this.postOwner.fullName }}</span>
        </div>
        <div class="detailBar_titles">Post Topic:</div>
        <div class="topic_ctn">
          <i class="fas fa-tags menu_icon"></i>
          <span class="detailBar_labels">{{ this.post.topicName }}</span>
        </div>
        <div class="detailBar_titles">Post Major:</div>
        <div class="major_ctn">
          <i class="fas fa-graduation-cap menu_icon"></i>
          <span class="detailBar_labels">{{ this.post.majorName }}</span>
        </div>
        <div class="detailBar_labels" style="padding-left: 15px" v-if="this.createdDate">Created Date: {{ createdDate }}</div>
      </div>

      <div class="postCtn">
        <div v-if="post" class="detailPostWrapper">
          <UserPost :post="post" :allowModify="post.userId == this.userStore.user.userId" @postDeleted="goToMain" @postEdited="getPost"></UserPost>
        </div>
      </div>
      <div class="friendBar">
        <FriendBar></FriendBar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detailBar_labels {
  font-size: 18px;
  font-weight: 600;
}
.menu_icon {
  font-size: 23px;
}
.topic_ctn,
.major_ctn {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
  background-color: rgb(255 255 255 / 0.3);
  border-radius: 0.5rem;
}
.topic_ctn:hover,
.major_ctn:hover {
  background-color: rgb(255 255 255 / 0.45);
}
.detailBar_titles {
  font-size: 20px;
  font-weight: 600;
  padding-left: 15px;
  color: white;
  padding-bottom: 5px;
}
.avatar_img {
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.profile_tile {
  padding-inline-start: 15px;
  height: 55px;
  background-color: rgb(255 255 255 /0.3);
  display: flex;
  gap: 15px;
  padding-right: 5px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 17px;
  transition: background-color linear 0.1s;
  cursor: pointer;
}
.profile_name {
  font-size: 17px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile_tile:hover {
  background-color: rgb(255 255 255 /0.45);
}
.container-fluid {
  padding-inline: 0;
}
.detailBar {
  color: white;
  padding: 10px;
  padding-top: 15px;
  position: fixed;
  top: 70px;
  height: 100vh;
  left: 0;
  width: 24%;
}
.main_page {
  background-color: #181a1d;
  padding-top: 61px;
  display: block;
  min-height: 100vh;
}
.postCtn {
  background-color: #181a1d;
  margin-left: 29%;
  margin-right: 26%;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>

<style>
.detailPostWrapper .post_ctn {
  margin-bottom: 0;
}
.detailPostWrapper .comments_ctn {
  max-height: none;
}
</style>
