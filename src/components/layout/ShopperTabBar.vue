<template>
  <IonTabBar slot="bottom" id="shopperTabs">
    <IonTabButton tab="tab1" href="/shopper/home">
      <img src="/images/navigation/home.svg" />
      <img class="active" src="/images/navigation/home_active.svg" />
      <IonLabel>{{ $t("general.home") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab2" @click="viewOrders()">
      <img src="/images/navigation/orders.svg" />
      <img class="active" src="/images/navigation/orders_active.svg" />
      <IonLabel>{{ $t("general.orders") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab3" href="/shopper/cart/business">
      <img src="/images/navigation/cart.svg" />
      <img class="active" src="/images/navigation/cart_active.svg" />
      <IonLabel>{{ $t("general.cart") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab4" href="/shopper/credits">
      <img src="/images/navigation/credit.svg" />
      <img src="/images/navigation/credit_active.svg" class="active" />
      <IonLabel>{{ $t("general.credit") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab5" href="/shopper/profile">
      <img src="/images/navigation/profile.svg" />
      <img src="/images/navigation/profile_active.svg" class="active" />
      <IonLabel>{{ $t("general.profile") }}</IonLabel>
    </IonTabButton>
  </IonTabBar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonLabel, IonTabBar, IonTabButton } from "@ionic/vue";
import { useOrderStore } from "@/stores/OrderStore";
import { mapStores } from "pinia";

export default defineComponent({
  data() {
    return {};
  },
  components: { IonTabBar, IonTabButton, IonLabel },
  computed: {
    ...mapStores(useOrderStore),
  },
  methods: {
    viewOrders() {
      if (this.orderStore.editing) {
        this.$router.push(
          `/shopper/orders/${this.orderStore.editedOrder.id}/edit-order`
        );
      } else {
        this.$router.push("/shopper/orders");
      }
    },
  },
});
</script>
