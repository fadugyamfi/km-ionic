<template>
    <section class="supplier-card">
        <ion-card>
            <img :alt="supplier.name"
            :src="supplier.logo || 'https://ionicframework.com/docs/img/demos/card-media.png'" />

            <IonCardHeader>
                <IonCardTitle>{{ supplier.name }}</IonCardTitle>
                <IonCardSubtitle>
                    {{ supplier.currency?.symbol }} {{ supplier.min_order_amount || 0 }} minimum
                </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <section class="rating">
                    <span>5</span>
                    <span>⭐</span>
                    <span class="reviews">({{ supplier.reviews_count }})</span>
                </section>
                <section class="distance">
                    <IonIcon :icon="locationOutline"></IonIcon>
                    50km
                </section>
            </IonCardContent>
        </ion-card>
    </section>
</template>

<script lang="ts">
import Business from '@/models/Business';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { locationOutline } from 'ionicons/icons';

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

    components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon }
});
</script>

<style scoped lang="scss">
.supplier-card {
    ion-card {
        max-width: 165px;
        max-height: 180px;

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
                font-size: 0.8em;
                padding: 0px;
                margin: 0px;
                color: #BDBDBD;
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        ion-card-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.8em;

            .distance {
                color: #666EED;
            }
        }
    }
}
</style>
