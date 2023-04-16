<script>
import FriendProfileTile from '@/components/FriendProfileTile.vue'
import GroupTile from '@/components/GroupTile.vue'
import UserService from '@/services/User.service'
export default {
  components: {
    FriendProfileTile,
    GroupTile
  },
  data() {
    return {
      friends: ''
    }
  },
  methods: {
    async getUserFiend() {
      this.friends = await UserService.getUserFriendsDemo()
    }
  },
  created() {
    this.getUserFiend()
  }
}
</script>
<template lang="">
  <section class="interact_bar">
    <div class="i_bar_titles">Groups</div>
    <div class="groups">
      <GroupTile
        :groupName="'AAVN'"
        :g-avatar="'https://firebasestorage.googleapis.com/v0/b/study-buddies-8b16e.appspot.com/o/shared%2Faxon_active_logo.jpg?alt=media&token=361d3a11-b10c-4f1a-94d9-82093e108094'"></GroupTile>
      <GroupTile
        :groupName="'Just the DANG'"
        :g-avatar="'https://firebasestorage.googleapis.com/v0/b/study-buddies-8b16e.appspot.com/o/shared%2Fjust_Dang_logo.png?alt=media&token=53dbfdac-459c-4163-a0bf-1daf50a66eff'"></GroupTile>
    </div>
    <hr class="i_bar_hr" />
    <div class="i_bar_titles">Friends</div>
    <div class="friends" v-if="this.friends.length > 0">
      <div v-for="(friend, index) in this.friends" :key="index">
        <FriendProfileTile :user="friend"></FriendProfileTile>
      </div>
    </div>
  </section>
</template>
<style scoped>
.interact_bar {
  width: 22%;
  position: fixed;
  top: 60px;
  right: 0;
  height: 100%;
  background-color: #181a1d;
  /* border-left: 1px solid rgb(128 128 128 / 0.5); */
  height: 100vh;
}
.i_bar_hr {
  opacity: 0.3;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0;
}
.interact_bar {
  color: white !important;
  padding: 10px;
}
.groups {
  height: 25%;
}
.friends {
  /* min-height: 45%; */
  height: 50%;
}
.groups,
.friends {
  padding-inline-start: 10px;
  padding-inline-end: 5px;
  overflow-y: scroll;
}
.groups::-webkit-scrollbar {
  display: none;
}
.friends::-webkit-scrollbar {
  display: none;
}
.i_bar_titles {
  padding-inline-start: 15px;
  padding-bottom: 10px;
  padding-top: 5px;
  font-size: 20px;
  font-weight: 600;
}
</style>
