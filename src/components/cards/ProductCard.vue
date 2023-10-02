<template>
    <section class="product-card">
        <ion-card @click="viewProduct()">
            <img
                class="product-image"
                :alt="product.product_name"
                :src="product.image || noImage"
                @error="onError($event)"
            />

            <IonCardHeader>
                <section class="ion-padding-top" style="position: relative;">
                    <IonButton fill="clear" style="position: absolute; right: 0px; top: -15px">
                        <IonIcon slot="icon-only" :name="addCircleOutline"></IonIcon>
                    </IonButton>

                    <p class="product-title fw-semibold">
                        {{ product.product_name }}
                    </p>
                </section>

                <section class="pricing d-flex ion-justify-content-between">
                    <span>
                        {{ product.currency?.symbol }} {{ product.product_price }}
                    </span>
                    <span class="ion-text-end">
                        <span v-if="product.weight_value">{{ product.weight_value }}kg</span>
                        <span v-if="product.weight_value && product.group_quantity">/</span>
                        <span v-if="product.group_quantity">{{ product.group_quantity }}pcs</span>
                    </span>
                </section>

                <section v-if="showDescription && product.product_description" class="product-description">
                    <p class="ion-no-margin">{{ product.product_description }}</p>
                </section>
            </IonCardHeader>
        </ion-card>
    </section>
</template>

<script lang="ts">
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { locationOutline } from 'ionicons/icons';
import Product from '@/models/Product';
import { addCircleOutline } from 'ionicons/icons';

export default defineComponent({
    props: {
        product: {
            required: true,
            type: Product
        },

        tall: {
            default: false,
            type: Boolean
        },

        showDescription: {
            default: true,
            type: Boolean
        }
    },

    data() {
        return {
            locationOutline,
            addCircleOutline,
            noImage: 'https://api-staging.kola.market/uploads/1/2022-03/product-placeholder.png'
        };
    },

    components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonButton },

    methods: {
        onError(event: Event) {
            (event.target as HTMLImageElement).src = this.noImage;
        },

        viewProduct() {
            this.$router.push(`/shopper/products/${this.product.id}`);
        }
    }
});
</script>

<style scoped lang="scss">
.product-card {

    ion-card {
        width: 96%;
        margin: 10px auto;

        img.product-image {
            width: 165px;
            height: 120px;
            object-fit: cover;
        }

        ion-card-header {
            text-align: left;
            padding: 10px 10px;

            .product-title {
                font-size: 0.9em;
                font-weight: normal;
                margin-top: 0px;
                margin-bottom: 5px;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .pricing {
                font-size: 0.9em;
                font-weight: 600;
            }

            .product-description {
                font-size: 0.85em;
                margin-top: 5px;
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
