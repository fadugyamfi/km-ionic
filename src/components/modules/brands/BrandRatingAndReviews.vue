<template>
  <section class="rating-and-reviews">
      <section class="rating">
          <span>{{  1 }}</span>
          <span>⭐</span>
          <span class="reviews" v-if="showReviews">{{ 0 }} Reviews</span>
      </section>
    
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Brand from '@/models/Brand';
import { locationOutline } from 'ionicons/icons';
import { IonIcon, IonText } from '@ionic/vue';

export default defineComponent({
  props: {
      brand: {
          type: Object as PropType<Brand | null> 
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
      font-size: 0.8em;
      padding-left: 10;

      .reviews {
          margin-left: 9px;
      }

      .distance {
          color: #666EED;
      }
  }
</style>
