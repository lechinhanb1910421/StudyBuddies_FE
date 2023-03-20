import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_APIKEY,
  authDomain: process.env.VUE_APP_FB_AUTHDOMAIN,
  projectId: process.env.VUE_APP_FB_PROJECTID,
  storageBucket: process.env.VUE_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FB_APPID
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export { storage }
