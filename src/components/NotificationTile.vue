<script>
import UserService from "@/services/User.service";
import MyDateTimeService from "@/services/myDateTime.service";
export default {
  props: [
    "sourceUser",
    "message",
    "createdAt",
    "referenceLink",
    "readStatus",
    "notiId",
  ],
  emits: ["notiRead"],
  data() {
    return {
      createTime: "",
      sourceUserAvaUrl: "",
      isShowUnreadIndicator: false,
    };
  },
  methods: {
    getCreatedTime() {
      this.createTime = MyDateTimeService.getLongTimeDifference({
        timeString: this.createdAt,
      });
    },
    getSourceUserAvaUrl() {
      this.sourceUserAvaUrl = this.sourceUser.avatars[0].avaUrl;
    },
    async openNotificationPost() {
      await this.setReadState();
      this.$emit("notiRead");
      window.open(this.referenceLink, "_blank").focus();
    },
    async setReadState() {
      this.isShowUnreadIndicator = false;
      await UserService.setNotificationReadState(
        this.$keycloak.token,
        this.notiId
      );
    },
    isNotificationRead() {
      if (this.readStatus == "UNREAD") {
        this.isShowUnreadIndicator = true;
      }
    },
  },
  created() {
    this.getCreatedTime();
    this.getSourceUserAvaUrl();
    this.isNotificationRead();
  },
};
</script>
<template>
  <div class="noti_ctn" @click="openNotificationPost()">
    <div class="noti_avatar_ctn">
      <img class="noti_avatar" :src="this.sourceUserAvaUrl" alt="..." />
    </div>
    <div class="noti_content_ctn">
      <div class="noti_message">
        {{ message }}
      </div>
      <div class="noti_indicator" v-if="this.isShowUnreadIndicator"></div>
      <div class="noti_time">{{ createTime }}</div>
    </div>
  </div>
</template>
<style scoped>
.noti_indicator {
  min-height: 10px;
  background-color: red;
  position: absolute;
  top: 7px;
  right: 0;
  height: 10px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.noti_ctn {
  margin-inline: 15px;
  padding: 10px;
  height: 75px;
  border-radius: 0.8rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  transform: background-color;
}
.noti_ctn:hover {
  background-color: #595f68;
}

.noti_avatar {
  flex: 1;
  width: 60px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  outline: 3px solid #54bab9;
}
.noti_content_ctn {
  padding-right: 15px;
  position: relative;
  height: 70px;
  padding-left: 10px;
  flex: 10;
  background-color: rgba(255 255 255 0.3);
}
.noti_message {
  font-weight: 600;
}
.noti_time {
  font-size: 14px;
  color: #0866ff;
}
</style>
