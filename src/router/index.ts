import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/Shopper/TabsPage.vue'
import { useUserStore } from '../stores/UserStore';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/tabs/tab1'
  // },
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    component: () => import('@/views/Onboarding/Onboarding.vue'),
  },
  {
    name: 'Login',
    path: '/auth/login',
    component: () => import('@/views/Auth/Login.vue'),
  },
  {
    path: '/auth/verify-otp',
    component: () => import('@/views/Auth/ValidateOTP.vue'),
  },
  {
    path: '/auth/verify-number',
    component: () => import('@/views/Auth/PhoneNumberVerify.vue'),
  },
  {
    path: '/auth/forgot-pin',
    component: () => import('@/views/Auth/ForgotPIN.vue'),
  },
  {
    path: '/signup',
    component: () => import('@/views/Signup/Landing.vue'),
  },
  {
    path: '/signup/shopper',
    component: () => import('@/views/Signup/Shopper.vue'),
  },

  {
    path: '/shopper/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/shopper/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Shopper/Home.vue')
      },
      {
        path: 'orders',
        component: () => import('@/views/Shopper/Orders.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/Shopper/Cart.vue')
      },
      {
        path: 'credits',
        component: () => import('@/views/Shopper/Credits.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Shopper/Profile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  if (
    // make sure the user is authenticated
    !userStore.user &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router
