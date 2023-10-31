<template>
  <ion-page>



    <ion-content :fullscreen="true" class="ion-padding-horizontal">

      <SaveForLaterHeader />
      <IonText>Add Delivery Address</IonText>

      <IonInput class="kola-input ion-margin-bottom" type="email" name="emailAddress"></IonInput>

      <IonInput class="kola-input ion-margin-bottom" type="email" name="emailAddress"></IonInput>

      <IonInput class="kola-input ion-margin-bottom" type="email" name="emailAddress"></IonInput>


      <IonText>Add Delivery Address</IonText>
      <IonText>Select delivery method</IonText>

      <ion-card>
    <ion-card-header>
      <ion-card-title>Express Delivery</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      Want to speed up delivery and receive your order today? We can do that for you 
    </ion-card-content>
  </ion-card>
    </ion-content>


    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton> Continue</KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>



<script lang="ts">
import {
  IonAvatar, IonBackButton, IonButton, IonCard, IonCardHeader, IonCardTitle,IonCardContent,IonCardSubtitle,
  IonButtons, IonCol, IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow,
  IonSearchbar, IonSkeletonText, IonTitle, IonToolbar, IonText, IonInput, 
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { close, heartOutline, heart, cart, cartOutline, shareOutline } from 'ionicons/icons'
import Product from '@/models/Product';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { mapStores } from 'pinia';
import { useProductStore } from '@/stores/ProductStore';
import KolaWhiteButton from '@/components/KolaWhiteButton.vue';
import Image from '@/components/Image.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import NoResults from '../../components/layout/NoResults.vue';
import SaveForLaterHeader from "@/components/header/SaveForLaterHeader.vue";
import { handleAxiosRequestError } from '../../utilities';

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

    

  },

  data() {

    return {
      close, heartOutline, cartOutline, shareOutline, cart, heart,
      fetching: false,
      products: null as Product[] | null,
      defaultBanner: '/images/vendor/banner.png'
    }
  },

  computed: {
    ...mapStores(useProductStore)
  },

  methods: {
    async fetchSearchedProducts() {
      this.fetching = true;
      try {
        this.products = await this.productStore.fetchSearchedProducts();
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },

    onSearch(event: any) {
      this.productStore.searchTerm = event.target?.value;
      this.products = [];
      this.fetchSearchedProducts();
    },

    onLoadError(event: Event) {
      (event.target as HTMLImageElement).src = this.defaultBanner;
    },

    viewProduct(product: Product) {
      this.$router.push(`/shopper/products/${product.id}`)
    }
  },

  mounted() {
    this.fetchSearchedProducts();
  }
})
</script>


<style scoped lang="scss">

</style>
