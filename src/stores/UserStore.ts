// /store/user.js

import { defineStore } from "pinia";
import { handleAxiosRequestError } from "@/utilities";
import { useBusinessStore } from "./BusinessStore";
import axios from 'axios';
import { Preferences } from "@capacitor/preferences";

const meta = (key: string) => {
    const meta = document.querySelector(`meta[name="${key}"]`);
    return meta ? meta.getAttribute('content') : null;
};

type UserStoreState = {
    onboarded: Boolean,
    user?: User|null,
    fetching: Boolean,
    registering: Boolean,
    registrationFlow?: String,
    auth?: object|null,
    apiHeaders?: object|null,
    verification: {
        phone_number: String,
        response: object
    }
}

type Auth = {
    access_token: String,
}

class User {

    public id_cms_privileges: number | null = null;
    public phone_number: string | null = null;
    public name: string | null = null;
    public parent_users_id: number | null = null;
    public location: string | null = null;
    public id: number | null = null;

    constructor(data: Object) {
        Object.assign(this, data)
    }

    firstName() {
        return this.name?.split(' ')[0];
    }

    isSuperAdmin() {
        return this.id_cms_privileges == 1;
    }

    isSaleAgent() {
        return this.id_cms_privileges == 5;
    }

    isSalesManager() {
        return this.id_cms_privileges == 2; // Sales Manager
    }

    isOwner() {
        return this.id_cms_privileges == 4; // Owner
    }
}

export const useUserStore = defineStore("user", {

    state: (): UserStoreState => {
        return {
            onboarded: false,
            fetching: false,
            registering: false,
            registrationFlow: '',
            user: null as User | null,
            auth: null as Auth | null,
            apiHeaders: null,
            verification: {
                phone_number: '',
                response: {
                    has_password: false,
                    has_pin_number: false,
                    otp: "",
                    phone_number: "",
                    phone_number_verified_at: null,
                    should_change_pin: false,
                    two_factor_auth_sent: false,
                }
            }
        }
    },

    getters: {

        async getCachedUser(state): Promise<User | null> {
            const userResult = await Preferences.get({ key: 'kola.user'});

            if (userResult.value && userResult.value != 'undefined') {
                return new User(JSON.parse(userResult.value));
            }

            await Preferences.remove({ key: 'kola.user' })
            return null;
        },

        async getUser(state): Promise<User | null> {
            if (!state.user) {
                state.user = await this.getCachedUser;
            }

            return state.user;
        },

        getApiHeaders(state): object|null {
            try {
                const auth: any = state.auth;

                let headers: { [key: string]: any } = {
                    'Content-Language': document.querySelector("html")?.getAttribute('lang') || 'en',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.access_token}`
                };

                const business_id = meta("business_id");

                if (business_id) {
                    headers['X-Tenant-Id'] = business_id;
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
            let user = null;
            const userResult = await Preferences.get({ key: 'kola.user' });
            const authResult = await Preferences.get({ key: 'kola.auth' });
            const onboardedResult = await Preferences.get({ key: 'kola.onboarded' });

            if (userResult.value && userResult.value != 'undefined') {
                user = new User(JSON.parse(userResult.value));
            }

            if( authResult.value && typeof authResult.value == 'string' ) {
                const auth = JSON.parse(authResult.value);
                axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.access_token}`;
            }
        },

        async storeUser(user: User) {
            this.user = user;
            await Preferences.set({ key: 'kola.user', value: JSON.stringify(this.user)});
        },

        async storeAuth(auth: object) {
            this.auth = auth;
            await Preferences.set({ key: 'kola.auth', value: JSON.stringify(this.auth)});
        },

        async storeOnboarded(onboarded: boolean) {
            this.onboarded = onboarded;
            await Preferences.set({key: 'kola.onboarded', value: this.onboarded ? 'true' : 'false'});
        },

        async verifyPhoneNumber(credentials: { phone_number: string }) {
            this.verification.phone_number = credentials.phone_number;

            return axios.post('/v2/auth/verify', credentials)
                .then((response) => {
                    this.verification.response = response.data.data;
                    return response.data;
                })
                .catch(error => handleAxiosRequestError(error))
        },

        async verifyOtp(credentials: { phone_number: string; code: string; }) {
            return axios.post('/v2/auth/verify-otp', credentials)
                .then(response => {
                    this.storeUser( new User(response.data.data.user) );
                    this.storeAuth(response.data.data.auth);

                    return response.data
                })
                .catch(error => handleAxiosRequestError(error))
        },

        async setupPin(credentials: object) {
            return axios.post('/v2/auth/pin-setup', credentials)
                .then(response => response.data)
                .catch(error => handleAxiosRequestError(error))
        },

        async updatePhoneVerification(phone_number: string) {
            return axios
                .post('/v2/auth/update-verification', { phone_number })
                .then((response) => response.data)
                .catch(error => handleAxiosRequestError(error))
        },

        async fetchUserInfo() {
            Object.assign(axios.defaults.headers.common, this.getApiHeaders);

            return axios.get('/v2/auth/me')
                .then(response => {
                    this.storeUser(new User(response.data.data))
                    return this.user;
                })
                .catch(error => handleAxiosRequestError(error))
                .finally(() => this.fetching = false);
        },

        async login(credentials: any) {

            return axios.post('/v2/auth/login', credentials)
                .then(async (response) => {
                    if (!response.data) {
                        throw new Error("Login failed. No response data");
                    }

                    this.storeAuth(response.data);
                    this.storeOnboarded(true);

                    const user = await this.fetchUserInfo();

                    if (!this.user?.isSuperAdmin()) {
                        this.fetchUserBusinesses();
                    }

                    return user;

                })
                .catch(error => {
                    console.log(error);

                    throw new Error(error.response?.data?.api_message);
                });
        },

        async fetchUserBusinesses() {
            return axios.get(`/v2/users/${this.user?.id}/businesses`)
                .then(response => {
                    const businessStore = useBusinessStore();
                    const businesses = response.data.data;
                    businessStore.businesses = businesses;

                    if( businesses?.length > 0 ) {
                        businessStore.setSelectedBusiness(businesses[0].business)
                    }
                })
        },

        async logout() {
            return axios.post("/v2/auth/logout").then(async (response) => {
                await Preferences.remove({ key: "kola.business" });
                await Preferences.remove({ key: 'kola.user' });
                await Preferences.remove({ key: 'kola.auth' });
                await Preferences.remove({ key: 'kola.step' })

                const businessStore = useBusinessStore();
                businessStore.clearSelectedBusiness();

                return response?.data;
            });

        }
    },
});
