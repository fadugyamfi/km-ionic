<template>
    <IonPage>
        <section class="ion-padding">
            <IonHeader class="ion-no-border">
                <IonHeader class="inner-header">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/vendor/sales/add-sale/select-products" :icon="arrowBack" mode="md">
                            </IonBackButton>
                        </IonButtons>
                        <IonTitle size="small"><b>{{ $t("vendor.sales.addSale") }}</b></IonTitle>
                        <IonButtons slot="end">
                            <IonButton color="dark" style="opacity: 0;">
                                <IonIcon :icon="search" color="dark"></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonCard class="ion-no-margin ion-margin-top">
                    <IonCardContent>
                        <section class="d-flex ion-justify-content-between fw-bold">
                            <IonText>{{ $t("general.totalCost") }}</IonText>
                            <IonText>
                                {{
                                    cartTotalCost?.toLocaleString('en-GB', {
                                        style: 'currency',
                                        currency: cartCurrency || 'GHS'
                                    })
                                }}
                            </IonText>
                        </section>
                    </IonCardContent>
                </IonCard>
            </IonHeader>

        </section>

        <IonContent>
            <IonCard>
                <IonCardContent>
                    <IonList lines="full">
                        <SaleItemView
                            v-for="item in saleStore.newSale.sale_items"
                            :key="item.products_id"
                            :saleItem="item"
                        >
                        </SaleItemView>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonContent>

        <IonFooter class="ion-padding ion-no-border">
            <KolaYellowButton id="configure-continue" :disabled="!cartTotalCost" @click="onContinue()">
                {{ $t('vendor.sales.recordSale') }}
            </KolaYellowButton>
        </IonFooter>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/vue';
import { arrowBack, closeCircleOutline, search } from 'ionicons/icons';
import { defineComponent } from 'vue';
import Image from '@/components/Image.vue';
import ProductQuantitySelector from '@/components/modules/products/ProductQuantitySelector.vue';
import SaleItemView from '@/components/modules/sales/SaleItemView.vue';
import { useSaleStore } from '@/stores/SaleStore';
import { mapStores } from 'pinia';
import { SaleItem } from '@/models/SaleItem';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { useToastStore } from '@/stores/ToastStore';
import { handleAxiosRequestError } from '../../../../utilities';
import { useUserStore } from '../../../../stores/UserStore';


export default defineComponent({
    data() {
        return {
            search,
            arrowBack,
            closeCircleOutline
        };
    },

    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonButton,
        IonIcon,
        IonContent,
        IonCard,
        IonCardContent,
        IonText,
        IonList,
        IonItem,
        IonThumbnail,
        Image,
        IonLabel,
        ProductQuantitySelector,
        SaleItemView,
        IonFooter,
        KolaYellowButton
    },

    computed: {
        ...mapStores(useSaleStore, useUserStore),

        cartTotalCost() {
            return this.saleStore.newSale.sale_items?.reduce((acc, saleItem: SaleItem) => acc + (saleItem.total_price || 0), 0);
        },

        cartCurrency() {
            const firstItem: SaleItem | undefined = this.saleStore.newSale.sale_items?.at(0);
            return firstItem?.product?.currency?.symbol as string;
        }
    },

    methods: {
        async onContinue() {
            if (!this.cartTotalCost) {
                const toastStore = useToastStore();
                toastStore.showError(this.$t("vendor.sales.cannotProceedWithTotalCostOfZero"), '', 'bottom', 'configure-continue');
                return;
            }

            const toastStore = useToastStore();
            toastStore.blockUI();

            try {
                const sale = await this.saleStore.recordSale();

                if( !sale ) {
                    toastStore.showError("Failed to record sale", "Error", "bottom", 'configure-continue')
                    return;
                }

                if( this.userStore.user?.isSaleAgent() ) {
                    this.$router.push('/agent/sales/add-sale/sale-confirmation')
                } else {
                    this.$router.push('/vendor/sales/add-sale/sale-confirmation')
                }
            } catch(error) {
                handleAxiosRequestError(error)
            } finally {
                toastStore.unblockUI();
            }
        }
    }
})
</script>
