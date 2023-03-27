<script>
import router from '@/routers/index'
import { loggedInUserStorage } from '@/stores/loggedInUser'
import MyDateTimeService from '@/services/myDateTime.service'
import UserService from '@/services/User.service'
import UserPost from '@/components/UserPost.vue'
import AddPostModal from '@/components/AddPostModal.vue'
export default {
  props: ['id'],
  components: { UserPost, AddPostModal },
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
      userCreatedDate: '',
      postsLoaded: false,
      posts: [],
      userMajor: '',
      majors: {
        '00': 'General',
        10: 'Information Technology',
        '01': 'Information System',
        '02': 'Computer Science',
        '06': 'Software Engineering',
        '03': 'Computer Network and Data Communication',
        '04': 'Multimedia Communication'
      }
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
      try {
        this.user = await UserService.getUserById(this.$keycloak.token, this.id)
      } catch (error) {
        router.push({ name: 'notFound' })
        return
      }
      this.currentAvatar = this.user.avatars[0].avaUrl
      var userCreDate = this.user.createdDate ?? '2023-01-01T01:02:27Z'
      this.userCreatedDate = MyDateTimeService.parseTimeStringToDate({ timeString: userCreDate })
      this.getAllUserPosts()
    },
    async getAllUserPosts() {
      this.postsLoaded = false
      this.posts = await UserService.getAllUserPosts(this.$keycloak.token, this.user.userId)
      var majorCode = this.user.loginName.slice(3, 5)
      this.userMajor = this.majors[majorCode]
      setTimeout(() => {
        this.postsLoaded = true
      }, 272)
    },
    checkValidUserId() {
      if (this.id == undefined || this.id == '') {
        router.push({ name: 'notFound' })
      }
      if (!this.isNumeric(this.id)) {
        router.push({ name: 'notFound' })
      }
    }
  },
  async created() {
    this.checkValidUserId()
  },
  async mounted() {
    await this.getUserInfo()
    // await this.getAllUserPosts()
  },
  watch: {
    id: async function () {
      this.checkValidUserId()
      await this.getUserInfo()
      await this.getAllUserPosts()
    }
  }
}
</script>
<template>
  <div class="container-fluid">
    <div class="brief_info_ctn">
      <div class="ava_col" v-if="this.currentAvatar">
        <img :src="this.currentAvatar" class="main_avatar" alt="" />
        <button type="button" class="edit_ava_button" v-if="this.user.userId == this.userStore.user.userId">
          <i class="fas fa-camera"></i>
        </button>
      </div>
      <div class="brief_infos" v-if="this.user.userId">
        <div class="user_name">{{ this.user.fullName }}</div>
        <div class="user_created_date">Member since {{ this.userCreatedDate }}</div>
      </div>
      <button type="button" class="edit_info_btn" v-if="this.user.userId == this.userStore.user.userId">
        <i class="fas fa-edit"></i>
        Edit profile
      </button>
    </div>
    <div class="main_profile">
      <div class="user_info_cnt">
        <div class="info_cnt_title">Info</div>
        <hr style="color: white; border: none; border-bottom: 2px solid rgb(255 255 255 / 0.8)" />
        <div class="info_tile">
          <span class="info_title">Student Code: </span>
          <span class="info_student_code">{{ this.user.loginName.toUpperCase() }}</span>
        </div>
        <div class="info_tile">
          <span class="info_title">Major: </span>
          <span class="info_student_code">{{ this.userMajor }}</span>
        </div>
        <div class="info_tile">
          <span class="info_title">School: </span>
          <span class="info_student_code">Can Tho University</span>
        </div>
        <div class="info_tile">
          <span class="info_title">Total posts: </span>
          <span class="info_student_code">{{ this.posts.length }}</span>
        </div>
      </div>
      <div class="main_col">
        <Transition name="fade">
          <div v-if="!this.postsLoaded" class="preloader_ctn">
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
        <div v-if="this.user.userId == this.userStore.user.userId">
          <AddPostModal @postAdded="getAllUserPosts"></AddPostModal>
          <div class="crePost_ctn">
            <div class="crePost_ava" v-if="this.currentAvatar">
              <img :src="this.currentAvatar" class="posts_ava" alt="..." />
            </div>
            <div class="crePost_input" data-bs-toggle="modal" data-bs-target="#addPostModal">
              <input type="text" class="form-control" :placeholder="'Hello ' + this.user.givenName + ', what is on your mind?'" disabled />
            </div>
          </div>
        </div>
        <div class="search_no_res" v-if="this.posts.length == 0 && this.postsLoaded">
          <span class="no_posts_inform"> You have no posts yet! </span>
        </div>
        <Transition name="fade">
          <div v-if="this.postsLoaded" style="padding-top: 20px">
            <div v-for="(post, index) in this.posts" :key="index">
              <UserPost :post="post"></UserPost>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<style scoped>
.info_cnt_title {
  color: white;
  font-size: 30px;
  font-weight: 700;
}
.info_tile {
  color: white;
  padding-bottom: 20px;
}
.info_title {
  font-size: 23px;
  font-weight: 600;
}
.info_student_code {
  font-size: 18px;
}
.crePost_ctn {
  margin-top: 5px;
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
.no_posts_inform {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 30px;
  font-weight: 600;
  opacity: 0.6;
  margin-top: 20px;
}
.no_posts_inform i {
  font-size: 80px;
  font-weight: 800;
}
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
  width: 67%;
  min-height: 100%;
  padding-inline: 3%;
}
.user_info_cnt {
  background-color: rgb(255 255 255 / 0.1);
  display: flex;
  flex-direction: column;
  width: 36%;
  padding-inline: 3%;
  padding-top: 2%;
  padding-bottom: 20px;
  border-radius: 1rem;
  margin-top: 5px;
  height: 100%;
}
.main_profile {
  width: 95%;
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
  width: 80%;
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
.preloader_ctn {
  display: flex;
  align-items: center;
  height: 100%;
  padding-bottom: 400px;
  padding-left: 250px;
  position: fixed;
}
</style>
