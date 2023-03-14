<script>
import AddCommentTile from '@/components/AddCommentTile.vue'
import UserCommentTile from '@/components/UserCommentTile.vue'
export default {
  components: {
    AddCommentTile,
    UserCommentTile
  }
}
</script>
<template>
  <AddCommentTile></AddCommentTile>
  <div class="comments_ctn">
    <UserCommentTile></UserCommentTile>
    <UserCommentTile></UserCommentTile>
    <UserCommentTile></UserCommentTile>
    <UserCommentTile></UserCommentTile>
  </div>
</template>
<style scoped>
.comments_ctn {
  padding-right: 20px;
  padding-left: 15px;
  height: 250px;
  overflow-y: scroll;
  /* background-color: rgb(255 255 255 /0.2); */
}
.comments_ctn::-webkit-scrollbar {
  display: none;
}
</style>
