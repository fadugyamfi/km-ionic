<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <SaveForLaterHeader />
    </section>


    <!-- Main Content -->
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <section>
        <ion-card-header>
          <ion-card-title class="title">Pay now</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-text class="description">Select a payment option</ion-text>
        </ion-card-content>
      </section>

      <section>
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Pay Now</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <span> 1% Discount per box</span>

            <ion-icon name="time-outline"></ion-icon>
            <span> Guaranteed 3-Day delivery</span>
          </ion-card-content>

        </ion-card>
      </section>

      <section>
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Pay on Delivery</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            Standard Pricing
          </ion-card-content>
        </ion-card>
      </section>
      <section>
        <ion-card-header>
          <ion-card-title class="title">Pay later</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-text class="description">Select a pay later option</ion-text>
        </ion-card-content>
      </section>

      <ion-card class="main-container">
    <ion-card-header class="pay-text">
      Pay over 2 weeks
    </ion-card-header>
    <ion-card-content class="image-wrapper">
      <ion-img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4445a350-54e6-4894-981e-29e9d0e66613?apiKey=76d19367cfa34bd4a80bc8549db79d6e&"
        class="img"
      ></ion-img>
    </ion-card-content>
  </ion-card>

  
  <ion-card class="main-container">
    <ion-card-header class="pay-text">
      Pay over 4 weeks
    </ion-card-header>
    <ion-card-content class="image-wrapper">
      <ion-img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4445a350-54e6-4894-981e-29e9d0e66613?apiKey=76d19367cfa34bd4a80bc8549db79d6e&"
        class="img"
      ></ion-img>
    </ion-card-content>
  </ion-card>

    </ion-content>
    <!-- Footer -->
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton>Continue</KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>


<script lang="ts">
import {
  IonAvatar, IonBackButton, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
  IonButtons, IonCol, IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow,
  IonSearchbar, IonSkeletonText, IonTitle, IonToolbar, IonText, IonInput, IonImg
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { close, heartOutline, heart, cart, cartOutline, shareOutline } from 'ionicons/icons';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { mapStores } from 'pinia';
import { useProductStore } from '@/stores/ProductStore';
import KolaWhiteButton from '@/components/KolaWhiteButton.vue';
import Image from '@/components/Image.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import NoResults from '../../components/layout/NoResults.vue';
import SaveForLaterHeader from "@/components/header/SaveForLaterHeader.vue";
import { useForm } from '@/composables/form';

export default defineComponent({

  components: {
    IonPage,
    SaveForLaterHeader,
    IonText,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonCard,
    IonButton,
    IonIcon,
    IonCardContent,
    IonContent,
    IonFooter,
    KolaYellowButton,
    KolaWhiteButton,
    Image,
    Swiper,
    SwiperSlide,
    IonAvatar,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonSkeletonText,
    IonRow,
    IonCol,
    NoResults,
    IonInput,
    IonCardHeader,
    IonCardSubtitle,
    IonImg,
    IonCardTitle,


  },

  data() {

    return {
      close, heartOutline, cartOutline, shareOutline, cart, heart,
      fetching: false,
      defaultBanner: '/images/vendor/banner.png'
    }
  },

  computed: {
    ...mapStores(useProductStore)
  },

  methods: {

  },

  mounted() {

  }
})
</script>


<style scoped lang="scss">
.main-container {
  border-radius: 8px;
  box-shadow: 0px 4px 24px 0px rgba(105, 111, 130, 0.1);
  background-color: #fff;
  width: 358px;
  padding: 0;
  margin: 16px 0;
}

.pay-text {
  color: var(--ion-text-primary, #000);
  font-weight: 400;
  font-size: 14px;
  line-height: 157%;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding: 16px 0;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.img {
  max-width: 100%;
  object-fit: contain;
}

</style>
