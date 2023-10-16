<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonBackButton slot="start"></IonBackButton>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <h3>{{ $t("auth.resetPin.resettingYourPIN") }}</h3>
            <p style="font-size: 14px;">{{ $t("auth.resetPin.pleaseEnterAndConfirmYourNewPin") }}</p>

            <div style="margin-top: 50px;">
                <PinEntryField
                    name="pin"
                    :label="$t('signup.shopper.newPinCode')"
                    v-model="form.fields.pin"
                ></PinEntryField>

                <PinEntryField
                    name="pin_confirmation"
                    :label="$t('signup.shopper.confirmPinCode')"
                    v-model="form.fields.pin_confirmation"
                ></PinEntryField>
            </div>
        </IonContent>

        <IonFooter class="ion-padding">
            <KolaYellowButton :disabled="!formValid" @click="onContinue()">
                {{  $t("general.continue") }}
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { IonBackButton, IonHeader, IonPage, IonToolbar, IonContent, IonFooter, IonLabel, IonItem, IonInput, IonButton, IonIcon } from '@ionic/vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { useRouter } from 'vue-router';
import { useForm } from '@/composables/form';
import PinEntryField from './PinEntryField.vue';
import { ChangePINRequest, useUserStore } from '@/stores/UserStore';
import { useToastStore } from '../../stores/ToastStore';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const userStore = useUserStore();
const toastStore = useToastStore();

const form = useForm({
    phone_number: userStore.verification.phone_number,
    pin: '',
    pin_confirmation: ''
});

const formValid = computed(() => {
    return form.fields.pin.length == 4
        && form.fields.pin_confirmation.length == 4
        && form.fields.pin_confirmation == form.fields.pin;
})

const i18n = useI18n();

const onContinue = async () => {
    try {
        const response = await userStore.changePin(form.fields as ChangePINRequest);
        if( response ) {
            toastStore.showSuccess( i18n.t("auth.resetPin.pinSuccessfullyReset") );

            setTimeout(async () => {
                toastStore.blockUI( i18n.t("auth.resetPin.loadingYourAccountInfo") )
                await userStore.fetchUserInfo();
                await userStore.fetchUserBusinesses();
                router.replace('/shopper');
                toastStore.unblockUI();
            }, 500);
        } else {
            toastStore.showError( i18n.t("auth.resetPin.pinResetFailed") );
        }
    } catch(error) {
        toastStore.showError( i18n.t("auth.resetPin.pinResetFailed") );
    }
}

onMounted(() => {
    if( !userStore.verification.phone_number ) {
        toastStore.showError("auth.resetPin.phoneNumberRequired");
        router.replace('/auth/login');
    }
})
</script>
