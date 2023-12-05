import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";
import HomePage from "@/views/SaleAgent/HomePage.vue";

export const SaleAgentRoutes = [
  {
    path: "/agent/",
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
    },
    children: [
      {
        path: "",
        redirect: "/agent/home",
      },
      {
        path: "home",
        component: HomePage,
        children: [
          {
            name: "SaleAgentHome",
            path: "",
            component: () => import("@/views/SaleAgent/Home.vue"),
          },
        ],
      },
      {
        path: "orders",
        component: () => import("@/views/Vendor/Orders.vue"),
        children: [
          {
            path: "",
            name: "SaleAgentOrders",
            component: () => import("@/views/SaleAgent/OrderHistory.vue"),
          },
          {
            name: "VendorOrderDetails",
            path: ":id",
            component: () => import("@/views/Vendor/Orders/OrderDetails.vue"),
          },
        ],
      },
      {
        path: "sales",
        component: () => import("@/views/Vendor/Sales.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/SaleAgent/SalesHistory.vue"),
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
            path: ":id/record-repayment",
            component: () => import("@/views/Vendor/Sales/RecordRepayment.vue"),
          },
          {
            path: "history",
            component: () => import("@/views/Vendor/Sales/SalesHistory.vue"),
          },
          {
            path: "products/:id",
            component: () => import("@/views/Shopper/ProductDetails.vue"),
            meta: {
              showCartButtons: false
            }
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
        path: "leaderboard",
        component: () => import("@/views/SaleAgent/Leaderboard.vue"),
      },
    ],
  },
];
