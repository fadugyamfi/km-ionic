<template>
  <ion-page>
    <section class="ion-padding">
      <EditAddressHeader />
    </section>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <form>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{
            'ion-invalid ion-touched': form.errors.address,
          }"
          label="Business Address"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.address"
          name="address"
          @ion-input="form.validate($event)"
          required
        ></IonInput>

        <IonItem lines="none">
          <IonButton
            fill="clear"
            size="small"
            style="text-transform: none"
            class="ion-margin-bottom use-location ion-text-start"
            @click="getLocation()"
          >
            <IonIcon
              :icon="navigateOutline"
              style="margin-right: 5px"
            ></IonIcon>
            {{ $t("signup.vendor.location.useCurrentLocation") }}
          </IonButton>
        </IonItem>

        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.address.region')"
          :class="{
            'ion-invalid ion-touched': form.errors.region,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.region"
          required
          name="region"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          >
          <IonSelectOption
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
          >
            {{ region.name }}
          </IonSelectOption>
        </IonSelect>

        <IonSelect
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
          <IonSelectOption
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
          >
            {{ region.name }}
          </IonSelectOption>
        </IonSelect>
      </form>
    </ion-content>
    <IonFooter class="ion-padding-top ion-no-border">
      <KolaWhiteButton :disabled="!formValid" @click.prevent="">{{
        $t("profile.address.cancel")
      }}</KolaWhiteButton>
      <KolaYellowButton
        :disabled="!formValid"
        @click.prevent="updateBusinessLocations"
        >{{ $t("profile.customers.save") }}</KolaYellowButton
      >
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
  IonSelectOption,
  IonCheckbox,
  IonHeader,
  IonSpinner,
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
import { useGeolocation } from "@/composables/useGeolocation";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useForm } from "@/composables/form";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import EditAddressHeader from "@/components/header/EditAddressHeader.vue";

const toastStore = useToastStore();
const LocationStore = useLocationStore();
const businessStore = useBusinessStore();
const userStore = useUserStore();

const router = useRouter();
const route = useRoute();

const regions = ref<any[]>([]);
const fetching = ref(false);

const form = useForm({
  city: "",
  region_id: "",
  address: "",
});

const formValid = computed(() => {
  const fields = form.fields;

  return fields.region_id;
});

const updateBusinessLocations = async () => {
  try {
    toastStore.blockUI("Hold On As We Add Your Address");
    const businessLocation = await businessStore.updateBusinessLocations(
      form.fields
      //router.params.id
    );

    if (businessLocation) {
      toastStore.unblockUI();
      await toastStore.showSuccess(
        "Address has been updated successfully",
        "",
        "bottom"
      );
      router.push("/profile/address");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to update Address. Please try again",
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

const getLocation = async () => {
  const toastStore = useToastStore();
  const { getCurrentLocation } = useGeolocation();

  try {
    const coordinates = await getCurrentLocation();

    if (coordinates) {
      form.fields.address = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
    }
  } catch (error) {
    toastStore.showError("Cannot retrieve Business Location info");
  }
};

const fetchAddress = async () => {
  fetching.value = true;
  const userStore = useUserStore();
  const businessStore = useBusinessStore();

  try {
    const address = await businessStore.getBusinessLocation(
      route.params.business_id,
      route.params.id
    );

    if (address) {
      form.fields.region_id = address.region_id;
      form.fields.city = address.city;
      form.fields.address = address.address;
    } else {
      toastStore.showError("Failed to fetch address. Please try again");
    }
  } catch (error) {
    toastStore.showError("Failed to fetch address. Please try again");
  } finally {
    fetching.value = false;
  }
};

onMounted(() => {
  getRegions();
  fetchAddress();
});
</script>

<style lang="scss" scoped>
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
</style>
