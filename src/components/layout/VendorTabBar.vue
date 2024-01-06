<template>
  <IonTabBar slot="bottom" id="vendorTabs">
    <IonTabButton tab="tab1" href="/vendor/home">
      <img src="/images/navigation/home.svg" width="25" height="25" />
      <img src="/images/navigation/home_active.svg" loading="lazy" width="25" height="25" class="active" />
      <IonLabel>{{ $t('general.home') }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab2" href="/vendor/orders">
      <img src="/images/navigation/orders.svg" width="25" height="25" />
      <img src="/images/navigation/orders_active.svg" loading="lazy" width="25" height="25" class="active" />
      <IonLabel>{{ $t('general.orders') }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab3" href="/vendor/sales">
      <img src="/images/navigation/sales.svg" width="25" height="25" />
      <img src="/images/navigation/sales_active.svg" loading="lazy" width="25" height="25" class="active" />
      <IonLabel>{{ $t('general.sales') }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab4" href="/vendor/credits">
      <img src="/images/navigation/credit.svg" width="25" height="25" />
      <img src="/images/navigation/credit_active.svg" loading="lazy" width="25" height="25" class="active" />
      <IonLabel>{{ $t('general.credit') }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab5" href="/vendor/profile" class="has-badge small">
      <img src="/images/navigation/profile.svg" width="25" height="25" />
      <img src="/images/navigation/profile_active.svg" loading="lazy" width="25" height="25" class="active" />
      <IonLabel>{{ $t('general.profile') }}</IonLabel>
      <IonBadge color="danger" v-if="appStore.installingUpdate"></IonBadge>
    </IonTabButton>
  </IonTabBar>
</template>

<script lang="ts">
import { IonBadge, IonLabel, IonTabBar, IonTabButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useAppStore } from '../../stores/AppStore';
import { mapStores } from "pinia";

export default defineComponent({
    components: { IonTabBar, IonTabButton, IonLabel, IonBadge },

    computed: {
      ...mapStores( useAppStore )
    }
})
</script>
