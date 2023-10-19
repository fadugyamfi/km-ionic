<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home/categories"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ business?.name }}
          </IonTitle>
          <IonButtons slot="end">
            <NotificationButton></NotificationButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content :fullscreen="true">
      <section class="banner">
        <img :src="defaultBanner" @error="onLoadError" />
        <aside>
          <IonAvatar size="medium">
            <template v-if="business?.logo">
              <img :src="business?.logo" alt="Business Logo" />
            </template>
            <template v-else>
              <span class="initials">RV</span>
            </template>
          </IonAvatar>
        </aside>
      </section>
      <section class="section title-section d-flex ion-align-items-start ion-justify-content-between">
        <span class="product-name"> {{ business?.name }} </span>
      </section>nic
      <section>
        <BusinessRatingAndReviews :business="business"></BusinessRatingAndReviews>
      </section>
      <section>
        <BusinessLocation :business=business></BusinessLocation>
      </section>
      <section class="section tags">
        <BusinessTags :business="business"></BusinessTags>
      </section>

      <section class="section arrival-section">
        <BusinessNewArrival></BusinessNewArrival>
      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonItem, IonLabel, IonSpinner, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import BusinessRatingAndReviews from '@/components/modules/business/BusinessRatingAndReviews.vue';
import BusinessMinimumOrder from '@/components/modules/business/BusinessMinimumOrder.vue';
import BusinessLocation from '@/components/modules/business/BusinessLocation.vue';
import BusinessDeliveryTime from '@/components/modules/business/BusinessDeliveryTime.vue';
import BusinessTags from '@/components/modules/business/BusinessTags.vue';
import BusinessNewArrival from '@/components/modules/business/BusinessNewArrival.vue';
import { useBusinessStore } from '@/stores/BusinessStore';
import Business from '@/models/Business';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonText } from '@ionic/vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/cards/ProductCard.vue';
import SupplierCard from '@/components/cards/SupplierCard.vue';
import { handleAxiosRequestError } from '@/utilities';

export default defineComponent({
  data() {
    return {
      defaultBanner: '/images/vendor/banner.png',
      business: null as Business | null,
      businessStore: useBusinessStore(),
    };
  },

  components: {
    IonAvatar,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    Business,
    BusinessRatingAndReviews,
    BusinessLocation,
    BusinessMinimumOrder,
    BusinessTags,
    BusinessDeliveryTime,
    BusinessNewArrival,
    Swiper,
    SwiperSlide,
    IonText,
    ProductCard,
    SupplierCard,
  },

  methods: {
    async fetchBusinessDetails() {
      const businessId = +this.$route.params.id;
      try {
        this.business = await this.businessStore.getBusiness(businessId);
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },

    onLoadError(event: Event) {
      (event.target as HTMLImageElement).src = this.defaultBanner;
    },
  },

  mounted() {
    this.fetchBusinessDetails();
  },
});
</script>
<style scoped lang="scss">
main {
  border-radius: 10px;
  background-color: white;
  margin-top: 15px;
  padding: 10px;
  color: #111;

  .section {
    padding: 4px 5px;
    font-size: 0.8em;
  }

  .title-section {
    font-weight: bold;

    .price {
      text-align: right;
      min-width: 80px;
    }
  }

  .business-section {
    margin-left: -3px;

    ion-avatar {
      height: 24px;
      width: 24px;
      margin-right: 5px;
    }

    .rating-and-reviews {
      padding: 10px 5px;
    }
  }

  .section.tags {
    border-top: solid 1px #F1F1F1;
    padding-top: 5px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

.banner {
  position: relative;
  margin-bottom: 40px;

  img {
    max-width: 100%;
    width: 100%;
  }

  aside {
    position: absolute;
    bottom: -15%;
    left: 5%;

    ion-avatar {
      border-radius: 50%;
      background-color: #f5f5f5;
      border: solid 1px #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 90px;

      .initials {
        font-size: 48px;
      }
    }
  }
}
</style>
