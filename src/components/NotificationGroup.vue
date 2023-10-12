<script>
import NotificationTile from "./NotificationTile.vue";
import UserService from "@/services/User.service";
export default {
  components: { NotificationTile },
  data() {
    return {
      notifications: "",
    };
  },
  methods: {
    async getUserNotifications() {
      let access_token = this.$keycloak.token;
      this.notifications = await UserService.getUserNotification(access_token);
      // for (let index = 0; index < this.notifications.length; index++) {
      //   const element = this.notifications[index];
      //   console.log(element);
      // }
    },
  },
  created() {
    this.getUserNotifications();
  },
};
</script>
<template>
  <div class="btn-group">
    <i
      class="fas fa-bell navbar_icons"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"></i>
    <ul class="dropdown-menu noti_dropdown dropdown-menu-end">
      <li>
        <div class="noti_header_ctn">
          <h4>Notifications</h4>
          <hr class="hr-white" />
        </div>
      </li>

      <div v-if="this.notifications.length > 0">
        <div v-for="noti in this.notifications" :key="noti">
          <li>
            <NotificationTile
              :user="noti.receiverUser"
              :message="noti.content"
              :createdAt="noti.createdAt"></NotificationTile>
          </li>
        </div>
      </div>
    </ul>
  </div>
</template>

<style scoped>
.noti_header_ctn {
  padding: 10px;
  padding-left: 20px;
}
.noti_header_ctn h4 {
  color: white;
}
.noti_dropdown {
  min-width: 450px;
  max-height: 500px;
  overflow-y: scroll;
}
.noti_dropdown::-webkit-scrollbar {
  display: none;
}
.hr-white {
  color: white;
  margin-bottom: 5px;
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
.dropdown-item:hover {
  background-color: #3a3e45;
  color: white;
}

.dropdown-menu {
  width: 330px;
  background-color: #3a3e45;
}
</style>
