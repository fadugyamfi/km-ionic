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
      <p class="ion-margin-bottom" style="font-size: 0.8em">
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
          <IonIcon :icon="navigateOutline" style="margin-right: 5px"></IonIcon>
          {{ $t("signup.vendor.location.useCurrentLocation") }}
          <IonSpinner
            class="spinner"
            name="crescent"
            v-if="userStore.locationLoading"
          ></IonSpinner>
        </IonButton>

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
      </form>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border" id="footer">
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
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { computed, ref } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";
import { useForm } from "@/composables/form";
import { navigateOutline } from "ionicons/icons";
import { handleAxiosRequestError } from "@/utilities";
import { useGeolocation } from "@/composables/useGeolocation";
import { useToastStore } from "@/stores/ToastStore";
import PinEntryField from "../Auth/PinEntryField.vue";

let creating = ref(false);
const router = useRouter();
const toastStore = useToastStore();

const loginDisabled = computed(() => {
  return !!import.meta.env.VITE_LOGIN_DISABLED == true;
});

const form = useForm({
  name: "",
  business_location: "",
  business_name: "",
  pin: "",
  pin_confirmation: "",
});

const formValid = computed(() => {
  const fields = form.fields;

  return (
    fields.name.length > 0 &&
    fields.business_name.length > 0 &&
    fields.business_location.length > 0 &&
    fields.pin.length == 4 &&
    isNaN(Number(fields.pin)) == false &&
    fields.pin == fields.pin_confirmation
  );
});

const businessStore = useBusinessStore();
const userStore = useUserStore();

const onContinue = async () => {
  creating.value = true;

  toastStore.blockUI("Hold On As We Create Your Business");

  try {
    const business = await businessStore.createBusinessAsShopper({
      name: form.fields.business_name,
      location: form.fields.business_location,
      phone_number: userStore.user?.phone_number,
      business_types_id: 1,
      business_owner_name: form.fields.name,
      business_owner_phone: userStore.user?.phone_number,
      attributes: {
        applied_to: "shop",
      },
    });

    if (business) {
      await userStore.changePin({
        phone_number: userStore.user?.phone_number as string,
        pin: form.fields.pin,
        pin_confirmation: form.fields.pin_confirmation,
      });

      if (!loginDisabled) {
        await userStore.fetchUserInfo();
        await userStore.fetchUserBusinesses();

        router.push("/shopper");
      } else {
        router.push("/signup/vendor/signup-complete");
      }
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Account Registration Failed. Please try again",
        "",
        "bottom",
        "footer"
      );
    }
  } catch (error) {
    handleAxiosRequestError(error);
  } finally {
    creating.value = false;
    toastStore.unblockUI();
  }
};

const getLocation = async () => {
  const toastStore = useToastStore();
  const { getCurrentLocation, getDisplayName } = useGeolocation();

  try {
    const coordinates = await getCurrentLocation();
    const displayName = await getDisplayName(coordinates);

    if (displayName) {
      form.fields.business_location = displayName;
    } else {
      form.fields.business_location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
    }
  } catch (error) {
    toastStore.showError("Cannot retrieve location info");
  }
};
</script>
<style scoped>
.spinner {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>
