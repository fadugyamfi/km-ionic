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
import { PropType, defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useSaleStore } from '@/stores/SaleStore';
import Business from '@/models/Business';
import { useUserStore } from '@/stores/UserStore';
import { handleAxiosRequestError } from '@/utilities';
import Image from '@/components/Image.vue';
import { location, locationOutline } from 'ionicons/icons';


export default defineComponent({

    props: {
        customer: {
            default: null,
            type: Object as PropType<Business | null>
        }
    },

    data() {
        return {
            location, locationOutline
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
