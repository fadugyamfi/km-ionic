<template>
  <IonTabBar slot="bottom" id="vendorTabs">
    <IonTabButton tab="tab1" href="/agent/home">
      <img src="/images/navigation/home.svg" />
      <img src="/images/navigation/home_active.svg" class="active" />
      <IonLabel>{{ $t('general.home') }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab2" href="/agent/orders">
      <img src="/images/navigation/orders.svg" />
      <img src="/images/navigation/orders_active.svg" class="active" />
      <IonLabel>{{ $t('general.orders') }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab3" href="/agent/sales">
      <img src="/images/navigation/sales.svg" />
      <img src="/images/navigation/sales_active.svg" class="active" />
      <IonLabel>{{ $t('general.sales') }}</IonLabel>
    </IonTabButton>

    <!-- <IonTabButton tab="tab4" href="/agent/credits">
      <img src="/images/navigation/credit.svg" />
      <img src="/images/navigation/credit_active.svg" class="active" />
      <IonLabel>{{ $t('general.credit') }}</IonLabel>
    </IonTabButton> -->
    <IonTabButton tab="tab4" href="/agent/leaderboard">
      <IonIcon :icon="starOutline"></IonIcon>
      <IonIcon :icon="star" class="active"></IonIcon>
      <IonLabel>{{ $t('general.leaderboard') }}</IonLabel>
    </IonTabButton>

    <IonTabButton tab="tab5" href="/agent/profile">
      <img src="/images/navigation/profile.svg" />
      <img src="/images/navigation/profile_active.svg" class="active" />
      <IonLabel>{{ $t('general.profile') }}</IonLabel>
    </IonTabButton>
  </IonTabBar>
</template>

<script lang="ts">
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/vue';
import { starOutline, star } from 'ionicons/icons';
import { defineComponent } from 'vue';


export default defineComponent({
    components: { IonTabBar, IonTabButton, IonLabel, IonIcon },

    data() {
      return {
        starOutline,
        star
      }
    }
})
</script>
