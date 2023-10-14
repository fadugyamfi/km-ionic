
export const VendorSignupRoutes = [
    {
        name: 'VendorSignupIntro',
        path: '/signup/vendor',
        component: () => import('@/views/Signup/Vendor/Intro.vue'),
      },
      {
        name: 'VendorSignupSummary',
        path: '/signup/vendor/summary',
        component: () => import('@/views/Signup/Vendor/Summary.vue'),
      },
      {
        name: 'VendorSignupPersonalInfo',
        path: '/signup/vendor/personal-info',
        component: () => import('@/views/Signup/Vendor/PersonalInfo.vue'),
      },
      {
        name: 'VendorSignupBusinessInfo',
        path: '/signup/vendor/business-info',
        component: () => import('@/views/Signup/Vendor/BusinessInfo.vue'),
      },
      {
        name: 'VendorSignupBrandInfo',
        path: '/signup/vendor/brand-info',
        component: () => import('@/views/Signup/Vendor/BrandInfo.vue'),
      },
      {
        name: 'VendorSignupLocationInfo',
        path: '/signup/vendor/location-info',
        component: () => import('@/views/Signup/Vendor/LocationInfo.vue'),
      },
      {
        name: 'VendorSignupStockInfo',
        path: '/signup/vendor/stock-info',
        component: () => import('@/views/Signup/Vendor/StockInfo.vue'),
      },
      {
        name: 'VendorSignupUploadPhoto',
        path: '/signup/vendor/upload-photo',
        component: () => import('@/views/Signup/Vendor/UploadPhoto.vue'),
      },
      {
        name: 'VendorSignupSignupComplete',
        path: '/signup/vendor/signup-complete',
        component: () => import('@/views/Signup/Vendor/SignupComplete.vue'),
      },
];
