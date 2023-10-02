// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// const firebaseConfig = {
//   apiKey: 'apiKey',
//   authDomain: 'authDomain',
//   projectId: 'projectId',
//   storageBucket: 'storageBucket',
//   messagingSenderId: 'messagingSenderId',
//   appId: 'appId'
// }
// firebase.initializeApp(firebaseConfig)
// const messaging = firebase.messaging()

// messaging.onBackgroundMessage(function (payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload)
//   const notificationOptions = {
//     actions: [
//       { action: 'view', title: 'View' },
//       { action: 'close', title: 'Close' }
//     ],
//     data: {
//       url: payload.data.url
//     },
//     body: payload.data.body,
//     icon: payload.data.icon,
//     silent: true
//   }

//   self.registration.showNotification(payload.data.title, notificationOptions)
// })

// self.addEventListener('install', (e) => {
//   console.log('Service Worker: Installed')
// })

// self.addEventListener('activate', (e) => {
//   console.log('Service Worker: Activated')
// })

// self.addEventListener('fetch', (e) => {
//   console.log('Service Worker: Fetching')
//   e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
// })

// self.addEventListener('push', (e) => {})

// self.addEventListener('notificationclick', (e) => {
//   let payload = e.notification
//   if (e.action === 'view') {
//     clients.openWindow(payload.data.url)
//   }
// })
