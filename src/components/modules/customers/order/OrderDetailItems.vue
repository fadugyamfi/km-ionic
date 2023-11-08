<template>
  <IonCard>
    <IonCardHeader class="ion-no-padding">
      <IonItem lines="none">
        <IonThumbnail slot="start">
          <Image :src="order?.business?.logo"></Image>
        </IonThumbnail>

        <IonLabel class="font-medium">{{ order?.customer?.name }}</IonLabel>
      </IonItem>
    </IonCardHeader>

    <IonCardContent class="ion-no-padding">
      <IonList lines="none">
        <IonItem v-for="item in order?.order_items" :key="item.id">
          <IonLabel class="ion-text-wrap font-medium">
            {{ item.product?.product_name }}
          </IonLabel>
          <IonLabel slot="end" class="font-medium text-end">
            {{ Filters.currency(item.product?.product_price as number, item.currency?.symbol as string) }}
          </IonLabel>
        </IonItem>
      </IonList>
    </IonCardContent>

  </IonCard>
</template>



<script lang=ts>
import { Order } from "@/models/Order";
import { IonAccordion, IonItem, IonLabel, IonThumbnail, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonList } from "@ionic/vue";
import { PropType, defineComponent } from 'vue';
import Image from "@/components/Image.vue";
import Filters from "@/utilities/Filters";

export default defineComponent({
  components: {
    IonAccordion,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonIcon,
    Image,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonList
  },
  props: {
    order: {
      type: Object as PropType<Order | null>,
      required: true,
    },
  },
  data() {
    return {
      Filters,
    };
  },
  methods: {

    update() {
      this.$router.push({ name: 'OrderUpdate', params: { id: this.order?.id } });
    },
  },
});
</script>

<style scoped>
ion-thumbnail {
  --size: 32px;
}
</style>
