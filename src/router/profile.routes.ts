import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";

export const ProfileRoutes = [
  {
    path: "/profile/company",
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
        path: "customers",
        component: () =>
          import("@/views/Vendor/Company/Customer/Customers.vue"),
      },
      {
        path: "customers/add-customer",
        component: () =>
          import("@/views/Vendor/Company/Customer/AddCustomer.vue"),
      },
      {
        path: "customers/:id/update-customer",
        component: () =>
          import("@/views/Vendor/Company/Customer/UpdateCustomer.vue"),
      },
      {
        path: "customers/:id/profile",
        component: () =>
          import("@/views/Vendor/Company/Customer/CustomerProfile.vue"),
      },
      {
        path: "customers/:id/orders",
        component: () =>
          import("@/views/Vendor/Company/Customer/Order/OrderHistory.vue"),
      },
      {
        path: "customers/:id/credit-payments",
        component: () =>
          import(
            "@/views/Vendor/Company/Customer/CreditPayment/CreditHistory.vue"
          ),
      },
      {
        path: "stocks",
        component: () => import("@/views/Vendor/Company/Stock/Stocks.vue"),
      },
      {
        path: "stocks/add-stock",
        component: () => import("@/views/Vendor/Company/Stock/AddStock.vue"),
      },
      // {
      //   path: "stocks/stock-list",
      //   component: () => import("@/views/Vendor/Company/Stock/Stoc.vue"),
      // },
      {
        path: "stocks/:id/stock-details",
        component: () =>
          import("@/views/Vendor/Company/Stock/StockDetails.vue"),
      },
      {
        path: "sale-agents",
        component: () => import("@/views/Profile/SaleAgents.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/Profile/SaleAgents/Agents.vue"),
          },
          {
            path: ":id/sale-report",
            component: () =>
              import("@/views/Profile/SaleAgents/AgentSalesReport.vue"),
          },
        ],
      },
    ],
  },
];
