<template>
  <section>
    <IonCard>
      <IonCardHeader class="ion-no-padding">
        <section v-if="product?.stock_quantity == 0">
          <IonText class="d-flex ion-align-items-center stock-availabilty">
            <IonIcon class="warning" :icon="alertCircleOutline"></IonIcon
            >Product is currently out of stock</IonText
          >
        </section>
      </IonCardHeader>

      <IonCardContent class="ion-no-padding">
        <section
          class="details ion-padding-horizontal ion-margin-vertical d-flex ion-align-items-start ion-justify-content-between"
        >
          <div>
            <h6 class="fw-bold">
              {{ product?.product_name }} - {{ product?.currency?.symbol }}
              {{ product?.product_price }}
            </h6>
            <IonText style="color: #787486">25kg/24pcs</IonText>
            <IonText
              v-if="product?.min_order_amount"
              color="medium"
              class="d-flex ion-align-items-center"
            >
              <IonIcon class="warning" :icon="alertCircleOutline"></IonIcon>GHS
              {{ product?.min_order_amount }} minimum</IonText
            >
          </div>
          <IonButton
            fill="clear"
            color="dark"
            class="ion-no-margin ion-no-padding ion-align-self-start"
          >
            <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
          </IonButton>
        </section>
        <StockDetailChips :tags="product?.tags" />
      </IonCardContent>
    </IonCard>
  </section>
</template>

<script lang="ts">
import Stock from "@/models/Stock";
import {
  IonAccordion,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonText,
  IonButton,
} from "@ionic/vue";
import { PropType, defineComponent } from "vue";
import { closeCircleOutline, alertCircleOutline } from "ionicons/icons";
import StockDetailChips from "./StockDetailChips.vue";

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
    IonList,
    IonText,
    IonButton,
    StockDetailChips,
  },

  props: {
    product: {
      type: Object as PropType<Stock | null>,
    },
  },

  data() {
    return {
      alertCircleOutline,
      closeCircleOutline,
    };
  },
});
</script>

<style scoped lang="scss">
ion-card {
  padding: 24px 12px;
  margin: 0px;
}
ion-icon {
  font-size: 20px;
  &.warning {
    --background: #fdf0ed;
    --border-color: #ef3e3233;
    padding: 2px;
    border-radius: 50%;
    background-color: #fa2b3928;
    color: #d92d20;
    margin-right: 10px;
  }
}
.order-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}

.update-button-section {
  margin-top: 2em;
  margin-bottom: 3em;
}

h6 {
  color: #000;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}

.stock-availabilty {
  text-align: center;
  border-radius: 8px;
  border: 0.5px solid rgba(239, 62, 50, 0.2);
  background: #fdf0ed;
  box-shadow: 0px 2px 16px 0px rgba(101, 93, 93, 0.1);
  padding: 8px 40px;
  color: var(--text-primary, #000);
  font-size: 12px;
}
.categories {
  gap: 22px;
  display: flex;
  align-items: center;
}
.chip {
  border-radius: 16px;
  background: var(--gray-100, #f2f4f7);
  color: #003366;
}
.details ion-text {
  font-size: 12px;
  margin-top: 10px;
}
</style>
