import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";
import HomePage from "@/views/Guest/HomePage.vue";

let userStore: any = null;

export const GuestModeRoutes = [
  {
    path: "/guest/",
    component: TabsPage,
    beforeEnter: async function (to: any, from: any) {
      // to, from
      if (userStore == null) {
        userStore = useUserStore();
        await userStore.loadStoredData();
      }

      if (!userStore.onboarded && !userStore.user) {
        return { name: "Onboarding" };
      }

      if (
        userStore.user &&
        (userStore.activeRole?.isSalesAssociate() || userStore.activeRole?.isSalesManager())
      ) {
        return { name: "SaleAgentHome" };
      }

      if (userStore.user && userStore.appMode != "vendor") {
        return to.path.replace("guest", "shopper");
      }

      if (userStore.user && userStore.appMode == "vendor") {
        return { name: "VendorHome" };
      }

      userStore.setAppModeAsGuest();
    },
    children: [
      {
        path: "",
        redirect: "/guest/home",
      },
      {
        path: "home",
        component: HomePage,
        children: [
          {
            name: "GuestHome",
            path: "",
            component: () => import("@/views/Guest/Home/Home.vue"),
          },
          {
            path: "categories",
            component: () => import("@/views/Guest/Categories/Categories.vue"),
          },
          {
            path: "categories/:id",
            component: () =>
              import("@/views/Guest/Categories/CategoryDetails.vue"),
          },
          {
            path: "brands",
            component: () => import("@/views/Guest/Brands/Brands.vue"),
          },
          {
            path: "brands/:id",
            component: () => import("@/views/Guest/Brands/BrandDetails.vue"),
          },
          {
            path: "brands/:id/products",
            component: () => import("@/views/Guest/Brands/BrandByProduct.vue"),
          },
          {
            path: "suppliers",
            component: () => import("@/views/Guest/Businesses/Businesses.vue"),
            meta: {
              title: "Suppliers",
              businessType: "supplier",
            },
          },
          {
            path: "businesses",
            component: () => import("@/views/Guest/Businesses/Businesses.vue"),
          },
          {
            path: "businesses/:id",
            component: () =>
              import("@/views/Guest/Businesses/BusinessDetails.vue"),
          },
          {
            path: "businesses/:id/products",
            component: () =>
              import("@/views/Guest/Businesses/BusinessProducts.vue"),
          },
          {
            path: "promotions/:id",
            component: () =>
              import("@/views/Guest/Promotions/PromotionItems.vue"),
          },
        ],
      },
      {
        path: "products/:id",
        component: () => import("@/views/Guest/ProductDetails.vue"),
      },
      {
        path: "search-results",
        component: () => import("@/views/Guest/ProductSearchResults.vue"),
      },
      {
        path: "no-business-results",
        component: () => import("@/views/Guest/NoBusinessResults.vue"),
      },
    ],
  },
];
