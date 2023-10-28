<template>
    <IonItem>


      <section class="d-flex ion-align-items-stretch">
        <IonThumbnail>
          <Image :src="order?.business?.logo"></Image>
        </IonThumbnail>

        <section>
          <section class="d-flex ion-justify-content-between">

            <section class="d-flex flex-column">
              <IonText class="fw-semibold">{{ order?.business?.name || 'Unknown' }}</IonText>
              <IonText color="medium" class="font-medium">
                {{ $t("Item total") }}: {{ order?.total_order_amount }}
              </IonText>
              <IonText color="medium" class="font-medium">
                GHS 3000 minimum reached
              </IonText>

            </section>

            <IonButton slot="end" fill="clear" color="dark" class="ion-no-margin ion-no-padding ion-align-self-start"
              @click="removeOrder()">
              <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
            </IonButton>
          </section>

        </section>
      </section>

    </IonItem>
  </template>

  <script lang="ts">
  import { IonButton, IonIcon, IonItem, IonText, IonThumbnail } from '@ionic/vue';
  import { PropType, defineComponent } from 'vue';
  import ProductQuantitySelector from '../products/ProductQuantitySelector.vue';
  import { closeCircleOutline } from 'ionicons/icons';
  import Image from '@/components/Image.vue';
  import { mapStores } from 'pinia';
  import { useSaleStore } from '@/stores/SaleStore';
  import { useCartStore } from '@/stores/CartStore';
  import Product from '@/models/Product';
  import { Order } from '@/models/Order';


  export default defineComponent({

    components: {
      IonItem,
      IonThumbnail,
      IonText,
      ProductQuantitySelector,
      IonButton,
      IonIcon,
      Image
    },

    props: {
      order: {
        type: Object as PropType<Order>
      }
    },

    data() {
      return {
        closeCircleOutline
      }
    },

    computed: {
      ...mapStores(useSaleStore, useCartStore )
    },

    methods: {
      updateItemQuantity(quantity: number) {
        this.order?.update({
          quantity,
          total_price: quantity * (this.order?.product?.product_price || 0)
        });
      },

      removeOrder() {
        /// this.cartStore.removeProductFromSale(this.saleItem?.product as Product);
      }
    }
  })
  </script>

  <style scoped>
  ion-item {
    --inner-padding-start: 0px;
    --inner-padding-end: 0px;
    --padding-start: 0px;
    margin-bottom: 10px;
  }

  .custom-image {
    width: 24px;
    height: 24px;
    border-radius: 2px;
  }

  ion-thumbnail {
    min-width: 85px;
    height: 140px;
    margin-right: 10px;
    --border-radius: 8px;
  }
  </style>
