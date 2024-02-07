
export const ShopperCartRoutes = [
    {
        path: "cart",
        redirect: "/shopper/cart/business",
        // component: () => import("@/views/Shopper/Cart.vue"),
    },
    {
        path: "cart/business",
        component: () => import("@/views/Shopper/Cart/Bussiness.vue"),
    },
    {
        path: "cart/business/:id/orders",
        component: () => import("@/views/Shopper/Cart/BusinessCart.vue"),
    },
    {
        path: "cart/business/:id/delivery-details",
        component: () => import("@/views/Shopper/Cart/DeliveryDetails.vue"),
    },
    {
        path: "cart/business/:id/payment-options",
        component: () => import("@/views/Shopper/Cart/PaymentOptions.vue"),
    },
    {
        path: "cart/business/:id/item-review",
        component: () => import("@/views/Shopper/Cart/ItemReview.vue"),
    },
    {
        path: "cart/business/:id/order-confirmation",
        component: () =>
            import("@/views/Shopper/Cart/OrderConfirmation.vue"),
    },
    {
        path: "cart/business/:id/payment-method",
        component: () => import("@/views/Shopper/Cart/PaymentMethod.vue"),
    },
];
