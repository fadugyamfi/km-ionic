<template>
    <IonPage>
        <section class="ion-padding">
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
        </section>
    </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { arrowBack, search } from 'ionicons/icons';
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            search,
            arrowBack
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
        IonIcon
    }
})
</script>
