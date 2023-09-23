<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonBackButton slot="start"></IonBackButton>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding" :scroll-y="false">
            <h3 class="header">Good To See You Again</h3>
            <p class="subtext"><small>Please provide you Phone Number and PIN to login</small></p>

            <div class="ion-margin-top">
                <section class="ion-padding-top ion-padding-bottom">
                    <IonInput class="kola-input" label="Phone Number" v-model="phoneNumber" fill="outline" label-placement="floating"></IonInput>
                </section>

                <section>
                    <IonInput class="kola-input" label="PIN" type="password" inputmode="numeric" fill="outline" label-placement="floating" v-model="pin"></IonInput>
                </section>

                <div class="ion-padding-top ion-padding-bottom">
                    <IonText router-link="/auth/forgot-pin" color="dark" style="font-weight: bold;">Forgot Your PIN?</IonText>
                </div>
            </div>

            <IonText router-link="/signup">
                <p class="ion-text-center ion-padding login-prompt" >
                    Don't have an account?
                    <IonText color="primary" class="trigger">Sign Up</IonText>
                </p>
            </IonText>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton @click="login()">
                <IonSpinner v-if="fetching" name="crescent"></IonSpinner>
                <IonText v-else>Login</IonText>
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonSpinner, IonText, IonToolbar, toastController } from '@ionic/vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import { mapStores } from 'pinia';

export default defineComponent({

    components: {
        KolaYellowButton,
        IonBackButton, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonSpinner, IonText, IonToolbar
    },

    data() {
        return {
            fetching: false,
            phoneNumber: '',
            pin: ''
        }
    },

    computed: {
        ...mapStores( useUserStore )
    },

    methods: {

        login() {
            const router = useRouter();

            this.fetching = true;

            this.userStore.login({
                phone_number: this.phoneNumber,
                pin: this.pin
            })

            .then(() => router.push('/shopper/home'))

            .catch(async (error: Error) => {
                const toast = await toastController.create({
                    message: error.message,
                    duration: 1500,
                    position: 'bottom',
                });

                await toast.present();
            })

            .finally(() => this.fetching = false);
        }
    }
})

</script>

<style lang="scss">
.header {
    margin-bottom: 2px;
}

.subtext {
    font-size: 1.05em;
    padding: 0px;
    margin: 0px;
}

.login-prompt {
    font-size: 1em;
}

.login-prompt .trigger {
    font-weight: bold;
    color: #333;
}
</style>
