<template>
    <IonItem>
        <section class="d-flex ion-align-items-stretch">
            <IonThumbnail>
                <Image :src="orderItem?.product?.image" w="150"></Image>
            </IonThumbnail>
            <section>
                <section class="d-flex ion-justify-content-between">

                    <section class="d-flex flex-column ion-justify-content-start">
                        <IonText class="fw-semibold">{{ orderItem?.product?.product_name || 'N/A' }}</IonText>
                        <IonText color="medium" class="font-medium">
                            {{ Filters.currency(orderItem?.product?.product_price || 0, orderItem?.product?.currency?.symbol as string) }}
                        </IonText>
                        <IonText color="medium" class="font-medium">
                            {{ $t('general.quantity') }}: {{ orderItem?.quantity }}
                        </IonText>
                        <IonText color="medium" class="font-medium">
                            <span v-if="orderItem?.product?.weight_value">
                                {{ orderItem?.product?.weight_value || 0 }}kg
                            </span>
                            <span v-if="orderItem?.product?.weight_value && orderItem?.product?.group_quantity"></span>
                            <span v-if="orderItem?.product?.group_quantity">
                                {{ orderItem?.product?.group_quantity || 0 }} pieces
                            </span>
                        </IonText>
                    </section>

                    <IonButton slot="end" fill="clear" color="dark"
                               class="ion-no-margin ion-no-padding ion-align-self-start" @click="removeItem()">
                        <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
                    </IonButton>
                </section>

                <ProductQuantitySelector  :initial-quantity="orderItem?.quantity" @change="updateItemQuantity($event)">
                </ProductQuantitySelector>
            </section>

        </section>

    </IonItem>
</template>

<script lang="ts">
import { IonButton, IonIcon, IonItem, IonText, IonThumbnail } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import ProductQuantitySelector from '../products/ProductQuantitySelector.vue';
import { closeCircleOutline } from 'ionicons/icons';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import Product from '@/models/Product';
import { OrderItem } from '@/models/OrderItem';
import Filters from '../../../utilities/Filters';


export default defineComponent({

    components: {
        IonItem,
        IonThumbnail,
        IonText,
        ProductQuantitySelector,
        IonButton,
        IonIcon,
        Image
    },

    props: {
        orderItem: {
            type: Object as PropType<OrderItem>
        },
        product: {
            type: Object as PropType<Product>
        }
    },

    data() {
        return {
            closeCircleOutline,
            Filters
        }
    },

    computed: {
        ...mapStores(useSaleStore)
    },

    methods: {
        updateItemQuantity(quantity: number) {
            this.orderItem?.update({
                quantity,
                total_price: quantity * (this.orderItem?.product?.product_price || 0)
            });
        },

        removeItem() {
            this.saleStore.removeProductFromSale(this.orderItem?.product as Product);
        }
    }
})
</script>

<style scoped>
ion-item {
    --inner-padding-start: 0px;
    --inner-padding-end: 0px;
    --padding-start: 0px;
    margin-bottom: 10px;
}

ion-thumbnail {
    min-width: 85px;
    height: 140px;
    margin-right: 10px;
    --border-radius: 8px;
}
</style>
