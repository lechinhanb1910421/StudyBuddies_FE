import { createWebHistory, createRouter } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import SearchResults from '@/views/SearchResults.vue'
import UserProfile from '@/views/UserProfile.vue'
import NotFound from '@/views/NotFound.vue'
import AdminPage from '@/views/AdminPage.vue'
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
    props: (route) => ({ q: route.query.q, t: route.query.t, m: route.query.m })
  },
  {
    path: '/profile/:id',
    name: 'userProfile',
    component: UserProfile,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    props: true
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFound
  },
  { path: '/:catchAll(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
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
