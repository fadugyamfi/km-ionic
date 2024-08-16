
export const ShopperHomeRoutes = [
    {
        path: "home",
        name: 'ShopperHome',
        component: () => import("@/views/Shopper/Home/Home.vue"),
    },
    {
        path: "home/categories",
        component: () =>
            import("@/views/Shopper/Categories/Categories.vue"),
    },
    {
        path: "home/categories/:id",
        component: () =>
            import("@/views/Shopper/Categories/CategoryDetails.vue"),
    },
    {
        path: "home/brands",
        component: () => import("@/views/Shopper/Brands/Brands.vue"),
    },
    {
        path: "home/brands/:id",
        component: () => import("@/views/Shopper/Brands/BrandDetails.vue"),
    },

    {
        path: "home/brands/:id/products",
        component: () => import("@/views/Shopper/Brands/BrandByProduct.vue"),
    },
    {
        path: "home/suppliers",
        component: () => import("@/views/Shopper/Businesses/Businesses.vue"),
        meta: {
            title: "Suppliers",
            businessType: "supplier",
        },
    },
    {
        path: "home/businesses",
        component: () => import("@/views/Shopper/Businesses/Businesses.vue"),
    },
    {
        path: "home/businesses/:id",
        component: () => import("@/views/Shopper/Businesses/BusinessDetails.vue"),
    },
    {
        path: "home/businesses/:id/products",
        component: () => import("@/views/Shopper/Businesses/BusinessProducts.vue"),
    },
    {
        path: "home/promotions/:idOrSlug",
        component: () => import("@/views/Shopper/Promotions/PromotionItems.vue"),
    },
];
