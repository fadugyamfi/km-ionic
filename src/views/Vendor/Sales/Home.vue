<template>
  <ion-page>
    <ShopperHeader></ShopperHeader>

    <ion-content :fullscreen="true">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonButton fill="clear" color="primarys" @click="onViewSales()">
              View Sales
            </IonButton>
          </IonCol>
          <IonCol class="ion-justify-content-end ion-text-end">
            <IonButton fill="clear" color="primarys" @click="onAddSale()">
              Add Sale
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import { defineComponent } from 'vue';
import { useSaleStore } from '../../../stores/SaleStore';
import { mapStores } from 'pinia';

export default defineComponent({

  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    ShopperHeader
  },

  data() {
    return {

    }
  },

  computed: {
    ...mapStores( useSaleStore )
  },

  methods: {
    onAddSale() {
      this.saleStore.resetForNewSale();
      this.$router.push('/vendor/sales/add-sale/select-agent')
    },

    onViewSales() {
      this.$router.push('/vendor/sales/history');
    }
  }
})
</script>
