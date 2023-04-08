<script>
import myDateTimeService from '@/services/myDateTime.service'
import AdminService from '@/services/Admin.service'
import router from '@/routers/index'
export default {
  props: ['user'],
  data() {
    return {
      createdTime: '',
      postsCount: ''
    }
  },
  methods: {
    async getPostsCount() {
      this.postsCount = await AdminService.getUserPostsCount(this.$keycloak.token, this.user.userId)
    },
    goToProfile() {
      const value = this.user.userId
      router.push({ name: 'userProfile', params: { id: value } })
    }
  },
  async created() {
    this.createdTime = myDateTimeService.parseTimeStringToDate({ timeString: this.user.createdDate })
    await this.getPostsCount()
  }
}
</script>
<template>
  <div class="user_ctn">
    <div class="ava_col">
      <img :src="user.avatars[0].avaUrl" alt="..." class="user_avatar" />
    </div>
    <div class="info_col">
      <div class="header_ctn">
        <div class="user_name">{{ user.fullName }}</div>
        <div class="btn-group">
          <button class="btn_dropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><button class="dropdown-item" type="button" @click="goToProfile">Go to profile</button></li>
          </ul>
        </div>
      </div>
      <div class="user_info_ctn">
        <span class="user_info"><strong>ID: </strong> {{ user.userId }}</span>
        <span class="user_info"><strong>Join on: </strong>{{ this.createdTime }}</span>
        <span class="user_info" v-if="this.postsCount > 2"><strong>Total Posts: </strong>{{ postsCount }}</span>
        <span class="user_info" v-else><strong>Total Post: </strong>{{ postsCount }}</span>
      </div>
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

.user_info {
  padding-right: 10px;
  font-size: 18px;
  font-weight: 500;
}
.user_name {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
}
.user_avatar {
  aspect-ratio: 1/1;
  border-radius: 50%;
  height: 65px;
  outline: 5px solid #0978c1;
}
.header_ctn {
  display: flex;
}
.info_col {
  flex: 5;
}
.ava_col {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_ctn {
  background-color: #93c6e7;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  margin-bottom: 10px;
  border: 3px solid #0978c1;
}
</style>
