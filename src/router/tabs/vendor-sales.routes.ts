
export const VendorSalesRoutes = [
    {
        path: "sales",
        component: () => import("@/views/Vendor/Sales/Home.vue"),
    },
    {
        path: "sales/:id",
        component: () => import("@/views/Vendor/Sales/SaleDetails.vue"),
    },
    {
        path: "sales/history",
        component: () => import("@/views/Vendor/Sales/SalesHistory.vue"),
    },
    {
        path: "sales/:id/record-repayment",
        component: () => import("@/views/Vendor/Sales/RecordRepayment.vue"),
    },
    {
        path: "sales/products/:id",
        component: () => import("@/views/Shopper/ProductDetails.vue"),
        meta: {
            showCartButtons: false,
        },
    },
    {
        path: "sales/add-sale",
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

];
