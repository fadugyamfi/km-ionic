<template>
  <section class="minimum-order">
    <section v-if="business?.min_order_amount as number > totalCost" class="d-flex ion-align-items-center">
      <IonIcon class="danger" color="danger" :icon="alertCircleOutline"></IonIcon>
      <IonText color="medium">
        {{ Filters.currency(business?.min_order_amount as number) }} minimum not reached
      </IonText>
    </section>

    <section v-if="business?.min_order_amount != null && business?.min_order_amount as number <= totalCost" class="d-flex ion-align-items-center">
      <IonIcon class="success" color="success" :icon="checkmarkCircleOutline"></IonIcon>
      <IonText color="medium">
        Minimum order reached
      </IonText>
    </section>

    <section v-if="!business?.min_order_amount" class="d-flex ion-align-items-center">
      <IonIcon class="success" color="success" :icon="checkmarkCircleOutline"></IonIcon>
      <IonText color="medium">
        No minimum order required
      </IonText>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { locationOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon, IonText, IonAvatar } from '@ionic/vue';
import Business from '@/models/Business';
import Filters from '@/utilities/Filters';

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business | null>,
        default: () => ({ min_order_amount: 2000 }) // Set the default value here
    },
    totalCost: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    }
  },

  data() {
    return {
      locationOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      Filters
    };
  },
  components: { IonIcon, IonText, IonAvatar }
})
</script>

<style scoped lang="scss">
ion-icon {
  &.danger {
    background-color: rgba(255, 0, 0, 0.174);
  }

  &.success {
    background-color: rgba(0, 255, 85, 0.174);
  }

  font-size: 20px !important; /* Increase the icon size */
  padding: 3px;
  border-radius: 50%;
  margin-right: 10px; /* Increase the spacing between icon and text */
}

ion-text {
  font-size: 0.8em; /* Increase the text size */
}

.larger-text {
  font-size: 1.2em; /* You can use a separate class for text if needed */
}
</style>
