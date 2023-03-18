import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routers/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
const pinia = createPinia()
// import Keycloak from 'keycloak-js'

// let initOptions = {
//   url: process.env.VUE_APP_KEYCLOAK_URL,
//   realm: process.env.VUE_APP_KEYCLOAK_REALM,
//   clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
//   onLoad: 'login-required',
//   checkLoginIframe: true,
//   flow: 'standard'
// }
// const myApp = createApp(App).use(router).use(pinia)
// let keycloak = new Keycloak(initOptions)
// keycloak
//   .init({ onLoad: initOptions.onLoad, flow: initOptions.flow })
//   .then((auth) => {
//     if (!auth) {
//       window.location.reload()
//       myApp.mount('#app')
//     } else {
//       myApp.config.globalProperties.$keycloak = keycloak
//       myApp.mount('#app')
//     }
//     setInterval(() => {
//       keycloak
//         .updateToken(255)
//         .then((refreshed) => {
//           if (refreshed) {
//             console.log('Token refreshed ' + refreshed)
//           } else {
//             console.log(
//               'Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds'
//             )
//           }
//         })
//         .catch(() => {
//           console.log('Failed to refresh token')
//         })
//     }, 255000)
//   })
//   .catch(() => {
//     console.log('Authenticated Failed')
//   })

const myApp = createApp(App).use(pinia).use(router)
myApp.mount('#app')
