<template>
    <IonCard>
        <IonCardContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="auto">
                        <ProfileAvatar class="ion-align-self-start" :image="customer?.logo"
                           :username="customer?.name" customSize="45px"></ProfileAvatar>
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
import ProfileAvatar from '../../ProfileAvatar.vue';


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
    IonIcon,
    ProfileAvatar
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
