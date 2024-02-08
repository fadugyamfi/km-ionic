import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";
import { VendorOrdersRoutes } from "./tabs/vendor-orders.routes";
import { VendorSalesRoutes } from "./tabs/vendor-sales.routes";
import { VendorCreditsRoutes } from "./tabs/vendor-credits.routes";

let userStore: any = null;

export const VendorModeRoutes = [
  {
    path: "/vendor/",
    component: TabsPage,
    beforeEnter: async function () {
      // to, from
      if (userStore == null) {
        userStore = useUserStore();
        await userStore.loadStoredData();
      }

      if (!userStore.user && !userStore.onboarded) {
        return { name: "Onboarding" };
      }

      if (!userStore.user && userStore.onboarded) {
        return { name: "Login" };
      }

      if (userStore.appMode == "shopping") {
        return { name: "ShopperHome" };
      }
    },
    children: [
      {
        path: "",
        redirect: "/vendor/home",
      },
      {
        path: "home",
        name: 'VendorHome',
        component: () => import("@/views/Vendor/Home/Home.vue"),
      },

      ...VendorOrdersRoutes,

      ...VendorSalesRoutes,

      ...VendorCreditsRoutes,

      {
        path: "profile",
        component: () => import("@/views/Vendor/Profile.vue"),
      },
    ],
  },
];
