<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonBackButton slot="start"></IonBackButton>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">

            <h3 v-if="userStore.resettingPIN">{{ $t("auth.resetPin.resettingYourPIN") }}</h3>
            <h3 v-else>{{ $t("general.phoneNumber") }}</h3>

            <p style="font-size: 14px;">
                {{ $t("auth.verifyNumber.pleaseEnterYourPhoneNumberToProceed") }}
            </p>

            <div style="margin-top: 50px;">
                <PhoneInput v-model="phoneNumber"/>
            </div>
        </IonContent>

        <IonFooter class="ion-padding">
            <KolaYellowButton :disabled="!numberEntered" @click="onContinue()">
                <IonSpinner v-if="validating" name="crescent"></IonSpinner>
                <IonText v-else>{{ $t('general.continue') }}</IonText>
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script setup lang="ts">
import { Ref, computed, ref } from 'vue';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonContent, IonFooter, IonSpinner, IonText } from '@ionic/vue';
import KolaInputField from '@/components/KolaInputField.vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/UserStore';
import PhoneInput from '@/components/forms/PhoneInput.vue';
import { useToastStore } from '@/stores/ToastStore';
import { handleAxiosRequestError } from '../../utilities';

let validating = ref(false);
const userStore = useUserStore();
const router = useRouter();
const phoneNumber: Ref<String | null> = ref(null);
const numberEntered = computed(() => phoneNumber.value && phoneNumber.value.length > 0);

const inputValidated = () => {
    return phoneNumber.value == null || phoneNumber.value.length == 0;
}

const toastStore = useToastStore();

const onContinue = async () => {
    validating.value = true;

    userStore.verifyPhoneNumber({
        phone_number: phoneNumber.value as string
    })
    .then(response => {
        const json = response.data;
        if( !json.two_factor_auth_sent && json.has_pin_number ) {
            router.push('/auth/login');
            toastStore.showError("Account already exists. Please login to continue");
        } else {
            router.push('/auth/verify-otp');
        }
    })
    .catch(error => {
        handleAxiosRequestError(error)
    })
    .finally(() => validating.value = false);
}
</script>
