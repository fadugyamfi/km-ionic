<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/profile/personal/edit-profile"
          ></IonBackButton>
        </IonButtons>
        <IonTitle></IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <HeaderArea
        :title="$t('signup.vendor.uploadYourProfilePhoto')"
        :subtext="$t('signup.vendor.uploadInstructions')"
      ></HeaderArea>
      <main class="ion-padding-top">
        <IonCard color="light">
          <IonImg
            v-if="photo?.webviewPath"
            :src="photo.webviewPath"
            @click="pickImages()"
          ></IonImg>

          <IonCardContent
            v-if="!photo?.webviewPath"
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

        <p class="ion-text-center">
          <IonButton color="primary" @click="takePhoto()">
            {{ "Take Photo" }}
          </IonButton>
        </p>
      </main>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="updateProfile()">
        {{ $t("profile.customers.save") }}</KolaYellowButton
      >
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import FooterNavigation from "@/views/Signup/Vendor/FooterNavigation.vue";
import HeaderArea from "@/views/Signup/Vendor/HeaderArea.vue";
import { usePhotoGallery, UserPhoto } from "@/composables/usePhotoGallery";
import { mapStores } from "pinia";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "@/utilities";
import { useForm } from "@/composables/form";
import Business from "@/models/Business";
import { useUserStore } from "@/stores/UserStore";
import KolaYellowButton from "@/components/KolaYellowButton.vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonFooter,
    FooterNavigation,
    HeaderArea,
    IonImg,
    IonButton,
    KolaYellowButton,
  },

  data() {
    return {
      photo: null as UserPhoto | null,
    };
  },

  mounted() {
    // this.businessStore.loadCachedRegistrationInfo();
    this.photo = { webviewPath: this.userStore.userForm?.photo } as UserPhoto;
  },

  computed: {
    ...mapStores(useUserStore, useToastStore),
  },

  methods: {
    async pickImages() {
      const { takePhoto, photos, pickImages } = usePhotoGallery();

      try {
        await pickImages();

        this.photo = photos.value ? photos.value[0] : null;
        if (this.photo) {
          this.userStore.userForm.photo = this.photo.base64Data as string;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async takePhoto() {
      const { takePhoto, photos, pickImages } = usePhotoGallery();

      try {
        await takePhoto();

        this.photo = photos.value ? photos.value[0] : null;
        if (this.photo) {
          this.userStore.userForm.photo = this.photo.base64Data as string;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async updateProfile() {
      try {
        this.toastStore.blockUI("Hold On As We Update Your Profile");
        if (!this.userStore.userForm.photo.split(",")[0].includes("base64")) {
          delete this.userStore.userForm.photo;
        }
        const response = await this.userStore.updateUserInfo();
        if (response) {
          this.toastStore.unblockUI();
          this.toastStore.showSuccess("Profile has been updated successfully");
          setTimeout(() => {
            this.$router.push("/profile/personal/edit-profile");
          }, 500);
        } else {
          this.toastStore.unblockUI();
          this.toastStore.showError(
            "Failed to update Profile. Please try again",
            "",
            "bottom",
            "footer"
          );
        }
      } catch (error) {
      } finally {
        this.toastStore.unblockUI();
      }
    },
  },
});
</script>
