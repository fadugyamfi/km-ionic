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
                        <IonButton @click="showFilterSheet()" color="dark">
                            <IonIcon :icon="optionsOutline"></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonSegment value="thisweek" mode="ios" @ionChange="onSegmentChanged($event)">
                <IonSegmentButton value="today">
                    <IonLabel>
                        Today
                    </IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="thisweek">
                    <IonLabel>This Week</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="pastmonth">
                    <IonLabel>Past Month</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </IonHeader>

        <ion-content>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton size="small" @click="onAddSale()">
                    <IonIcon :icon="add"></IonIcon>
                </IonFabButton>
            </IonFab>

            <div class="ion-padding ion-text-center" v-if="fetching">
                <IonSpinner name="crescent"></IonSpinner>
            </div>

            <IonList v-else lines="full">
                <IonItem v-for="sale in saleStore.sales" :key="sale.id">
                    <IonAvatar slot="start" class="ion-align-self-start">
                        <Image :src="sale.customer?.logo"></Image>
                    </IonAvatar>
                    <IonLabel>
                        <p>
                            <IonText color="dark">{{ sale.customer?.name }}</IonText>
                        </p>
                        <p class="font-medium">
                            <IonText color="medium">
                                {{ filters.date(sale.created_at as string, 'short') }}
                            </IonText>
                            <span class="ion-margin-horizontal">|</span>
                            <IonText color="medium">
                                {{ $tc('general.products', sale.sale_items_count as number, { count: sale.sale_items_count }) }}
                            </IonText>
                        </p>
                        <p>
                            <IonChip v-if="sale.isCreditSale()" color="primary" class="font-medium">
                                {{ sale.sale_type?.name }}
                            </IonChip>
                        </p>
                    </IonLabel>
                    <IonButton slot="end" fill="clear" color="dark" class="ion-align-self-start ion-margin-top">
                        <IonIcon :icon="ellipsisHorizontal"></IonIcon>
                    </IonButton>
                </IonItem>
            </IonList>
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
import { useSaleStore } from '../../../stores/SaleStore';
import { mapStores } from 'pinia';
import { arrowBack, ellipsisHorizontal, filter, optionsOutline, search, add } from 'ionicons/icons';
import filters from '@/utilities/Filters';
import Image from '../../../components/Image.vue';

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
        IonFabButton
    },

    data() {
        return {
            search, arrowBack, ellipsisHorizontal, filter, optionsOutline, add,
            fetching: false,
            filters,
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
        showFilterSheet() {

        },

        onAddSale() {
            this.saleStore.resetForNewSale();
            this.$router.push('/vendor/sales/add-sale/select-agent')
        },

        async fetchSales() {
            this.fetching = true;
            await this.saleStore.fetchSales();
            this.fetching = false;
        },

        onSegmentChanged(event: Event) {
            console.log(event);
        }
    },

    mounted() {
        this.fetchSales();
    }
})
</script>

<style scoped>
ion-chip {
    min-height: 24px;
    padding: 2px 12px;
}
</style>
