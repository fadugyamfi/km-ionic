<template>
  <IonTabBar slot="bottom" id="shopperTabs">
    <IonTabButton tab="tab1" href="/shopper/home">
      <img src="/images/navigation/home.svg" />
      <img class="active" src="/images/navigation/home_active.svg" />
      <IonLabel>{{ $t("general.home") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab2" href="/shopper/orders">
      <img src="/images/navigation/orders.svg" />
      <img class="active" src="/images/navigation/orders_active.svg" />
      <IonLabel>{{ $t("general.orders") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab3" class="cartTab has-badge" href="/shopper/cart/business">
      <img src="/images/navigation/cart.svg" />
      <img class="active" src="/images/navigation/cart_active.svg" />
      <IonLabel>{{ $t("general.cart") }}</IonLabel>
      <IonBadge v-if="cartStore.orders?.length > 0">
        {{ cartStore.orders?.length }}
      </IonBadge>
    </IonTabButton>

    <IonTabButton tab="tab4" href="/shopper/credits" disabled>
      <img src="/images/navigation/credit.svg" />
      <img src="/images/navigation/credit_active.svg" class="active" />
      <IonLabel>{{ $t("general.credit") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab5" href="/shopper/profile" class="has-badge small">
      <img src="/images/navigation/profile.svg" />
      <img src="/images/navigation/profile_active.svg" class="active" />
      <IonLabel>{{ $t("general.profile") }}</IonLabel>
      <IonBadge color="danger" v-if="appStore.installingUpdate"></IonBadge>
    </IonTabButton>
  </IonTabBar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonBadge, IonLabel, IonTabBar, IonTabButton } from "@ionic/vue";
import { useOrderStore } from "@/stores/OrderStore";
import { mapStores } from "pinia";
import { useCartStore } from "@/stores/CartStore";
import { useAppStore } from "@/stores/AppStore";

export default defineComponent({
  data() {
    return {};
  },
  components: { IonTabBar, IonTabButton, IonLabel, IonBadge },

  computed: {
    ...mapStores(useCartStore, useOrderStore, useAppStore),
  },
});
</script>
