import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDnSCgq4HcfNR4lgtQaqqaWLW8ZovBFZSk',
  authDomain: 'study-buddies-8b16e.firebaseapp.com',
  projectId: 'study-buddies-8b16e',
  storageBucket: 'study-buddies-8b16e.appspot.com',
  messagingSenderId: '531865224994',
  appId: '1:531865224994:web:507a76e3c7abfd5efb077b'
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export { storage }
