<script>
import PostCommentGroup from '@/components/PostCommentGroup.vue'
import { loggedInUserStorage } from '@/stores/loggedInUser'
import MyDateTimeService from '@/services/myDateTime.service'
import PostService from '@/services/Post.service'
import EditPostModal from '@/components/EditPostModal.vue'
import router from '@/routers/index'
export default {
  emits: ['postDeleted', 'postEdited'],
  components: { PostCommentGroup, EditPostModal },
  props: ['post', 'allowModify'],
  data() {
    return {
      user: {
        userId: '',
        userName: '',
        loginName: '',
        givenName: '',
        familyName: '',
        avatars: []
      },
      userCurrentAva: '',
      postCreatedAt: '',
      postCreTime: '',
      postCommentCount: 0,
      postReactionCount: 0,
      editModalId: '',
      reactedUsers: [],
      reactedUsersDisplayed: '',
      isReacted: false
    }
  },
  setup() {
    const userStore = loggedInUserStorage()
    return {
      userStore
    }
  },
  methods: {
    async parseTime() {
      this.postCreatedAt = MyDateTimeService.parseTimeString({ timeString: this.post.createdTime })
      this.postCreTime = MyDateTimeService.getTimeDifference({ timeString: this.post.createdTime })
    },
    async getUserInfo() {
      let access_token = this.$keycloak.token
      this.user = await this.userStore.getUserById(access_token, this.post.userId)
      this.user.userName = this.user.givenName + ' ' + this.user.familyName
      this.userCurrentAva = this.user.avatars[0].avaUrl
    },
    setNoOfComment(value) {
      this.postCommentCount = value
    },
    setNoOfReaction(value) {
      this.postReactionCount = value
    },
    async deletePost() {
      const data = await PostService.deletePost(this.$keycloak.token, this.post.postId)
      if (data.message == 'Post was deleted successfully') {
        this.$emit('postDeleted')
      }
    },
    callReloadPosts() {
      this.$emit('postEdited')
    },
    async getReactedUsers() {
      this.isReacted = false
      this.postReactionCount = 0
      const payload = await PostService.getReactedUsers(this.$keycloak.token, this.post.postId)
      if (payload.message && payload.message == 'This post has no reaction yet') {
        return
      } else {
        this.reactedUsers = payload
        this.postReactionCount = payload.length
        var display = ''
        payload.forEach((element) => {
          if (element.userId == this.userStore.user.userId) {
            this.isReacted = true
          }
          display += element.fullName + '<br/>'
        })
        this.reactedUsersDisplayed = display
      }
    },
    async reactPost(event) {
      event.target.blur
      if (this.isReacted) {
        await PostService.unReactPost(this.$keycloak.token, this.post.postId)
      } else {
        await PostService.reactPost(this.$keycloak.token, this.post.postId)
      }
      this.isReacted = !this.isReacted
      await this.getReactedUsers()
    },
    gotoUserProfile() {
      const value = this.user.userId
      router.push({ name: 'userProfile', params: { id: value } })
    }
  },
  async mounted() {
    this.editModalId = 'editPostModal' + this.post.postId
    await this.getUserInfo()
    await this.getReactedUsers()
    await this.parseTime()
  }
}
</script>

<template v-if="this.post">
  <!-- <button type="button" style="display: none" ref="editModal" data-bs-toggle="modal" data-bs-target="#editPostModal">toggle edit</button> -->

  <div class="modal modal-lg fade" :id="editModalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <EditPostModal :oldPost="this.post" @postEdited="callReloadPosts"></EditPostModal>
  </div>
  <div class="post_ctn" :id="this.post.postId">
    <section class="p_header">
      <div class="p_header_info">
        <div class="p_header_ava" @click="gotoUserProfile">
          <img :src="this.userCurrentAva" class="posts_ava" alt="..." />
        </div>
        <div class="p_header_name" @click="gotoUserProfile">{{ this.user.userName }}</div>
      </div>
      <div class="p_header_subinfo">
        <div class="p_header_creTime">
          <tippy :content="this.postCreatedAt">
            <i class="far fa-clock"></i>
            <span>{{ this.postCreTime }}</span>
          </tippy>
        </div>
        <tippy :content="this.post.majorName">
          <div class="p_header_major">
            <i class="fas fa-graduation-cap"></i>
            <span>{{ this.post.majorName }}</span>
          </div>
        </tippy>
        <div v-if="this.allowModify">
          <div class="dropdown">
            <div data-bs-toggle="dropdown" class="post_modi_dd" aria-expanded="false">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><div class="dropdown-item" data-bs-toggle="modal" :data-bs-target="'#' + this.editModalId">Edit Post</div></li>
              <li><div class="dropdown-item" data-bs-toggle="modal" data-bs-target="#deletePost_confirm">Delete Post</div></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="p_content">
      <div class="p_content_text">{{ this.post.content }}</div>
      <div class="p_content_img" v-if="this.post.picUrls[0]">
        <img :src="this.post.picUrls[0]" class="post_content" alt="..." />
      </div>
      <div class="p_stats">
        <tippy :content="this.reactedUsersDisplayed" :offset="[10, 10]" interactive="true">
          <div class="p_stats_like" :class="{ stats_reacted: this.isReacted }">
            <i class="far fa-heart"> </i>
            <span>{{ this.postReactionCount }}</span>
          </div>
        </tippy>
        <div class="p_stats_no_cmt">
          <span>{{ this.postCommentCount }}</span>
          <span>comments</span>
        </div>
      </div>

      <hr class="hr-white" />
      <div class="p_ctrl">
        <button class="btn p_ctrl_btn_bg btn_like" @click="reactPost" :class="{ btn_reacted: this.isReacted }" type="button">
          <i class="far fa-heart"> </i>
          <span>Love</span>
        </button>
        <button class="btn p_ctrl_btn_bg btn_cmt" type="button">
          <i class="far fa-comment"></i>
          <span>Comment</span>
        </button>
        <button class="btn p_ctrl_btn_bg btn_share" type="button">
          <i class="fas fa-share-alt"></i>
          <span>Share</span>
        </button>
      </div>
      <hr class="hr-white" />
      <PostCommentGroup :postId="this.post.postId" @comment-count="setNoOfComment"></PostCommentGroup>
    </section>
  </div>
  <div class="modal fade" id="deletePost_confirm" tabindex="-1" aria-labelledby="deletePost_title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deletePost_title">Delete this post ?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">Are you sure you want to delete this post?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn_close" data-bs-dismiss="modal">No</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deletePost">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-close {
  background-color: rgb(255 255 255 / 0.5);
  border-radius: 50%;
  padding: 10px;
}
.modal-dialog {
  color: white;
}
.modal-footer button {
  width: 100px;
}
.btn_close {
  background-color: #373737;
  color: white;
  border: none;
}
.btn_close:hover {
  background-color: rgb(255 255 255 /0.3);
}
.modal-content {
  background-color: #373737;
}
.dropdown-item {
  font-weight: 600;
  font-size: 17px;
}
.dropdown-item:hover {
  background-color: rgb(220 220 220);
}
.dropdown-menu {
  background-color: rgb(170 170 170);
}
.post_modi_dd {
  padding-inline: 11px;
  padding-block: 7px;
  background-color: rgb(255 255 255 /0.2);
  border-radius: 50%;
}
.p_ctrl i {
  padding-right: 5px;
}
.p_ctrl {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-inline: 30px;
}
.p_ctrl_btn_bg {
  background-color: rgb(255 255 255 /0.15);
}
.p_ctrl button {
  color: white;
  font-size: 16px;
  font-weight: 700;
  flex: 1;
}
.p_ctrl button:hover {
  background-color: rgb(255 255 255 /0.3);
}
.p_stats_like i,
.p_stats_no_cmt span {
  padding-right: 8px;
}
.p_stats {
  padding-top: 10px;
  padding-left: 30px;
  color: white;
  display: flex;
  opacity: 0.9;
  font-size: 17px;
  font-weight: 500;
  gap: 50px;
}
hr.hr-white {
  margin: 10px;
  border-top: 1px solid white;
}
.p_content_text {
  padding: 20px;
  padding-top: 5px;
  color: white;
  font-size: 17px;
}
.p_content_img {
  display: flex;
  justify-content: center;
}
.p_content_img img {
  max-width: 100%;
  max-height: 100%;
}
.post_ctn {
  background-color: rgb(255 255 255 /0.1);
  border-radius: 0.75rem;
  margin-bottom: 3%;
}
.p_content {
  padding-bottom: 5px;
}
.p_header {
  /* background-color: rgb(255 255 255 /0.4); */
  display: flex;
  align-self: center;
  padding-inline: 5px;
}
.p_header_info {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  padding: 10px;
  overflow: hidden;
}
.p_header_name {
  font-size: 18px;
  color: white;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.p_header_name:hover {
  text-decoration: underline;
}
.p_header_subinfo {
  flex: 1;
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
  color: white;
  gap: 10px;
}
.p_header_creTime,
.p_header_major {
  padding: 8px;
  padding-inline: 11px;
  border-radius: 0.75rem;
  background-color: rgb(255 255 255 /0.15);
  max-width: 230px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.p_header_creTime span,
.p_header_major span {
  padding-left: 5px;
  font-weight: 600;
  font-size: 15px;
}
.posts_ava {
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.btn_reacted:focus,
.btn_like:focus {
  outline: none;
  color: white;
}
.stats_reacted {
  color: #ff7878;
}
.btn_reacted {
  color: #ff7878 !important;
  outline: 3px solid rgb(255 120 120 /0.8) !important;
}
</style>
