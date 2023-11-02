<template>
  <IonCard class="header-card">
    <IonCardHeader>
      <IonText color="dark">
        {{ $t('shopper.orders.orderStatus') }}
      </IonText>
    </IonCardHeader>
  </IonCard>

  <IonCard>
    <IonList lines="none">
    <ion-item v-for="(status, index) in orderStatuses" :key="index">
      <ion-icon :icon="status.icon" slot="start" class="status-icon" :class="{ active: isActive(status) }"></ion-icon>
      <ion-label>
        <h3 class="ion-no-margin">{{ status.name }}</h3>
        <p class="font-small">
          {{ getHistoryEntry(status) ? Filters.date( getHistoryEntry(status)?.created_at as string, 'short') : '' }}
        </p>
      </ion-label>
      <ion-icon slot="end" :icon="index < orderStatuses.length - 1 ? 'arrow-forward' : ''"></ion-icon>
    </ion-item>
  </IonList>
  </IonCard>

</template>

<script lang="ts">
import { IonAvatar, IonCard, IonCardHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText, IonText } from '@ionic/vue';
import { useOrderStore } from '@/stores/OrderStore';
import { defineComponent, computed, PropType, defineProps } from 'vue';
import { Order } from '@/models/Order';
import { trainOutline, checkmarkCircle, cubeOutline } from 'ionicons/icons'
import Filters from '@/utilities/Filters';

export default defineComponent({

  components: {
    IonAvatar,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonCard,
    IonCardHeader,
    IonText
},

  props: {
    order: {
      type: Object as PropType<Order|null>
    }
  },

  data() {
    return {
      Filters,
      orderStatuses: [
        { id: 1, name: 'Order Placed', icon: trainOutline },
        { id: 4, name: 'Order Confirmed', icon: checkmarkCircle },
        { id: 6, name: 'Out For Delivery', icon: trainOutline },
        { id: 7, name: 'Delivered', icon: cubeOutline },
      ]
    }
  },

  methods: {
    isActive(status: any) {
      return this.order?.order_status_id == status.id;
    },

    getHistoryEntry(status: any) {
      const history = this.order?.getLastOrderStatusHistory(status.id);

      return history;
    }
  },

  setup() {

    const orderStore = useOrderStore();


    // Add a function to get the corresponding icon for each status
    const getIconForStatus = (status: string) => {
      if (status === 'Confirmed') {
        return 'checkmark-circle';
      } else if (status === 'Out for Delivery') {
        return 'truck';
      } else if (status === 'Delivered') {
        return 'checkmark-done';
      } else {
        return 'alert-circle';
      }
    };

    return {
      getIconForStatus,
    };
  },
});
</script>

<style scoped>
ion-card.header-card {
  margin-bottom: 0px;
}
ion-card.header-card ion-card-header {
  padding: 8px 16px;
}

ion-list-header {
  --background: #fff;
  --border-color: #efefef;
  --border-style: solid;
  --border-width: 1px;
  border-radius: 5px;
  font-size: 0.8em;
  min-height: 32px;
}

ion-item ion-icon.status-icon {
  margin-right: 0.5em;
  margin-left: 0.5em;
  background: #DEDEDE;
  color: #fff;
  border-radius: 50%;
  padding: 5px;
}

ion-item ion-icon.status-icon.active {
  background: #F5AA29;
  color: #111;
}
</style>
