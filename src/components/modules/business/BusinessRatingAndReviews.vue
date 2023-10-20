<template>
  <section class="rating-and-reviews">
    <section class="rating">
      <span class="larger-text">{{ business?.rating || 1 }}</span>
      <span class="larger-text">⭐</span>
      <span class="reviews" v-if="showReviews" class="larger-text">{{ business?.reviews_count || 0 }} Reviews</span>
    </section>
    <section class="distance ion-align-items-center" style="display: flex;">
      <IonIcon :icon="locationOutline" class="larger-icon"></IonIcon>
      <IonText class="larger-text">{{ business?.distance || 0 }} km</IonText>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Business from '@/models/Business';
import { locationOutline } from 'ionicons/icons';
import { IonIcon, IonText } from '@ionic/vue';

export default defineComponent({
  props: {
    business: {
      type: Object as PropType<Business | null>
    },
    showReviews: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      locationOutline
    };
  },
  components: { IonIcon, IonText }
})
</script>

<style scoped lang="scss">
.rating-and-reviews {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.larger-text {
  font-size: 1.2em; /* Increase the text size */
  color: #666EED; /* Adjust text color if needed */
}

<<<<<<< HEAD




        .distance {
            color: #666EED;
        }
    }
=======
.larger-icon {
  font-size: 1.5em; /* Increase the icon size */
  color: #666EED; /* Adjust icon color if needed */
}
>>>>>>> 572a2e61817d2d99b3ece2fa5cde481e369c59d7
</style>
