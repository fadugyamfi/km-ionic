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
            <KolaYellowButton router-link="/signup/shopper/verify-otp" :disabled="!numberEntered" @click="onContinue()">
                Continue
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script setup lang="ts">
import { Ref, computed, ref } from 'vue';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonContent, IonFooter } from '@ionic/vue';
import KolaInputField from '@/components/KolaInputField.vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const phoneNumber: Ref<String | null> = ref(null);
const numberEntered = computed(() => phoneNumber.value && phoneNumber.value.length > 0);

const inputValidated = () => {
    return phoneNumber.value == null || phoneNumber.value.length == 0;
}

const onContinue = async () => {
    try {
        const url = 'https://api-staging.kola.market/api/v2/auth/verify';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                phone_number: phoneNumber.value
            })
        });

        const json = await response.json();

        if( !json.data.two_factor_auth_sent && json.data.has_pin_number ) {
            router.push('/signin/login');
        } else {
            router.push('/signup/verify-otp');
        }
    } catch(error) {
        console.log(error);
    }
}
</script>
