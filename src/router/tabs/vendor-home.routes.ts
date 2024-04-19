export const VendorHomeRoutes = [
  {
    path: "home",
    name: "VendorHome",
    component: () => import("@/views/Vendor/Home/Home.vue"),
  },
  {
    path: "home/businesses/:id",
    component: () => import("@/views/Vendor/Businesses/BusinessDetails.vue"),
  },
  {
    path: "home/business/:id/products",
    component: () => import("@/views/Shopper/Businesses/BusinessProducts.vue"),
  },
];
