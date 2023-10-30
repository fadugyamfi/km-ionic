<template>
  <ion-list>
    <ion-list-header>Order Status</ion-list-header>
    <ion-item v-for="(status, index) in orderStatuses" :key="index">
      <ion-avatar slot="start">
        <ion-skeleton-text :animated="true" style="width: 40px; height: 40px;"></ion-skeleton-text>
      </ion-avatar>
      <ion-label>
        <h3>{{ status }}</h3>
        <p>Estimated delivery time: {{ estimatedDeliveryTimes[index] }}</p>
      </ion-label>
      <!-- Use a connector for all statuses except the last one -->
      <ion-icon slot="end" :icon="index < orderStatuses.length - 1 ? 'arrow-forward' : ''"></ion-icon>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { IonAvatar, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonAvatar,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
  },
  data() {
    return {
      orderStatuses: ['Confirmed', 'Out for Delivery', 'Delivered'],
      estimatedDeliveryTimes: ['2 hours', '4 hours', '6 hours'],
    };
  },
});
</script>
