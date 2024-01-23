<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vendor/sales/add-sale/select-agent" :icon="arrowBack" mode="md"></IonBackButton>
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
          <IonLabel class="fw-bold">{{ $t("vendor.sales.selectSaleType") }}</IonLabel>
        </IonListHeader>

        <IonItem v-for="saleType in saleTypes" :key="saleType.id" @click="selectSaleType(saleType)">
          <IonLabel>
            <p class="ion-no-margin">{{ saleType.name }}</p>
            <IonText color="medium" class="font-medium">
              {{ saleType.description }}
            </IonText>
          </IonLabel>
          <IonCheckbox :aria-label="saleType.name" slot="end" mode="ios" :value="saleType.id"
                       :checked="saleStore.newSale.sale_types_id == saleType.id"></IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton id="sale-type-continue" :disabled="!saleStore.newSale.sale_types_id" @click="onContinue()">
        {{ $t('general.continue') }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import { IonPage, IonContent, IonButton, IonToolbar, IonIcon, IonTitle, IonButtons, IonHeader, IonBackButton, IonList, IonItem, IonListHeader, IonLabel, IonAvatar, IonCheckbox, IonText, IonFooter } from '@ionic/vue';
import { arrowBack, close, refreshOutline, search } from 'ionicons/icons';
import { defineComponent } from 'vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import { SaleType } from '@/models/SaleType';
import { useToastStore } from '@/stores/ToastStore';
import { useUserStore } from '../../../../stores/UserStore';

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
    KolaYellowButton
  },

  data() {
    return {
      search, close, arrowBack,
      saleTypes: [
        new SaleType({ id: 1, name: this.$t('vendor.sales.cashSale') }),
        new SaleType({ id: 5, name: this.$t('vendor.sales.creditSale') })
      ],
    }
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore)
  },

  methods: {
    selectSaleType(saleType: SaleType) {
      this.saleStore.newSale.sale_types_id = saleType.id as number;
    },

    onContinue() {
      if (!this.saleStore.newSale.sale_types_id) {
        const toastStore = useToastStore();
        toastStore.showError(this.$t("vendor.sales.selectSaleTypeToContinue"), '', 'bottom', 'sale-type-continue');
        return;
      }

      if (this.userStore.user?.isSalesAssociate()) {
        this.$router.push('/agent/sales/add-sale/select-payment-mode');
      } else{
        this.$router.push('/vendor/sales/add-sale/select-payment-mode')
      }

    },

    refresh() { }
  },

  mounted() {

  }
})
</script>
