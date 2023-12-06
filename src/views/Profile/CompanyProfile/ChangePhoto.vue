<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/profile/company/edit-profile"
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

        <p class="ion-text-center">
          <IonButton color="primary" @click="takePhoto()">
            {{ "Take Photo" }}
          </IonButton>
        </p>
      </main>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <FooterNavigation @continue="onContinue()"></FooterNavigation>
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
import { defineComponent } from "vue";
import FooterNavigation from "@/views/Signup/Vendor/FooterNavigation.vue";
import HeaderArea from "@/views/Signup/Vendor/HeaderArea.vue";
import { usePhotoGallery, UserPhoto } from "@/composables/usePhotoGallery";
import { mapStores } from "pinia";
import { useToastStore } from "@/stores/ToastStore";
import { handleAxiosRequestError } from "@/utilities";
import { useUserStore } from "@/stores/UserStore";

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
  },

  data() {
    return {
      photo: null as UserPhoto | null,
    };
  },

  mounted() {
    // this.businessStore.loadCachedRegistrationInfo();
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async pickImages() {
      const { takePhoto, photos, pickImages } = usePhotoGallery();

      try {
        await pickImages();

        this.photo = photos.value ? photos.value[0] : null;
        if (this.photo) {
          this.userStore.companyForm.logo_image = this.photo.base64Data as string;
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
          this.userStore.companyForm.logo = this.photo.base64Data as string;
        }
      } catch (e) {
        console.log(e);
      }
    },

    onContinue() {
      this.$router.push("/profile/company/change-cover-photo");
    },
  },
});
</script>
