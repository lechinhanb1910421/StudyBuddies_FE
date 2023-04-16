# StudyBuddies_FE

## **Front-end side of Study Buddies Project**

**Author:** Nhan Le Nguyen Chi \
**Nickname:** Everett Le \
**Student Code:** B1910421 \
**Course Code:** CT466-07 

## **This project is deployed and runs on Docker environment**
**Please change the values in [.env.example](.env.example) file and rename it to ".env" before startup.**\
*Visit [Docker](https://www.docker.com/) for more information*

## **Other configs:**
## 1. Keycloak Configuration
After you create Keycloak Realm and Client **in back-end side**, paste those information in [env](.env.example) as example below.
```
VUE_APP_KEYCLOAK_URL=http://<YOUR_KEYCLOAK_DOMAIN>:<YOUR_PORT>/
VUE_APP_KEYCLOAK_REALM=<YOUR_REALM_NAME>
VUE_APP_KEYCLOAK_CLIENT_ID=<YOUR_KEYCLOAK_REALM>
```
*Visit [Keycloak](https://www.keycloak.org/) for more information*

## 2. Google FireBase Storage Configuration
All configurations related to Firebase init are store in [env](.env.example) file.\
Visit [Firebase Storage](https://console.firebase.google.com), create a storage and paste config in [env](.env.example) file.
```
VUE_APP_FB_APIKEY=apiKey
VUE_APP_FB_AUTHDOMAIN=authDomain
VUE_APP_FB_PROJECTID=projectId
VUE_APP_FB_STORAGEBUCKET=storageBucket
VUE_APP_FB_MESSAGINGSENDERID=messagingSenderId
VUE_APP_FB_APPID=appId
```
## 3. Google FireBase Cloud Messaging Configuration
If you already have a Firebase App, please register a Cloud Messaging service and paste the related configurations into
[firebase-messaging config file](public/firebase-messaging-sw.example.js) as shown below.
```
const firebaseConfig = {
  apiKey: 'apiKey',
  authDomain: 'authDomain',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId'
}
```
**And remember to rename this file to "firebase-messaging-sw.js" to register service worker and notification services**\
Next, you need to register a key pair and paste your *Cloud Messaging public key (vapidKey)* to [main.js](src/main.js) at line 38 as shown below
```
getToken(messaging, { vapidKey: '<YOUR PUBLIC KEY>' })
```
At this point, you hopefully most likely to config everything successfully ;))
***
**If you already install Docker on your machine and config everything successfully, you can use [build_and_deploy](build_and_deploy.bat) bat file for a quick startup.**
