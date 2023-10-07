import { useUserStore } from '@/stores/UserStore';
import TabsPage from '@/views/Vendor/TabsPage.vue';
import HomePage from '@/views/Shopper/HomePage.vue';

export const VendorModeRoutes = [
    {
        path: '/vendor/',
        component: TabsPage,
        beforeEnter: async function() { // to, from
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
];
