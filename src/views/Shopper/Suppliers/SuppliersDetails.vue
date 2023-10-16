<template>
    <ion-page>
      <ShopperHeader :show-search="false"></ShopperHeader>
  
      <ion-content :fullscreen="true">
        <section class="supplier-details">
          <ion-card>
            <Image :alt="supplier.name" :src="supplier.logo" />
            <IonCardHeader>
              <IonCardTitle>{{ supplier.name }}</IonCardTitle>
              <IonCardSubtitle>
                <span v-if="supplier.min_order_amount">
                  {{ supplier.currency?.symbol }} {{ supplier.min_order_amount }} minimum
                </span>
                <span v-else>
                  No Order Minimums
                </span>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <BusinessRatingAndReviews :business="supplier"></BusinessRatingAndReviews>
            </IonCardContent>
          </ion-card>
  
          <section class="supplier-products">
            <h2>Products</h2>
            <ProductList :products="supplier.products"></ProductList>
          </section>
        </section>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  import { defineComponent, PropType } from 'vue';
  import Business from '@/models/Business';
  import Image from '@/components/Image.vue';
  import BusinessRatingAndReviews from '@/components/modules/business/BusinessRatingAndReviews.vue';
  import ProductList from '@/components/lists/ProductList.vue';
  import ShopperHeader from '@/components/layout/ShopperHeader.vue';
  
  export default defineComponent({
    props: {
      supplier: {
        required: true,
        type: Business,
      },
    },
  
    components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, Image, BusinessRatingAndReviews, ProductList, ShopperHeader },
  });
  </script>
  
  <style lang="scss">
  .supplier-details {
    padding: 10px;
  
    .supplier-products {
      margin-top: 20px;
  
      h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
  }
  </style>
  