<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonBackButton slot="start"></IonBackButton>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <h3 class="header">Good To See You Again</h3>
            <p class="subtext"><small>Please provide you Phone Number and PIN to login</small></p>

            <div class="ion-margin-top">
                <section class="ion-padding-top ion-padding-bottom">
                    <KolaInputField :label="'Phone Number'" v-model="phoneNumber"></KolaInputField>
                </section>

                <section>
                    <KolaInputField :label="'PIN'" type="password" v-model="pin"></KolaInputField>
                </section>

                <div class="ion-padding-top ion-padding-bottom">
                    <IonText router-link="/auth/forgot-pin" color="dark" style="font-weight: bold;">Forgot Your PIN?</IonText>
                </div>
            </div>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton @click="login()">
                <IonSpinner v-if="fetching" name="crescent"></IonSpinner>
                <IonText v-else>Login</IonText>
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonLabel, IonPage, IonSpinner, IonText, IonToolbar, toastController } from '@ionic/vue';
import KolaInputField from '@/components/KolaInputField.vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';

const router = useRouter();
const userStore = useUserStore();
const phoneNumber: Ref<string> = ref('');
const pin: Ref<string> = ref('');
let fetching: Ref<boolean> = ref(false);

const login = async () => {
    fetching.value = true;

    userStore.login({
        phone_number: phoneNumber.value,
        pin: pin.value
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

    .finally(() => fetching.value = false);

}
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
</style>
