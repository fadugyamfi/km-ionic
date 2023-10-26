<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vendor/sales/add-sale/select-payment-mode" :icon="arrowBack" mode="md">
            </IonBackButton>
          </IonButtons>
          <IonTitle size="small"><b>{{ $t("vendor.sales.addSale") }}</b></IonTitle>
          <IonButtons slot="end">
            <ion-button @click="refresh()" color="dark">
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent :fullscreen="true">
      <IonRefresher ref="refresher" slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent pullingIcon="crescent"></IonRefresherContent>
      </IonRefresher>

      <div class="ion-text-center ion-padding" v-if="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <IonList v-if="!fetching" lines="none" class="ion-padding-horizontal sales-select-list simple">
        <IonListHeader>
          <IonLabel class="fw-bold">{{ $t("vendor.sales.selectCustomer") }}</IonLabel>
        </IonListHeader>

        <IonItem v-for="customer in customers" :key="customer.id" @click="selectCustomer(customer)">
          <IonAvatar slot="start">
            <Image :src="customer.logo"></Image>
          </IonAvatar>
          <IonLabel>
            <p class="ion-no-margin">{{ customer.name }}</p>
            <IonText color="medium" class="font-medium">
              {{ customer.location || 'Location Unknown' }}
            </IonText>
          </IonLabel>
          <IonCheckbox :aria-label="customer.name" slot="end" mode="ios" :value="customer.id"
                       :checked="saleStore.newSale.customer_id == customer.id"></IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton id="customer-continue" @click="onContinue()">
        {{ $t('general.continue') }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import { IonPage, IonContent, IonButton, IonToolbar, IonIcon, IonTitle, IonButtons, IonHeader, IonBackButton, IonList, IonItem, IonListHeader, IonLabel, IonAvatar, IonCheckbox, IonText, IonFooter, IonImg, IonSpinner, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/vue';
import { arrowBack, close, refreshOutline, search } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import { useToastStore } from '@/stores/ToastStore';
import Image from '@/components/Image.vue';
import Business from '@/models/Business';
import { useBusinessStore } from '../../../stores/BusinessStore';

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
    IonImg,
    Image,
    IonSpinner,
    IonRefresher,
    IonRefresherContent
},

  data() {
    return {
      search, close, arrowBack,
      fetching: false,
      refreshing: false,
      customers: [] as Business[],
    }
  },

  computed: {
    ...mapStores(useSaleStore)
  },

  methods: {
    async handleRefresh(event: RefresherCustomEvent) {
      this.refreshing = true;
      await this.fetchCustomers();
      this.refreshing = false;
      event.target.complete();
    },

    async fetchCustomers() {
      this.fetching = true;
      const userStore = useUserStore();
      const businessStore = useBusinessStore();

      this.customers = await businessStore.getBusinessCustomers(userStore.activeBusiness as Business, 300, this.refreshing);

      this.fetching = false;
    },

    selectCustomer(customer: Business) {
      this.saleStore.newSale.customer_id = customer.id as number;
    },

    onContinue() {
      if (!this.saleStore.newSale.customer_id) {
        const toastStore = useToastStore();
        toastStore.showError(this.$t("vendor.sales.selectCustomerToContinue"), '', 'bottom', 'customer-continue');
        return;
      }

      this.$router.push('/vendor/sales/add-sale/select-products')
    },

    refresh() { }
  },

  mounted() {
    this.fetchCustomers();
  }
})
</script>
