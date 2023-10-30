<template>
    <IonPage>
        <IonHeader class="ion-padding ion-no-border">
            <IonHeader class="inner-header ion-margin-bottom">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/vendor/home" :icon="arrowBack" mode="md"></IonBackButton>
                    </IonButtons>
                    <IonTitle size="small"><b>{{ $t("vendor.sales.salesHistory") }}</b></IonTitle>
                    <IonButtons slot="end">
                        <IonButton @click="showFilterSheet = true" color="dark">
                            <IonIcon :icon="optionsOutline"></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonSegment value="thisweek" mode="ios" @ionChange="onSegmentChanged($event)">
                <IonSegmentButton value="today">
                    <IonLabel>
                        {{ $t('general.today') }}
                    </IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="thisweek">
                    <IonLabel>{{ $t('general.thisWeek') }}</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="pastmonth">
                    <IonLabel>{{ $t('general.pastMonth') }}</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </IonHeader>

        <ion-content>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton size="small" @click="onAddSale()">
                    <IonIcon :icon="add"></IonIcon>
                </IonFabButton>
            </IonFab>

            <div class="ion-padding ion-text-center" v-show="fetching">
                <IonSpinner name="crescent"></IonSpinner>
            </div>

            <section v-show="!fetching">
                <NoResults v-if="saleStore.sales?.length == 0"></NoResults>

                <SalesList :sales="saleStore.sales"></SalesList>
            </section>

            <FilterSalesSheet
                :isOpen="showFilterSheet"
                @didDismiss="showFilterSheet = false"
                @update="onFilterUpdate($event)"
            ></FilterSalesSheet>
        </ion-content>
    </IonPage>
</template>

<script lang="ts">
import {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonHeader,
    IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon, IonList,
    IonItem, IonSpinner, IonAvatar, IonLabel, IonText, IonChip, IonSegment, IonSegmentButton, IonFab, IonFabButton
} from '@ionic/vue';
import ShopperHeader from '@/components/layout/ShopperHeader.vue';
import { defineComponent } from 'vue';
import { useSaleStore } from '@/stores/SaleStore';
import { mapStores } from 'pinia';
import { arrowBack, ellipsisHorizontal, filter, optionsOutline, search, add } from 'ionicons/icons';
import filters from '@/utilities/Filters';
import Image from '@/components/Image.vue';
import { formatMySQLDateTime } from '@/utilities';
import NoResults from '@/components/layout/NoResults.vue';
import SalesList from '../../../components/modules/sales/SalesList.vue';
import FilterSalesSheet from '../../../components/modules/sales/FilterSalesSheet.vue';

export default defineComponent({

    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        ShopperHeader,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonIcon,
        IonList,
        IonItem,
        IonSpinner,
        IonAvatar,
        IonLabel,
        IonText,
        IonChip,
        IonSegment,
        IonSegmentButton,
        Image,
        IonFab,
        IonFabButton,
        NoResults,
        SalesList,
        FilterSalesSheet
    },

    data() {
        return {
            search, arrowBack, ellipsisHorizontal, filter, optionsOutline, add,
            fetching: false,
            filters,
            showFilterSheet: false,
            searchFilters: {
                start_dt: '',
                end_dt: ''
            }
        }
    },

    computed: {
        ...mapStores(useSaleStore)
    },

    methods: {
        onAddSale() {
            this.saleStore.resetForNewSale();
            this.$router.push('/vendor/sales/add-sale/select-agent')
        },

        async fetchSales() {
            try {
                this.fetching = true;
                await this.saleStore.fetchSales(this.searchFilters);
            } catch(error) {
                console.log(error);
            } finally {
                this.fetching = false;
            }
        },

        onSegmentChanged(event: CustomEvent) {
            let start_dt = new Date();
            let end_dt = new Date();
            const option = event.detail.value;

            switch (option) {
                case 'pastmonth':
                    start_dt.setMonth(start_dt.getMonth() - 1);
                    break;

                case 'today':
                    start_dt.setDate(start_dt.getDate() - 1);
                    break;

                case 'thisweek':
                    start_dt.setDate(start_dt.getDate() - 7);
                    break;
            }

            this.searchFilters.start_dt = formatMySQLDateTime(start_dt.toISOString());
            this.searchFilters.end_dt = formatMySQLDateTime(end_dt.toISOString());

            this.fetchSales();
        },

        onFilterUpdate(event: { start_dt: string, end_dt: string }) {
            this.searchFilters.start_dt = event.start_dt;
            this.searchFilters.end_dt = event.end_dt || formatMySQLDateTime(new Date().toISOString());
            this.fetchSales();
        }
    },

    mounted() {
        this.onSegmentChanged(new CustomEvent('load', { detail: { value: 'thisweek' } }));
    }
})
</script>

<style scoped>
ion-chip {
    min-height: 24px;
    padding: 2px 12px;
}
</style>
