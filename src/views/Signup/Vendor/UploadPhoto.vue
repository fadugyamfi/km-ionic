<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/signup/vendor/stock-info"
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
import FooterNavigation from "./FooterNavigation.vue";
import HeaderArea from "./HeaderArea.vue";
import { usePhotoGallery, UserPhoto } from "@/composables/usePhotoGallery";
import { mapStores } from "pinia";
import { useBusinessStore } from "@/stores/BusinessStore";
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
    this.businessStore.loadCachedRegistrationInfo();
  },

  computed: {
    ...mapStores(useBusinessStore, useUserStore),
  },

  methods: {
    async pickImages() {
      const { takePhoto, photos, pickImages } = usePhotoGallery();

      try {
        await pickImages();

        this.photo = photos.value ? photos.value[0] : null;
        if (this.photo) {
          this.businessStore.registration.logo_image = this.photo
            .base64Data as string;
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
          this.businessStore.registration.logo_image = this.photo
            .base64Data as string;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onContinue() {
      const toastStore = useToastStore();
      const userStore = useUserStore();

      this.businessStore.cacheRegistrationInfo();

      toastStore.blockUI(this.$t("Registering Your Business. Please hold"));

      try {
        const business = await this.businessStore.createBusinessAsVendor();

        if (business) {
          userStore.changePin({
            phone_number: this.businessStore.registration.business_owner_phone,
            pin: this.businessStore.registration.user.pin,
            pin_confirmation:
              this.businessStore.registration.user.pin_confirmation,
          });
          if (this.userStore?.isInShoppingMode()) {
            this.$router.push("/profile/company/signup-complete");
            return;
          }

          this.$router.push("/signup/vendor/signup-complete");
        }
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        toastStore.unblockUI();
      }
    },
  },
});
</script>
