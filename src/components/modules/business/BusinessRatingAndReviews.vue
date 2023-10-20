<template>
    <section class="rating-and-reviews">
        <section class="rating">
            <span>{{ business?.rating || 1 }}</span>
            <span>⭐</span>
            <span class="reviews" v-if="showReviews">{{ business?.reviews_count || 0 }} Reviews</span>
        </section>
        <section class="distance ion-align-items-center" style="display: flex;">
            <IonIcon :icon="locationOutline"></IonIcon>
            <IonText>{{ business?.distance || 0 }} km</IonText>
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
        font-size: 0.8em;
        

        .reviews {
            margin-left: 8px;
            color :#666EED
        }





        .distance {
            color: #666EED;
        }
    }
</style>
