<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/vendor/orders/record-order/select-customer"
              :icon="arrowBack"
              mode="md"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small"><b>Record New Order</b></IonTitle>
          <IonButtons slot="end">
            <ion-button color="dark" style="opacity: 0">
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent :fullscreen="true">
      <IonList lines="none" class="sales-select-list ion-padding-horizontal">
        <IonListHeader>
          <IonLabel class="fw-bold"> Select Order Type </IonLabel>
        </IonListHeader>

        <IonItem
          v-for="orderType in OrderTypes"
          :key="orderType.id"
          @click="selectOrderType(orderType)"
        >
          <IonLabel>
            <p class="ion-no-margin">{{ orderType.name }}</p>
            <IonText color="medium" class="font-medium">
              {{ orderType.description }}
            </IonText>
          </IonLabel>
          <IonCheckbox
            :aria-label="orderType.name"
            slot="end"
            mode="ios"
            :value="orderType.id"
            :checked="orderStore.newOrder.order_type_id == orderType.id"
          ></IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="order-type-continue"
        :disabled="!orderStore.newOrder.order_type_id"
        @click="onContinue()"
      >
        {{ $t("general.continue") }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonButtons,
  IonHeader,
  IonBackButton,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
  IonAvatar,
  IonCheckbox,
  IonText,
  IonFooter,
} from "@ionic/vue";
import { arrowBack, close, refreshOutline, search } from "ionicons/icons";
import { defineComponent } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { mapStores } from "pinia";

import { OrderType } from "@/models/OrderType";
import { useToastStore } from "@/stores/ToastStore";
import { useUserStore } from "@/stores/UserStore";
import { useOrderStore } from "@/stores/OrderStore";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonListHeader,
    IonLabel,
    IonAvatar,
    IonCheckbox,
    IonText,
    IonFooter,
    KolaYellowButton,
  },

  data() {
    return {
      search,
      close,
      arrowBack,
      OrderTypes: [
        new OrderType({ id: 1, name: "Cash Order" }),
        new OrderType({ id: 5, name: "Credit Order" }),
      ],
    };
  },

  computed: {
    ...mapStores(useUserStore, useOrderStore),
  },

  methods: {
    selectOrderType(orderType: OrderType) {
      this.orderStore.newOrder.order_type_id = orderType.id as number;
    },

    onContinue() {
      if (!this.orderStore.newOrder) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.selectSaleTypeToContinue"),
          "",
          "bottom",
          "order-type-continue"
        );
        return;
      }

      if (this.userStore.user?.isSalesAssociate()) {
        this.$router.push("/agent/orders/place-order/select-products");
      } else {
        this.$router.push("/vendor/orders/record-order/select-products");
      }
    },

    refresh() {},
  },

  mounted() {},
});
</script>
