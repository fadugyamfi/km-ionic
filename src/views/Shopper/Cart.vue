<template>
  <ion-page>
    <ShopperHeader></ShopperHeader>

    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <h4>Your Cart</h4>
      <IonList>
        <IonItem v-for="(item, index) in cartStore.items" :key="item.product?.id">
          <IonAvatar slot="start">
            <IonImg :src="item.product?.image"></IonImg>
          </IonAvatar>
          <IonLabel>
            <p>{{ item.product.product_name }}</p>
            <p>{{ item.quantity }}</p>
            <p>{{ item.product.currency?.symbol || 'GHS' }} {{ item.quantity * (item.product.product_price || 0) }}</p>
          </IonLabel>
          <IonButton fill="clear" color="danger" slot="end" @click.prevent.stop="removeFromCart(item, index)">
            <IonIcon :icon="trashBinOutline"></IonIcon>
          </IonButton>
        </IonItem>
      </IonList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonImg, IonButton, IonIcon } from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import { CartItem, useCartStore } from '@/stores/CartStore';
import { trashBinOutline } from 'ionicons/icons';

const cartStore = useCartStore();
cartStore.loadFromStorage();

const removeFromCart = (item: CartItem, index: number) => {
  cartStore.removeAtIndex(index);
}
</script>
