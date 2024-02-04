<template>
    <section class="product-category-card" :class="{ 'tall': tall === true }">
        <ion-card class="ion-activatable">
            <IonRippleEffect></IonRippleEffect>
            <Image :alt="category.name" :src="category.image" w="150" />

            <IonCardHeader>
                <IonCardTitle class="ion-text-center">{{ category.name }}</IonCardTitle>
            </IonCardHeader>
        </ion-card>
    </section>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonRippleEffect } from '@ionic/vue';
import { defineComponent } from 'vue';
import { locationOutline } from 'ionicons/icons';
import ProductCategory from '../../models/ProductCategory';
import Image from '@/components/Image.vue';

export default defineComponent({
    props: {
        category: {
            required: true,
            type: ProductCategory
        },

        tall: {
            default: false,
            type: Boolean
        }
    },

    data() {
        return {
            locationOutline
        };
    },

    components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, Image, IonRippleEffect }
});
</script>

<style scoped lang="scss">
.product-category-card {

    ion-card {
        width: 100%;
        margin: 5px auto;
        position: relative;
        overflow: hidden;
        // border: solid 1px #f4f4f4;
        // border-radius: 8px;
        // box-shadow: 1px 2px 9px #f9f9f9;

        ion-img {
            width: 100%;
            height: 120px;
            object-fit: cover;
        }

        ion-card-header {
            text-align: left;
            padding: 10px;

            ion-card-title {
                font-size: 0.9em;
                font-weight: 500;
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

    &.tall {
        ion-img {
            height: 180px;
            object-fit: cover;
        }
    }

}
</style>
