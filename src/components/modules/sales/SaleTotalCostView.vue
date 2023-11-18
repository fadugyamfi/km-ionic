<template>
    <IonCard class="ion-margin-top">
        <IonCardContent>
            <section class="d-flex ion-justify-content-between fw-bold">
                <IonText>{{ $t("general.totalCost") }}</IonText>
                <IonText>
                    {{
                        sale?.total_sales_price?.toLocaleString('en-GB', {
                            style: 'currency',
                            currency: saleCurrency || 'GHS'
                        })
                    }}
                </IonText>
            </section>
            <section v-if="sale?.isCreditSale()" class="d-flex ion-justify-content-between fw-bold">
                <IonText>{{ $t("general.totalRepaid") }}</IonText>
                <IonText color="success">
                    {{
                        sale?.sale_payments_sum_amount?.toLocaleString('en-GB', {
                            style: 'currency',
                            currency: saleCurrency || 'GHS'
                        })
                    }}
                </IonText>
            </section>
            <section v-if="sale?.isCreditSale()" class="d-flex ion-justify-content-between fw-bold">
                <IonText>{{ $t("general.amountOwed") }}</IonText>
                <IonText color="danger">
                    {{
                        (sale?.totalOwed())?.toLocaleString('en-GB', {
                            style: 'currency',
                            currency: saleCurrency || 'GHS'
                        })
                    }}
                </IonText>
            </section>
        </IonCardContent>
    </IonCard>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { Sale } from '../../../models/Sale';
import { SaleItem } from '../../../models/SaleItem';
import { IonCard, IonCardContent, IonText } from '@ionic/vue';


export default defineComponent({
    props: {
        sale: {
            type: Object as PropType<Sale | null>
        }
    },
    computed: {
        saleCurrency() {
            const firstItem: SaleItem | undefined = this.sale?.sale_items?.at(0);
            return firstItem?.product?.currency?.symbol as string;
        }
    },
    components: { IonCard, IonCardContent, IonText }
})
</script>
