<script>
import router from '@/routers/index'
import AdminService from '@/services/Admin.service'
import AdminUserTile from '@/components/AdminUserTile.vue'
import AdminPostTile from '@/components/AdminPostTile.vue'
import PostService from '@/services/Post.service'
export default {
  components: { AdminUserTile, AdminPostTile },
  data() {
    return {
      isForbidden: true,
      isLoaded: false,
      briefStats: '',
      users: '',
      posts: ''
    }
  },
  methods: {
    goToNewfeed() {
      router.push({ name: 'home' })
    },
    async getStats() {
      try {
        this.briefStats = await AdminService.getBriefStats(this.$keycloak.token)
        this.users = await AdminService.getAllUsers(this.$keycloak.token)
        this.posts = await PostService.getAllPosts(this.$keycloak.token)
        this.isForbidden = false
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
      <section>
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
          <div class="catalogue_ctn">
            <div class="users_del_ctn">
              <div class="catalogue_title">User Details</div>
              <div class="cat_user_ctn" v-if="this.users.length > 0">
                <div v-for="(user, index) in this.users" :key="index">
                  <AdminUserTile :user="user"></AdminUserTile>
                </div>
              </div>
            </div>
            <div class="posts_del_ctn">
              <div class="catalogue_title">Post Details</div>
              <div class="cat_posts_ctn" v-if="this.posts.length > 0">
                <div v-for="(post, index) in this.posts" :key="index">
                  <AdminPostTile @postDeleted="getStats" :post="post"></AdminPostTile>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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

.cat_user_ctn,
.cat_posts_ctn {
  background-color: rgb(230 230 230);
  border-radius: 0.75rem;
  height: 600px;
  overflow-y: scroll;
  padding-left: 7px;
  padding-top: 10px;
  margin-top: 10px;
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

.posts_del_ctn {
  flex: 5;
}

.users_del_ctn {
  flex: 4;
}

.catalogue_title {
  font-size: 45px;
  font-weight: 600;
  color: #fff;
  padding-left: 40px;
}

.catalogue_ctn {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
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
}</style>
