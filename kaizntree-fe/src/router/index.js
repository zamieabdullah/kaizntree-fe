import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated (you can use Vuex store or local storage for this)
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      next('/login');
    } else {
      next();
    }
  } else {
    // If the route does not require authentication, proceed with the navigation
    next();
  }
});


function checkAuth() {
  const token = getCookie('access_token');
  return token !== null;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default router
