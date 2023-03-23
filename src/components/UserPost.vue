<script>
import PostCommentGroup from '@/components/PostCommentGroup.vue'
import { loggedInUserStorage } from '@/stores/loggedInUser'
import MyDateTimeService from '@/services/myDateTime.service'
import EditPostModal from '@/components/EditPostModal.vue'
export default {
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
      postReactionCount: 0
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
    }
  },
  async mounted() {
    this.getUserInfo()
    this.parseTime()
  }
}
</script>

<template v-if="this.post">
  <!-- data-bs-toggle="modal" data-bs-target="#addPostModal" -->
  <EditPostModal></EditPostModal>
  <div class="post_ctn">
    <section class="p_header">
      <div class="p_header_info">
        <div class="p_header_ava">
          <img :src="this.userCurrentAva" class="posts_ava" alt="..." />
        </div>
        <div class="p_header_name">{{ this.user.userName }}<i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
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
            <i class="fas fa-ellipsis-v" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul class="dropdown-menu">
              <li><div class="dropdown-item">Edit Post</div></li>
              <li><div class="dropdown-item">Delete Post</div></li>
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
        <div class="p_stats_like">
          <i class="far fa-heart"> </i>
          <span>{{ this.postReactionCount }}</span>
        </div>
        <div class="p_stats_no_cmt">
          <span>{{ this.postCommentCount }}</span>
          <span>comments</span>
        </div>
      </div>

      <hr class="hr-white" />
      <div class="p_ctrl">
        <button class="btn p_ctrl_btn_bg btn_like" type="button">
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
</template>

<style scoped>
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
</style>
