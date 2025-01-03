<template>
  <ion-page>
    <section class="ion-padding">
      <EditAddressHeader />
    </section>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <section
        v-if="fetching"
        class="ion-text-center d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>
      <form v-else>
        <LocationInput
          v-model="form.fields.address"
          label="Business Address"
        ></LocationInput>

        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.address.region')"
          :class="{
            'ion-invalid ion-touched': form.errors.state_id,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.state_id"
          required
          name="state_id"
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

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        :disabled="!formValid"
        @click.prevent="updateBusinessLocations"
        class="ion-margin-bottom"
      >
        {{ $t("profile.customers.save") }}
      </KolaYellowButton>

      <KolaWhiteButton @click.prevent="cancel">
        {{ $t("profile.address.cancel") }}
      </KolaWhiteButton>
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
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/vue";
import { navigateOutline, chevronDownOutline } from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import LocationInput from "@/components/forms/LocationInput.vue";
import { useToastStore } from "@/stores/ToastStore";
import { useLocationStore } from "@/stores/LocationStore";
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
  state_id: "",
  address: "",
});

const formValid = computed(() => {
  const fields = form.fields;
  return fields.state_id && fields.address && fields.city;
});

const updateBusinessLocations = async () => {
  try {
    toastStore.blockUI("Hold On As We Add Your Address");
    const businessLocation = await businessStore.updateBusinessLocation(
      form.fields,
      userStore.activeBusiness?.id as string,
      route.params.id as string
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

const cancel = () => {
  router.replace("/profile/address");
};

const getRegions = async () => {
  try {
    fetching.value = true;
    const countryId = businessStore?.registration?.country_id;
    const response = await LocationStore.fetchRegions(countryId);
    if (response) {
      regions.value = response;
    }
  } catch (error) {
  } finally {
    fetching.value = false;
  }
};

const fetchAddress = async () => {
  fetching.value = true;
  const businessStore = useBusinessStore();
  try {
    const address = await businessStore.getBusinessLocation(
      route.params.business_id,
      route.params.id
    );
    if (address) {
      form.fields.state_id = address.state_id;
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
