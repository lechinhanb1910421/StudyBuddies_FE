// import createApiClient from '@/services/api.service'
// class NotificationService {
//   constructor(baseURL = '/notifications') {
//     this.api = createApiClient(baseURL)
//   }
//   async createUserDevice(access_token, fcmToken) {
//     this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
//     const payload = { token: fcmToken }
//     return (await this.api.post('/', payload)).data
//   }
// }
// export default new NotificationService()
