import { createAnimation, toastController } from "@ionic/vue";
import { alertCircleOutline, checkmarkCircleOutline, informationCircleOutline, warningOutline } from "ionicons/icons";
import { defineStore } from "pinia";


export const useToastStore = defineStore('toast', {

    state() {
        return {

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

        async showToast(
            message: string,
            title?: string,
            position: 'top' | 'bottom' | 'middle' = 'top',
            type: 'success' | 'error' | 'warning' | 'info' = 'info'
        ) {

            const toast = await toastController.create({
                header: title,
                message: message,
                duration: 2000,
                position: position,
                animated: true,
                cssClass: `app-toast toast-${type}`,
                icon: this.getIcon(type)
            });

            await toast.present();
        },

        async showSuccess(message: string, title?: string, position: any = 'top') {
            return this.showToast(message, title, position, 'success');
        },

        async showError(message: string, title?: string, position: any = 'top') {
            return this.showToast(message, title, position, 'error');
        },

        async showWarning(message: string, title?: string, position: any = 'top') {
            return this.showToast(message, title, position, 'warning');
        },

        async showInfo(message: string, title?: string, position: any = 'top') {
            return this.showToast(message, title, position, 'info');
        },
    }
})
