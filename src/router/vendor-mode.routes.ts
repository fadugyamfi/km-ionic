import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/Vendor/TabsPage.vue";
import HomePage from "@/views/Shopper/HomePage.vue";

export const VendorModeRoutes = [
  {
    path: "/vendor/",
    component: TabsPage,
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
        component: HomePage,
        children: [
          {
            name: "VendorHome",
            path: "",
            component: () => import("@/views/Vendor/Home/Home.vue"),
          },
        ],
      },
      {
        path: "orders",
        component: () => import("@/views/Vendor/Orders.vue"),
        children: [
          {
            path: "",
            redirect: "/vendor/orders/history",
          },
          {
            name: "VendorOrderHistory",
            path: "history",
            component: () => import("@/views/Vendor/Orders/OrderHistory.vue"),
          },
        ],
      },
      {
        path: "sales",
        component: () => import("@/views/Vendor/Sales.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/Vendor/Sales/Home.vue"),
          },
          {
            path: "add-sale",
            component: () => import("@/views/Vendor/Sales/AddSale.vue"),
            children: [
              {
                path: "select-agent",
                component: () =>
                  import("@/views/Vendor/Sales/AddSale/SelectAgent.vue"),
              },
              {
                path: "select-sale-type",
                component: () =>
                  import("@/views/Vendor/Sales/AddSale/SelectSaleType.vue"),
              },
              {
                path: "select-payment-mode",
                component: () =>
                  import("@/views/Vendor/Sales/AddSale/SelectPaymentMode.vue"),
              },
              {
                path: "select-customer",
                component: () =>
                  import("@/views/Vendor/Sales/AddSale/SelectCustomer.vue"),
              },
              {
                path: "select-products",
                component: () =>
                  import("@/views/Vendor/Sales/AddSale/SelectProducts.vue"),
              },
              {
                path: "configure-items",
                component: () =>
                  import("@/views/Vendor/Sales/AddSale/ConfigureItems.vue"),
              },
              {
                path: "sale-confirmation",
                component: () =>
                  import("@/views/Vendor/Sales/AddSale/SaleConfirmation.vue"),
              },
            ],
          },
          {
            path: "history",
            component: () => import("@/views/Vendor/Sales/SalesHistory.vue"),
          },
          {
            path: ":id",
            component: () => import("@/views/Vendor/Sales/SaleDetails.vue"),
          },
        ],
      },
      {
        path: "credits",
        component: () => import("@/views/Vendor/Credits.vue"),
      },
      {
        path: "profile",
        component: () => import("@/views/Vendor/Profile.vue"),
      },
      {
        path: "profile/company",
        component: () => import("@/views/Vendor/Company.vue"),
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
            path: "customers/update-customer",
            component: () => import("@/views/Vendor/Company/UpdateCustomer.vue"),
          },
        ],
      },
    ],
  },
];
