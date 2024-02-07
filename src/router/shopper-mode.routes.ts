import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";
import { ShopperHomeRoutes } from "./tabs/shopper-home.routes";
import { ShopperOrdersRoutes } from "./tabs/shopper-orders.routes";
import { ShopperCartRoutes } from "./tabs/shopper-cart.routes";

let userStore: any = null;

export const ShopperModeRoutes = [
  {
    path: "/shopper/",
    component: TabsPage,
    beforeEnter: async function () {
      // to, from

      if( userStore == null ) {
        userStore = useUserStore();
        await userStore.loadStoredData();
      }

      if (!userStore.user && !userStore.onboarded) {
        return { name: "Onboarding" };
      }

      if (!userStore.user && userStore.onboarded) {
        return { name: "Login" };
      }

      if (userStore.appMode == "vendor") {
        return { name: "VendorHome" };
      }

      userStore.setAppModeAsShopping();
    },
    children: [
      {
        path: "",
        redirect: "/shopper/home",
      },

      ...ShopperHomeRoutes,

      {
        path: "products/:id",
        component: () => import("@/views/Shopper/ProductDetails.vue"),
      },
      {
        path: "search-results",
        component: () => import("@/views/Shopper/ProductSearchResults.vue"),
      },
      {
        path: "no-business-results",
        component: () => import("@/views/Shopper/NoBusinessResults.vue"),
      },

      ...ShopperOrdersRoutes,

      ...ShopperCartRoutes,

      // {
      //   path: "credits",
      //   component: () => import("@/views/Shopper/Credits.vue"),
      //   children: [
      //     {
      //       path: "",
      //       component: () =>
      //         import("@/views/Shopper/Credit/CreditHistoryList.vue"),
      //     },

      //     {
      //       path: ":id/credit-details",
      //       component: () => import("@/views/Shopper/Credit/CreditDetails.vue"),
      //     },
      //     {
      //       path: ":id/record-repayment",
      //       component: () =>
      //         import("@/views/Shopper/Credit/RecordRepayment.vue"),
      //     },
      //   ],
      // },
      {
        path: "profile",
        component: () => import("@/views/Shopper/Profile.vue"),
      },
    ],
  },
];
