import { useUserStore } from "@/stores/UserStore";

export const ProfileRoutes = [
  {
    path: "/profile/company",
    component: () => import("@/views/Vendor/Company.vue"),
    beforeEnter: async function () {
      // to, from
      const userStore = useUserStore();
      await userStore.loadStoredData();

      if (!userStore.user && !userStore.onboarded) {
        return { name: "Onboarding" };
      }

      if (!userStore.user && userStore.onboarded) {
        return { name: "Login" };
      }
    },
    children: [
      {
        path: "customers",
        component: () => import("@/views/Vendor/Company/Customers.vue"),
      },
      {
        path: "customers/add-customer",
        component: () => import("@/views/Vendor/Company/AddCustomer.vue"),
      },
      {
        path: "customers/:id/update-customer",
        component: () => import("@/views/Vendor/Company/UpdateCustomer.vue"),
      },
      {
        path: "stocks",
        component: () => import("@/views/Vendor/Company/Stock/Stocks.vue"),
      },
      {
        path: "stocks/add-stock",
        component: () => import("@/views/Vendor/Company/Stock/AddStock.vue"),
      },
    ],
  },
];
