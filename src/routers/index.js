import { createWebHistory, createRouter } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import SearchResults from '@/views/SearchResults.vue'
import UserProfile from '@/views/UserProfile.vue'
import NotFound from '@/views/NotFound.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/search',
    name: 'searchResults',
    component: SearchResults,
    props: (route) => ({ sQuery: route.query.q })
  },
  {
    path: '/profile/:id',
    name: 'userProfile',
    component: UserProfile,
    props: true
    // props: (route) => ({ userId: route.query.userId })
  },
  {
    path: '/error',
    name: 'notFound',
    component: NotFound
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
