<script>
import router from '@/routers/index'
import { loggedInUserStorage } from '@/stores/loggedInUser'
import CommentService from '@/services/Comment.service'
import MyDateTimeService from '@/services/myDateTime.service'
export default {
  emits: ['cmtDeleted'],
  props: ['cmt'],
  setup() {
    const loggedInUserStore = loggedInUserStorage()
    return {
      loggedInUserStore
    }
  },
  data() {
    return {
      cmtCreatedAt: '',
      cmtCreTime: ''
    }
  },
  methods: {
    async parseTime() {
      this.cmtCreatedAt = MyDateTimeService.parseTimeString({ timeString: this.cmt.createdTime })
      this.cmtCreTime = MyDateTimeService.getTimeDifference({ timeString: this.cmt.createdTime })
    },
    async deleteCmt() {
      const data = await CommentService.removeCmt(this.$keycloak.token, this.cmt.commentId)
      if (data.message == 'Comment was successfully removed') {
        this.$emit('cmtDeleted')
      }
    },
    gotoUserProfile() {
      const value = this.cmt.userId
      router.push({ name: 'userProfile', params: { id: value } })
    }
  },
  async mounted() {
    await this.parseTime()
  }
}
</script>
<template>
  <div class="cmt_ctn" v-if="this.cmt.userId">
    <div>
      <img :src="this.cmt.userAvatarUrl" class="cmt_ava" alt="..." />
    </div>
    <div class="cmt_main">
      <div class="cmt_main_header" v-if="this.cmt.userId">
        <span class="cmt_user_name" @click="gotoUserProfile">{{ this.cmt.userFullName }}</span>
        <tippy :content="this.cmtCreatedAt">
          <span class="cmt_user_creTime">{{ this.cmtCreTime }}</span>
        </tippy>
        <div style="flex-grow: 1"></div>
        <div v-if="this.loggedInUserStore.user.userId">
          <button
            class="btn del_cmt_btn"
            v-if="this.cmt.userId == this.loggedInUserStore.user.userId"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#deleteCmt_confirm">
            Delete
          </button>
        </div>
      </div>
      <div class="cmt_main_text">
        <span> {{ this.cmt.content }}</span>
      </div>
    </div>
  </div>
  <div class="modal fade" id="deleteCmt_confirm" tabindex="-1" aria-labelledby="deleteCmt_title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteCmt_title">Delete this comment ?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">Are you sure you want to delete this comment?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn_close" data-bs-dismiss="modal">No</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteCmt">Delete</button>
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
.del_cmt_btn {
  border-radius: 0.5rem;
  font-size: 14px;
  height: 25px;
  padding: 0 10px;
  color: white;
  opacity: 0.6;
  text-decoration: underline;
}
.cmt_main_header {
  display: flex;
  gap: 10px;
}
.cmt_user_name {
  font-weight: 700;
  cursor: pointer;
}
.cmt_user_name:hover {
  text-decoration: underline;
}
.cmt_user_creTime {
  position: relative;
  font-size: 15px;
  opacity: 0.9;
}
.cmt_user_creTime:hover .cmt_user_creTime_full {
  display: flex;
}
.cmt_ctn {
  padding-top: 5px;
  padding-left: 5px;
  display: flex;
  margin-bottom: 12px;
  gap: 6px;
}
.cmt_ava {
  height: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.cmt_main {
  background-color: rgb(255 255 255 /0.2);
  display: flex;
  padding: 5px;
  padding-left: 10px;
  margin-right: 10px;
  flex-direction: column;
  flex-grow: 1;
  color: white;
  border-radius: 1rem;
}
.cmt_main input {
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 1rem;
}
.cmt_main input::placeholder {
  color: white;
  opacity: 0.8;
}
</style>
