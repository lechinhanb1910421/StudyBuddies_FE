<script>
import AddCommentTile from '@/components/AddCommentTile.vue'
import UserCommentTile from '@/components/UserCommentTile.vue'
import PostService from '@/services/Post.service'
export default {
  emits: ['commentCount'],
  props: ['postId'],
  components: {
    AddCommentTile,
    UserCommentTile
  },
  data() {
    return {
      comments: [],
      commentCount: ''
    }
  },
  methods: {
    async getPostComments() {
      this.comments = await PostService.getPostComments(this.$keycloak.token, this.postId)
      this.commentCount = this.comments.length == undefined ? 0 : this.comments.length
      this.$emit('commentCount', this.commentCount)
    },
    newCmtAdded() {
      this.getPostComments()
    }
  },
  async mounted() {
    await this.getPostComments()
  }
}
</script>
<template>
  <AddCommentTile :postId="this.postId" @cmtAdded="newCmtAdded"></AddCommentTile>
  <div class="comments_ctn" v-if="this.comments.length > 0">
    <div v-for="(cmt, index) in this.comments" :key="index">
      <UserCommentTile :cmt="cmt"></UserCommentTile>
    </div>
  </div>
</template>
<style scoped>
.comments_ctn {
  padding-right: 20px;
  padding-left: 15px;
  max-height: 250px;
  overflow-y: scroll;
  /* background-color: rgb(255 255 255 /0.2); */
}
.comments_ctn::-webkit-scrollbar {
  display: none;
}
</style>
