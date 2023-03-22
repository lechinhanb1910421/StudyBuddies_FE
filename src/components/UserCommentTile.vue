<script>
import UserService from '@/services/User.service'
import MyDateTimeService from '@/services/myDateTime.service'
export default {
  props: ['cmt'],
  data() {
    return {
      user: { userId: '', userName: '', loginName: '', givenName: '', familyName: '', fullName: '', avatars: [] },
      cmtCreatedAt: '',
      cmtCreTime: ''
    }
  },
  methods: {
    async getCmtUser() {
      this.user = await UserService.getUserById(this.$keycloak.token, this.cmt.userId)
    },
    async parseTime() {
      this.cmtCreatedAt = MyDateTimeService.parseTimeString({ timeString: this.cmt.createdTime })
      this.cmtCreTime = MyDateTimeService.getTimeDifference({ timeString: this.cmt.createdTime })
    }
  },
  async mounted() {
    await this.getCmtUser()
    await this.parseTime()
  }
}
</script>
<template>
  <div class="cmt_ctn">
    <div v-if="this.user.userId">
      <img :src="this.user.avatars[0].avaUrl" class="cmt_ava" alt="..." />
    </div>
    <div class="cmt_main">
      <div class="cmt_main_header" v-if="this.user.userId">
        <span class="cmt_user_name">{{ this.user.fullName }}</span>
        <tippy :content="this.cmtCreatedAt">
          <span class="cmt_user_creTime">{{ this.cmtCreTime }}</span>
        </tippy>
      </div>
      <div class="cmt_main_text">
        <span> {{ this.cmt.content }}</span>
      </div>
      <!-- <input type="text" class="form-control" placeholder="Leave a comment" /> -->
    </div>
  </div>
</template>
<style scoped>
.cmt_main_header {
  display: flex;
}
.cmt_user_name {
  font-weight: 700;
}
.cmt_user_creTime {
  position: relative;
  font-size: 15px;
  padding-left: 10px;
  opacity: 0.9;
}
.cmt_user_creTime:hover .cmt_user_creTime_full {
  display: flex;
}
.cmt_ctn {
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
