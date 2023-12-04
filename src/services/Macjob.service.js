import axios from "axios";

class MacJobService {
  constructor(baseURL = "/mac_resources") {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
      },
    });
  }
  async submitMacJob(access_token, payload) {
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };
    return (await this.api.post("/", payload)).data;
  }
  async getMacJobReport(access_token, stackId) {
    this.api.defaults.headers.common = {
      Authorization: `bearer ${access_token}`,
    };

    return await this.api.get("/" + stackId, { responseType: "blob" });
  }
}
export default new MacJobService();
