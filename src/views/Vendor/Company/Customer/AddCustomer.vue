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
            {{ $t("profile.customers.addCustomer") }}
          </IonTitle>

          <IonButtons slot="end">
            <IonButton></IonButton>
          </IonButtons>
        </ion-toolbar>
      </ion-header>
    </IonHeader>

    <ion-content class="ion-padding">
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <form v-show="!fetching" @submit.prevent="createCustomer()">
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
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.phone_number }"
          label="Business Phone Number"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.phone_number"
          name="phone"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <section>
          <LocationInput
            v-model="form.fields.location"
            label="Business Location"
          ></LocationInput>
        </section>

        <section class="ion-margin-vertical">
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
            label="Owner's Phone Number"
            labelPlacement="stacked"
            fill="solid"
            v-model="form.fields.business_owner_phone"
            name="business_owner_phone"
            @ion-input="form.validate($event)"
            required
          ></IonInput>

          <IonSelect
            class="kola-input ion-margin-bottom"
            :label="$t('signup.vendor.country')"
            :class="{ 'ion-invalid ion-touched': form.errors.country_id }"
            labelPlacement="stacked"
            fill="solid"
            v-model="form.fields.country_id"
            required
            name="country_id"
            @ion-change="onCountryChange($event)"
          >
            <IonSelectOption
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </IonSelectOption>
          </IonSelect>

          <IonSelect
            class="kola-input ion-margin-bottom"
            :label="$t('signup.vendor.region')"
            :class="{ 'ion-invalid ion-touched': form.errors.region_id }"
            labelPlacement="stacked"
            fill="solid"
            v-model="form.fields.region_id"
            required
            name="region_id"
            @ion-change="form.validateSelectInput($event)"
          >
            <IonSelectOption
              v-for="region in regions"
              :key="region.id"
              :value="region.id"
            >
              {{ region.name }}
            </IonSelectOption>
          </IonSelect>

          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{ 'ion-invalid ion-touched': form.errors.city }"
            :label="$t('signup.vendor.city')"
            labelPlacement="stacked"
            fill="solid"
            name="city"
            v-model="form.fields.city"
            @ionBlur="form.validate($event)"
            @ionChange="form.validate($event)"
            required
          ></IonInput>
        </section>

        <section class="ion-padding-vertical">
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
            <IonSelectOption
              v-for="agent in salesAgents"
              :key="agent.id"
              :value="agent.id"
            >
              {{ agent.name }}
            </IonSelectOption>
          </IonSelect>
          <!-- <h6>{{ $t("profile.customers.howDoTheyUsuallyPay") }}</h6> -->
          <h6>{{ "What type of customer are they" }}</h6>
          <IonSelect
            class="kola-input ion-margin-bottom"
            label="Select customer type"
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
            <IonSelectOption
              v-for="t in customerTypes"
              :key="t.id"
              :value="t.id"
              >{{ t.type }}</IonSelectOption
            >
          </IonSelect>
        </section>

        <IonFooter class="ion-padding-top ion-no-border">
          <KolaYellowButton
            :disabled="!formValid"
            @click.prevent="createCustomer"
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
  IonSpinner,
  onIonViewWillEnter,
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
import LocationInput from "@/components/forms/LocationInput.vue";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useLocationStore } from "@/stores/LocationStore";
import { useForm } from "@/composables/form";
import Business from "@/models/Business";
import User from "@/models/User";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import Country from "@/models/Country";
import Region from "@/models/Region";

const toastStore = useToastStore();
const customerStore = useCustomerStore();
const locationStore = useLocationStore();

const fetching = ref(false);
const countries = ref(<Country[]>[]);
const regions = ref(<Region[]>[]);

const route = useRoute();
const router = useRouter();

const paymentModes = ref<any>([]);
const salesAgents = ref<User[]>([]);
const customerTypes = ref([
  { id: 1, type: "Retailer" },
  {
    id: 2,
    type: "Wholesaler",
  },
]);

const form = useForm({
  name: "",
  location: "",
  business_owner_name: "",
  phone_number: "",
  business_owner_phone: "",
  cms_users_id: "",
  business_types_id: "",
  country_id: 83,
  region_id: 54,
  city: "",
});

const formValid = computed(() => {
  const fields = form.fields;

  return (
    fields.name.length > 0 &&
    fields.business_owner_name.length > 0 &&
    fields.location.length > 0 &&
    isNaN(Number(fields.cms_users_id)) == false &&
    fields.phone_number.length > 0 &&
    fields.business_owner_phone.length > 0 &&
    fields.country_id &&
    fields.region_id &&
    fields.city.length > 0 &&
    fields.business_types_id
  );
});

const createCustomer = async () => {
  try {
    toastStore.blockUI("Hold On As We Add Your Customer");
    const customer = await customerStore.createBusinessCustomer(form.fields);
    if (customer) {
      toastStore.unblockUI();
      await toastStore.showSuccess(
        "Customer has been added successfully",
        "",
        "bottom"
      );
      router.push("/profile/company/customers");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to add Customer. Please try again",
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

const fetchCountries = async () => {
  countries.value = await locationStore.fetchCountries();
};
const loadRegions = async (country_id: number) => {
  if (!country_id) return;
  regions.value = await locationStore.fetchRegions(country_id);
};
const onCountryChange = (event: any) => {
  form.validateSelectInput(event);
  loadRegions(form.fields.country_id);
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
const userStore = useUserStore();
const fetchBusinessSalesAgent = async () => {
  fetching.value = true;
  const businessStore = useBusinessStore();
  salesAgents.value = await businessStore.getBusinessSaleAgents(
    userStore.activeBusiness as Business,
    50
  );

  salesAgents.value.unshift(userStore.user as User);

  fetching.value = false;
};

onMounted(() => {
  getPaymentModes();
  fetchBusinessSalesAgent();
});
onIonViewWillEnter(async () => {
  await fetchCountries();
  loadRegions(form.fields.country_id);
});
</script>

<style scoped lang="scss">
.spinner {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
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
