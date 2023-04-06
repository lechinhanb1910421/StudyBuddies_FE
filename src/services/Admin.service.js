import createApiClient from '@/services/api.service'
class AdminService {
  constructor(baseURL = '/admin_resources') {
    this.api = createApiClient(baseURL)
  }
  async getAllUsers(access_token) {
    this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
    return (await this.api.get()).data
  }
}
export default new AdminService()
