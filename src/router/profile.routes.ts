import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";

let userStore: any = null;

export const ProfileRoutes = [
  {
    path: "/profile",
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
        path: "company",
        redirect: "/profile/company/customers",
        component: () => import("@/views/Profile/Company.vue"),
        children: [
          {
            path: "customers",
            component: () => import("@/views/Profile/Customer/Customers.vue"),
          },
          {
            path: "customers/add-customer",
            component: () => import("@/views/Profile/Customer/AddCustomer.vue"),
          },
          {
            path: "customers/:id/update-customer",
            component: () =>
              import("@/views/Profile/Customer/UpdateCustomer.vue"),
          },
          {
            path: "customers/:id/profile",
            component: () =>
              import("@/views/Profile/Customer/CustomerProfile.vue"),
          },
          {
            path: "customers/:id/orders",
            component: () =>
              import("@/views/Profile/Customer/Order/OrderHistory.vue"),
          },
          {
            path: "customers/:id/credit-payments",
            component: () =>
              import(
                "@/views/Profile/Customer/CreditPayment/CreditHistory.vue"
              ),
          },
          {
            path: "stocks",
            component: () => import("@/views/Profile/Stock/Stocks.vue"),
          },
          {
            path: "agent/stocks",
            component: () =>
              import("@/views/Profile/SaleAgents/AgentStock.vue"),
          },
          {
            path: "stocks/add-stock",
            component: () => import("@/views/Profile/Stock/AddStock.vue"),
          },
          // {
          //   path: "stocks/stock-list",
          //   component: () => import("@/views/Profile/Stock/Stoc.vue"),
          // },
          {
            path: "stocks/:id/stock-details",
            component: () => import("@/views/Profile/Stock/StockDetails.vue"),
          },
          {
            path: "sale-agents",
            component: () => import("@/views/Profile/SaleAgents.vue"),
            children: [
              {
                path: "",
                component: () =>
                  import("@/views/Profile/SaleAgents/Agents.vue"),
              },
              {
                path: ":id/sale-report",
                component: () =>
                  import("@/views/Profile/SaleAgents/AgentSalesReport.vue"),
              },
              {
                path: ":id/agent-request",
                component: () =>
                  import("@/views/Profile/SaleAgents/AgentRequestDetails.vue"),
              },
            ],
          },
          {
            path: "add-business",
            component: () => import("@/views/Profile/Business/AddBusiness.vue"),
          },
          {
            name: "ProfileSignupSummary",
            path: "summary",
            component: () => import("@/views/Signup/Vendor/Summary.vue"),
          },
          {
            name: "ProfileSignupBusinessInfo",
            path: "business-info",
            component: () => import("@/views/Signup/Vendor/BusinessInfo.vue"),
          },
          {
            name: "ProfileSignupBrandInfo",
            path: "brand-info",
            component: () => import("@/views/Signup/Vendor/BrandInfo.vue"),
          },
          {
            name: "ProfileSignupLocationInfo",
            path: "location-info",
            component: () => import("@/views/Signup/Vendor/LocationInfo.vue"),
          },
          {
            name: "ProfileSignupStockInfo",
            path: "stock-info",
            component: () => import("@/views/Signup/Vendor/StockInfo.vue"),
          },
          {
            name: "ProfileSignupUploadPhoto",
            path: "upload-photo",
            component: () => import("@/views/Signup/Vendor/UploadPhoto.vue"),
          },
          {
            name: "ProfileSignupSignupComplete",
            path: "signup-complete",
            component: () => import("@/views/Signup/Vendor/SignupComplete.vue"),
          },
          {
            path: "edit-profile",
            component: () =>
              import("@/views/Profile/CompanyProfile/EditProfile.vue"),
          },
          {
            path: "change-photo",
            component: () =>
              import("@/views/Profile/CompanyProfile/ChangePhoto.vue"),
          },
          {
            path: "change-cover-photo",
            component: () =>
              import("@/views/Profile/CompanyProfile/ChangeCoverPhoto.vue"),
          },

          // team routes

          {
            path: "team",
            component: () => import("@/views/Profile/Team.vue"),
            children: [
              {
                path: "",
                component: () => import("@/views/Profile/Team/TeamMembers.vue"),
              },
              {
                path: "add-member",
                component: () => import("@/views/Profile/Team/AddMember.vue"),
              },
              {
                path: "role-and-permission",
                component: () => import("@/views/Profile/Team/RoleAndPermission.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "personal",
        component: () => import("@/views/Profile/Personal.vue"),
        redirect: "/profile/personal/edit-profile",
        children: [
          {
            path: "edit-profile",
            component: () => import("@/views/Profile/Personal/EditProfile.vue"),
          },
          {
            path: "change-photo",
            component: () =>
              import("@/views/Profile/Personal/ChangeProfilePhoto.vue"),
          },
          {
            path: "reset-pin",
            component: () => import("@/views/Profile/Personal/ResetPin.vue"),
          },
        ],
      },

      {
        path: "address",
        component: () => import("@/views/Profile/Address.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/Profile/Address/AddressList.vue"),
          },
          {
            path: "add-address",
            component: () => import("@/views/Profile/Address/AddAddress.vue"),
          },
          {
            path: "business/:business_id/location/:id/edit-address",
            component: () => import("@/views/Profile/Address/EditAddress.vue"),
          },
        ],
      },
      {
        path: "account-activity",
        component: () => import("@/views/Profile/AccountActivity.vue"),
      },
    ],
  },
];
