<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header  ion-no-border">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              color="dark"
              :icon="arrowBackOutline"
              text=""
              defaultHref="/shopper/profile/company/customers"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">Add Customer</IonTitle>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <ion-content class="ion-padding">
      <form>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.full_name }"
          label="Full Name"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.full_name"
          name="full_name"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.business_name }"
          label="Business Name"
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
          label="Business Location"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.business_location"
          name="business_location"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonButton
          fill="clear"
          size="small"
          style="text-transform: none"
          class="ion-margin-bottom use-location ion-text-start"
          @click="getLocation()"
        >
          <IonIcon :icon="navigateOutline" style="margin-right: 5px"></IonIcon>
          {{ $t("signup.vendor.location.useCurrentLocation") }}
        </IonButton>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.landmark }"
          label="Phone Number"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.landmark"
          name="landmark"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <h6>Assign to a sales agent or manager</h6>
        <IonSelect
          class="kola-input ion-margin-bottom"
          label="Select a sales agent"
          :class="{
            'ion-invalid ion-touched': form.errors.primary_product_category_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.sales_agent"
          required
          name="sales-agent"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption> </IonSelectOption>
        </IonSelect>
        <h6>How do they usually pay</h6>
        <IonSelect
          class="kola-input ion-margin-bottom"
          label="Select payment method"
          :class="{
            'ion-invalid ion-touched': form.errors.primary_product_category_id,
          }"
          labelPlacement="stacked"
          :toggle-icon="chevronDownOutline"
          fill="solid"
          v-model="form.fields.payment_method"
          required
          name="payment-method"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption></IonSelectOption>
        </IonSelect>
      </form>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton>Save</KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonInput,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  close,
  heartOutline,
  heart,
  cart,
  cartOutline,
  shareOutline,
  navigateOutline,
  arrowBackOutline,
  chevronDownOutline
} from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useGeolocation } from "@/composables/useGeolocation";
import { useForm } from "@/composables/form";

const toastStore = useToastStore();
const form = useForm({
  // name: '',
  // business_location: '',
  // business_name: '',
  // pin: '',
  // pin_confirmation: ''
});

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
ion-input {
  color: #74787c;
  --padding-end: 10px;
  --padding-start: 10px;
}
.use-location {
  --color: #666eed;
  --padding-start: 0px;
}
h6 {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #74787C;
}
</style>
