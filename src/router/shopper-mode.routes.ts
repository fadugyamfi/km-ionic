import { useUserStore } from '@/stores/UserStore';
import TabsPage from '@/views/Shopper/TabsPage.vue';
import HomePage from '@/views/Shopper/HomePage.vue';

export const ShopperModeRoutes = [
  {
    path: '/shopper/',
    component: TabsPage,
    beforeEnter: async function () { // to, from
      const userStore = useUserStore();
      await userStore.loadStoredData()

      if (!userStore.user && !userStore.onboarded) {
        return { name: 'Onboarding' };
      }

      if (!userStore.user && userStore.onboarded) {
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
          },
          {
            path: 'brands',
            component: () => import('@/views/Shopper/Brands/Brands.vue'),
          },
          {
            path: 'brands/:id',
            component: () => import('@/views/Shopper/Brands/BrandDetails.vue'),
          },

          {
            path: 'brands/:id/products',
            component: () => import('@/views/Shopper/Brands/BrandByProduct.vue'),
          },
          {
            path: 'suppliers',
            component: () => import('@/views/Shopper/Businesses/Businesses.vue'),
            meta: {
              title: "Suppliers",
              businessType: "supplier"
            }
          },
          {
            path: 'businesses',
            component: () => import('@/views/Shopper/Businesses/Businesses.vue'),
          },
          {
            path: 'businesses/:id',
            component: () => import('@/views/Shopper/Businesses/BusinessDetails.vue'),
          },
          {
            path: 'businesses/:id/products',
            component: () => import('@/views/Shopper/Businesses/BusinessProducts.vue'),
          },
        ],
      },
      {
        path: 'products/:id',
        component: () => import('@/views/Shopper/ProductDetails.vue')
      },
      {

        path: 'search-results',
        component: () => import('@/views/Shopper/ProductSearchResults.vue')
      },
      {
        path: 'no-business-results',
        component: () => import('@/views/Shopper/NoBusinessResults.vue')
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
];
