<script>
import router from '@/routers/index'
export default {
  methods: {
    goToNewfeed() {
      router.push({ name: 'home' })
    }
  }
}
</script>
<template>
  <div class="container-fluid">
    <div class="inform_ctn">
      <div class="inform_main">
        <i class="fas fa-tools fa-spin"></i>
        <span class="main_title">NOT FOUND</span>
      </div>
      <div class="inform_sub">
        <div>This content is currently unavailable!</div>
      </div>
      <div class="redirect_ctn">
        <button type="button" class="redirect_btn btn" @click="goToNewfeed">Go To NewFeed</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.redirect_ctn {
  text-align: center;
}
.redirect_btn {
  color: white;
  width: 250px;
  font-size: 20px;
  font-weight: 700;
  background-color: #54bab9;
}
.inform_main {
  text-align: center;
  opacity: 0.6;
}
.main_title {
  padding-left: 40px;
}
.inform_sub {
  font-size: 50px;
  font-weight: 600;
  opacity: 0.6;
}
.inform_ctn {
  font-size: 100px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
}
.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: #171717;
  min-height: 100vh;
}
</style>
