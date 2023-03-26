<script>
import router from '@/routers/index'
import { loggedInUserStorage } from '@/stores/loggedInUser'
import MyDateTimeService from '@/services/myDateTime.service'
import UserService from '@/services/User.service'
export default {
  props: ['id'],
  data() {
    return {
      user: {
        userId: '',
        userName: '',
        loginName: '',
        givenName: '',
        familyName: '',
        fullName: '',
        createdDate: '',
        avatars: []
      },
      currentAvatar: '',
      userCreatedDate: ''
    }
  },
  setup() {
    const userStore = loggedInUserStorage()
    return {
      userStore
    }
  },
  methods: {
    isNumeric(str) {
      if (typeof str != 'string') return false
      let isnum = /^\d+$/.test(str)
      return !isNaN(str) && isnum
    },
    async getUserInfo() {
      this.user = await UserService.getUserById(this.$keycloak.token, this.id)
      this.currentAvatar = this.user.avatars[0].avaUrl
      var userCreDate = this.user.createdDate ?? '2023-01-01T01:02:27Z'
      this.userCreatedDate = MyDateTimeService.parseTimeStringToDate({ timeString: userCreDate })
    }
  },
  async created() {
    if (this.id == undefined || this.id == '') {
      router.push({ name: 'notFound' })
    }
    if (!this.isNumeric(this.id)) {
      router.push({ name: 'notFound' })
    }
  },
  async mounted() {
    await this.getUserInfo()
  }
}
</script>
<template>
  <div class="container-fluid">
    <div class="brief_info_ctn">
      <div class="ava_col" v-if="this.currentAvatar">
        <img :src="this.currentAvatar" class="main_avatar" alt="" />
        <button type="button" class="edit_ava_button">
          <i class="fas fa-camera"></i>
        </button>
      </div>
      <div class="brief_infos" v-if="this.user.userId">
        <div class="user_name">{{ this.user.fullName }}</div>
        <div class="user_created_date">Member since {{ this.userCreatedDate }}</div>
      </div>
      <button type="button" class="edit_info_btn">
        <i class="fas fa-edit"></i>
        Edit profile
      </button>
    </div>
    <div class="main_profile">
      <div class="user_info_cnt">
        <h2>Preserved for user info column</h2>
      </div>
      <div class="main_col">
        <h1>Hello to your profile {{ userId }}</h1>
        <h3>Display add posts</h3>
        <h3>Display posts here</h3>
      </div>
    </div>
  </div>
</template>
<style scoped>
.edit_info_btn {
  padding: 5px 10px;
  background-color: #fff;
  position: absolute;
  bottom: 14px;
  right: 14px;
  padding: 4px 17px;
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-radius: 0.75rem;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.6);
  font-weight: 600;
}
.edit_info_btn:hover {
  background-color: rgba(255 255 255 / 0.3);
}
.edit_ava_button {
  background-color: #fff;
  padding: 5px 10px;
  position: absolute;
  bottom: -1px;
  right: -8px;
  padding: 4px 10px;
  border: 2px solid rgb(0 0 0 / 0.6);
  border-radius: 1rem;
}
.edit_ava_button:hover {
  background-color: rgb(200 200 200);
}
.main_avatar {
  height: 150px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  box-shadow: 6px 6px 12px 2px rgb(0 0 0 / 0.5);
  outline: 5px solid #54bab9;
}
.main_col {
  flex: 5;
}
.user_info_cnt {
  flex: 2;
}
.main_profile {
  width: 90%;
  background-color: rgb(255 255 255 /0.4);
  display: flex;
  gap: 10px;
}
.ava_col {
  width: 35%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  align-items: center;
  position: relative;
}
.user_created_date {
  font-size: 20px;
  font-weight: 600;
  opacity: 0.85;
  padding-left: 7px;
}
.user_name {
  font-size: 36px;
  font-weight: bold;
  padding-bottom: 5px;
}
.brief_infos {
  flex: 7;
}
.brief_info_ctn {
  width: 70%;
  height: 210px;
  background-color: rgb(255 255 255 /0.8);
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  position: relative;
}
.container-fluid {
  padding-inline: 10%;
  min-height: 100vh;
  background-color: #181a1d;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  padding-top: 69px;
}
.user_info_cnt {
  min-height: 100%;
}
.main_col {
  min-height: 100%;
}
</style>
