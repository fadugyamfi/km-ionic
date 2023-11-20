<template>
    <section>
        <IonItem lines="none" class="profile-item ion-margin-top">
            <ProfileAvatar slot="start" :src="userStore.user?.image" :username="userStore.user?.name" customSize="32px"></ProfileAvatar>

            <IonLabel>{{ userStore.user?.name }}</IonLabel>
            <IonIcon slot="end" :icon="createOutline"></IonIcon>
        </IonItem>

        <IonList lines="none">
            <IonItem :detail="true" :button="true" class="profile-item" :disabled="true">
                <IonAvatar slot="start">
                    <img src="/images/ic_location.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Address</IonLabel>
            </IonItem>

            <IonItem :detail="true" :button="true" class="profile-item" :disabled="true">
                <IonAvatar slot="start">
                    <img src="/images/ic_password.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Password</IonLabel>
            </IonItem>

            <IonItem :detail="true" :button="true" class="profile-item" @click="showNotifications()">
                <IonAvatar slot="start">
                    <img src="/images/ic_notification.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Notifications</IonLabel>
            </IonItem>

            <IonItem :detail="true" :button="true" class="profile-item" :disabled="true">
                <IonAvatar slot="start">
                    <img src="/images/ic_user.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Account Activity</IonLabel>
            </IonItem>

            <IonItem :detail="true" :button="true" class="profile-item" :disabled="true">
                <IonAvatar slot="start">
                    <img src="/images/ic_help_support.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Help & Support</IonLabel>
            </IonItem>

            <IonItem :detail="true" :button="true" class="profile-item" @click="logout()">
                <IonAvatar slot="start">
                    <IonIcon :icon="powerOutline" style="font-size: 21px;"></IonIcon>
                </IonAvatar>
                <IonLabel>Log Out</IonLabel>
            </IonItem>
        </IonList>
    </section>
</template>

<script lang="ts">
import { IonIcon, IonLabel, IonItem, IonAvatar, IonList, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { mapStores } from 'pinia';
import { search, createOutline, powerOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { useToastStore } from '../../stores/ToastStore';
import { handleAxiosRequestError } from '../../utilities';
import { AxiosError } from 'axios';
import ProfileAvatar from '@/components/ProfileAvatar.vue';
import NotificationsModal from '@/components/notifications/NotificationsModal.vue';


export default defineComponent({

    components: { IonList, IonAvatar, IonItem, IonLabel, IonIcon, ProfileAvatar },

    computed: {
        ...mapStores( useUserStore )
    },

    data() {
        const router = useRouter();

        return {
            createOutline,
            powerOutline,
            search,
            router
        }
    },

    methods: {
        logout() {
            const toastStore = useToastStore();
            toastStore.blockUI("Logging Out...");

            this.userStore.logout()
                .then(() => {
                    this.router.replace('/auth/login');
                })
                .catch((error: AxiosError) => {
                    handleAxiosRequestError(error);

                    // account not authenticated
                    if( error.response?.status == 403 || error.code == 'ERR_NETWORK' ) {
                        this.userStore.clearSessionInfo();
                        this.router.replace('/auth/login');
                    }
                })
                .finally(() => toastStore.unblockUI());
        },

        async showNotifications() {
            const modal = await modalController.create({
                component: NotificationsModal,
            });

            modal.present();

            const { data, role } = await modal.onWillDismiss();

            if (role === 'confirm') {
                // message.value = `Hello, ${data}!`;
            }
        }
    }
});
</script>
