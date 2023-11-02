<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <PaymentOptionsHeader />
    </section>


    <!-- Main Content -->
    <ion-content :fullscreen="true"  class="ion-padding-horizontal">
      <main>

      <section class="d-flex flex-column ion-margin-bottom">
        <IonText class="fw-semibold">Pay Now</IonText>
        <IonText color="medium" class="font-medium">Select a payment method</IonText>
      </section>
   
   
      <section>
          <PayOnDelivery />
        </section>

      <section class="d-flex flex-column ion-margin-bottom">
        <IonText class="fw-semibold">Pay Now</IonText>
        <IonText color="medium" class="font-medium">Select a pay later option</IonText>
      </section>

      <ion-card class="main-container">
        <ion-card-header class="pay-text">
          Pay over 2 weeks
        </ion-card-header>
        <ion-card-content class="image-wrapper">
        
        </ion-card-content>
      </ion-card>


      <ion-card class="main-container">
        <ion-card-header class="pay-text">
          Pay over 4 weeks  
        </ion-card-header>
        <ion-card-content class="image-wrapper">
        
        </ion-card-content>
      </ion-card>
      </main>
     
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
import PaymentOptionsHeader from "@/components/header/PaymentOptionsHeader.vue";
import PayOnDelivery from "@/components/modules/deliveryDetails/PayOnDelivery.vue";

export default defineComponent({

  components: {
    IonPage,
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
    PaymentOptionsHeader,
    PayOnDelivery
   


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
  display: flex;
padding: 16px;
flex-direction: column;
align-items: flex-start;
gap: 8px;
border-radius: 8px;
background: #FFF;

}

main{
  width: 390px;
height: 844px;
}
.pay-text {
  color: var(--text-primary, #000);
font-family: Poppins;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22px; 
  text-align: left;
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
