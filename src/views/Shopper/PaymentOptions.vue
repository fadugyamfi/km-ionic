<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <PaymentOptionsHeader />
    </section>

    <!-- Main Content -->
    <ion-content :fullscreen="true" class="ion-padding-horizontal">

      <section class="d-flex flex-column ion-margin-bottom">
        <IonText class="fw-semibold">Pay Now</IonText>
        <IonText color="medium" class="font-medium">Select a payment method</IonText>
      </section>

      <section class="d-flex flex-column ion-margin-bottom">
        <PayOnDelivery />
      </section>

      <section class="d-flex flex-column ion-margin-bottom">
        <IonText class="fw-semibold">Pay Now</IonText>
        <IonText color="medium" class="font-medium">Select a pay later option</IonText>
      </section>

      <section class="d-flex flex-column ion-margin-bottom">
      
    <ion-card>
      <ion-card-content>
        <section class="d-flex ion-justify-content-between ion-align-items-center">
          <IonText class="fw-semibold">Pay over 2 weeks</IonText>
          <section class="d-flex ion-align-items-center">
            <img
              loading="lazy"
              src="/img/icons/chevron-down.svg"
              class="image"
              @click="toggleDropdown"
            />
          </section>
        </section>
      </ion-card-content> 
    </ion-card>
    <ion-card>
    <section v-if="showDropdown" class="wrapper ion-padding ion-margin-bottom">
    <ion-radio-group>
      <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
        <IonText class="fw-semibold">Pay 50% instalment each week</IonText>
        <section class="d-flex ion-align-items-center">
          <IonText class="fw-semibold ion-margin-end"></IonText>
          <ion-radio></ion-radio>
        </section>
      </section>

    </ion-radio-group>
  </section>
  <section v-if="showDropdown" class="wrapper ion-padding ion-margin-bottom">
    <ion-radio-group>
      <section class="d-flex ion-justify-content-between ion-align-items-center" style="margin-bottom: 8px">
        <IonText class="fw-semibold">Pay 100% on due date</IonText>
        <section class="d-flex ion-align-items-center">
          <IonText class="fw-semibold ion-margin-end"></IonText>
          <ion-radio></ion-radio>
        </section>
      </section>  
    </ion-radio-group>
  </section>
</ion-card>
        <ion-card>
          <ion-card-content>
            <section class="d-flex ion-justify-content-between ion-align-items-center">
              <IonText class="fw-semibold">Pay over 4 weeks</IonText>
              <section class="d-flex ion-align-items-center">
                <img loading="lazy" src="/img/icons/chevron-down.svg" class="image" />
              </section>
            </section>
          </ion-card-content>
        </ion-card>
      </section>
    </ion-content>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="viewItemReview">Continue</KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>
<script lang="ts">
import {
  IonPage, IonText, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCard, IonButton,
  IonIcon, IonCardContent, IonContent, IonFooter, IonAvatar, IonList, IonItem, IonLabel,
  IonSearchbar, IonSkeletonText, IonRow, IonCol, IonInput, IonImg, IonCardHeader, IonCardSubtitle,
  IonCardTitle
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { close, heartOutline, heart, cart, cartOutline, shareOutline ,locationOutline, timeOutline } from 'ionicons/icons';
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
    IonPage, IonText, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCard, IonButton,
    IonIcon, IonCardContent, IonContent, IonFooter, KolaYellowButton, KolaWhiteButton, Image,
    Swiper, SwiperSlide, IonAvatar, IonList, IonItem, IonLabel, IonSearchbar, IonSkeletonText,
    IonRow, IonCol, NoResults, IonInput, IonCardHeader, IonCardSubtitle, IonImg, IonCardTitle,
    PaymentOptionsHeader, PayOnDelivery
  },
  data() {
    return {
      close, heartOutline, cartOutline, shareOutline, cart, heart,
      fetching: false,
      defaultBanner: '/images/vendor/banner.png',
      showDropdown: false, // Define showDropdown here
    };
  },
  computed: {
    ...mapStores(useProductStore)
  },
  methods: {
    viewItemReview() {
      this.$router.push('/shopper/item-review');
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
});
</script>


<style scoped lang="scss">
ion-card {
  margin: 2px;
  color: #000000;
}
</style>
