<template>
  <IonPage>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button
              color="dark"
              :icon="arrowBackOutline"
              text=""
              style="margin-left: 10px"
              defaultHref="/profile/company/team"
            ></ion-back-button>
          </ion-buttons>
          <IonTitle size="small" class="fw-bold"
            >{{ $t("profile.team.addMember") }}
          </IonTitle>
          <ion-buttons slot="end">
            <IonButton disabled></IonButton>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </IonHeader>
    <IonContent class="ion-padding-horizontal">
      <h4 class="header">{{ $t("profile.team.addTeamMember") }}</h4>
      <p class="subtext">
        {{ $t("profile.team.addTeamMemberDescription") }}
      </p>
      <form>
        <IonCard color="light">
          <IonImg
            v-if="photo"
            :src="photo.webviewPath"
            @click="pickImages()"
          ></IonImg>

          <IonCardContent
            v-if="!photo"
            @click="pickImages()"
            class="d-flex ion-justify-content-center ion-align-items-center flex-column"
            style="height: 200px"
          >
            <IonImg
              src="/images/vendor/featured-image.svg"
              style="width: 64px; margin-bottom: 15px"
            ></IonImg>
            <p class="font-medium">Tap to upload</p>
            <p class="font-medium">SVG, PNG, JPG or GIF (max. 2048x1080px)</p>
          </IonCardContent>
        </IonCard>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.name }"
          :label="$t('profile.team.fullName')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.name"
          name="name"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <h6>{{ $t("profile.team.assignRole") }}</h6>
        <IonSelect
          class="kola-input ion-margin-bottom"
          :label="$t('profile.team.selectRole')"
          :class="{
            'ion-invalid ion-touched': form.errors.role,
          }"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.role"
          required
          name="cms_users_id"
          :toggle-icon="chevronDownOutline"
          @ion-change="form.validateSelectInput($event)"
        >
          <IonSelectOption
            v-for="role in roles"
            :key="role.id"
            :value="role.id"
          >
            {{ role.name }}</IonSelectOption
          >
        </IonSelect>
        <h6>{{ $t("profile.team.addNewRole") }}</h6>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.new_role }"
          :label="$t('profile.team.addNewRoleNotFoundInOptions')"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.new_role"
          name="new_role"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
      </form>
    </IonContent>
    <IonFooter class="ion-no-border ion-padding-horizontal">
      <KolaYellowButton>{{ $t("general.save") }}</KolaYellowButton>
      <KolaWhiteButton>{{ $t("general.cancel") }}</KolaWhiteButton>
    </IonFooter>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonTitle,
  IonLabel,
  IonText,
  IonContent,
  IonCard,
  IonCardContent,
  IonImg,
  IonInput,
  IonSelectOption,
  IonSelect,
  IonFooter,
} from "@ionic/vue";
import { ref } from "vue";
import { arrowBackOutline, chevronDownOutline } from "ionicons/icons";
import { useForm } from "@/composables/form";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";

const form = useForm({
  profile_picture: "",
  name: "",
  role: "",
  new_role: "",
});

const photo = ref();

const roles = ref([
  {
    id: 1,
    name: "Sales agent",
  },
  {
    id: 2,
    name: "Business analyst",
  },
  {
    id: 3,
    name: "Content editor",
  },
]);

const addTeamMember = () => {};

const pickImages = async () => {
  const { takePhoto, photos, pickImages } = usePhotoGallery();
  try {
    await pickImages();

    photo.value = photos.value ? photos.value[0] : null;
    if (photo.value) {
      form.fields.profile_picture = photo.value.base64Data as string;
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="scss" scoped>
.header {
  font-size: 16px;
  font-weight: 400;
}
.subtext {
  font-size: 12px;
  color: #74787c;
  font-weight: 400;
}

ion-card {
  margin: 0px;
  margin-bottom: 24px;
}
h6 {
  font-size: 10px;
  color: #74787c;
  font-weight: 400;
  margin-top: 0px;
}
</style>
