importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyDnSCgq4HcfNR4lgtQaqqaWLW8ZovBFZSk',
  authDomain: 'study-buddies-8b16e.firebaseapp.com',
  projectId: 'study-buddies-8b16e',
  storageBucket: 'study-buddies-8b16e.appspot.com',
  messagingSenderId: '531865224994',
  appId: '1:531865224994:web:507a76e3c7abfd5efb077b'
}
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationOptions = {
    actions: [
      { action: 'close', title: 'Close' },
      { action: 'view', title: 'View' }
    ],
    data: {
      url: payload.data.url
    },
    body: payload.data.body,
    icon: payload.data.icon,
    silent: true
  }

  self.registration.showNotification(payload.data.title, notificationOptions)
})

self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed')
})

self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated')
})

self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching')
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})

self.addEventListener('push', (e) => {})

self.addEventListener('notificationclick', (e) => {
  let payload = e.notification
  if (e.action === 'view') {
    clients.openWindow(payload.data.url)
  }
})
