<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <SaveForLaterHeader />
    </section>


    <!-- Main Content -->
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <IonText>Add Delivery Address</IonText>
      <section>
        <IonInput class="kola-input ion-margin-bottom" type="email" name="emailAddress" placeholder="Town /Locality"> </IonInput>

        <IonButton fill="clear" color="primary" style="text-transform: none" class="ion-margin-bottom">
          <IonIcon :icon="navigateOutline" style="margin-right: 5px;"></IonIcon>
          {{ $t("signup.vendor.location.useCurrentLocation") }}
        </IonButton>

        <IonInput class="kola-input ion-margin-bottom" type="email" name="emailAddress" placeholder="Nearest Landmark">
        </IonInput>
        <IonInput class="kola-input ion-margin-bottom" type="email" name="emailAddress"
          placeholder="Preferred contact number"></IonInput>

        <!-- Delivery Address -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Add Delivery Address</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Select delivery method
          </ion-card-content>
        </ion-card>
      </section>
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
import Product from '@/models/Product';
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
