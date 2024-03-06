<template>
  <ion-page>
    <section class="ion-padding">
      <AddAddressHeader />
    </section>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <form>
        <LocationInput
          v-model="form.fields.address"
          label="Business Address"
        ></LocationInput>

        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.address.region')"
          :class="{
            'ion-invalid ion-touched': form.errors.region_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.region_id"
          required
          name="sales-agent"
          :toggle-icon="chevronDownOutline"
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
          :label="$t('profile.address.city')"
          :class="{
            'ion-invalid ion-touched': form.errors.city,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.city"
          required
          name="city"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
        </IonInput>
      </form>
    </ion-content>
    <section class="top">
      <IonFooter class="ion-padding-top ion-no-border">
        <KolaYellowButton
          :disabled="!formValid"
          @click.prevent="createBusinessLocation"
          >{{ $t("profile.customers.save") }}</KolaYellowButton
        >
        <KolaWhiteButton :disabled="!formValid" @click.prevent="createCancel">{{
          $t("profile.address.cancel")
        }}</KolaWhiteButton>
      </IonFooter>
    </section>
  </ion-page>
</template>

<script setup lang="ts">
import {
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
  IonButton,
  IonItem,
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
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useLocationStore } from "@/stores/LocationStore";
import LocationInput from "@/components/forms/LocationInput.vue";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useForm } from "@/composables/form";
import AddAddressHeader from "@/components/header/AddAddressHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";

const toastStore = useToastStore();
const LocationStore = useLocationStore();
const businessStore = useBusinessStore();
const userStore = useUserStore();

const fetching = ref(false);

const route = useRoute();
const router = useRouter();

const paymentModes = ref<any>([]);
const regions = ref<any[]>([]);

const form = useForm({
  city: "",
  region_id: "",
  address: "",
  country_id: businessStore?.registration?.country_id,
  business_id: userStore?.activeBusiness?.id,
});

const formValid = computed(() => {
  const fields = form.fields;

  return fields.region_id;
});

const createCancel = async () => {
  router.push("/profile/address");
};

const createBusinessLocation = async () => {
  try {
    toastStore.blockUI("Hold On As We Add Your Business Location");
    const businessLocation = await businessStore.createBusinessLocations(
      form.fields
    );
    if (businessLocation) {
      toastStore.unblockUI();
      await toastStore.showSuccess(
        "Business Location has been added successfully",
        "",
        "bottom"
      );
      router.push("/profile/address");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to add Business Location. Please try again",
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

const getRegions = async () => {
  try {
    const countryId = businessStore?.registration?.country_id;
    const response = await LocationStore.fetchRegions(countryId);
    if (response) {
      regions.value = response;
    }
  } catch (error) {}
};

onMounted(() => {
  getRegions();
  //  getBusinessLocations(this.userStore.activeBusiness?.id);
});
</script>

<style lang="scss" scoped>
.spinner {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}

.success {
  margin-right: 8px;
}

.new-bussiness {
  color: #666eed;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.top {
  margin: 10px;
}
</style>
