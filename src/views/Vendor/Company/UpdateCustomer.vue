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
              defaultHref="/profile/company/customers"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            <!-- {{$t("profile.customers.addCustomer") }} -->
            Update customer information
          </IonTitle>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <ion-content class="ion-padding">
      <form @submit.prevent="updateCustomer()">
        {{ businessStore.customers }}

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
          <IonSelectOption></IonSelectOption>
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
          <IonSelectOption>Mobile money</IonSelectOption>
          <IonSelectOption>Cash</IonSelectOption>
          <IonSelectOption>Bank transfer</IonSelectOption>
        </IonSelect>
        <IonFooter class="ion-padding-top ion-no-border">
          <KolaYellowButton
            :disabled="!formValid"
            @click.prevent="updateCustomer"
            >{{ $t("profile.customers.save") }}</KolaYellowButton
          >
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
  IonCheckbox,
  IonHeader,
} from "@ionic/vue";
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
import { useCustomerStore } from "@/stores/CustomerStore";
import { useGeolocation } from "@/composables/useGeolocation";
import { useForm } from "@/composables/form";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useBusinessStore } from "@/stores/BusinessStore";

const toastStore = useToastStore();
const customerStore = useCustomerStore();
const businessStore = useBusinessStore();

const route = useRoute();
const router = useRouter();

const form = useForm({
  name: "",
  location: "",
  business_name: "",
  phone_number: "",
  cms_users_id: 1,
  payment_method: "",
});

const formValid = computed(() => {
  const fields = form.fields;

  return (
    fields.name.length > 0 &&
    fields.business_name.length > 0 &&
    fields.location.length > 0 &&
    isNaN(Number(fields.cms_users_id)) == false &&
    fields.phone_number.length > 0 &&
    fields.payment_method
  );
});

const customer = computed(() =>
  businessStore?.customers?.find((c) => c.id == route.params.id)
);
const updateCustomer = async () => {
  try {
    toastStore.blockUI("Hold On As We Update Your Customer");
    const customer = await customerStore.createBusinessCustomer({
      ...form.fields,
      business_types_id: 1,
    });
    if (customer) {
      toastStore.unblockUI();
      router.push("profile/company/customers");
      toastStore.showSuccess("Customer has been update successfully");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to update Customer. Please try again",
        "",
        "bottom",
        "footer"
      );
    }
  } catch (error) {
  } finally {
    toastStore.unblockUI();
  }
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
