<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopper/orders"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ $t("shopper.orders.orderDetails") }} - #{{ order?.id }}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" :icon="chatbubbleOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content :fullscreen="true">
      <section
        v-if="loading"
        class="d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>

      <section v-else>
        <OrderImages :order="(order as Order)" />
        <PlacedOrderItems :order="(order as Order)"></PlacedOrderItems>

        <section class="ion-padding-horizontal update-button-section">
          <KolaYellowButton>
            {{ "Update" }}
          </KolaYellowButton>
        </section>

        <OrderStatusHistoryView :order="(order as Order)" />
      </section>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import { Order } from "@/models/Order";
import {
  IonIcon,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";
import UpdateButon from "@/components/modules/order/UpdateButon.vue";
import { mapStores } from "pinia";
import { handleAxiosRequestError } from "@/utilities";
import { chatbubbleOutline } from "ionicons/icons";
import OrderImages from "@/components/modules/order/OrderImages.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderStatusHistoryView from "@/components/modules/order/OrderStatusHistoryView.vue";
import { useCustomerStore } from "@/stores/CustomerStore";
import PlacedOrderItems from "@/components/modules/order/PlacedOrderItems.vue";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonContent,
    UpdateButon,
    IonButton,
    OrderImages,
    IonSpinner,
    KolaYellowButton,
    OrderStatusHistoryView,
    PlacedOrderItems
},

  name: "OrderDetails",

  data() {
    return {
      loading: false,
      chatbubbleOutline,
      order: null as Order | null,
    };
  },

  async mounted() {
    await this.loadOrder();
  },

  computed: {
    ...mapStores(useCustomerStore),
  },

  methods: {
    async loadOrder() {
      this.loading = true;
      const order_id = +this.$route.params.id;

      // retrieve the currently loaded order info from the history if available
      this.order = this.customerStore.orders.find(
        (o) => o.id == order_id
      ) as Order;

      // fetch full order info from backend to overwrite the basic data
      try {
        this.order = await this.customerStore.fetchOrder(order_id);
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
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
</style>
