import axios from "axios";
import { defineStore } from "pinia";
import AppStorage from "./AppStorage";
import { useToastStore } from "./ToastStore";
import { Network } from "@capacitor/network";
import { toastController } from "@ionic/vue";
import { wifiOutline } from "ionicons/icons";
import { useUserStore } from "./UserStore";
import { useI18n } from "vue-i18n";

const storage = new AppStorage();
const APP_UPDATING_KEY = 'kola.app.updating';

export const useAppStore = defineStore("app", {

    state: () => ({
        installingUpdate: false,
        networkConnected: true,
        networkType: 'none'
    }),

    actions: {

        async loadCachedSettings() {
            this.installingUpdate = await storage.get(APP_UPDATING_KEY);
        },

        setInstallingUpdate(installing: boolean) {
            this.installingUpdate = installing;
            storage.set(APP_UPDATING_KEY, installing);
        },

        async registerUpdateListeners() {
            if (!("serviceWorker" in navigator)) {
                return;
            }

            let refreshing = false;
            const toastStore = useToastStore();
            const registration = await navigator.serviceWorker.getRegistration();

            if (registration) {
                registration.addEventListener("updatefound", () => {
                    toastStore.showInfo("Installing New Updates In The Background", "Update Available", "top");
                    this.setInstallingUpdate(true);

                    // our new instance is visible under installing property, because it is in 'installing' state
                    // let's wait until it changes its state
                    setTimeout(() => {
                        registration.installing?.addEventListener('statechange', () => {

                            if (registration.waiting) {
                                toastStore.showSuccess("Update Installed. Application will refresh shortly", "Update Installed", "top");

                                this.setInstallingUpdate(false);
                                setTimeout(() => window.location.reload(), 3000);
                            } else {
                                console.log('serviceWorker activate listener');
                                // toastStore.showError("Install Failed. We'll retry again later", "Install Failed", "top");
                            }
                        });
                    }, 1000)

                });

                // detect controller change and refresh the page
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    if (!refreshing) {
                        refreshing = true
                        window.location.reload()
                    }
                })
            } else {
                setTimeout(() => this.registerUpdateListeners(), 5000);
            }
        },

        registerNetworkStatusListener() {
            const { t } = useI18n();
            const userStore = useUserStore();

            Network.addListener('networkStatusChange', async (status) => {
                if( this.networkConnected == status.connected ) {
                    return;
                }

                let message = '';
                const anchor = userStore.isInGuestMode() ? 'guestTabs' :
                    (userStore.appMode == 'shopping' ? 'shopperTabs' : 'vendorTabs');

                if( this.networkConnected && !status.connected ) {
                    message = t("general.offlineMessage");
                } else if( !this.networkConnected && status.connected ) {
                    message = t('general.onlineMessage');
                }

                const toast = await toastController.create({
                    message: message,
                    duration: 5000,
                    position: 'bottom',
                    animated: true,
                    cssClass: `app-toast`,
                    icon: wifiOutline,
                    positionAnchor: anchor,
                    swipeGesture: "vertical"
                });

                await toast.present();

                this.networkConnected = status.connected;
                this.networkType = status.connectionType;
            });
        }
    }
});
