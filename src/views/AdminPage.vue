<script>
import router from '@/routers/index'
import AdminService from '@/services/Admin.service'
export default {
  data() {
    return {
      isForbidden: true,
      isLoaded: false,
      briefStats: ''
    }
  },
  methods: {
    goToNewfeed() {
      router.push({ name: 'home' })
    },
    async getStats() {
      try {
        this.briefStats = await AdminService.getAllUsers(this.$keycloak.token)
        this.isForbidden = false
        console.table(this.briefStats)
      } catch (error) {
        this.isForbidden = true
      }
      this.isLoaded = true
    }
  },
  async created() {
    this.isLoaded = false
    await this.getStats()
  }
}
</script>
<template>
  <div class="container-fluid">
    <Transition name="fade">
      <div v-if="!this.isLoaded" class="preloader_ctn">
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
      <div class="inform_ctn" v-if="this.isForbidden && this.isLoaded">
        <div class="inform_main">
          <i class="fas fa-tools fa-spin"></i>
          <span class="main_title">FORBIDDEN</span>
        </div>
        <div class="inform_sub">
          <div>STOP! You do not have permission to view this page.</div>
        </div>
        <div class="redirect_ctn">
          <button type="button" class="redirect_btn btn" @click="goToNewfeed">Back To NewFeed</button>
        </div>
      </div>
      <div v-if="!this.isForbidden && this.isLoaded" class="stats_ctn">
        <div class="catalogue_title">Brief Overview</div>
        <div class="overview_ctn">
          <div class="overview_users overview_detail_ctn">
            <div class="overview_detail_title">Number of Users:</div>
            <div class="overview_users_stats">
              <span>{{ briefStats.numOfUsers }}</span>
            </div>
          </div>
          <div class="overview_posts overview_detail_ctn">
            <div class="overview_detail_title">Number of Posts:</div>
            <div class="overview_posts_stats">
              <span>{{ briefStats.numOfPosts }}</span>
            </div>
          </div>
        </div>
        <div class="catalogue_title">User Details</div>
        <div class="cat_user_ctn">
          <div class="cat_user">preserved for detail users</div>
        </div>
        <div class="catalogue_title">Post Details</div>
        <div class="cat_posts_ctn">
          <div class="cat_posts">preserved for detail posts</div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
hr {
  border-bottom: 2px solid white;
  opacity: 0.7;
}
.overview_posts_stats {
  font-size: 95px;
  font-weight: 700;
  text-align: center;
  color: #049695;
  display: flex;
  justify-content: center;
}
.overview_users_stats {
  font-size: 95px;
  font-weight: 700;
  color: #0978c1;
  text-align: center;
  display: flex;
  justify-content: center;
}
.overview_detail_title {
  font-size: 24px;
  font-weight: 700;
  padding-top: 7px;
  padding-left: 15px;
}
.overview_posts {
  outline: 7px solid #54bab9;
}
.overview_users {
  outline: 7px solid #93c6e7;
}
.cat_user,
.cat_posts {
  color: white;
  font-size: 30px;
  font-weight: 600;
}
.cat_user_ctn,
.cat_posts_ctn {
  background-color: rgb(255 255 255 / 0.3);
  width: 90%;
  height: 150px;
  margin-left: 5%;
}
.overview_detail_ctn {
  height: 100%;
  background-color: rgb(230 230 230);
  width: 27%;
  border-radius: 1rem;
  box-shadow: 4px 4px 17px 6px rgb(255 255 255 / 0.8);
}
.overview_ctn {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 130px;
  height: 200px;
  margin-bottom: 30px;
}
.catalogue_title {
  font-size: 45px;
  font-weight: 600;
  color: #fff;
  padding-left: 100px;
}
.stats_ctn {
  width: 90%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
}
.redirect_ctn {
  text-align: center;
}
.redirect_btn {
  color: white;
  width: 250px;
  font-size: 20px;
  font-weight: 700;
  background-color: #54bab9;
}
.inform_main {
  text-align: center;
  opacity: 0.6;
}
.main_title {
  padding-left: 40px;
}
.inform_sub {
  font-size: 47px;
  font-weight: 600;
  opacity: 0.6;
}
.inform_ctn {
  font-size: 100px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
}
.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: #171717;
  min-height: 100vh;
}

.preloader_ctn {
  display: flex;
  align-items: center;
  height: 100%;
  padding-bottom: 50px;
  position: fixed;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
