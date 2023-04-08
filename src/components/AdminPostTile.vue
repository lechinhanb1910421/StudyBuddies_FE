<script>
import myDateTimeService from '@/services/myDateTime.service'
import PostService from '@/services/Post.service'
import AdminService from '@/services/Admin.service'
import router from '@/routers/index'
export default {
  emits: ['postDeleted'],
  props: ['post'],
  data() {
    return {
      createdTime: '',
      totalComments: 0,
      totalReactions: 0
    }
  },
  methods: {
    goToProfile() {
      const value = this.post.userId
      router.push({ name: 'userProfile', params: { id: value } })
    },
    async getPostStats() {
      try {
        const cmt_payload = await PostService.getPostComments(this.$keycloak.token, this.post.postId)
        this.totalComments = cmt_payload.length ?? 0
        const react_payload = await PostService.getReactedUsers(this.$keycloak.token, this.post.postId)
        this.totalReactions = react_payload.length ?? 0
      } catch (error) {
        router.push({ name: 'notFound' })
      }
    },
    async deletePost() {
      await AdminService.deletePost(this.$keycloak.token, this.post.postId)
      this.$emit('postDeleted')
    }
  },
  async created() {
    this.createdTime = myDateTimeService.parseTimeStringToDate({ timeString: this.post.createdTime })
    await this.getPostStats()
  }
}
</script>
<template>
  <div class="post_ctn">
    <div class="info_col">
      <div class="info_top_col">
        <div class="info_postId"><Strong>Id: </Strong>{{ post.postId }}</div>
        <div class="info_content"><strong>Content: </strong>{{ post.content }}</div>
      </div>
      <div class="info_bottom_col">
        <span> <Strong>UserId: </Strong>{{ post.userId }} </span>
        <span> <Strong>Cre On: </Strong>{{ createdTime }} </span>
        <span> <Strong>Comments: </Strong>{{ totalComments }} </span>
        <span> <Strong>Reactions: </Strong>{{ totalReactions }} </span>
      </div>
    </div>
    <div class="img_col">
      <img v-if="post.picUrls[0].length > 0" :src="post.picUrls[0]" alt="..." class="post_img" />
    </div>
    <div class="ctrl_btn_ctn">
      <button class="btn_dropdown" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><button class="dropdown-item" type="button" @click="goToProfile">View Creator Profile</button></li>
        <li><button class="dropdown-item" type="button" @click="deletePost">Delete Post</button></li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.dropdown-item {
  font-weight: 500;
}
.btn_dropdown {
  padding-inline: 7px;
  padding-block: 4px;
  border-radius: 0.5rem;
  background-color: transparent;
  border: none;
  margin-right: 4px;
}
.btn_dropdown:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
.ctrl_btn_ctn {
  position: absolute;
  top: 1px;
  left: 4px;
}
.info_bottom_col span {
  padding-right: 20px;
}
.info_bottom_col {
  max-height: 50px;
  width: 100%;
}
.info_content {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 70px;
}
.info_postId {
  min-width: 55px;
}
.info_top_col {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: 70px;
  padding-bottom: 5px;
}
.post_img {
  margin: 10px;
  border-radius: 0.4rem;
  width: 100%;
  height: 95px;
  object-fit: cover;
  outline: 4px solid #049695;
}
.info_col {
  width: 80%;
  padding-left: 10px;
}
.img_col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-left: 10px;
  padding-right: 5px;
}
.post_ctn {
  background-color: #6bd2d1;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  margin-bottom: 10px;
  border: 3px solid #049695;
  font-size: 17px;
  position: relative;
}
</style>
