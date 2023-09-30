<template>
    <section class="product-category-card" :class="{ 'tall': tall == true }">
        <ion-card>
            <img :alt="category.name" :src="category.image || 'https://ionicframework.com/docs/img/demos/card-media.png'" />

            <IonCardHeader>
                <IonCardTitle class="ion-text-center">{{ category.name }}</IonCardTitle>
            </IonCardHeader>
        </ion-card>
    </section>
</template>

<script lang="ts">
import Business from '@/models/Business';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { locationOutline } from 'ionicons/icons';
import ProductCategory from '../../models/ProductCategory';

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

    components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon }
});
</script>

<style scoped lang="scss">
.product-category-card {

    ion-card {
        width: 100%;
        margin: 15px auto;
        position: relative;

        img {
            width: 100%;
            height: 120px;
            object-fit: cover;
        }

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

    &.tall {
        img {
            height: 180px;
            object-fit: cover;
        }
    }

}
</style>
