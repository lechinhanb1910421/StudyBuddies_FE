<script>
import { loggedInUserStorage } from '@/stores/loggedInUser'
import CommentService from '@/services/Comment.service'

export default {
  emits: ['cmtAdded'],
  props: ['postId'],
  data() {
    return {
      cmt_input: '',
      currentAvatar: '',
    }
  },
  setup() {
    const userStore = loggedInUserStorage()
    return {
      userStore
    }
  },

  methods: {
    async getUserCurrentAvatar() {
      this.currentAvatar = await this.userStore.getUserActiveAvatar();
    },
    async submitComment() {
      var value = this.cmt_input.replace(/\s+/g, ' ').trim()
      if (value != '') {
        await CommentService.addCmtToPost(this.$keycloak.token, this.postId, this.cmt_input)
      }
      this.cmt_input = ''
      this.$emit('cmtAdded')
    }
  },
  async mounted() {
    await this.getUserCurrentAvatar()
  },
}
</script>
<template>
  <div class="add_cmt_ctn">
    <div class="add_cmt_ava" v-if="this.userStore.user.userId">
      <img :src="this.currentAvatar" class="add_cmt_ava" alt="..." />
    </div>
    <div class="add_cmt_input">
      <input type="text" class="form-control" @keyup.enter="submitComment" v-model="this.cmt_input"
        placeholder="Leave a comment" />
    </div>
  </div>
</template>
<style scoped>
.add_cmt_ctn {
  padding-inline: 20px;
  height: 40px;
  display: flex;
  /* background-color: rgb(255 255 255 /0.2); */
  margin-bottom: 5px;
  gap: 8px;
}

.add_cmt_ava {
  height: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.add_cmt_input {
  flex-grow: 1;
}

.add_cmt_input input {
  background-color: rgb(255 255 255 /0.2);
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 1rem;
  color: white;
}

.add_cmt_input input::placeholder {
  color: white;
  opacity: 0.8;
}</style>
