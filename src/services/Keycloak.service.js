// import createFormApiClient from "./formapi.service"
// class KeycloakService {
//     constructor(baseURL = '/keycloak_resources') {
//         this.api = createFormApiClient(baseURL)
//     }

//     async logoutSession(access_token, refresh_token) {
//         this.api.defaults.headers.common = { Authorization: `bearer ${access_token}` }
//         let payload = new FormData()
//         payload.append("client_id", "STUDY_BUDDIES")
//         payload.append("refresh_token", refresh_token)
//         return await this.api.post('/logout', payload)
//     }
// }

// export default new KeycloakService()