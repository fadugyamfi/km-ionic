<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vendor/sales/add-sale/select-sale-type" :icon="arrowBack" mode="md"></IonBackButton>
          </IonButtons>
          <IonTitle size="small"><b>{{ $t("vendor.sales.addSale") }}</b></IonTitle>
          <IonButtons slot="end">
            <ion-button color="dark" style="opacity: 0;">
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent :fullscreen="true">
      <IonList lines="none" class="sales-select-list ion-padding-horizontal">
        <IonListHeader>
          <IonLabel class="fw-bold">{{ $t("vendor.sales.selectPaymentMethod") }}</IonLabel>
        </IonListHeader>

        <IonItem v-for="paymentMode in paymentModes" :key="paymentMode.id" @click="selectPaymentMethod(paymentMode)">
          <IonLabel>
            <p class="ion-no-margin">{{ paymentMode.name }}</p>
            <IonText color="medium" class="font-medium">
              {{ paymentMode.description }}
            </IonText>
          </IonLabel>
          <IonCheckbox :aria-label="paymentMode.name" slot="end" mode="ios" :value="paymentMode.id" :checked="saleStore.newSale.payment_modes_id == paymentMode.id"></IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton id="continue" @click="onContinue()">
        {{ $t('general.continue') }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import { IonPage, IonContent, IonButton, IonToolbar, IonIcon, IonTitle, IonButtons, IonHeader, IonBackButton, IonList, IonItem, IonListHeader, IonLabel, IonAvatar, IonCheckbox, IonText, IonFooter, IonSpinner } from '@ionic/vue';
import { arrowBack, close, refreshOutline, search } from 'ionicons/icons';
import { defineComponent } from 'vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import { PaymentMode } from '@/models/PaymentMode';
import { useToastStore } from '@/stores/ToastStore';

export default defineComponent({

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonListHeader,
    IonLabel,
    IonAvatar,
    IonCheckbox,
    IonText,
    IonFooter,
    KolaYellowButton,
    IonSpinner
},

  data() {
    return {
      search, close, arrowBack,
      paymentModes: [
        new PaymentMode({ id: 1, name: this.$t('vendor.sales.cash') }),
        new PaymentMode({ id: 2, name: this.$t('vendor.sales.mobileMoney') }),
        new PaymentMode({ id: 3, name: this.$t('vendor.sales.cheque') })
      ],
    }
  },

  computed: {
    ...mapStores( useSaleStore )
  },

  methods: {
    selectPaymentMethod(paymentMode: PaymentMode) {
      this.saleStore.newSale.payment_modes_id = paymentMode.id as number;
    },

    onContinue() {
      if( !this.saleStore.newSale.payment_modes_id ) {
        const toastStore = useToastStore();
        toastStore.showError( this.$t("vendor.sales.selectPaymentModeToContinue"), '', 'bottom', 'continue');
        return;
      }

      this.$router.push('/vendor/sales/add-sale/select-customer')
    },

    refresh() {}
  },

  mounted() {

  }
})
</script>
