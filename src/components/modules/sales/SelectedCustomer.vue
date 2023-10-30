<template>
    <IonCard>
        <IonCardContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="auto">
                        <IonAvatar>
                            <Image :src="customer?.logo"></Image>
                        </IonAvatar>
                    </IonCol>
                    <IonCol class="d-flex ion-align-items-start ion-justify-content-center flex-column">
                        <IonLabel class="fw-semibold">{{ customer?.name }}</IonLabel>
                        <IonLabel class="d-flex ion-align-items-center">
                            <IonIcon :icon="locationOutline"></IonIcon>
                            {{ customer?.location }}
                        </IonLabel>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonCardContent>
    </IonCard>
</template>

<script lang="ts">
import { IonAvatar, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonLabel, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useSaleStore } from '@/stores/SaleStore';
import Business from '@/models/Business';
import { useUserStore } from '@/stores/UserStore';
import { handleAxiosRequestError } from '@/utilities';
import Image from '@/components/Image.vue';
import { location, locationOutline } from 'ionicons/icons';


export default defineComponent({

    data() {
        return {
            location, locationOutline,
            customer: null as Business | null
        }
    },

    computed: {
        ...mapStores(useBusinessStore, useSaleStore, useUserStore)
    },

    components: {
        IonCard,
        IonAvatar,
        IonCardContent,
        IonLabel,
        Image,
        IonGrid,
        IonRow,
        IonCol,
        IonIcon
    },

    methods: {
        async loadSelectedCustomer() {
            try {
                const customers = await this.businessStore.getBusinessCustomers(this.userStore.activeBusiness as Business, 300);
                this.customer = customers.find((c: Business) => c.id == this.saleStore.newSale.customer_id) as Business;
            } catch (error) {
                handleAxiosRequestError(error);
            }
        }
    },

    mounted() {
        this.loadSelectedCustomer();
    }
})
</script>

<style scoped>
ion-avatar {
    height: 48px;
    width: 48px;
}

ion-card-content {
    padding: 2px;
}
</style>
