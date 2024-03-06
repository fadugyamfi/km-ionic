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
              defaultHref="/vendor/profile"
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
      <section>
        <form class="ion-padding">
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
          <LocationInput
            v-model="form.fields.location"
            label="Business Location"
          ></LocationInput>

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
import LocationInput from "@/components/forms/LocationInput.vue";
import { ref, computed, onMounted } from "vue";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useToastStore } from "@/stores/ToastStore";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "@/composables/form";
import { useUserStore } from "@/stores/UserStore";

const toastStore = useToastStore();
const businessStore = useBusinessStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const fetching = ref(false);

const form = useForm({
  name: "",
  location: "",
  phone_number: "",
});

const formValid = computed(() => {
  const fields = form.fields;

  return (
    fields.name.length > 0 &&
    fields.location.length > 0 &&
    fields.phone_number.length > 0
  );
});

const addBusiness = async () => {
  try {
    toastStore.blockUI("Hold On As We Add your Business");
    const business = await businessStore.addBusiness({
      ...form.fields,
      business_types_id: 1,
      business_owner_name: userStore.user?.name,
      business_owner_phone: userStore.user?.phone_number,
    });

    if (business) {
      toastStore.unblockUI();
      toastStore.showSuccess(
        "Business has been added successfully",
        "",
        "bottom",
        "edit-profile-save-btn"
      );
      userStore.fetchUserBusinesses();
      router.go(-1);
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to add Business. Please try again",
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
</style>
