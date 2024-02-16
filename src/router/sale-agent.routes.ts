import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";
import HomePage from "@/views/SaleAgent/HomePage.vue";

let userStore: any = null;

export const SaleAgentRoutes = [
  {
    path: "/agent/",
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
            component: () =>
              import("@/views/SaleAgent/Orders/OrderHistory.vue"),
          },
          {
            name: "VendorOrderDetails",
            path: ":id",
            component: () => import("@/views/Vendor/Orders/OrderDetails.vue"),
          },
          {
            path: "place-order",
            component: () => import("@/views/Vendor/Sales/AddSale.vue"),
            children: [
              {
                path: "select-customer",
                component: () =>
                  import("@/views/SaleAgent/Orders/SelectCustomer.vue"),
              },
              {
                path: "delivery-details",
                component: () =>
                  import("@/views/SaleAgent/Orders/DeliveryDetails.vue"),
              },
              {
                path: "select-products",
                component: () =>
                  import("@/views/SaleAgent/Orders/SelectProducts.vue"),
              },
              {
                path: "configure-items",
                component: () =>
                  import("@/views/SaleAgent/Orders/ConfigureItems.vue"),
              },
              {
                path: "order-confirmation",
                component: () =>
                  import("@/views/SaleAgent/Orders/OrderConfirmation.vue"),
              },
            ],
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
              showCartButtons: false,
            },
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
      {
        path: "request",
        component: () => import("@/views/SaleAgent/Request/RequestHistory.vue"),
      },
      {
        path: "request/:id/details",
        component: () => import("@/views/SaleAgent/Request/RequestDetails.vue"),
      },
      {
        path: "request/place-request/select-customer",
        component: () => import("@/views/SaleAgent/Request/SelectCustomer.vue"),
      },
      // {
      //   path: "request/place-request/delivery-details",
      //   component: () => import("@/views/SaleAgent/Orders/DeliveryDetails.vue"),
      // },
      {
        path: "request/place-request/select-products",
        component: () => import("@/views/SaleAgent/Request/SelectProducts.vue"),
      },
      {
        path: "request/place-request/configure-items",
        component: () => import("@/views/SaleAgent/Request/ConfigureItems.vue"),
      },
      {
        path: "request/place-request/order-confirmation",
        component: () =>
          import("@/views/SaleAgent/Orders/OrderConfirmation.vue"),
      },
    ],
  },
];
