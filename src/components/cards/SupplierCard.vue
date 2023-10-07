<template>
    <section class="supplier-card">
        <ion-card>
            <Image :alt="supplier.name" :src="supplier.logo" />

            <IonCardHeader>
                <IonCardTitle>{{ supplier.name }}</IonCardTitle>
                <IonCardSubtitle>
                    <span v-if="supplier.min_order_amount">
                        {{ supplier.currency?.symbol }} {{ supplier.min_order_amount }} minimum
                    </span>
                    <span v-else>
                        No Order Minimums
                    </span>
                </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <BusinessRatingAndReviews :business="supplier"></BusinessRatingAndReviews>
            </IonCardContent>
        </ion-card>
    </section>
</template>

<script lang="ts">
import Business from '@/models/Business';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { locationOutline } from 'ionicons/icons';
import Image from '@/components/Image.vue';
import BusinessRatingAndReviews from '@/components/modules/business/BusinessRatingAndReviews.vue';

export default defineComponent({
    props: {
        supplier: {
            required: true,
            type: Business
        }
    },

    data() {
        return {
            locationOutline
        };
    },

    components: {
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonCardTitle,
        IonCardSubtitle,
        IonIcon,
        Image,
        BusinessRatingAndReviews
    }
});
</script>

<style scoped lang="scss">
.supplier-card {
    ion-card {
        width: 170px;
        max-height: 250px;
        // box-shadow: 0px 2px 12px #68686f14;
        // border: solid 1px #f1f1f1;
        // border-radius: 8px;

        ion-card-header {
            text-align: left;
            padding: 10px;

            ion-card-title {
                font-size: 0.9em;
                font-weight: bold;
                margin-bottom: 0px;
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            ion-card-subtitle {
                font-size: 0.8em;
                padding: 0px;
                margin: 0px;
                color: #BDBDBD;
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
}
</style>
