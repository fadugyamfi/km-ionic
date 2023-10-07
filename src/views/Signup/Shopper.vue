<template>
    <IonPage>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/signup"></ion-back-button>
                </ion-buttons>
                <ion-title></ion-title>
            </ion-toolbar>
        </ion-header>

        <IonContent class="ion-padding">
            <h3>You Are Almost There</h3>
            <p class="ion-margin-bottom" style="font-size: 0.8em;">
                Please enter your details below to finish setting up your account
            </p>

            <form>
                <KolaInputField v-model="name" :label="'Full Name'" :required="true" class="ion-margin-bottom">
                </KolaInputField>

                <KolaInputField v-model="business_name" :label="'Business Name'" :required="true" class="ion-margin-bottom">
                </KolaInputField>

                <KolaInputField v-model="business_location" :label="'Business Location'" :required="true"
                                class="ion-margin-bottom"></KolaInputField>

                <KolaInputField v-model="pin" :type="'password'" :label="'New PIN Code'" :required="true"
                                class="ion-margin-bottom" :maxlength="4" :counter="true"></KolaInputField>

                <KolaInputField v-model="pin_confirmation" :type="'password'" :label="'Confirm PIN Code'" :required="true"
                                class="ion-margin-bottom" :maxlength="4" :counter="true"></KolaInputField>
            </form>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton :disabled="!formValid" @click="onContinue">
                <IonSpinner v-if="creating" name="crescent"></IonSpinner>
                <IonText v-else>Continue</IonText>
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script setup lang="ts">
import {
    IonBackButton,
    IonButtons,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonText,
    IonSpinner
} from '@ionic/vue';
import { Ref, computed, ref } from 'vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import KolaInputField from '@/components/KolaInputField.vue';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useUserStore } from '../../stores/UserStore';
import { useRouter } from 'vue-router';

let creating = ref(false);
const router = useRouter();

const name = ref('');
const business_name = ref('');
const business_location = ref('');
const pin = ref('');
const pin_confirmation = ref('');

const formValid = computed(() => {
    return name.value.length > 0
        && business_name.value.length > 0
        && business_location.value.length > 0
        && pin.value.length == 4 && isNaN(Number(pin.value)) == false
        && pin.value == pin_confirmation.value;
});

const businessStore = useBusinessStore();
const userStore = useUserStore();

const onContinue = () => {
    creating.value = true;

    businessStore.createBusinessAsShopper({
        name: business_name.value,
        location: business_location.value,
        phone_number: userStore.user?.phone_number,
        business_types_id: 1,
        business_owner_name: name.value,
        business_owner_phone: userStore.user?.phone_number
    })
        .then(() => {
            router.push('/shopper');
        })
        .finally(() => {
            creating.value = false;
        })
}
</script>
