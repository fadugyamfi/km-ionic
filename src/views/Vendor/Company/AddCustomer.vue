<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header ion-no-border">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              color="dark"
              :icon="arrowBackOutline"
              text=""
              style="margin-left: 10px"
              defaultHref="/shopper/profile/company/customers"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">{{
            $t("profile.customers.addCustomer")
          }}</IonTitle>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <ion-content class="ion-padding">
      <form method="post" ref="form" @submit.prevent="createCustomer()">
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.name }"
          :label="$t('profile.customers.fullName')"
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
          :label="$t('profile.customers.businessName')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.business_name"
          name="business_name"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input"
          :class="{ 'ion-invalid ion-touched': form.errors.location }"
          :label="$t('profile.customers.businessLocation')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.location"
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
          {{ $t("profile.customers.location.useCurrentLocation") }}
        </IonButton>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.phone_number }"
          label="Phone Number"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.phone_number"
          name="phone"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <h6>{{ $t("profile.customers.assignToSalesAgentOrManager") }}</h6>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.customers.selectSaleAgent')"
          :class="{
            'ion-invalid ion-touched': form.errors.cms_users_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.cms_users_id"
          required
          name="sales-agent"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption> </IonSelectOption>
        </IonSelect>
        <h6>{{ $t("profile.customers.howDoTheyUsuallyPay") }}</h6>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.customers.selectPaymentMethod')"
          :class="{
            'ion-invalid ion-touched': form.errors.payment_method,
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
        <IonFooter class="ion-padding-top ion-no-border">
          <KolaYellowButton type="submit">{{
            $t("profile.customers.save")
          }}</KolaYellowButton>
        </IonFooter>
      </form>
    </ion-content>
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
  IonSelectOption,
  IonHeader,
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
  chevronDownOutline,
} from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useGeolocation } from "@/composables/useGeolocation";
import { useForm } from "@/composables/form";
import axios from "axios";
import { useRoute } from "vue-router";

const toastStore = useToastStore();
const route = useRoute();



const form = useForm({
  name: "",
  location: "",
  business_name: "",
  phone_number: "",
  cms_users_id: "",
  payment_method: "",
});

const createCustomer = () => {
  if (form.hasErrors()) {
    return;
  }
  form.submit(() => {
    axios.post('/')
  });
};

const getLocation = async () => {
  const toastStore = useToastStore();
  const { getCurrentLocation } = useGeolocation();

  try {
    const coordinates = await getCurrentLocation();

    if (coordinates) {
      form.fields.location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
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
  color: #74787c;
}
</style>
