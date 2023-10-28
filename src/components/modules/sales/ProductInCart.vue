<template>
    <IonItem>


        <section class="d-flex ion-align-items-stretch">
            <IonThumbnail>
                <Image :src="saleItem?.product?.image"></Image>
            </IonThumbnail>

            <section>
                <section class="d-flex ion-justify-content-between">

                    <section class="d-flex flex-column ion-justify-content-start">
                        <IonText class="fw-semibold">{{ saleItem?.product?.product_name || 'N/A' }}</IonText>
                        <IonText color="medium" class="font-medium">
                            {{ saleItem?.product?.currency?.symbol }} {{ saleItem?.product?.product_price || 0 }}
                        </IonText>
                        <IonText color="medium" class="font-medium">
                            {{ $t('general.quantity') }}: {{ saleItem?.quantity }}
                        </IonText>
                        <IonText color="medium" class="font-medium">
                            <span v-if="saleItem?.product?.weight_value">{{ saleItem?.product?.weight_value || 0 }}kg</span>
                            <span v-if="saleItem?.product?.weight_value && saleItem?.product?.group_quantity"></span>
                            <span v-if="saleItem?.product?.group_quantity">{{ saleItem?.product?.group_quantity || 0 }} pieces</span>
                        </IonText>
                    </section>

                    <IonButton slot="end" fill="clear" color="dark"
                               class="ion-no-margin ion-no-padding ion-align-self-start"
                               @click="removeItem()">
                        <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
                    </IonButton>
                </section>


                <ProductQuantitySelector
                    :initial-quantity="saleItem?.quantity"
                    @change="updateItemQuantity($event)"
                ></ProductQuantitySelector>
            </section>

        </section>

    </IonItem>
</template>

<script lang="ts">
import { IonButton, IonIcon, IonItem, IonText, IonThumbnail } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import ProductQuantitySelector from '../products/ProductQuantitySelector.vue';
import { closeCircleOutline } from 'ionicons/icons';
import Image from '@/components/Image.vue';
import { SaleItem } from '@/models/SaleItem';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import Product from '@/models/Product';


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
        saleItem: {
            type: Object as PropType<SaleItem>
        }
    },

    data() {
        return {
            closeCircleOutline
        }
    },

    computed: {
        ...mapStores( useSaleStore )
    },

    methods: {
        updateItemQuantity(quantity: number) {
            this.saleItem?.update({
                quantity,
                total_price: quantity * (this.saleItem?.product?.product_price || 0)
            });
        },

        removeItem() {
            this.saleStore.removeProductFromSale(this.saleItem?.product as Product);
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
