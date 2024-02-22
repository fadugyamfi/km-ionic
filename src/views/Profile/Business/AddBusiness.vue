<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              color="dark"
              :icon="arrowBackOutline"
              text=""
              style="margin-left: 10px"
              @click="() => router.push(defaultBackRoute)"
              defaultHref=""
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold">
            <section
              class="d-flex ion-align-items-center ion-justify-content-center"
            >
              <IonLabel> {{ $t("profile.customers.addBusiness") }} </IonLabel>
            </section></IonTitle
          >
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <IonContent>
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <section v-if="!fetching">
        <form class="ion-padding" v-show="!fetching">
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
            label="Phone Number"
            labelPlacement="stacked"
            fill="solid"
            v-model="form.fields.phone_number"
            name="phone"
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
            <IonIcon
              :icon="navigateOutline"
              style="margin-right: 5px"
            ></IonIcon>
            {{ $t("profile.customers.location.useCurrentLocation") }}
          </IonButton>

          <IonFooter class="ion-padding-top ion-no-border">
            <KolaYellowButton
              id="edit-profile-save-btn"
              :disabled="!formValid"
              @click.prevent="addBusiness"
              >{{ $t("profile.customers.save") }}</KolaYellowButton
            >
          </IonFooter>
        </form>
      </section>
    </IonContent>
  </ion-page>
</template>
<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonLabel,
  IonTitle,
  IonIcon,
  IonContent,
  IonSpinner,
  IonInput,
  IonFooter,
} from "@ionic/vue";
import { arrowBackOutline, navigateOutline } from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useToastStore } from "@/stores/ToastStore";
import { useGeolocation } from "@/composables/useGeolocation";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "@/composables/form";

const toastStore = useToastStore();
const businessStore = useBusinessStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const fetching = ref(false);

const company = computed(() => userStore.activeBusiness);
const form = useForm({
  name: "",
  location: "",
  phone_number: "",
});

const defaultBackRoute = computed(() => {
  if (userStore.appMode == "vendor") {
    return "/vendor/profile";
  } else {
    return "/shopper/profile";
  }
});

const formValid = computed(() => {
  const fields = form.fields;

  return (
    fields.name.length > 0 &&
    fields.location.length > 0 &&
    fields.phone_number.length > 0
  );
});

const getLocation = async () => {
  const { getCurrentLocation } = useGeolocation();

  try {
    const coordinates = await getCurrentLocation();
    console.log(coordinates);

    if (coordinates) {
      form.fields.location = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
    }
  } catch (error) {
    toastStore.showError("Cannot retrieve location info");
  }
};

const addBusiness = async () => {
  try {
    toastStore.blockUI("Hold On As We Update Company Profile");

    await businessStore.updateBusiness(
      Number(userStore.activeBusiness?.id),
      form.fields
    );

    if (company.value) {
      toastStore.unblockUI();
      toastStore.showSuccess(
        "Company profile has been updated successfully",
        "",
        "bottom",
        "edit-profile-save-btn"
      );
      Object.assign(form.fields, {
        name: company.value?.name,
        location: company.value?.location,
        phone_number: company.value?.phone_number,
        email: company.value?.email,
      });
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to update Company profile. Please try again",
        "",
        "bottom",
        "edit-profile-save-btn"
      );
    }
  } catch (error) {
  } finally {
    toastStore.unblockUI();
  }
};
</script>

<style lang="scss" scoped>
ion-input {
  color: #74787c;
  --padding-end: 10px;
  --padding-start: 10px;
}
.use-location {
  --color: #666eed;
  --padding-start: 0px;
}
</style>
