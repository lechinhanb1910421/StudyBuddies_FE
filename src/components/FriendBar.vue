<script>
import FriendProfileTile from '@/components/FriendProfileTile.vue'
import GroupTile from '@/components/GroupTile.vue'
export default {
  components: {
    FriendProfileTile,
    GroupTile
  },
  data() {
    return {
      majorName: 'Infomation Technology'
    }
  }
}
</script>
<template lang="">
  <section class="interact_bar">
    <div class="i_bar_titles">Groups</div>
    <div class="groups">
      <GroupTile></GroupTile>
      <GroupTile></GroupTile>
      <GroupTile></GroupTile>
      <GroupTile></GroupTile>
      <GroupTile></GroupTile>
      <GroupTile></GroupTile>
      <GroupTile></GroupTile>
      <GroupTile></GroupTile>
    </div>
    <hr class="i_bar_hr" />
    <div class="i_bar_titles">Friends</div>
    <div class="friends">
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
      <FriendProfileTile></FriendProfileTile>
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
  height: 30%;
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
