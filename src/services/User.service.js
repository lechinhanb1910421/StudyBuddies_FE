import createApiClient from "@/services/api.service";
import friends_payload from "@/assets/friend_list.json";
class UserService {
  constructor(baseURL = "/user_resources") {
    this.api = createApiClient(baseURL);
  }
  async getAllUsers(access_token) {
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };
    return (await this.api.get()).data;
  }
  async getUserById(access_token, userId) {
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };
    return (await this.api.get("/id/" + userId)).data;
  }
  async getCurrentUser(access_token) {
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };
    return (await this.api.get("/whoami")).data;
  }
  async getUserFriendsDemo() {
    return friends_payload;
  }
  async getAllUserPosts(access_token, userId) {
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };
    return (await this.api.get("/" + userId + "/posts")).data;
  }
  async addUserAvatar(access_token, avaUrl) {
    const payload = { avaUrl: avaUrl };
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };
    return (await this.api.post("/avatars", payload)).data;
  }

  async getUserNotification(access_token) {
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };
    return (await this.api.get("/notifications")).data;
  }
  async setNotificationReadState(access_token, notiId) {
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };
    return (await this.api.patch("/notifications/" + notiId)).data;
  }
}
export default new UserService();
