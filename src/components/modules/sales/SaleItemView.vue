<template>
    <IonItem>
        <section class="d-flex ion-align-items-stretch">
            <IonThumbnail :class="{ 'non-editable': !editable }">
                <Image :src="saleItem?.product?.image" w="100"></Image>
            </IonThumbnail>

            <section>
                <section class="d-flex ion-justify-content-between">

                    <section class="d-flex flex-column ion-justify-content-start">
                        <IonText class="fw-semibold font-medium">{{ saleItem?.product?.product_name || 'N/A' }}</IonText>
                        <IonText color="medium" class="font-medium">
                            <span v-if="saleItem?.product?.weight_value">{{ saleItem?.product?.weight_value || 0 }}kg</span>
                            <span v-if="saleItem?.product?.weight_value && saleItem?.product?.group_quantity"></span>
                            <span v-if="saleItem?.product?.group_quantity">{{ saleItem?.product?.group_quantity || 0 }} pieces</span>
                        </IonText>

                        <IonText color="medium" class="font-medium">
                            {{ $t('general.quantity') }}: {{ saleItem?.quantity }}
                        </IonText>

                        <IonText color="dark" class="font-medium fw-semibold">
                            {{ Filters.currency(saleItem?.total_price || 0, saleItem?.product?.currency?.symbol as string) }}
                        </IonText>
                    </section>

                    <IonButton
                        v-if="editable"
                        slot="end" fill="clear" color="dark"
                        class="ion-no-margin ion-no-padding ion-align-self-start"
                        @click="removeItem()"
                    >
                        <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
                    </IonButton>
                </section>


                <section>
                    <ProductQuantitySelector
                        v-if="editable"
                        :initial-quantity="saleItem?.quantity"
                        @change="updateItemQuantity($event)"
                    ></ProductQuantitySelector>
                </section>

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
import { OrderItem } from '@/models/OrderItem';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import Product from '@/models/Product';
import Filters from '@/utilities/Filters';


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
            type: Object as PropType<SaleItem | OrderItem>
        },

        editable: {
            default: true
        }
    },

    data() {
        return {
            closeCircleOutline,
            Filters,
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
    --inner-padding-bottom: 10px;
}

ion-thumbnail {
    min-width: 85px;
    height: 140px;
    margin-right: 10px;
    --border-radius: 8px;
}

ion-thumbnail.non-editable {
    height: 100px;
}
</style>
