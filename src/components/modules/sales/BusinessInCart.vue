<template>
  <IonItem>


    <section class="d-flex ion-align-items-stretch">
      <IonThumbnail>
        <Image :src="saleItem?.product?.image"></Image>
      </IonThumbnail>

      <section>
        <section class="d-flex ion-justify-content-between">

          <section class="d-flex flex-column">
            <IonText class="fw-semibold">{{  'Racy Venturees' }}</IonText>
            <IonText color="medium" class="font-medium">
              {{ "Item total: GHS 150.68"}}
            </IonText>
            <IonText color="medium" class="font-medium">
              {{ "GHS 3000 minimum reached" }}
            </IonText>
           
          </section>

          <IonButton slot="end" fill="clear" color="dark" class="ion-no-margin ion-no-padding ion-align-self-start"
            @click="removeItem()">
            <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
          </IonButton>
        </section>
        <Image class="custom-image" :src="saleItem?.product?.image">></Image>
        
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
import { SaleItem } from '@/models/SaleItem';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import Product from '@/models/Product';


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
    saleItem: {
      type: Object as PropType<SaleItem>
    }
  },

  data() {
    return {
      closeCircleOutline
    }
  },

  computed: {
    ...mapStores(useSaleStore)
  },

  methods: {
    updateItemQuantity(quantity: number) {
      this.saleItem?.update({
        quantity,
        total_price: quantity * (this.saleItem?.product?.product_price || 0)
      });
    },

    removeItem() {
      this.saleStore.removeProductFromSale(this.saleItem?.product as Product);
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
