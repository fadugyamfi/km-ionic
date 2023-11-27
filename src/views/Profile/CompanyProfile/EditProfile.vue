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
              <IonLabel>{{ $t("profile.editProfile") }}</IonLabel>
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
        <section class="banner">
          <img
            :src="company?.photo || defaultBanner"
            @error="onLoadError($event)"
          />

          <aside class="d-flex">
            <ProfileAvatar
              font-size="40px"
              custom-size="90px"
              :image="company?.logo"
              :username="company?.name"
            ></ProfileAvatar>
            <IonButton
              fill="clear"
              size="small"
              @click="changePhoto"
              style="text-transform: none"
              >Change cover & profile photo
            </IonButton>
          </aside>
        </section>
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
            :class="{ 'ion-invalid ion-touched': form.errors.email }"
            :label="$t('signup.vendor.emailAddress')"
            labelPlacement="stacked"
            fill="solid"
            v-model="form.fields.email"
            name="email"
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
              :disabled="!formValid"
              @click.prevent="updateProfile"
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
  IonText,
  IonSpinner,
  IonInput,
  IonFooter,
  IonAvatar,
} from "@ionic/vue";
import {
  chatbubbleOutline,
  arrowBackOutline,
  navigateOutline,
} from "ionicons/icons";
import CompanyProfileHeader from "@/components/modules/company/CompanyProfileHeader.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { ref, onMounted, computed } from "vue";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useToastStore } from "@/stores/ToastStore";
import { useGeolocation } from "@/composables/useGeolocation";
import { useRoute, useRouter } from "vue-router";
import Business from "@/models/Business";
import { useForm } from "@/composables/form";
import ProfileAvatar from "@/components/ProfileAvatar.vue";

const toastStore = useToastStore();
const route = useRoute();
const router = useRouter();

const defaultBanner = ref("/images/vendor/banner.png");

const fetching = ref(false);

const company = ref<Business | null>();
const form = useForm({
  name: "",
  location: "",
  email: "",
  phone_number: "",
  business_types_id: 1,
});

const defaultBackRoute = computed(() => {
  const userStore = useUserStore();
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
const onLoadError = (event: Event) => {
  (event.target as HTMLImageElement).src = defaultBanner.value;
};
const changePhoto = () => {
  const userStore = useUserStore();
  Object.assign(userStore.companyForm, form.fields);
  router.push("/profile/company/change-photo");
};

const fetchCompany = async () => {
  fetching.value = true;
  const userStore = useUserStore();
  const businessStore = useBusinessStore();
  company.value = await businessStore.getBusiness(
    Number(userStore.activeBusiness?.id)
  );
  Object.assign(form.fields, {
    name: company.value?.name,
    location: company.value?.location,
    phone_number: company.value?.phone_number,
    email: company.value?.email,
    business_types_id: 1,
  });
  fetching.value = false;
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
const updateProfile = async () => {
  try {
    toastStore.blockUI("Hold On As We Update Company Profile");
    const userStore = useUserStore();
    const businessStore = useBusinessStore();
    company.value = await businessStore.updateBusiness(
      Number(userStore.activeBusiness?.id),
      form.fields
    );
    if (company.value) {
      toastStore.unblockUI();
      toastStore.showSuccess("Company profile has been updated successfully");
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
        "footer"
      );
    }
  } catch (error) {
  } finally {
    toastStore.unblockUI();
  }
};
onMounted(() => {
  fetchCompany();
});
</script>
<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
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
.banner {
  position: relative;
  margin-bottom: 40px;

  img {
    max-width: 100%;
    width: 100%;
  }

  aside {
    position: absolute;
    bottom: -25%;
    left: 5%;
    align-items: center;

    ion-avatar {
      border-radius: 50%;
      background-color: #f5f5f5;
      border: solid 1px #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 90px;

      .initials {
        font-size: 48px;
      }
    }
    ion-button {
      margin-top: 30px;
      --color: #666eed;
      font-weight: 600;
    }
  }
}
</style>
