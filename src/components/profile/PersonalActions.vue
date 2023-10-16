<template>
    <section>
        <IonItem lines="none" class="profile-item ion-margin-top">
            <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>{{ userStore.user?.name }}</IonLabel>
            <IonIcon slot="end" :icon="createOutline"></IonIcon>
        </IonItem>

        <IonList lines="none">
            <IonItem :detail="true" class="profile-item">
                <IonAvatar slot="start">
                    <img src="/images/ic_location.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Address</IonLabel>
            </IonItem>

            <IonItem :detail="true" class="profile-item">
                <IonAvatar slot="start">
                    <img src="/images/ic_password.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Password</IonLabel>
            </IonItem>

            <IonItem :detail="true" class="profile-item">
                <IonAvatar slot="start">
                    <img src="/images/ic_notification.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Notifications</IonLabel>
            </IonItem>

            <IonItem :detail="true" class="profile-item">
                <IonAvatar slot="start">
                    <img src="/images/ic_user.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Account Activity</IonLabel>
            </IonItem>

            <IonItem :detail="true" class="profile-item">
                <IonAvatar slot="start">
                    <img src="/images/ic_help_support.svg" class="action-img" />
                </IonAvatar>
                <IonLabel>Help & Support</IonLabel>
            </IonItem>

            <IonItem :detail="true" class="profile-item" @click="logout()">
                <IonAvatar slot="start">
                    <IonIcon :icon="powerOutline" style="font-size: 21px;"></IonIcon>
                </IonAvatar>
                <IonLabel>Log Out</IonLabel>
            </IonItem>
        </IonList>
    </section>
</template>

<script lang="ts">
import { IonIcon, IonLabel, IonItem, IonAvatar, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { mapStores } from 'pinia';
import { search, createOutline, powerOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { useToastStore } from '../../stores/ToastStore';
import { handleAxiosRequestError } from '../../utilities';


export default defineComponent({

    components: { IonList, IonAvatar, IonItem, IonLabel, IonIcon },

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
                    toastStore.unblockUI();
                })
                .catch(error => handleAxiosRequestError(error));
        }
    }
});
</script>
