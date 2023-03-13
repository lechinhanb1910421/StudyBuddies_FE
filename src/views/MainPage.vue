<script scoped>
import HeaderNavbar from '../components/HeaderNavbar.vue'
import FriendBar from '../components/FriendBar.vue'
import MenuBar from '../components/MenuBar.vue'
import NewFeed from '../components/NewFeed.vue'
export default {
  components: { HeaderNavbar, MenuBar, NewFeed, FriendBar },
  data() {
    return {
      access_token: null
    }
  },
  methods: {
    getToken() {}
  }
}
</script>

<template>
  <div class="container-fluid">
    <HeaderNavbar></HeaderNavbar>
    <div class="main_page">
      <div class="menuBar">
        <MenuBar></MenuBar>
      </div>
      <div class="newFeed">
        <NewFeed></NewFeed>
      </div>
      <div class="friendBar">
        <FriendBar></FriendBar>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container-fluid {
  padding-inline: 0;
}
.main_page {
  height: 100vh;
  background-color: #181a1d;
  padding-top: 61px;
  display: block;
}
.menuBar {
  position: fixed;
  top: 60px;
  height: 100vh;
  left: 0;
  width: 22%;
  background-color: #181a1d;
  border-right: 1px solid grey;
}

.friendBar {
  width: 22%;
  position: fixed;
  top: 60px;
  right: 0;
  height: 100%;
  background-color: grey;
}
.newFeed {
  background-color: #181a1d;
  margin-left: 22%;
  margin-right: 22%;
}
</style>
