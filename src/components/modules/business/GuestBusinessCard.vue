<template>
    <section class="business-card">
        <ion-card @click="viewBusiness" class="ion-no-padding ion-no-margin">
            <Image :alt="business.name" :src="business?.logo" :no-img-src="getRandomSupplierImage()" />
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
import { mapStores } from 'pinia';
import { useBusinessStore } from '../../../stores/BusinessStore';

export default defineComponent({
    props: {
        business: {
            required: true,
            type: Business
        },
    },

    data() {
        return {
            locationOutline
        };
    },

    computed: {
        ...mapStores(useBusinessStore)
    },

    methods: {
        viewBusiness() {
            this.businessStore.viewBusiness(this.business);
            this.$router.push(`/guest/home/businesses/${this.business.id}`);
        },

        getRandomSupplierImage() {
            let random = Math.floor(Math.random() * 4);
            if (random == 0) random = 1;
            return `/images/shopper/supplier-${random}.png`;
        }
    },

    components: {
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonCardTitle,
        IonCardSubtitle,
        IonIcon,
        Image,
        BusinessRatingAndReviews,
        Business
    }
});
</script>

<style scoped lang="scss">
.business-card {
    ion-card {
        width: 100%;
        height: 250px;
        min-height: 150px;


        ion-img {
            min-height: 145px;
            min-width: 100%;
        }

        ::part(image) {
            min-height: 145px;
        }

        ion-card-header {
            text-align: left;
            padding: 10px;

            ion-card-title {
                font-size: 1em;
                font-weight: 500;
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
