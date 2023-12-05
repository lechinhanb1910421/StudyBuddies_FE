<script>
import router from "@/routers/index";
import AdminService from "@/services/Admin.service";
import AdminUserTile from "@/components/AdminUserTile.vue";
import AdminPostTile from "@/components/AdminPostTile.vue";
import PostService from "@/services/Post.service";
import MacJobService from "@/services/Macjob.service";
export default {
  components: { AdminUserTile, AdminPostTile },
  data() {
    return {
      isForbidden: true,
      isLoaded: false,
      briefStats: "",
      users: "",
      posts: "",
      resultStackId: "",
      macUploadFile: "",
      macUploadResult: "",
      macResStackId: "",
      isMacResultError: false,
      isMacResultMissingStackId: false,
      isMacUploadInvalid: false,
    };
  },
  methods: {
    goToNewfeed() {
      router.push({ name: "home" });
    },
    async getStats() {
      try {
        this.briefStats = await AdminService.getBriefStats(
          this.$keycloak.token
        );
        this.users = await AdminService.getAllUsers(this.$keycloak.token);
        this.posts = await PostService.getAllPosts(this.$keycloak.token);
        this.isForbidden = false;
      } catch (error) {
        this.isForbidden = true;
      }
      this.isLoaded = true;
    },
    previewFiles(event) {
      this.isMacUploadInvalid = false;
      try {
        this.macUploadFile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsBinaryString(this.macUploadFile);
        reader.onload = (e) => {
          this.macUploadResult = e.target.result;
        };
        if (!this.macUploadFile || !this.macUploadFile.name.endsWith(".csv")) {
          this.isMacUploadInvalid = true;
          return;
        }
      } catch (error) {
        this.isMacUploadInvalid = true;
      }
    },
    async submitMacJob() {
      if (!this.macUploadFile || !this.macUploadFile.name.endsWith(".csv")) {
        this.isMacUploadInvalid = true;
        return;
      }
      this.isMacUploadInvalid = false;
      const formData = new FormData();
      formData.append("file", this.macUploadFile);
      this.resultStackId = await MacJobService.submitMacJob(
        this.$keycloak.token,
        formData
      );
    },
    setStackId(event) {
      this.macResStackId = event.target.value;
      this.isMacResultError = false;
      this.isMacResultMissingStackId = false;
    },
    async exportFileAsDownload() {
      if (!this.macResStackId) {
        return;
      }
      try {
        const response = await MacJobService.getMacJobReport(
          this.$keycloak.token,
          this.macResStackId
        );

        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(response.data);
        anchor.target = "_blank";
        anchor.download = this.getFileName(response);
        anchor.click();
        this.isMacResultError = false;
      } catch (error) {
        this.isMacResultError = true;
      }
    },
    getFileName(response) {
      let filename = response.headers["content-disposition"]
        .split("filename=")[1]
        .split(".")[0];
      let extension = response.headers["content-disposition"]
        .split(".")[1]
        .split(";")[0];
      return `${filename}.${extension}`;
    },
  },
  async created() {
    this.isLoaded = false;
    await this.getStats();
  },
};
</script>
<template>
  <div class="container-fluid">
    <Transition name="fade">
      <div v-if="!this.isLoaded" class="preloader_ctn">
        <div class="loader">
          <div class="one"></div>
          <div class="two"></div>
          <div class="three"></div>
          <div class="four"></div>
          <div class="five"></div>
          <div class="six"></div>
          <div class="seven"></div>
          <div class="eight"></div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <section style="width: 90%">
        <!-- <div class="inform_ctn" v-if="this.isForbidden && this.isLoaded">
          <div class="inform_main">
            <i class="fas fa-tools fa-spin"></i>
            <span class="main_title">FORBIDDEN</span>
          </div>
          <div class="inform_sub">
            <div>STOP! You do not have permission to view this page.</div>
          </div>
          <div class="redirect_ctn">
            <button type="button" class="redirect_btn btn" @click="goToNewfeed">Back To NewFeed</button>
          </div>
        </div> -->

        <div v-if="!this.isForbidden && this.isLoaded" class="stats_ctn">
          <div class="catalogue_title">Brief Overview</div>
          <div class="overview_ctn">
            <div class="overview_users overview_detail_ctn">
              <div class="overview_detail_title">Number of Users:</div>
              <div class="overview_users_stats">
                <span>{{ briefStats.numOfUsers }}</span>
              </div>
            </div>
            <div class="overview_posts overview_detail_ctn">
              <div class="overview_detail_title">Number of Posts:</div>
              <div class="overview_posts_stats">
                <span>{{ briefStats.numOfPosts }}</span>
              </div>
            </div>
          </div>
          <div class="catalogue_title">MAC Service</div>
          <div class="mac_ctn">
            <div class="mac_create_ctn">
              <div class="mb-4 mac_input_group">
                <div style="flex: 1">
                  <label
                    for="formFile"
                    class="form-label"
                    style="font-size: 19px; font-weight: 600">
                    Choose a file to import user
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    accept=".csv"
                    id="macFormFile"
                    @change="previewFiles($event)" />
                </div>
                <button class="btn btn-primary" @click="submitMacJob()">
                  Submit
                </button>
              </div>
              <div
                class="alert alert-danger"
                role="alert"
                v-if="this.isMacUploadInvalid">
                Invalid or missing file. Please check.
              </div>
              <div class="mb-3">
                <span class="mac_result_text">
                  StackId: {{ resultStackId }}
                </span>
              </div>
            </div>
            <div class="mac_result_ctn">
              <div class="mb-3">
                <div class="mac_result_text mb-3">Mac Job Result</div>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Submit StackId to get Result"
                    aria-label="Submit StackId to get Result"
                    aria-describedby="button-addon2"
                    :value="this.macResStackId"
                    @change="setStackId($event)" />
                  <button
                    class="btn btn-primary"
                    type="button"
                    id="button-addon2"
                    @click="exportFileAsDownload()">
                    Submit StackId
                  </button>
                </div>
                <div
                  class="alert alert-danger"
                  role="alert"
                  v-if="this.isMacResultError">
                  Invalid StackId. Please check it.
                </div>
                <div
                  class="alert alert-danger"
                  role="alert"
                  v-if="this.isMacResultMissingStackId">
                  Please input StackId.
                </div>
              </div>
            </div>
          </div>
          <div class="catalogue_ctn">
            <div class="users_del_ctn">
              <div class="catalogue_title">User Details</div>
              <div class="cat_user_ctn" v-if="this.users.length > 0">
                <div v-for="(user, index) in this.users" :key="index">
                  <AdminUserTile :user="user"></AdminUserTile>
                </div>
              </div>
            </div>
            <div class="posts_del_ctn">
              <div class="catalogue_title">Post Details</div>
              <div class="cat_posts_ctn" v-if="this.posts.length > 0">
                <div v-for="(post, index) in this.posts" :key="index">
                  <AdminPostTile
                    @postDeleted="getStats"
                    :post="post"></AdminPostTile>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  </div>
</template>
<style scoped>
.mac_input_group {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
}
.mac_result_text {
  font-size: 19px;
  font-weight: 600;
}
.mac_create_ctn {
  flex: 1;
  background-color: rgb(255 255 255);
  min-height: 80px;
  border-radius: 0.75em;
  padding-inline: 15px;
  outline: 4px solid #93c6e7;
}
.mac_result_ctn {
  flex: 1;
  background-color: rgb(255 255 255);
  min-height: 145px;
  border-radius: 0.75em;
  padding-inline: 15px;
  outline: 4px solid #54bab9;
}
.mac_ctn {
  min-height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

hr {
  border-bottom: 2px solid white;
  opacity: 0.7;
}

.overview_posts_stats {
  font-size: 95px;
  font-weight: 700;
  text-align: center;
  color: #049695;
  display: flex;
  justify-content: center;
}

.overview_users_stats {
  font-size: 95px;
  font-weight: 700;
  color: #0978c1;
  text-align: center;
  display: flex;
  justify-content: center;
}

.overview_detail_title {
  font-size: 24px;
  font-weight: 700;
  padding-top: 7px;
  padding-left: 15px;
}

.overview_posts {
  outline: 7px solid #54bab9;
}

.overview_users {
  outline: 7px solid #93c6e7;
}

.cat_user_ctn,
.cat_posts_ctn {
  background-color: rgb(230 230 230);
  border-radius: 0.75rem;
  height: 600px;
  overflow-y: scroll;
  padding-left: 7px;
  padding-top: 10px;
  margin-top: 10px;
}

.overview_detail_ctn {
  height: 100%;
  background-color: rgb(230 230 230);
  width: 27%;
  border-radius: 1rem;
  box-shadow: 4px 4px 17px 6px rgb(255 255 255 / 0.8);
}

.overview_ctn {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 130px;
  height: 200px;
  margin-bottom: 30px;
}

.posts_del_ctn {
  flex: 5;
}

.users_del_ctn {
  flex: 4;
}

.catalogue_title {
  font-size: 45px;
  font-weight: 600;
  color: #fff;
  padding-left: 40px;
}

.catalogue_ctn {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.stats_ctn {
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
}

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
  font-size: 47px;
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

.preloader_ctn {
  display: flex;
  align-items: center;
  height: 100%;
  padding-bottom: 50px;
  position: fixed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
