
export const VendorCreditsRoutes = [
    {
        path: "credits",
        component: () => import("@/views/Vendor/Credit/CreditReport.vue"),
    },
    {
        path: "credits/history",
        component: () =>
            import("@/views/Vendor/Credit/CreditHistoryList.vue"),
    },
    {
        path: "credits/:id/credit-details",
        component: () => import("@/views/Vendor/Credit/CreditDetails.vue"),
    },
    {
        path: "credits/:id/record-repayment",
        component: () =>
            import("@/views/Vendor/Credit/RecordRepayment.vue"),
    },
];
