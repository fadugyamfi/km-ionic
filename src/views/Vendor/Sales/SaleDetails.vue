<template>
    <IonPage>
        <section class="ion-padding">
            <IonHeader class="inner-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/vendor/sales/history" :icon="arrowBack" mode="md"></IonBackButton>
                    </IonButtons>
                    <IonTitle size="small">
                        <b>{{ $t("vendor.sales.saleDetails") }} - #{{ sale?.id }}</b>
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="dark">
                            <IonIcon :icon="search"></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </section>

        <IonContent>

            <IonLabel class="ion-margin-horizontal fw-semibold font-medium">Sold To</IonLabel>
            <SaleCustomerView :customer="sale?.customer"></SaleCustomerView>
            <SaleTotalCostView :sale="sale"></SaleTotalCostView>

            <IonLabel class="ion-margin-horizontal fw-semibold font-medium">Items</IonLabel>
            <IonCard>
                <IonCardContent>
                    <section v-if="loading" class="ion-text-center ion-padding">
                        <IonSpinner name="crescent"></IonSpinner>
                    </section>

                    <section v-else>
                        <IonList lines="full" v-if="sale?.sale_items?.length as number > 0">
                            <SaleItemView v-for="item in sale?.sale_items" :key="item.products_id" :saleItem="item"
                                          :editable="false">
                            </SaleItemView>
                        </IonList>

                        <NoResults v-else :title="$t('vendor.sales.noSaleItemsAvailable')"
                                   :description="$t('vendor.sales.addItemsToSaleToSeeThemHere')"></NoResults>
                    </section>

                </IonCardContent>
            </IonCard>

            <section class="ion-padding" v-if="sale?.isCreditSale()">
                <CreditPaymentList :creditPayments="(sale.sale_payments as SalePayment[])"></CreditPaymentList>
            </section>
        </IonContent>

        <IonFooter v-if="sale?.amountOwed()" class="ion-padding ion-no-border">
            <KolaYellowButton  @click="recordRepayment(sale)">
                {{ $t('vendor.sales.recordRepayment') }}
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { Sale } from '@/models/Sale';
import { arrowBack, search } from 'ionicons/icons';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/vue';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import { handleAxiosRequestError } from '@/utilities';
import SaleCustomerView from '@/components/modules/sales/SaleCustomerView.vue';
import SaleTotalCostView from '@/components/modules/sales/SaleTotalCostView.vue';
import SaleItemView from '@/components/modules/sales/SaleItemView.vue';
import NoResults from '@/components/layout/NoResults.vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import CreditPaymentList from '@/components/modules/customers/credit/CreditPaymentList.vue';
import { SalePayment } from '@/models/SalePayment';


export default defineComponent({

    data() {
        return {
            search, arrowBack,
            loading: false,
            sale: null as Sale | null
        };
    },

    components: {
        IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
        IonTitle, IonButton, IonIcon,
        IonContent,
        SaleCustomerView,
        SaleTotalCostView,
        IonCard,
        IonCardContent,
        IonList,
        SaleItemView,
        NoResults,
        IonLabel,
        IonSpinner,
        KolaYellowButton,
        CreditPaymentList,
        IonFooter
    },

    computed: {
        ...mapStores(useSaleStore)
    },

    mounted() {
        this.loadSale();
    },

    methods: {
        async loadSale() {
            const id = +this.$route.params.id;
            this.sale = this.saleStore.sales.find(s => s.id == id) as Sale;

            try {
                this.loading = true;
                this.sale = await this.saleStore.fetchSale(id);
            } catch (error) {
                handleAxiosRequestError(error);
            } finally {
                this.loading = false;
            }
        },

        recordRepayment(sale: Sale) {
            this.$router.push(`/vendor/sales/${sale.id}/record-repayment`);
        },

    }
})
</script>
