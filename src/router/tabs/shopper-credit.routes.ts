export const ShopperCreditsRoutes = [
  {
    path: "credits",
    component: () => import("@/views/Shopper/Credit/CreditHistoryList.vue"),
  },
  // {
  //     path: "credits/history",
  //     component: () =>
  //         import("@/views/Vendor/Credit/CreditHistoryList.vue"),
  // },
  {
    path: "credits/:id/credit-details",
    component: () => import("@/views/Shopper/Credit/CreditDetails.vue"),
  },
  {
    path: "credits/:id/payment",
    component: () => import("@/views/Shopper/Credit/Payment.vue"),
  },
];
