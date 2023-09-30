import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/Shopper/TabsPage.vue';
import VendorTabsPage from '../views/Vendor/TabsPage.vue';
import HomePage from '../views/Shopper/HomePage.vue';
import { useUserStore } from '../stores/UserStore';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/tabs/tab1'
  // },
  {
    path: '/',
    redirect: '/shopper/home'
  },
  {
    name: 'Onboarding',
    path: '/onboarding',
    component: () => import('@/views/Onboarding/Onboarding.vue'),
  },
  {
    name: 'Login',
    path: '/auth/login',
    component: () => import('@/views/Auth/Login.vue'),
  },
  {
    name: 'Verify OTP',
    path: '/auth/verify-otp',
    component: () => import('@/views/Auth/ValidateOTP.vue'),
  },
  {
    name: 'Verify Number',
    path: '/auth/verify-number',
    component: () => import('@/views/Auth/PhoneNumberVerify.vue'),
  },
  {
    name: 'Forgot PIN',
    path: '/auth/forgot-pin',
    component: () => import('@/views/Auth/ForgotPIN.vue'),
  },
  {
    name: 'Signup',
    path: '/signup',
    component: () => import('@/views/Signup/Landing.vue'),
  },
  {
    name: 'ShopperSignup',
    path: '/signup/shopper',
    component: () => import('@/views/Signup/Shopper.vue'),
  },

  {
    path: '/shopper/',
    component: TabsPage,
    beforeEnter: async function(to, from) {
      const userStore = useUserStore();
      await userStore.loadStoredData()

      if( !userStore.user && !userStore.onboarded ) {
        return { name: 'Onboarding' };
      }

      if( !userStore.user && userStore.onboarded ) {
        return { name: 'Login' };
      }
    },
    children: [
      {
        path: '',
        redirect: '/shopper/home'
      },
      {
        path: 'home',
        component: HomePage,
        children: [
          {
            path: '',
            component: () => import('@/views/Shopper/Home/Home.vue')
          },
          {
            path: 'categories',
            component: () => import('@/views/Shopper/Categories/Categories.vue'),
          },
          {
            path: 'categories/:id',
            component: () => import('@/views/Shopper/Categories/CategoryDetails.vue'),
          }
        ],
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
        component: () => import('@/views/Shopper/Profile.vue'),

      },
    ]
  },

  {
    path: '/vendor/',
    component: VendorTabsPage,
    beforeEnter: async function(to, from) {
      const userStore = useUserStore();
      await userStore.loadStoredData()

      if( !userStore.user && !userStore.onboarded ) {
        return { name: 'Onboarding' };
      }

      if( !userStore.user && userStore.onboarded ) {
        return { name: 'Login' };
      }
    },
    children: [
      {
        path: '',
        redirect: '/vendor/home'
      },
      {
        path: 'home',
        component: HomePage,
        children: [
          {
            path: '',
            component: () => import('@/views/Vendor/Home/Home.vue')
          },
        ],
      },
      {
        path: 'orders',
        component: () => import('@/views/Vendor/Orders.vue')
      },
      {
        path: 'sales',
        component: () => import('@/views/Vendor/Sales.vue')
      },
      {
        path: 'credits',
        component: () => import('@/views/Vendor/Credits.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Vendor/Profile.vue'),

      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


// router.beforeEach(async (to, from) => {
//   const userStore = useUserStore();
//   await userStore.loadStoredData();

//   // handle first open use case
//   if ( !userStore.onboarded && to.name !== 'Onboarding' ) {
//     return { name: 'Onboarding' }
//   }

//   // handle returning user use case
//   if ( !userStore.user && to.name !== 'Login') {
//     return { name: 'Login' }
//   }

//   return to;
// })

export default router
