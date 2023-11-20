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
            {{ $t("profile.customers.updateCustomerInfo") }}
          </IonTitle>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <ion-content class="ion-padding">
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <form v-show="!fetching" @submit.prevent="updateCustomer()">
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.business_owner_name,
          }"
          :label="$t('profile.customers.fullName')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.business_owner_name"
          name="business_owner_name"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.business_owner_phone,
          }"
          :label="$t('profile.customers.businessOwnerPhone')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.business_owner_phone"
          name="business_owner_phone"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.name }"
          :label="$t('profile.customers.businessName')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.name"
          name="name"
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
        <!-- <h6>{{ $t("profile.customers.assignToSalesAgentOrManager") }}</h6>
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
          <IonSelectOption
            v-for="agent in salesAgents"
            :key="agent.id"
            :value="agent.id"
            >{{ agent.name }}</IonSelectOption
          >
        </IonSelect> -->
        <h6>{{ $t("profile.customers.howDoTheyUsuallyPay") }}</h6>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.customers.selectPaymentMethod')"
          :class="{
            'ion-invalid ion-touched': form.errors.business_types_id,
          }"
          labelPlacement="stacked"
          :toggle-icon="chevronDownOutline"
          fill="solid"
          v-model="form.fields.business_types_id"
          required
          name="payment-method"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption value="1"> Cash </IonSelectOption>
          <IonSelectOption value="2"> Credit </IonSelectOption>
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
  IonSpinner,
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
import { computed, onMounted, ref } from "vue";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useUserStore } from "@/stores/UserStore";
import User from "@/models/User";
import Customer from "@/models/Customer";
import Business from "@/models/Business";

const toastStore = useToastStore();
const businessStore = useBusinessStore();

const route = useRoute();
const router = useRouter();

const fetching = ref(false);
const customer = ref<Customer>();
const paymentModes = ref<any>([]);
const salesAgents = ref<User[]>([]);

const form = useForm({
  name: "",
  location: "",
  business_owner_name: "",
  phone_number: "",
  cms_users_id: "",
  business_types_id: "",
  business_owner_phone: "",
});

const formValid = computed(() => {
  const fields = form.fields;

  return (
    fields.name?.length > 0 &&
    fields.business_owner_name?.length > 0 &&
    fields.location?.length > 0 &&
    isNaN(Number(fields.cms_users_id)) == false &&
    fields.phone_number?.length > 0 &&
    fields.business_owner_phone.length > 0 &&
    fields.business_types_id
  );
});

const updateCustomer = async () => {
  try {
    toastStore.blockUI("Hold On As We Update Your Customer");
    const customerStore = useCustomerStore();
    const customer = await customerStore.updateCustomer(
      form.fields,
      route.params.id
    );
    if (customer) {
      toastStore.unblockUI();
      router.push("profile/company/customers");
      toastStore.showSuccess("Customer has been updated successfully");
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
const fetchCustomer = async () => {
  console.log("hit me");
  fetching.value = true;
  const userStore = useUserStore();
  // console.log( userStore.activeBusiness, route.params.id)

  const customerStore = useCustomerStore();
  console.log(customerStore);
  customer.value = await customerStore.getCustomer(
    userStore.activeBusiness as Business,
    route.params.id
  ) as Customer;
  fetching.value = false;
  form.fields.name = customer.value?.name;
  form.fields.location = customer.value?.location;
  form.fields.phone_number = customer.value?.phone_number;
  form.fields.business_types_id = customer.value?.business_types_id;
  form.fields.business_owner_phone = customer.value?.business_owner_phone;
};
const getPaymentModes = async () => {
  try {
    fetching.value = true;
    const response = await axios.get("/v2/payment-modes");
    if (response) {
      fetching.value = false;
      paymentModes.value = response.data.data;
    }
  } catch (error) {}
};
const fetchBusinessSalesAgent = async () => {
  fetching.value = true;
  const userStore = useUserStore();
  const businessStore = useBusinessStore();
  salesAgents.value = await businessStore.getBusinessSaleAgents(
    userStore.activeBusiness as Business,
    50
  );
  fetching.value = false;
};

onMounted(async () => {
  fetchCustomer();
  // getPaymentModes();
  // fetchBusinessSalesAgent();
});
</script>

<style scoped lang="scss">
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
