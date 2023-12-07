import { useUserStore } from "@/stores/UserStore";
import TabsPage from "@/views/TabsPage.vue";
import HomePage from "@/views/Shopper/HomePage.vue";

export const ShopperModeRoutes = [
  {
    path: "/shopper/",
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

      if (userStore.appMode == "vendor") {
        return { name: "VendorHome" };
      }
    },
    children: [
      {
        path: "",
        redirect: "/shopper/home",
      },
      {
        path: "home",
        component: HomePage,
        children: [
          {
            name: "ShopperHome",
            path: "",
            component: () => import("@/views/Shopper/Home/Home.vue"),
          },
          {
            path: "categories",
            component: () =>
              import("@/views/Shopper/Categories/Categories.vue"),
          },
          {
            path: "categories/:id",
            component: () =>
              import("@/views/Shopper/Categories/CategoryDetails.vue"),
          },
          {
            path: "brands",
            component: () => import("@/views/Shopper/Brands/Brands.vue"),
          },
          {
            path: "brands/:id",
            component: () => import("@/views/Shopper/Brands/BrandDetails.vue"),
          },

          {
            path: "brands/:id/products",
            component: () =>
              import("@/views/Shopper/Brands/BrandByProduct.vue"),
          },
          {
            path: "suppliers",
            component: () =>
              import("@/views/Shopper/Businesses/Businesses.vue"),
            meta: {
              title: "Suppliers",
              businessType: "supplier",
            },
          },
          {
            path: "businesses",
            component: () =>
              import("@/views/Shopper/Businesses/Businesses.vue"),
          },
          {
            path: "businesses/:id",
            component: () =>
              import("@/views/Shopper/Businesses/BusinessDetails.vue"),
          },
          {
            path: "businesses/:id/products",
            component: () =>
              import("@/views/Shopper/Businesses/BusinessProducts.vue"),
          },
        ],
      },
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
      {
        path: "orders",
        component: () => import("@/views/Shopper/Orders.vue"),
        children: [
          {
            path: "",
            redirect: "/shopper/orders/history",
          },
          {
            name: "ShopperOrderHistory",
            path: "history",
            component: () => import("@/views/Shopper/Orders/OrderHistory.vue"),
          },
          {
            name: "ShopperOrderDetails",
            path: ":id",
            component: () => import("@/views/Shopper/Orders/OrderDetails.vue"),
          },
          {
            name: "ShopperEditOrder",
            path: ":id/edit-order",
            component: () => import("@/views/Shopper/Orders/EditOrder.vue"),
          },
        ],
      },
      {
        path: "cart",
        component: () => import("@/views/Shopper/Cart.vue"),
        children: [
          {
            path: "",
            redirect: "/shopper/cart/business",
          },
          {
            path: "business",
            component: () => import("@/views/Shopper/Cart/Bussiness.vue"),
          },
          {
            path: "business/:id/orders",
            component: () => import("@/views/Shopper/Cart/BusinessCart.vue"),
          },
          {
            path: "business/:id/delivery-details",
            component: () => import("@/views/Shopper/Cart/DeliveryDetails.vue"),
          },
          {
            path: "business/:id/payment-options",
            component: () => import("@/views/Shopper/Cart/PaymentOptions.vue"),
          },
          {
            path: "business/:id/item-review",
            component: () => import("@/views/Shopper/Cart/ItemReview.vue"),
          },
          {
            path: "business/:id/order-confirmation",
            component: () =>
              import("@/views/Shopper/Cart/OrderConfirmation.vue"),
          },
          {
            path: "business/:id/payment-method",
            component: () => import("@/views/Shopper/Cart/PaymentMethod.vue"),
          },
        ],
      },

      {
        path: "credits",
        component: () => import("@/views/Shopper/Credits.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("@/views/Shopper/Credit/CreditHistoryList.vue"),
          },

          {
            path: ":id/credit-details",
            component: () => import("@/views/Shopper/Credit/CreditDetails.vue"),
          },
          {
            path: ":id/record-repayment",
            component: () =>
              import("@/views/Shopper/Credit/RecordRepayment.vue"),
          },
        ],
      },
      {
        path: "profile",
        component: () => import("@/views/Shopper/Profile.vue"),
      },
    ],
  },
];
