<script>
import MyDateTimeService from "@/services/myDateTime.service";
export default {
  props: ["user", "message", "createdAt"],
  data() {
    return {
      createTime: "",
      userAvaUrl: "",
    };
  },
  methods: {
    getCreatedTime() {
      this.createTime = MyDateTimeService.getLongTimeDifference({
        timeString: this.createdAt,
      });
    },
    getUserAvaUrl() {
      this.userAvaUrl = this.user.avatars[0].avaUrl;
    },
  },
  created() {
    this.getCreatedTime();
    this.getUserAvaUrl();
  },
};
</script>
<template>
  <div class="noti_ctn">
    <div class="noti_avatar_ctn">
      <img class="noti_avatar" :src="this.userAvaUrl" alt="..." />
    </div>
    <div class="noti_content_ctn">
      <div class="noti_message">
        {{ message }}
      </div>
      <div class="noti_time">{{ createTime }}</div>
    </div>
  </div>
</template>
<style scoped>
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
  width: 56px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
.noti_content_ctn {
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
