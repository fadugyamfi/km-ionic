<template>
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/signup/vendor/stock-info"></IonBackButton>
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
                    <IonImg v-if="photo" :src="photo.webviewPath" @click="takePhoto()"></IonImg>

                    <IonCardContent v-if="!photo" @click="takePhoto()" class="d-flex ion-justify-content-center ion-align-items-center flex-column" style="height: 200px;">
                        <IonImg src="/images/vendor/featured-image.svg" style="width: 64px; margin-bottom: 15px;"></IonImg>
                        <p class="font-medium">Tap to upload</p>
                        <p class="font-medium">SVG, PNG, JPG or GIF (max. 2048x1080px)</p>
                    </IonCardContent>
                </IonCard>
            </main>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <FooterNavigation @continue="onContinue()"></FooterNavigation>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterNavigation from './FooterNavigation.vue';
import HeaderArea from './HeaderArea.vue';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';
import { mapStores } from 'pinia';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useToastStore } from '@/stores/ToastStore';
import { handleAxiosRequestError } from '../../../utilities';

export default defineComponent({

    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent, IonCard,
        IonCardContent,
        IonFooter,
        FooterNavigation,
        HeaderArea,
        IonImg
    },

    data() {
        return {
            photo: null as UserPhoto | null
        }
    },

    computed: {
        ...mapStores( useBusinessStore )
    },

    methods: {
        async takePhoto() {
            const { takePhoto, photos } = usePhotoGallery();

            try {
                await takePhoto();

                this.photo = photos.value ? photos.value[0] : null;
                if( this.photo ) {
                    this.businessStore.registration.logo_image = this.photo.base64Data as string;
                }
            } catch(e) {
                console.log(e);
            }
        },

        async onContinue() {
            const toastStore = useToastStore();
            this.businessStore.cacheRegistrationInfo();
            toastStore.blockUI( this.$t("Registering Your Business. Please hold"));

            try {
                const business = await this.businessStore.createBusinessAsVendor();

                if( business ) {
                    this.$router.push('/signup/vendor/signup-complete');
                }
            } catch(error) {
                handleAxiosRequestError(error);
            } finally {
                toastStore.unblockUI();
            }
        }
    }
})
</script>
