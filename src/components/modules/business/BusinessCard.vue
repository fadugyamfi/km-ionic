<template>
    <section class="business-card">
        <ion-card class="ion-no-padding ion-no-margin">
            <Image :alt="business.name" :src="business.logo" />

            <IonCardHeader>
                <IonCardTitle>{{ business.name }}</IonCardTitle>
                <IonCardSubtitle>
                    <span v-if="business.min_order_amount">
                        {{ business.currency?.symbol }} {{ business.min_order_amount }} minimum
                    </span>
                    <span v-else>
                        No Order Minimums
                    </span>
                </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <BusinessRatingAndReviews :business="business" :show-reviews="false"></BusinessRatingAndReviews>
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
        business: {
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
.business-card {
    ion-card {
        width: 100%;
        height: 250px;
        min-height: 150px;

        ion-card-header {
            text-align: left;
            padding: 10px;

            ion-card-title {
                font-size: 1em;
                font-weight: bold;
                margin-bottom: 0px;
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            ion-card-subtitle {
                font-size: 0.9em;
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
