
export const VendorOrdersRoutes = [
    {
        path: "orders",
        redirect: "/vendor/orders/history",
    },
    {
        path: "orders/:id",
        component: () => import("@/views/Vendor/Orders/OrderDetails.vue"),
    },
    {
        name: "VendorOrderHistory",
        path: "orders/history",
        component: () => import("@/views/Vendor/Orders/OrderHistory.vue"),
    },

    {
        path: "orders/record-order/select-agent",
        component: () =>
            import("@/views/Vendor/Orders/SelectAgent.vue"),
    },
    {
        path: "orders/record-order/select-customer",
        component: () =>
            import("@/views/SaleAgent/Orders/SelectCustomer.vue"),
    },
    {
        path: "orders/record-order/select-order-type",
        component: () =>
            import("@/views/SaleAgent/Orders/SelectOrderType.vue"),
    },
    {
        path: "orders/record-order/delivery-details",
        component: () =>
            import("@/views/SaleAgent/Orders/DeliveryDetails.vue"),
    },
    {
        path: "orders/record-order/select-products",
        component: () =>
            import("@/views/SaleAgent/Orders/SelectProducts.vue"),
    },
    {
        path: "orders/record-order/configure-items",
        component: () =>
            import("@/views/SaleAgent/Orders/ConfigureItems.vue"),
    },
    {
        path: "orders/record-order/order-confirmation",
        component: () =>
            import("@/views/SaleAgent/Orders/OrderConfirmation.vue"),
    },
]
