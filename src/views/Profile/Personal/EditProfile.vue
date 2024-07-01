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
        <section
          class="d-flex ion-justify-content-center flex-column ion-align-items-center"
        >
          <ProfileAvatar
            font-size="40px"
            custom-size="90px"
            :image="user?.photo"
            :username="user?.name"
            @click="viewCoverPhoto(user?.photo)"
          ></ProfileAvatar>

          <ViewPhotoModal
            :isOpen="showPhoto"
            @dismiss="showPhoto = false"
            :imageUrl="imageUrl"
          />
          <IonButton
            fill="clear"
            size="small"
            @click="changePhoto"
            style="text-transform: none"
            >Change profile photo
          </IonButton>
        </section>
        <form class="ion-padding" v-show="!fetching">
          <IonInput
            class="kola-input ion-margin-bottom"
            :class="{ 'ion-invalid ion-touched': form.errors.name }"
            :label="$t('signup.vendor.fullName')"
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
          <IonFooter class="ion-padding-top ion-no-border">
            <KolaYellowButton
              v-if="!isChangeNumber"
              :disabled="!formValid"
              @click.prevent="updateProfile"
              >{{ $t("profile.customers.save") }}</KolaYellowButton
            >
            <KolaYellowButton v-if="isChangeNumber" @click="onContinue()">
              <IonSpinner v-if="validating" name="crescent"></IonSpinner>
              <IonText v-else>{{ $t("general.continue") }}</IonText>
            </KolaYellowButton>
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
} from "@ionic/vue";
import {
  chatbubbleOutline,
  arrowBackOutline,
  navigateOutline,
} from "ionicons/icons";
import PersonalProfileHeader from "@/components/modules/personal/PersonalProfileHeader.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { ref, onMounted, computed } from "vue";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "@/stores/UserStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useToastStore } from "@/stores/ToastStore";
import { useRouter } from "vue-router";
import User from "@/models/User";
import { useForm } from "@/composables/form";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import ViewPhotoModal from "@/components/ViewPhotoModal.vue";

const toastStore = useToastStore();
const userStore = useUserStore();
const router = useRouter();

const fetching = ref(false);
const validating = ref(false);

const imageUrl = ref(null);
const showPhoto = ref(false);

const defaultBackRoute = computed(() => {
  const userStore = useUserStore();
  if (userStore.appMode == "vendor") {
    return "/vendor/profile";
  } else {
    return "/shopper/profile";
  }
});

const user = computed(() => userStore.user);
const form = useForm({
  id: "",
  name: "",
  email: "",
  phone_number: "",
});

const formValid = computed(() => {
  const fields = form.fields;

  return fields.name.length > 0 && fields.phone_number.length > 0;
});

const isChangeNumber = computed(
  () => form.fields.phone_number !== user.value?.phone_number
);

const viewCoverPhoto = (url: any) => {
  imageUrl.value = url;
  showPhoto.value = true;
};

const changePhoto = () => {
  Object.assign(userStore.userForm, form.fields);
  router.push("/profile/personal/change-photo");
};

const onContinue = async () => {
  validating.value = true;
  userStore.registering = false;
  userStore.resettingPIN = false;
  userStore.updatingProfile = true;

  userStore.userForm = form.fields;
  userStore
    .verifyPhoneNumber({
      phone_number: form.fields.phone_number as string,
      request_otp: true,
    })
    .then((response) => {
      router.push("/auth/verify-otp");
    })
    .catch((error) => {
      handleAxiosRequestError(error);
    })
    .finally(() => (validating.value = false));
};

const updateProfile = async () => {
  try {
    userStore.userForm = form.fields;
    toastStore.blockUI("Hold On As We Update Your Profile");
    const user = await userStore.updateUserInfo();
    if (user) {
      toastStore.unblockUI();
      toastStore.showSuccess("Profile has been updated successfully");
    } else {
      toastStore.unblockUI();
      toastStore.showError(
        "Failed to update Profile. Please try again",
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
  form.fields = {
    id: user.value?.id,
    name: user.value?.name,
    email: user.value?.email,
    phone_number: user.value?.phone_number,
  };
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
</style>
