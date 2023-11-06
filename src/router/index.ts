import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { VendorSignupRoutes } from "./vendor-signup.routes";
import { ShopperModeRoutes } from "./shopper-mode.routes";
import { VendorModeRoutes } from "./vendor-mode.routes";
import { ProfileRoutes } from "./profile.routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/shopper/home",
  },
  {
    name: "Onboarding",
    path: "/onboarding",
    component: () => import("@/views/Onboarding/Onboarding.vue"),
  },
  {
    name: "Login",
    path: "/auth/login",
    component: () => import("@/views/Auth/Login.vue"),
  },
  {
    name: "Verify OTP",
    path: "/auth/verify-otp",
    component: () => import("@/views/Auth/ValidateOTP.vue"),
  },
  {
    name: "Verify Number",
    path: "/auth/verify-number",
    component: () => import("@/views/Auth/PhoneNumberVerify.vue"),
  },
  {
    name: "Reset PIN",
    path: "/auth/reset-pin",
    component: () => import("@/views/Auth/ResetPIN.vue"),
  },
  {
    name: "Signup",
    path: "/signup",
    component: () => import("@/views/Signup/Landing.vue"),
  },
  {
    name: "ShopperSignup",
    path: "/signup/shopper",
    component: () => import("@/views/Signup/Shopper.vue"),
  },

  // Vendor Signup Routes
  ...VendorSignupRoutes,

  // Shopper Mode Routes
  ...ShopperModeRoutes,

  // Vendor Mode Routes
  ...VendorModeRoutes,

  // Profile Routes
  ...ProfileRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
