<ion-accordion :value="isAccordionOpen ? 'first' : undefined">
  <ion-item slot="header" color="light">
    <IonThumbnail slot="start">
      <Image :src="order?.business?.logo"></Image>
    </IonThumbnail>
    <ion-label>First Accordion</ion-label>
    <ion-icon slot="end" :icon="isAccordionOpen ? 'chevron-up-outline' : 'chevron-down-outline'" @click="toggleAccordion()"></ion-icon>
    <ion-icon v-if="isAccordionOpen" slot="end" :icon="isAccordionOpen ? 'create-outline' : ''" @click="OrderUpdate()"></ion-icon>
  </ion-item>
  <ion-item class="ion-padding" slot="content">
    <ion-grid>
      <ion-row>
        <ion-col size="6">Order ID: {{ order.id }}</ion-col>
        <ion-col size="6" class="ion-text-end">Total Price: {{ order.totalPrice }}</ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>

</ion-accordion>


<script lang=ts>
import { Order } from "@/models/types";
import { IonAccordion, IonItem, IonLabel, IonThumbnail, IonIcon } from "@ionic/vue";
import { defineComponent } from 'vue';



 

export default defineComponent({
  components: {
    IonAccordion,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonIcon,
  },
  props: {
    order: {
      type: Object as () => Order,
      required: true,
    },
  },
  data() {
    return {
      isAccordionOpen: false,
    };
  },
  methods: {
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    },
    update() {
      this.$router.push({ name: 'OrderUpdate', params: { id: this.order.id } });
    },
  },
});
</script>