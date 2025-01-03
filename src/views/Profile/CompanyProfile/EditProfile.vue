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
            style="object-fit: cover"
            :src="company?.cover_image || defaultBanner"
            @error="onLoadError($event)"
            @click="viewCoverPhoto(company?.cover_image)"
            id="view-cover-image"
          />
          <IonButton
            fill="clear"
            size="small"
            class=" ion-float-end"
            @click="changeCoverPhoto"
            style="text-transform: none"
            >Change cover photo
          </IonButton>
          <div class="profile-avatar">
            <ProfileAvatar
              font-size="40px"
              custom-size="90px"
              :image="company?.logo"
              :username="company?.name"
              @click="viewCoverPhoto(company?.logo)"
            ></ProfileAvatar>
            <IonButton
              fill="clear"
              size="small"
              @click="changePhoto"
              style="text-transform: none"
              >Change profile photo
            </IonButton>
          </div>
        </section>
        <form class="ion-padding" style="margin-top: 60px;" v-show="!fetching">
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
          <LocationInput
            v-model="form.fields.location"
            label="Business Location"
          ></LocationInput>
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

          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{ 'ion-invalid ion-touched': form.errors.tax_number }"
            :label="$t('signup.vendor.tinNumber')"
            labelPlacement="stacked"
            fill="solid"
            name="tax_number"
            v-model="form.fields.tax_number"
            @ionBlur="form.validate($event)"
            @ionChange="form.validate($event)"
            required
          ></IonInput>
          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{ 'ion-invalid ion-touched': form.errors.id_card_number }"
            :label="$t('profile.customers.idCardNumber')"
            labelPlacement="stacked"
            fill="solid"
            v-model="form.fields.id_card_number"
            name="id_card_number"
            @ion-input="form.validate($event)"
            required
          ></IonInput>
          <IonCard color="light" style="margin: 0px">
            <IonImg
              v-if="form.fields.id_card_image"
              :src="photo?.webviewPath"
              @click="takePhoto()"
            ></IonImg>

            <IonCardContent
              v-if="!photo"
              @click="takePhoto()"
              class="d-flex ion-justify-content-center ion-align-items-center flex-column"
              style="height: 150px"
            >
              <IonImg
                src="/images/vendor/featured-image.svg"
                style="width: 64px; margin-bottom: 15px"
              ></IonImg>
              <p class="font-medium">Tap to take photo of ID Card</p>
              <!-- <p class="font-medium">SVG, PNG, JPG or GIF (max. 2048x1080px)</p> -->

              <ViewPhotoModal
                :isOpen="showPhoto"
                @dismiss="showPhoto = false"
                :imageUrl="imageUrl"
              />
            </IonCardContent>
          </IonCard>

          <IonFooter class="ion-padding-top ion-no-border">
            <KolaYellowButton
              id="edit-profile-save-btn"
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
  IonCard,
  IonCardContent,
  IonImg,
  IonAvatar,
  IonModal,
  IonSelect,
  IonSelectOption,
  onIonViewDidEnter,
  onIonViewWillEnter,
} from "@ionic/vue";
import {
  chatbubbleOutline,
  arrowBackOutline,
  navigateOutline,
} from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import LocationInput from "@/components/forms/LocationInput.vue";
import { ref, onMounted, computed } from "vue";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useToastStore } from "@/stores/ToastStore";
import { useRoute, useRouter } from "vue-router";
import Business from "@/models/Business";
import { useForm } from "@/composables/form";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import ViewPhotoModal from "@/components/ViewPhotoModal.vue";
import { usePhotoGallery, UserPhoto } from "@/composables/usePhotoGallery";
import { useLocationStore } from "@/stores/LocationStore";
import Country from "@/models/Country";
import Region from "@/models/Region";

const toastStore = useToastStore();
const businessStore = useBusinessStore();
const locationStore = useLocationStore();
const userStore = useUserStore();

const imageUrl = ref(null);
const showPhoto = ref(false);

const route = useRoute();
const router = useRouter();

const defaultBanner = ref("/images/vendor/banner.png");

const fetching = ref(false);
const countries = ref(<Country[]>[]);
const regions = ref(<Region[]>[]);

const company = computed(() => userStore.activeBusiness);
const form = useForm({
  name: "",
  location: "",
  email: "",
  phone_number: "",
  id_card_number: "",
  business_types_id: 1,
  id_card_image: null,
  country_id: 83,
  region_id: 54,
  city: "",
  tax_number: "",
});

const photo = ref<UserPhoto | null>(null);

const viewCoverPhoto = (url: any) => {
  imageUrl.value = url;
  showPhoto.value = true;
};

const defaultBackRoute = computed(() => {
  if (userStore.appMode == "vendor") {
    return "/vendor/profile";
  } else {
    return "/shopper/profile";
  }
});
const takePhoto = async () => {
  const fields = form.fields;
  const { takePhoto, photos, pickImages } = usePhotoGallery();

  try {
    await takePhoto();

    photo.value = photos.value ? photos.value[0] : null;
    if (photo.value) {
      fields.id_card_image = photo.value.base64Data as string;
    }
  } catch (e) {
    console.log(e);
  }
};

const formValid = computed(() => {
  const fields = form.fields;

  return (
    fields.name?.length > 0 &&
    fields.location?.length > 0 &&
    fields.phone_number?.length > 0
    // fields.id_card_number?.length > 0 &&
    // fields.id_card_image?.length > 0 &&
    // fields.country_id?.length > 0 &&
    // fields.region_id?.length > 0 &&
    // fields.city?.length > 0 &&
    // fields.tax_number?.length > 0 &&
    // fields.email?.length > 0
  );
});
const onLoadError = (event: Event) => {
  (event.target as HTMLImageElement).src = defaultBanner.value;
};
const changePhoto = () => {
  Object.assign(userStore.companyForm, form.fields);
  router.push("/profile/company/change-photo");
};
const changeCoverPhoto = () => {
  Object.assign(userStore.companyForm, form.fields);
  router.push("/profile/company/change-cover-photo");
};

const fetchCompany = async () => {
  fetching.value = true;

  Object.assign(form.fields, {
    name: company.value?.name,
    location: company.value?.location,
    phone_number: company.value?.phone_number,
    email: company.value?.email,
    business_types_id: 1,
    id_card_number: company.value?.id_card_number,
    id_card_image: company.value?.id_card_image,
    country_id: company.value?.country_id,
    region_id: company.value?.region_id,
    city: company.value?.city,
    tax_number: company.value?.tax_number,
  });

  fetching.value = false;
};

const onCountryChange = (event: any) => {
  form.validateSelectInput(event);
  loadRegions(form.fields.country_id);
};

const updateProfile = async () => {
  try {
    toastStore.blockUI("Hold On As We Update Company Profile");

    const res = await businessStore.updateBusiness(
      Number(userStore.activeBusiness?.id),
      form.fields
    );

    if (res) {
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

const fetchCountries = async () => {
  countries.value = await locationStore.fetchCountries();
};

const loadRegions = async (country_id: number) => {
  if (!country_id) return;
  regions.value = await locationStore.fetchRegions(country_id);
};

onIonViewWillEnter(async () => {
  await fetchCountries();
  fetchCompany();
  loadRegions(form.fields.country_id);
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
    max-height: 200px;
  }

  .profile-avatar {
    position: absolute;
    bottom: -45%;
    left: 2%;
    align-items: center;
    display: flex;
    flex-direction: column;

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
      margin-bottom: 30px;
      --color: #666eed;
      font-weight: 500;
    }
  }
}
</style>
