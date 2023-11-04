<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <DeliveryDetailsHeader />
    </section>

    <!-- Main Content -->
    <ion-content class="ion-padding">
      <h6 class="fw-semibold" style="margin-top: 0px;">Add Delivery Address</h6>
      <form>
        <IonInput class="kola-input delivery-details-input" :class="{ 'ion-invalid ion-touched': form.errors.location }"
          label="Town/Locality" labelPlacement="stacked" fill="solid" v-model="form.fields.location" name="location"
          @ion-input="form.validate($event)" required></IonInput>

        <IonButton fill="clear" size="small" style="text-transform: none"
          class="ion-margin-bottom use-location ion-text-start" @click="getLocation()">
          <IonIcon :icon="navigateOutline" style="margin-right: 5px"></IonIcon>
          {{ $t("signup.vendor.location.useCurrentLocation") }}
        </IonButton>

        <IonInput class="kola-input delivery-details-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.landmark }" label="Nearest Landmark" labelPlacement="stacked"
          fill="solid" v-model="form.fields.landmark" name="landmark" @ion-input="form.validate($event)" required>
        </IonInput>
        <h6 class="fw-semibold">Delivery Date</h6>
        <IonInput class="kola-input delivery-details-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.delivery_date }" label="DD/MM/YY" labelPlacement="stacked"
          fill="solid" v-model="form.fields.delivery_date" name="delivery-date" @ion-input="form.validate($event)"
          required></IonInput>
        <section>
          <section class="d-flex flex-column ion-margin-bottom">
            <IonText class="fw-semibold">Delivery</IonText>
            <IonText color="medium" class="font-medium">Select delivery method</IonText>
          </section>
          <DeliveryMethod  :location="form.fields.location"  :delivery-date="form.fields.delivery_date"/>
        </section>
      </form>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="viewPaymentOptions">Continue</KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonText,
  IonInput,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  navigateOutline,
} from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useGeolocation } from "@/composables/useGeolocation";
import DeliveryDetailsHeader from "@/components/header/DeliveryDetailsHeader.vue";
import DeliveryMethod from "@/components/modules/deliveryDetails/DeliveryMethod.vue";
import { useForm } from "@/composables/form";
import { useRouter } from 'vue-router';
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const toastStore = useToastStore();
const form = useForm({
location: "",
landmark: "",
delivery_date: ""
});

const viewPaymentOptions = () => {
  router.push('/shopper/payment-options');
};
const getLocation = async () => {
  const toastStore = useToastStore();
  const { getCurrentLocation } = useGeolocation();

  try {
    const coordinates = await getCurrentLocation();

    if (coordinates) {
      form.fields.business_location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
    }
  } catch (error) {
    toastStore.showError("Cannot retrieve location info");
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
.delivery-details-input {
  color: #74787c;
  --padding-end: 10px;
  --padding-start: 10px;
}

.use-location {
  --color: #666eed;
  --padding-start: 0px;
}
</style>
