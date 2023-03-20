<script scoped>
import FriendBar from '../components/FriendBar.vue'
import MenuBar from '../components/MenuBar.vue'
import NewFeed from '../components/NewFeed.vue'
export default {
  components: { MenuBar, NewFeed, FriendBar },
  data() {
    return {
      currentAva: ''
    }
  },
 
  methods: {
    
  },
  async mounted() {
  }
}
</script>
<template>
  <div class="container-fluid">
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
  background-color: #181a1d;
  padding-top: 61px;
  display: block;
}
.newFeed {
  background-color: #181a1d;
  margin-left: 22%;
  margin-right: 22%;
}
</style>
