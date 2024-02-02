import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";
import HomePage from "@/views/Shopper/HomePage.vue";

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
          {
            path: ":id",
            component: () => import("@/views/Vendor/Orders/OrderDetails.vue"),
          },
          {
            path: "record-order",
            component: () => import("@/views/Vendor/Sales/AddSale.vue"),
            children: [
              {
                path: "select-agent",
                component: () =>
                  import("@/views/Vendor/Orders/SelectAgent.vue"),
              },
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
        children: [
          {
            path: "",
            component: () => import("@/views/Vendor/Credit/CreditReport.vue"),
          },
          {
            path: "history",
            component: () =>
              import("@/views/Vendor/Credit/CreditHistoryList.vue"),
          },
          {
            path: ":id/credit-details",
            component: () => import("@/views/Vendor/Credit/CreditDetails.vue"),
          },
          {
            path: ":id/record-repayment",
            component: () =>
              import("@/views/Vendor/Credit/RecordRepayment.vue"),
          },
        ],
      },
      {
        path: "profile",
        component: () => import("@/views/Vendor/Profile.vue"),
      },
    ],
  },
];
