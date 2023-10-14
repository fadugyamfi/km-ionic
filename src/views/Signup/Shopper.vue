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
                <IonInput
                    class="kola-input ion-margin-bottom"
                    :class="{ 'ion-invalid ion-touched': form.errors.name }"
                    :label="$t('signup.shopper.fullName')"
                    labelPlacement="stacked"
                    fill="solid"
                    v-model="form.fields.name"
                    name="name"
                    @ion-input="form.validate($event)"
                    required
                ></IonInput>

                <IonInput
                    class="kola-input ion-margin-bottom"
                    :class="{ 'ion-invalid ion-touched': form.errors.business_name }"
                    :label="$t('signup.shopper.businessName')"
                    labelPlacement="stacked"
                    fill="solid"
                    v-model="form.fields.business_name"
                    name="business_name"
                    @ion-input="form.validate($event)"
                    required
                ></IonInput>

                <IonInput
                    class="kola-input"
                    :class="{ 'ion-invalid ion-touched': form.errors.business_location }"
                    :label="$t('signup.shopper.businessLocation')"
                    labelPlacement="stacked"
                    fill="solid"
                    v-model="form.fields.business_location"
                    name="business_location"
                    @ion-input="form.validate($event)"
                    required
                ></IonInput>

                <IonButton
                    fill="clear"
                    color="primary"
                    style="text-transform: none"
                    class="ion-margin-bottom ion-text-start"
                    @click="getLocation()"
                >
                    <IonIcon :icon="navigateOutline" style="margin-right: 5px;"></IonIcon>
                    {{ $t("signup.vendor.location.useCurrentLocation") }}
                </IonButton>


                <div class="kola-input-item">
                    <IonItem lines="none" :class="{ 'ion-invalid ion-touched': form.errors.pin }">
                        <IonInput
                            ref="pin"
                            :class="{ 'ion-invalid ion-touched': form.errors.pin }"
                            :label="$t('signup.shopper.newPinCode')"
                            labelPlacement="stacked"
                            v-model="form.fields.pin"
                            :type="pinVisible ? 'number' : 'password'"
                            :maxlength="4"
                            name="pin"
                            @ion-input="form.validate($event)"
                            required
                        ></IonInput>
                        <IonButton fill="clear" color="medium" @click="pinVisible = !pinVisible">
                            <IonIcon slot="icon-only" :icon="pinVisible ? eye : eyeOff"></IonIcon>
                        </IonButton>
                    </IonItem>
                </div>

                <div class="kola-input-item">
                    <IonItem lines="none">
                        <IonInput
                            :class="{ 'ion-invalid ion-touched': form.errors.pin_confirmation }"
                            :label="$t('signup.shopper.confirmPinCode')"
                            labelPlacement="stacked"
                            v-model="form.fields.pin_confirmation"
                            name="pin_confirmation"
                            :type="confPinVisible ? 'number' : 'password'"
                            :maxlength="4"
                            @ion-input="form.validate($event)"
                            required
                        ></IonInput>
                        <IonButton fill="clear" color="medium" @click="confPinVisible = !confPinVisible">
                            <IonIcon slot="icon-only" :icon="confPinVisible ? eye : eyeOff"></IonIcon>
                        </IonButton>
                    </IonItem>
                </div>
            </form>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton :disabled="!formValid" @click="onContinue">
                <IonSpinner v-if="creating" name="crescent"></IonSpinner>
                <IonText v-else>{{ $t("general.continue") }}</IonText>
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
    IonSpinner,
IonInput,
IonItem,
IonIcon,
IonButton
} from '@ionic/vue';
import { Ref, computed, ref } from 'vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import { useForm } from '@/composables/form';
import { eye, eyeOff, navigateOutline } from 'ionicons/icons';
import { handleAxiosRequestError } from '@/utilities';
import { useGeolocation } from '@/composables/useGeolocation';
import { useToastStore } from '@/stores/ToastStore';

let creating = ref(false);
const router = useRouter();

const form = useForm({
    name: '',
    location: '',
    business_name: '',
    pin: '',
    pin_confirmation: ''
});

const pinVisible = ref(false);
const confPinVisible = ref(false);

const formValid = computed(() => {
    const fields = form.fields;

    return fields.name.length > 0
        && fields.business_name.length > 0
        && fields.business_location.length > 0
        && fields.pin.length == 4 && isNaN(Number(fields.pin)) == false
        && fields.pin == fields.pin_confirmation;
});

const businessStore = useBusinessStore();
const userStore = useUserStore();

const onContinue = () => {
    creating.value = true;

    businessStore.createBusinessAsShopper({
        name: form.fields.business_name,
        location: form.fields.business_location,
        phone_number: userStore.user?.phone_number,
        business_types_id: 1,
        business_owner_name: form.fields.name,
        business_owner_phone: userStore.user?.phone_number
    }).then((business) => {
        if( business ) {
            router.push('/shopper');
        }
    }).catch(error => {
        handleAxiosRequestError(error);
    }).finally(() => {
        creating.value = false;
    })
}

const getLocation = async () => {
    const toastStore = useToastStore();
    const { getCurrentLocation } = useGeolocation();

    try {
        const coordinates = await getCurrentLocation();

        if( coordinates ) {
            form.fields.business_location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
        }
    } catch(error) {
        toastStore.showError("Cannot retrieve location info");
        console.log(error);
    }
}
</script>
