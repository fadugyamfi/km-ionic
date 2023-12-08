import { defineStore } from "pinia";
import { handleAxiosRequestError } from "@/utilities";
import axios from "axios";
import User from "@/models/User";
import Business from "@/models/Business";
import AppStorage from "./AppStorage";

const meta = (key: string) => {
  const meta = document.querySelector(`meta[name="${key}"]`);
  return meta ? meta.getAttribute("content") : null;
};

const storage = new AppStorage();

type UserStoreState = {

  getUserAccountActivities: [];
  onboarded: Boolean;
  user?: User | null;
  fetching: Boolean;
  updatingProfile: Boolean;
  appMode: string | null;
  registering: Boolean;
  resettingPIN: Boolean;
  registrationFlow?: String;
  auth?: object | null;
  apiHeaders?: object | null;
  userBusinesses?: Business[];
  activeBusiness?: Business | null;
  verification: {
    phone_number: String;
    response: any;
  };
  userForm?: any;
  companyForm?: any;
};

type Auth = {
  access_token: String;
};

export interface ChangePINRequest {
  phone_number: string;
  pin: string;
  pin_confirmation: string;
  old_pin?: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserStoreState => {
    return {
      getUserAccountActivities: [],
      onboarded: false,
      appMode: "shopping",
      fetching: false,
      resettingPIN: false,
      updatingProfile: false,
      registering: false,
      registrationFlow: "",
      user: null as User | null,
      auth: null as Auth | null,
      apiHeaders: null,
      userBusinesses: [] as Business[],
      activeBusiness: null,
      verification: {
        phone_number: "",
        response: {
          has_password: false,
          has_pin_number: false,
          otp: "",
          phone_number: "",
          phone_number_verified_at: null,
          should_change_pin: false,
          two_factor_auth_sent: false,
        },
      },
      userForm: {
        id: "",
        name: "",
        email: "",
        phone_number: "",
        photo: ""
      },
      companyForm: {
        business_types_id: "",
        email: null,
        location: "",
        name: "",
        phone_number: "",
        photo: "",
        logo: "",
      },
    };
  },

  getters: {
    async getCachedUser(state): Promise<User | null> {
      const userResult = await storage.get("kola.user");

      if (userResult && userResult != "undefined") {
        return new User(userResult);
      }

      await storage.remove("kola.user");
      return null;
    },

    async getUser(state): Promise<User | null> {
      if (!state.user) {
        state.user = await this.getCachedUser;
      }

      return state.user;
    },

    getApiHeaders(state): object | null {
      try {
        const auth: any = state.auth;

        let headers: { [key: string]: any } = {
          "Content-Language":
            document.querySelector("html")?.getAttribute("lang") || "en",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.access_token}`,
        };

        const business_id = meta("business_id");

        if (business_id) {
          headers["X-Tenant-Id"] = business_id;
        }

        return headers;
      } catch (e) {
        console.error("error", e);
        return null;
      }
    },
  },

  actions: {
    async loadStoredData() {
      if (this.user && this.auth) {
        return;
      }

      const userResult = await storage.get("kola.user");
      const authResult = await storage.get("kola.auth");
      const onboardedResult = await storage.get("kola.onboarded");
      const appModeResult = await storage.get("kola.app-mode");
      const userBusinesses = await storage.get("kola.user-businesses");
      const activeBusiness = await storage.get("kola.active-business");
      const userRegistering = await storage.get("kola.user-registering");

      if (onboardedResult) {
        this.onboarded = !!onboardedResult;
      }

      if (userResult && userResult != "undefined") {
        const user = new User(userResult);
        this.user = user;
      }

      if (authResult) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authResult?.access_token}`;
        this.auth = authResult;
      }

      this.appMode = appModeResult || "shopping";
      this.userBusinesses = userBusinesses || [];
      this.activeBusiness = activeBusiness || null;
      this.registering = userRegistering || false;
    },

    isInShoppingMode() {
      return this.appMode == "shopping";
    },

    async setAppModeAsVendor() {
      this.appMode = 'vendor';
      await storage.set('kola.app-mode', this.appMode, 7, 'days');
    },

    async setAppModeAsShopping() {
      this.appMode = 'shopping';
      await storage.set('kola.app-mode', this.appMode, 7, 'days');
    },

    async toggleAppMode() {
      this.appMode = this.appMode == "shopping" ? "vendor" : "shopping";
      await storage.set("kola.app-mode", this.appMode, 7, "days");
    },

    async storeUser(user: User) {
      this.user = user;
      await storage.set("kola.user", this.user, 1, "year");
    },

    async storeAuth(auth: object) {
      this.auth = auth;
      await storage.set("kola.auth", this.auth, 1, "year");
      await this.updateRequestAuthorization();
    },

    async storeOnboarded(onboarded: boolean) {
      this.onboarded = onboarded;
      await storage.set(
        "kola.onboarded",
        this.onboarded ? "true" : "false",
        5,
        "years"
      );
    },

    async verifyPhoneNumber(credentials: {
      phone_number: string;
      request_otp?: boolean;
    }) {
      this.verification.phone_number = credentials.phone_number;

      if (this.resettingPIN) {
        credentials.request_otp = true;
      }

      return axios
        .post("/v2/auth/verify", credentials)
        .then((response) => {
          this.verification.response = response.data.data;
          return response.data;
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async verifyOtp(credentials: { phone_number: string; code: string }) {
      return axios
        .post("/v2/auth/verify-otp", credentials)
        .then((response) => {
          this.storeUser(new User(response.data.data.user));
          this.storeAuth(response.data.data.auth);

          return response.data;
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async changePin(credentials: ChangePINRequest) {
      return axios
        .post("/v2/auth/change-pin", credentials)
        .then((response) => {
          this.resettingPIN = false;

          return response.data;
        })
        .catch((error) => handleAxiosRequestError(error));
    },

    async updatePhoneVerification(phone_number: string) {
      return axios
        .post("/v2/auth/update-verification", { phone_number })
        .then((response) => response.data)
        .catch((error) => handleAxiosRequestError(error));
    },

    async setActiveBusiness(business: Business) {
      this.activeBusiness = business;
      await storage.set("kola.active-business", business, 1, "month");
    },

    async setRegisteringAs(flow: string) {
      this.resettingPIN = false;
      this.registering = true;
      this.registrationFlow = flow;

      await storage.set("kola.user-registering", this.registering);
    },

    async fetchUserInfo() {
      Object.assign(axios.defaults.headers.common, this.getApiHeaders);

      return axios
        .get("/v2/auth/me")
        .then((response) => {
          this.storeUser(new User(response.data.data));
          return this.user;
        })
        .catch((error) => handleAxiosRequestError(error))
        .finally(() => (this.fetching = false));
    },
    async updateUserInfo() {
      return axios
        .put(`/v2/users/${this.user?.id}`, this.userForm)
        .then((response) => {
          this.storeUser(new User(response.data.data));
          this.resetUserForm();
          return this.user;
        })
        .catch((error) => handleAxiosRequestError(error))
        .finally(() => (this.fetching = false));
    },

    async login(credentials: any) {
      return axios
        .post("/v2/auth/login", credentials)
        .then(async (response) => {
          if (!response.data) {
            throw new Error("Login failed. No response data");
          }

          this.storeAuth(response.data);
          this.storeOnboarded(true);

          const user = await this.fetchUserInfo();

          if (this.user?.isOwner()) {
            this.fetchUserBusinesses();
          } else {
            this.fetchUserBusinesses(user?.parent_users_id);
          }

          return user;
        })
        .catch((error) => {
          console.log(error);

          throw new Error(error.response?.data?.api_message);
        });
    },

    async fetchUserBusinesses(user_id: number | null = null) {
      let user = user_id || this.user?.id;

      return axios
        .get(`/v2/users/${user}/businesses`)
        .then(async (response) => {
          const businesses = response.data.data;
          this.userBusinesses = businesses.map(
            (el: any) => new Business(el.business)
          );

          if (
            typeof this.userBusinesses != "undefined" &&
            this.userBusinesses.length > 0
          ) {
            await storage.set("kola.user-businesses", this.userBusinesses, 1, "month");
            this.setActiveBusiness(this.userBusinesses[0]);
          }
        });
    },
  
      async getUserAccountActivities(options = {}) {
      // const userStore = useUserStore();
      // const params = {
      //   causer_id: userStore.user?.id,
      //   limit: 50,
      //   ...options,
      // };
    
      try {
    
        // const response = await axios.get('/v2/activities', { params });

          const response = await axios.get('/v2/activities');
        if (response.status >= 200 && response.status < 300) {
          const data = response.data.data;
          return data;
        }
      } catch (error) {
      
        handleAxiosRequestError(error);
      }
    
      return null;
    },

    async clearSessionInfo() {
      await storage.remove("kola.active-business");
      await storage.remove("kola.user-businesses");
      await storage.remove("kola.business");
      await storage.remove("kola.user");
      await storage.remove("kola.auth");
      await storage.remove("kola.step");
      this.user = null;
    },

    async logout() {
      return axios.post("/v2/auth/logout").then(async (response) => {
        await this.clearSessionInfo();

        return response?.data;
      });
    },

    async updateRequestAuthorization() {
      const auth = await storage.get("kola.auth");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.access_token}`;
    },

    resetUserForm() {
      this.userForm = {
        id: "",
        name: "",
        email: "",
        phone_number: "",
        photo: ""
      };
    }
  },
});
