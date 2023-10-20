<template>
    <section class="rating-and-reviews">
        <section class="rating">
            <span>{{ 1 }}</span>
            <span>⭐</span>
            <span class="reviews larger-text " v-if="showReviews">{{ business?.reviews_count || 0 }}  Reviews</span>
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
    components: { IonIcon, IonText, Business }
})
</script>

<style scoped lang="scss">
.rating-and-reviews {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.larger-text {
    font-size: 1.0em;
    color: #666EED;
}

.distance {
    color: #666EED;
}
</style>