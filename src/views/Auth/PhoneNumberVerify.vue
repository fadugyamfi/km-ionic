<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonBackButton slot="start"></IonBackButton>
            </IonToolbar>
        </IonHeader>

        <IonContent class="ion-padding">
            <h3>Phone Number</h3>
            <p style="font-size: 14px;">Please Enter Your Phone Number To Proceed</p>

            <div style="margin-top: 50px;">
                <KolaInputField
                    v-model="phoneNumber"
                    :label="'Phone Number'"
                    :required="true"
                    :error-text="'Required'"
                    :has-error="inputValidated()"
                ></KolaInputField>
            </div>
        </IonContent>

        <IonFooter class="ion-padding">
            <KolaYellowButton :disabled="!numberEntered" @click="onContinue()">
                <IonSpinner v-if="validating" name="crescent"></IonSpinner>
                <IonText v-else>Continue</IonText>
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

let validating = ref(false);
const userStore = useUserStore();
const router = useRouter();
const phoneNumber: Ref<String | null> = ref(null);
const numberEntered = computed(() => phoneNumber.value && phoneNumber.value.length > 0);

const inputValidated = () => {
    return phoneNumber.value == null || phoneNumber.value.length == 0;
}

const onContinue = async () => {
    validating.value = true;

    userStore.verifyPhoneNumber({
        phone_number: phoneNumber.value as string
    })
    .then(response => {
        const json = response.data;
        if( !json.two_factor_auth_sent && json.has_pin_number ) {
            router.push('/auth/login');
        } else {
            router.push('/auth/verify-otp');
        }
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => validating.value = false);
}
</script>
