<template>
  <div style="height: 1500px" class="container-fluid">
    <Navbar></Navbar>
    <!-- <div style="color: white; padding-top: 50px">
      <h2>Hello</h2>
      <h5>{{ access_token }}</h5>
      <button type="button" @click="getToken()">Get Token</button>
    </div> -->
  </div>
</template>

<script scoped>
import Navbar from '../components/HeaderNavbar.vue'
export default {
  components: { Navbar },
  data() {
    return {
      access_token: null
    }
  },
  methods: {
    getToken() {
      // this.access_token = this.$keycloak.token
    }
  }
}
</script>

<style scoped></style>
