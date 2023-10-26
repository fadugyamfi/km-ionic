<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vendor/sales" :icon="arrowBack" mode="md"></IonBackButton>
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
          <IonLabel class="fw-bold">{{ $t("vendor.sales.selectSaleAgent") }}</IonLabel>
        </IonListHeader>

        <IonItem v-for="agent in agents" :key="agent.id" @click="selectAgent(agent)">
          <IonAvatar slot="start">
            <Image :src="agent.image"></Image>
          </IonAvatar>
          <IonLabel>
            <p class="ion-no-margin">{{ agent.name }}</p>
            <IonText color="medium" class="font-medium">
              {{ agent.role?.name || $t('vendor.sales.saleAgent') }}
            </IonText>
          </IonLabel>
          <IonCheckbox
            :aria-label="agent.name"
            slot="end"
            mode="ios"
            :value="agent.id"
            :checked="saleStore.newSale.cms_users_id == agent.id"
          ></IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton id="agent-continue" @click="onContinue()">
        {{ $t('general.continue') }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import { IonPage, IonContent, IonButton, IonToolbar, IonIcon, IonTitle, IonButtons, IonHeader, IonBackButton, IonList, IonItem, IonListHeader, IonLabel, IonAvatar, IonCheckbox, IonText, IonFooter, IonImg, IonSpinner, RefresherCustomEvent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { arrowBack, close, refreshOutline, search } from 'ionicons/icons';
import { defineComponent } from 'vue';
import User from '@/models/User';
import axios from 'axios';
import { useUserStore } from '@/stores/UserStore';
import { handleAxiosRequestError } from '@/utilities';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import { mapStores } from 'pinia';
import { useSaleStore } from '@/stores/SaleStore';
import { useToastStore } from '@/stores/ToastStore';
import Image from '@/components/Image.vue';
import { useBusinessStore } from '../../../stores/BusinessStore';
import Business from '../../../models/Business';

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
      agents: [] as User[],
    }
  },

  computed: {
    ...mapStores( useUserStore, useSaleStore, useBusinessStore )
  },

  methods: {
    async handleRefresh(event: RefresherCustomEvent) {
      this.refreshing = true;
      await this.fetchSaleAgents();
      this.refreshing = false;
      event.target.complete();
    },

    async fetchSaleAgents() {
      this.fetching = true;

      try {
        this.agents = await this.businessStore.getBusinessSaleAgents(this.userStore.activeBusiness as Business, 200, this.refreshing)
      } catch(error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },

    selectAgent(agent: User) {
      this.saleStore.newSale.cms_users_id = agent.id as number;
    },

    onContinue() {
      if( !this.saleStore.newSale.cms_users_id ) {
        const toastStore = useToastStore();
        toastStore.showError( this.$t("vendor.sales.selectAgentToContinue"), '', 'bottom', 'agent-continue');
        return;
      }

      this.$router.push('/vendor/sales/add-sale/select-sale-type')
    },

    refresh() {}
  },

  mounted() {
    this.fetchSaleAgents();
  }
})
</script>
