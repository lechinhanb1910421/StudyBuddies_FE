import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Keycloak from 'keycloak-js'

let initOptions = {
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
  onLoad: 'login-required',
  checkLoginIframe: false,
  flow: 'standard'
}
let keycloak = new Keycloak(initOptions)
keycloak
  .init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload()
    }
    setInterval(() => {
      keycloak
        .updateToken(25)
        .then((refreshed) => {
          if (refreshed) {
            console.log('Token refreshed ' + refreshed)
          } else {
            console.log(
              'Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds'
            )
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
const myApp = createApp(App)
myApp.config.globalProperties.$keycloak = keycloak
myApp.use(router).mount('#app')
