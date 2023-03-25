<script>
// import SearchMenuBar from '@/components/SearchMenuBar.vue'
import '@/assets/preloader.css'
import PostService from '@/services/Post.service'
import UserPost from '@/components/UserPost.vue'
import MenuTile from '@/components/MenuTile.vue'

export default {
  components: { UserPost, MenuTile },
  props: ['sQuery'],
  data() {
    return {
      posts: [],
      searchsLoaded: false,
      filters: ['Post', 'User', 'School', 'Major', 'Topic'],
      activeElement: 'Post'
    }
  },
  methods: {
    async getSearchedPosts() {
      this.searchsLoaded = false
      var access_token = this.$keycloak.token
      this.posts = await PostService.getSearchedPosts(access_token, this.sQuery)
      setTimeout(() => {
        this.searchsLoaded = true
      }, 272)
    },
    toggleActive(value) {
      this.activeElement = value
    }
  },
  async created() {
    this.getSearchedPosts()
  },

  watch: {
    sQuery: async function () {
      await this.getSearchedPosts()
    }
  }
}
</script>
<template>
  <div class="container-fluid">
    <section class="menu_container">
      <div class="search_title_ctn">
        <i class="fas fa-search menu_icon"></i>
        <span class="search_title">Search result</span>
      </div>
      <hr class="menu_hr" />
      <div class="filters_ctn">
        <div v-for="(title, index) in this.filters" :key="index">
          <MenuTile :titleName="title" :class="{ active: this.activeElement === title }" @toggle-active="toggleActive"></MenuTile>
        </div>
      </div>
    </section>
    <div class="mainCol">
      <Transition name="fade">
        <div v-if="!this.searchsLoaded" class="preloader_ctn">
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
      <div class="search_no_res" v-if="this.posts.length == 0 && this.searchsLoaded">
        <span class="search_no_res_inform">
          <i class="fas fa-dizzy fa-lg"></i>
          SORRY!
        </span>
        <br />
        <span class="search_no_res_text">
          We can not find anything related to "<strong> {{ this.sQuery }} </strong>"
        </span>
      </div>
      <Transition name="fade">
        <div v-if="this.searchsLoaded" style="padding-top: 20px">
          <div v-for="(post, index) in this.posts" :key="index">
            <UserPost :post="post"></UserPost>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style scoped>
.search_no_res_inform {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 100px;
  font-weight: 800;
  opacity: 0.6;
}
.search_no_res_text {
  font-size: 35px;
  font-weight: 600;
  opacity: 0.6;
}
.container-fluid {
  padding-inline: 0;
  background-color: #181a1d;
  padding-top: 61px;
  display: block;
  min-height: 100vh;
  display: flex;
  border-right: 1px solid white;
}
.mainCol {
  /* background-color: rgb(255 255 255 /0.2); */
  padding-inline: 16%;
  color: white;
  margin-left: 23%;
  /* background-color: rgb(255 255 255 /0.3); */
  flex-grow: 1;
}
.preloader_ctn {
  display: flex;
  align-items: center;
  height: 100%;
  padding-bottom: 180px;
  padding-left: 150px;
  position: fixed;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
/* .fade-enter, */
.fade-leave-to {
  opacity: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.active {
  background-color: rgb(255 255 255 /0.4);
}
.menu_hr {
  margin-block: 7px;
}
.menu_container {
  width: 23%;
  height: 100vh;
  color: white;
  padding: 10px;
  position: fixed;
  left: 0;
  border-right: 1px solid rgb(255 255 255 /0.2);
}
.search_title_ctn {
  height: 50px;
  padding-inline-start: 20px;
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
}
.menu_icon {
  font-size: 24px;
}
.filters_ctn {
  padding-inline: 15px;
  font-size: 20px;
}
.filters_ctn * {
  margin-bottom: 10px;
}
</style>
