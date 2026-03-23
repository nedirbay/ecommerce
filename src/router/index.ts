import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/Products/ProductsView.vue'),
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('@/views/ProductDetail/ProductDetailView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/Checkout/CheckoutView.vue'),
      meta: { requiresAuth: false }, // allow guest checkout
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth/AuthView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/deals',
      name: 'deals',
      component: () => import('@/views/Deals/DealsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// Navigation guards
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'auth', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isLoggedIn) {
    return { name: 'home' }
  }
})

export default router
