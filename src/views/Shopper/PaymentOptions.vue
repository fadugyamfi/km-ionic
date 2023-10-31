<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <SaveForLaterHeader />
    </section>


    <!-- Main Content -->
    <ion-content :fullscreen="true" class="ion-padding-horizontal">

      <ion-card-header>
        <ion-card-title class="title">Pay now</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-text class="description">Select a payment option</ion-text>
      </ion-card-content>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Pay Now</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <span> 1% Discount per box</span>
          <span> Guaranteed 3-Day delivery</span>
        </ion-card-content>
      </ion-card>


      <ion-card>
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
      </ion-card>

      <!-- Express Delivery Card -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Express Delivery</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Want to speed up delivery and receive your order today? We can do that for you
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
import { close, heartOutline, heart, cart, cartOutline, shareOutline, navigateOutline } from 'ionicons/icons';
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


<style scoped lang="scss"></style>
