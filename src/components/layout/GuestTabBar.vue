<template>
  <IonTabBar slot="bottom" id="shopperTabs">
    <IonTabButton tab="tab1" href="/guest/home">
      <img src="/images/navigation/home.svg" />
      <img class="active" src="/images/navigation/home_active.svg" />
      <IonLabel>{{ $t("general.home") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab2" @click="showFilterSheet = true">
      <img src="/images/navigation/orders.svg" />
      <img class="active" src="/images/navigation/orders_active.svg" />
      <IonLabel>{{ $t("general.orders") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab3" class="cartTab" @click="showFilterSheet = true">
      <img src="/images/navigation/cart.svg" />
      <img class="active" src="/images/navigation/cart_active.svg" />
      <IonLabel>{{ $t("general.cart") }}</IonLabel>
      <IonBadge v-if="cartStore.orders?.length > 0">
        {{ cartStore.orders?.length }}
      </IonBadge>
    </IonTabButton>

    <IonTabButton tab="tab4" @click="showFilterSheet = true">
      <img src="/images/navigation/credit.svg" />
      <img src="/images/navigation/credit_active.svg" class="active" />
      <IonLabel>{{ $t("general.credit") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab5" @click="showFilterSheet = true">
      <img src="/images/navigation/profile.svg" />
      <img src="/images/navigation/profile_active.svg" class="active" />
      <IonLabel>{{ $t("general.profile") }}</IonLabel>
    </IonTabButton>
  </IonTabBar>
  <LoginRequiredSheet
    :isOpen="showFilterSheet"
    @didDismiss="showFilterSheet = false"
  >
  </LoginRequiredSheet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonBadge, IonLabel, IonTabBar, IonTabButton } from "@ionic/vue";
import { useOrderStore } from "@/stores/OrderStore";
import { mapStores } from "pinia";
import { useCartStore } from "@/stores/CartStore";
import LoginRequiredSheet from "../modules/LoginRequiredSheet.vue";

export default defineComponent({
  data() {
    return {
      showFilterSheet: false,
    };
  },
  components: {
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonBadge,
    LoginRequiredSheet,
  },

  computed: {
    ...mapStores(useCartStore, useOrderStore),
  },
  methods: {},
});
</script>

<style scoped lang="scss">
.cartTab {
  position: relative;

  ion-badge {
    --background: #003366;
    position: absolute;
    font-size: 0.7em;
    top: 5px;
    right: 5px;
  }
}
</style>
