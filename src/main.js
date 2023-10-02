import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routers/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'mosha-vue-toastify/dist/style.css'
const pinia = createPinia()
const tippyConfig = {
  defaultProps: { placement: 'bottom-end', delay: [500, 100], theme: 'light', offset: [30, 10], allowHTML: true }
}
// import { messaging } from '@/services/firebase.service'
// import { getToken } from 'firebase/messaging'
import Keycloak from 'keycloak-js'
// import NotificationService from './services/Notification.service'
let initOptions = {
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
  onLoad: 'login-required',
  checkLoginIframe: true,
  flow: 'standard'
}
const myApp = createApp(App).use(pinia).use(VueTippy, tippyConfig).use(router)
let keycloak = new Keycloak(initOptions)
keycloak
  .init({ onLoad: initOptions.onLoad, flow: initOptions.flow })
  .then((auth) => {
    if (!auth) {
      window.location.reload()
      myApp.mount('#app')
    } else {
      myApp.config.globalProperties.$keycloak = keycloak
      myApp.mount('#app')
      // getToken(messaging, { vapidKey: 'BHyqOE0G2_LsZ7adqV9VAAx5HHrPImwErndmpHQjYdgHYmCYdQgr5WmePAufIx5_JRUk0AA6sYsJm21dlyjCyiI' })
      //   .then(async (currentToken) => {
      //     if (currentToken) {
      //       console.log('recreating device with client token ', currentToken.substring(0, 10))
      //       console.log('keycloak token: ', keycloak.token.substring(0, 27))
      //       await NotificationService.createUserDevice(keycloak.token, currentToken)
      //     } else {
      //       console.log('No registration token available. Request permission to generate one.')
      //     }
      //   })
      //   .catch((err) => {
      //     console.log('An error occurred while retrieving token. ', err)
      //   })
      // myApp.config.globalProperties.$messaging = messaging
    }
    setInterval(() => {
      keycloak
        .updateToken(25)
        .then((refreshed) => {
          if (refreshed) {
            // console.log('Token refreshed ' + keycloak.token)
          } else {
            // console.log
            // 'Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds'()
          }
        })
        .catch(() => {
          console.log('Failed to refresh token')
        })
    }, 25000)
  })
  .catch(() => {
    console.log('Authenticated Failed')
  })

// const myApp = createApp(App).use(pinia).use(VueTippy, tippyConfig).use(router)
// myApp.mount('#app')
