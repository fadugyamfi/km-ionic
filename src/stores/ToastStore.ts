import { createAnimation, toastController } from "@ionic/vue";
import { alertCircleOutline, checkmarkCircleOutline, informationCircleOutline, warningOutline } from "ionicons/icons";
import { defineStore } from "pinia";
import { useUserStore } from "./UserStore";


export const useToastStore = defineStore('toast', {

    state() {
        return {
            showUIBlock: false,
            defaultText: 'Hang on. We are processing your action',
            blockText: 'Hang on. We are processing your action'
        }
    },

    actions: {
        getIcon(type: string) {
            switch(type) {
                case 'info': return informationCircleOutline;
                case 'warning': return warningOutline;
                case 'success': return checkmarkCircleOutline;
                case 'error': return alertCircleOutline;
                default:
                    return alertCircleOutline;
            }
        },

        blockUI(text?: string) {
            this.showUIBlock = true;
            this.blockText = text || this.defaultText
        },

        unblockUI() {
            this.showUIBlock = false;
        },

        async showToast(
            message: string,
            title?: string,
            position: 'top' | 'bottom' | 'middle' = 'top',
            type: 'success' | 'error' | 'warning' | 'info' = 'info',
            anchor?: string
        ) {

            const userStore = useUserStore();

            if( !anchor ) {
                if( position == 'bottom' ) {
                    anchor = userStore.appMode == 'shopping' ? 'shopperTabs' : 'vendorTabs';
                }
            }

            const toast = await toastController.create({
                header: title,
                message: message,
                duration: 2500,
                position: position,
                animated: true,
                cssClass: `app-toast toast-${type}`,
                icon: this.getIcon(type),
                positionAnchor: anchor
            });

            await toast.present();
        },

        async showSuccess(message: string, title?: string, position: any = 'bottom', anchor?: string) {
            return this.showToast(message, title, position, 'success', anchor);
        },

        async showError(message: string, title?: string, position: any = 'bottom', anchor?: string) {
            return this.showToast(message, title, position, 'error', anchor);
        },

        async showWarning(message: string, title?: string, position: any = 'bottom', anchor?: string) {
            return this.showToast(message, title, position, 'warning', anchor);
        },

        async showInfo(message: string, title?: string, position: any = 'bottom', anchor?: string) {
            return this.showToast(message, title, position, 'info', anchor);
        },
    }
})
