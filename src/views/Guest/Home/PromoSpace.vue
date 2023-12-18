<template>
  <IonCard>
    <IonCardContent>
      <GuestFreeDeliveryPromo></GuestFreeDeliveryPromo>
    </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
import { IonCard, IonCardContent } from "@ionic/vue";
import { defineComponent } from "vue";
import GuestFreeDeliveryPromo from "@/components/modules/promos/GuestFreeDeliveryPromo.vue";

export default defineComponent({
  data() {
    return {};
  },

  components: {
    IonCard,
    IonCardContent,
    GuestFreeDeliveryPromo,
  },
});
</script>

<style scoped lang="scss">
ion-card {
  --background: #f5aa2926;
}
</style>
