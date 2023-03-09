import { createWebHistory, createRouter } from 'vue-router'
import DashBoard from '@/views/DashBoard.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: DashBoard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name != 'home') {
    const newTitle = to.name.charAt(0).toUpperCase() + to.name.slice(1)
    document.title = 'Study - ' + newTitle
  } else {
    document.title = 'Study'
  }
  next()
})
export default router
