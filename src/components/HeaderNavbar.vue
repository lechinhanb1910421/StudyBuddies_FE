<script>
import { loggedInUserStorage } from '@/stores/loggedInUser'
import router from '@/routers/index'
// import { storeToRefs } from 'pinia'
export default {
  data() {
    return {
      input_search: '',
      isMainDropDown: true,
      currentAvatar: '',
      userId: ''
    }
  },
  setup() {
    const userStore = loggedInUserStorage()
    // const { user } = storeToRefs(userStore)
    return {
      userStore
      // user
    }
  },
  methods: {
    async getCurrentUser() {
      let access_token = this.$keycloak.token
      await this.userStore.getCurrentUser(access_token)
    },
    submitSeach() {
      if (this.input_search == null) {
        return
      }
      var search_query = this.input_search.replace(/\s+/g, ' ').trim().toLocaleLowerCase()
      if (search_query == '') {
        return
      }
      router.push({ name: 'searchResults', query: { q: '' + search_query, t: 0, m: 0 } })
    },
    checkInput(e) {
      if (e.shiftKey && e.key == 'Backspace') {
        this.input_search = ''
      }
    },
    openSettingsDropdown() {
      this.isMainDropDown = false
    },
    openMainDropdown() {
      this.isMainDropDown = true
    },
    logMeOut() {
      this.$keycloak.logout({ redirectUri: 'http://localhost/' })
    },
    goToProfile() {
      const value = this.userStore.user.userId
      router.push({ name: 'userProfile', params: { id: value } })
    },
    changePassword() {
      this.$keycloak.login({ action: 'UPDATE_PASSWORD' })
    }
  },
  async mounted() {
    await this.getCurrentUser()
    this.currentAvatar = await this.userStore.getUserActiveAvatar()
    if (this.$route.query.q != null || this.$route.query.q != '') {
      this.input_search = this.$route.query.q
    }
  }
}
</script>
<template lang="">
  <nav class="navbar navbar-expand-lg bg_dark1 fixed-top" v-if="this.userStore.user.userId">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }">
        <img src="../assets/pics/android-chrome-192x192.png" class="avatar_img" alt="..." />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex">
          <div class="input-group navbar_search_inp">
            <span><i class="fas fa-search search_icon"></i></span>
            <input
              type="text"
              class="form-control navbar_input_search"
              @keyup.enter="submitSeach"
              @keyup="checkInput"
              v-model="input_search"
              placeholder="Search StudyBuddies..."
              autofocus />
          </div>
        </div>
        <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>

        <i class="fas fa-ellipsis-h navbar_icons"></i>
        <i class="fas fa-bell navbar_icons"></i>
        <div class="dropdown" v-if="this.currentAvatar">
          <img :src="this.currentAvatar" class="avatar_img" alt="Avatar" data-bs-toggle="dropdown" aria-expanded="false" />
          <!-- <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown button</button> -->
          <ul class="dropdown-menu dropdown-menu-end">
            <div v-if="this.isMainDropDown">
              <li>
                <div class="dropdown-item">
                  <div class="profile_tile" v-if="this.currentAvatar" @click="goToProfile">
                    <img :src="this.currentAvatar" class="avatar_img" alt="Avatar" />
                    <span class="profile_name">{{ this.userStore.user.fullName }}</span>
                  </div>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="dropdown_tile" @click.stop="openSettingsDropdown()">
                  <i class="fas fa-cog"></i>
                  <span> Settings </span>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="dropdown_tile">
                  <i class="fas fa-question"></i>
                  <span> Help </span>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="dropdown_tile">
                  <i class="fas fa-comment-alt"></i>
                  <span> Send Feedback </span>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="dropdown_tile" @click="logMeOut()">
                  <i class="fas fa-sign-out-alt"></i>
                  <span> Log out </span>
                </div>
              </li>
            </div>
            <div v-if="!this.isMainDropDown">
              <li class="dropdown-item">
                <div class="dropdown_tile" @click.stop="openMainDropdown()">
                  <i class="fas fa-arrow-left"></i>
                  <span> Back </span>
                </div>
              </li>
              <li class="dropdown-item" @click="changePassword()">
                <div class="dropdown_tile">
                  <i class="fas fa-cog"></i>
                  <span>Change Password</span>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="dropdown_tile">
                  <i class="fas fa-cog"></i>
                  <span> Setting 2 </span>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="dropdown_tile">
                  <i class="fas fa-cog"></i>
                  <span> Setting 3 </span>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dropdown_tile {
  padding-inline: 25px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 0.55rem;
}
.dropdown_tile:hover {
  background-color: rgb(255 255 255 /0.2);
}
.dropdown_tile i {
  font-size: 22px;
}
.dropdown-item {
  color: white;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #3a3e45;
  color: white;
}
.dropdown-menu {
  width: 330px;
  background-color: #3a3e45;
}
.dropdown_user_name {
  font-size: 18px;
  font-weight: 600;
}
.dropdown_avatar {
  border-radius: 50%;
  height: 40px;
  aspect-ratio: 1/1;
}
.profile_tile {
  padding-inline-start: 15px;
  height: 55px;
  background-color: rgb(255 255 255 /0.3);
  display: flex;
  gap: 12px;
  padding-right: 5px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.75rem;
  margin-bottom: 12px;
  transition: background-color linear 0.1s;
}
.profile_name {
  font-size: 18px;
  font-weight: 700;
}
.search_icon {
  color: white;
  font-size: 20px;
  opacity: 0.5;
  padding: 12px 0 12px 12px;
}
.navbar-brand {
  color: white !important;
}
.bg_dark1 {
  background-color: #2b2e33;
}
.navbar_search_inp {
  margin-left: 20px;
  background-color: rgb(255 255 255 / 0.1);
  border-radius: 1.5rem;
  min-width: 300px;
}
.navbar_search_inp input[type='text'] {
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
  outline: none;
}
.navbar_input_search:focus {
  outline: none;
  box-shadow: none;
}
.navbar_search_inp input[type='text']::placeholder {
  color: white;
  opacity: 50%;
}
.navbar_icons {
  color: white;
  margin-inline-start: 10px;
  padding: 12px;
  font-size: 20px;
  border-radius: 50%;
  background-color: rgb(255 255 255 / 0.1);
  cursor: pointer;
}
.navbar_icons:hover {
  background-color: rgb(255 255 255 / 0.4);
}
.navbar {
  border: 1px solid rgb(255 255 255 /0.2);
}
.avatar_img {
  margin-inline-start: 10px;
  height: 45px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
