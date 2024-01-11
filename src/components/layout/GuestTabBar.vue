<template>
  <IonTabBar slot="bottom" id="guestTabs">
    <IonTabButton tab="tab1" href="/guest/home">
      <img src="/images/navigation/home.svg" width="25" height="25" />
      <img class="active" src="/images/navigation/home_active.svg" loading="lazy" width="25" height="25" />
      <IonLabel>{{ $t("general.home") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab2" @click="showFilterSheet = true">
      <img src="/images/navigation/orders.svg" width="25" height="25" />
      <img class="active" src="/images/navigation/orders_active.svg" loading="lazy" width="25" height="25" />
      <IonLabel>{{ $t("general.orders") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab3" class="cartTab" @click="showFilterSheet = true">
      <img src="/images/navigation/cart.svg" width="25" height="25" />
      <img class="active" src="/images/navigation/cart_active.svg" loading="lazy" width="25" height="25" />
      <IonLabel>{{ $t("general.cart") }}</IonLabel>
      <IonBadge v-if="cartStore.orders?.length > 0">
        {{ cartStore.orders?.length }}
      </IonBadge>
    </IonTabButton>

    <IonTabButton tab="tab4" @click="showFilterSheet = true">
      <img src="/images/navigation/credit.svg" width="25" height="25" />
      <img src="/images/navigation/credit_active.svg" loading="lazy" width="25" height="25" class="active" />
      <IonLabel>{{ $t("general.credit") }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab5" @click="showFilterSheet = true" class="has-badge small">
      <img src="/images/navigation/profile.svg" width="25" height="25" />
      <img src="/images/navigation/profile_active.svg" loading="lazy" width="25" height="25" class="active" />
      <IonLabel>{{ $t("general.profile") }}</IonLabel>
      <IonBadge color="danger" v-if="appStore.installingUpdate"></IonBadge>
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
import { useAppStore } from "@/stores/AppStore";

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
    ...mapStores(useCartStore, useOrderStore, useAppStore),
  },
  methods: {},
});
</script>
