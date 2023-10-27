<template>
  <ion-page>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ order }}
          </IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/home"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <ion-icon name="chatbubble-outline"></ion-icon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content :fullscreen="true">
     <orderslides></orderslides>
<orderssuppliercard> </orderssuppliercard>
<orderscard></orderscard>
<updatebutton></updatebutton>
<orderstatus></orderstatus>
    </ion-content>
  </ion-page>
</template>

<script default lang="ts">
import { Order } from '@/models/Order';
import { IonItem, IonIcon, IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/vue';
import { IonSelect, IonSelectOption, IonAvatar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonicSlides } from '@ionic/vue';
import { defineComponent } from 'vue';
import { chevronDownOutline } from 'ionicons/icons';
import { useOrderStore } from '@/stores/OrderStore';
import { computed } from 'vue'
import router from '@/router';

export default defineComponent({
  components: { IonSelect, IonSelectOption, IonAvatar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonicSlides },
  name: 'OrderDetails',
  props: {
    order: {
      type: Object as () => Order,
      required: true,
    },
  },

    
  });
</script>
.order-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}
<style scoped>

</style>
