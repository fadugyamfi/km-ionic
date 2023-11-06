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
    ],
  },
];
