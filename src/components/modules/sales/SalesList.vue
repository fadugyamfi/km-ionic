<template>
    <IonList lines="full">
        <IonItem v-for="(sale, index) in sales" :key="sale.id">
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
            <IonButton slot="end" fill="clear" color="dark" class="ion-align-self-start ion-margin-top"
                       @click="openMenu($event, index)">
                <IonIcon :icon="ellipsisHorizontal"></IonIcon>
            </IonButton>

            <IonPopover :event="event" :isOpen="openPopover == index" @didDismiss="openPopover = -1">
                <IonContent class="ion-no-padding">
                    <IonList lines="full" class="ion-no-padding">
                        <IonItem :button="true" @click="recordRepayment(sale)">
                            <IonLabel>{{ $t('vendor.sales.recordRepayment') }}</IonLabel>
                        </IonItem>
                        <IonItem :button="true" @click="deleteSale(sale)">
                            <IonLabel>{{ $t('general.delete') }}</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPopover>
        </IonItem>

        <DeleteSaleModal
            :isOpen="showConfirmDeleteModal"
            :sale="selectedSale"
            @dismiss="showConfirmDeleteModal = false"
            @confirm="onConfirmDelete()"
        ></DeleteSaleModal>
    </IonList>
</template>

<script lang="ts">
import {
    IonContent, IonButton,
    IonIcon, IonList,
    IonItem, IonAvatar, IonLabel, IonText, IonChip, IonPopover, IonModal
} from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { Sale } from '@/models/Sale';
import { ellipsisHorizontal } from 'ionicons/icons';
import filters from '@/utilities/Filters';
import Image from '@/components/Image.vue';
import DeleteSaleModal from './DeleteSaleModal.vue';
import { mapStores } from 'pinia';
import { useSaleStore } from '../../../stores/SaleStore';


export default defineComponent({

    props: {
        sales: {
            default: [],
            type: Array as PropType<Sale[]>
        }
    },

    components: {
        IonContent,
        IonButton,
        IonIcon,
        IonList,
        IonItem,
        IonAvatar,
        IonLabel,
        IonText,
        IonChip,
        Image,
        IonPopover,
        IonModal,
        DeleteSaleModal
    },

    data() {
        return {
            ellipsisHorizontal,
            filters,
            openPopover: -1,
            event: null as any,
            selectedSale: null as Sale | null,
            showConfirmDeleteModal: false
        }
    },

    computed: {
        ...mapStores( useSaleStore )
    },

    methods: {
        openMenu(e: Event, index = -1) {
            this.event = e;
            this.openPopover = index;
        },

        closeMenu() {
            this.openPopover = -1;
            this.event = null;
        },

        recordRepayment(sale: Sale) {
            this.closeMenu()
            this.$router.push('/vendor/sales/record-repayment');
        },

        deleteSale(sale: Sale) {
            this.selectedSale = sale;
            this.showConfirmDeleteModal = true;
            this.closeMenu();
        },

        async onConfirmDelete() {
            this.showConfirmDeleteModal = false;
            await this.saleStore.deleteSale(this.selectedSale as Sale);
        }
    }

})
</script>
