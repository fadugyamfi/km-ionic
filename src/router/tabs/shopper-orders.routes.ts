
export const ShopperOrdersRoutes = [
    {
        path: "orders",
        component: () => import("@/views/Shopper/Orders/OrderHistory.vue"),
    },
    {
        name: "ShopperOrderHistory",
        path: "orders/history",
        component: () => import("@/views/Shopper/Orders/OrderHistory.vue"),
    },
    {
        name: "ShopperOrderDetails",
        path: "orders/:id",
        component: () => import("@/views/Shopper/Orders/OrderDetails.vue"),
    },
    {
        name: "ShopperEditOrder",
        path: "orders/:id/edit-order",
        component: () => import("@/views/Shopper/Orders/EditOrder.vue"),
    },
]
