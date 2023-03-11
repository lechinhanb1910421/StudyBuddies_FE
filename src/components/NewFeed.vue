<script>
import UserPost from './UserPost.vue'
export default {
  components: { UserPost }
}
</script>
<template lang="">
  <div class="container">
    <div class="crePost_ctn">
      <div class="crePost_ava">
        <img src="../assets/Ganyu_2.jpeg" class="posts_ava" alt="..." />
      </div>
      <div class="crePost_input">
        <input type="text" class="form-control" placeholder="Hello Everett, how is your study?" />
      </div>
    </div>
    <hr class="hr-white" />
    <UserPost></UserPost>
  </div>
</template>
<style scoped>
hr.hr-white {
  border-top: 1px solid white;
}
.crePost_ctn {
  margin-top: 15px;
  color: white;
  background-color: rgb(255 255 255 /0.1);
  display: flex;
  justify-content: center;
  border-radius: 0.75rem;
  padding: 12px;
  gap: 10px;
}
.crePost_ava {
  display: flex;
  justify-content: center;
  align-items: center;
}
.posts_ava {
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.crePost_input {
  flex-shrink: 0;
  flex-grow: 1;
}
.crePost_input input {
  height: 45px;
  background-color: rgb(255 255 255 /0.15);
  box-shadow: none;
  border: none;
  font-size: 17px;
  border-radius: 1.5rem;
}
.crePost_input input::placeholder {
  color: white;
  opacity: 0.7;
}
.container {
  padding-inline: 12%;
  height: 300vh;
}
</style>
