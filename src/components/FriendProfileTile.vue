<script>
import router from '@/routers/index'
export default {
  props: ['user'],
  methods: {
    goToProfile(userId) {
      router.push({ name: 'userProfile', params: { id: userId } })
    }
  }
}
</script>
<template lang="">
  <div class="profile_tile" v-if="this.user" @click="goToProfile(this.user.userId)">
    <img :src="this.user.avatars[0].avaUrl" class="avatar_img" alt="Avatar" />
    <span class="profile_name">{{ this.user.fullName }}</span>
  </div>
</template>
<style scoped>
.profile_tile {
  padding-inline-start: 15px;
  height: 50px;
  display: flex;
  gap: 10px;
  padding-left: 20px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 5px;
  transition: background-color linear 0.1s;
  cursor: pointer;
}
.profile_tile:hover {
  background-color: rgb(255 255 255 /0.4);
}
.profile_name {
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.avatar_img {
  height: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
