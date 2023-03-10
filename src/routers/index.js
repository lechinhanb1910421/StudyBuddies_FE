import { createWebHistory, createRouter } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name != 'home') {
    const newTitle = to.name.charAt(0).toUpperCase() + to.name.slice(1)
    document.title = 'Study Buddies - ' + newTitle
  } else {
    document.title = 'Study Buddies'
  }
  next()
})
export default router
