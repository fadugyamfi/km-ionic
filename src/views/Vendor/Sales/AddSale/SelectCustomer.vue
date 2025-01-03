<template>
  <IonPage>
    <section class="ion-padding" style="padding-bottom: 0.35em">
      <IonHeader classs="ion-no-border" style="box-shadow: none">
        <IonHeader class="inner-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref="/vendor/sales/add-sale/select-payment-mode"
                :icon="arrowBack"
                mode="md"
              >
              </IonBackButton>
            </IonButtons>
            <IonTitle size="small"
              ><b>{{ $t("vendor.sales.addSale") }}</b></IonTitle
            >
            <IonButtons slot="end">
              <ion-button @click="searchEnabled = !searchEnabled" color="dark">
                <IonIcon :icon="search"></IonIcon>
              </ion-button>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonToolbar v-if="searchEnabled">
          <IonSearchbar
            :placeholder="$t('vendor.sales.searchCustomers') + '...'"
            class="search-input"
            @keyup.enter="onSearch($event)"
            @ion-change="onSearch($event)"
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent>
      <IonRefresher
        ref="refresher"
        slot="fixed"
        @ionRefresh="handleRefresh($event)"
      >
        <IonRefresherContent pullingIcon="crescent"></IonRefresherContent>
      </IonRefresher>

      <div class="ion-text-center ion-padding" v-if="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <section v-else>
        <NoResults
          v-if="customers.length == 0"
          title="No Customers Assigned"
          description="Please create / assign customers to populate this list"
        ></NoResults>

        <IonList
          v-else
          lines="none"
          class="ion-padding-horizontal sales-select-list simple"
        >
          <IonListHeader>
            <IonLabel class="fw-bold">{{
              $t("vendor.sales.selectCustomer")
            }}</IonLabel>
          </IonListHeader>

          <IonItem
            v-for="customer in customers"
            :key="customer.id"
            @click="selectCustomer(customer)"
          >
            <ProfileAvatar
              slot="start"
              :image="customer?.logo"
              :username="customer?.name"
              customSize="40px"
            ></ProfileAvatar>

            <IonCheckbox
              :aria-label="customer.name"
              justify="space-between"
              mode="ios"
              :value="customer.id"
              :checked="saleStore.newSale.customer_id == customer.id"
            >
              <IonLabel>
                <p class="ion-no-margin">{{ customer.name }}</p>
                <IonText color="medium" class="font-medium">
                  {{ customer.location || "Location Unknown" }}
                </IonText>
              </IonLabel>
            </IonCheckbox>
          </IonItem>
        </IonList>
      </section>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="customer-continue"
        :disabled="!saleStore.newSale.customer_id"
        @click="onContinue()"
      >
        {{ $t("general.continue") }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonButtons,
  IonHeader,
  IonBackButton,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
  IonAvatar,
  IonCheckbox,
  IonText,
  IonFooter,
  IonImg,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  IonSearchbar,
} from "@ionic/vue";
import { arrowBack, close, refreshOutline, search } from "ionicons/icons";
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import { useSaleStore } from "@/stores/SaleStore";
import { useBusinessStore } from "@/stores/BusinessStore";
import { useToastStore } from "@/stores/ToastStore";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import Image from "@/components/Image.vue";
import Business from "@/models/Business";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import NoResults from "@/components/layout/NoResults.vue";

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
    IonRefresherContent,
    IonSearchbar,
    ProfileAvatar,
    NoResults,
  },

  data() {
    return {
      search,
      close,
      arrowBack,
      fetching: false,
      refreshing: false,
      searchEnabled: true,
      customers: [] as Business[],
    };
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore),
  },

  methods: {
    async handleRefresh(event: RefresherCustomEvent) {
      this.refreshing = true;
      await this.fetchCustomers();
      this.refreshing = false;
      event.target.complete();
    },

    async fetchCustomers(options = {}) {
      this.fetching = true;
      const userStore = useUserStore();
      const businessStore = useBusinessStore();

      if (this.userStore.activeRole?.isSalesAssociate()) {
        this.customers = await userStore.fetchAssignedBusinesses(
          userStore.user?.id,
          options,
          this.refreshing
        );
      } else {
        this.customers = await businessStore.getBusinessCustomers(
          userStore.activeBusiness as Business,
          300,
          options,
          this.refreshing
        );
      }

      this.fetching = false;
    },

    selectCustomer(customer: Business) {
      this.saleStore.newSale.customer_id = customer.id as number;
      this.saleStore.selectedCustomer = customer;
    },

    onContinue() {
      if (!this.saleStore.newSale.customer_id) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.selectCustomerToContinue"),
          "",
          "bottom",
          "customer-continue"
        );
        return;
      }

      if (this.userStore.activeRole?.isSalesAssociate()) {
        this.$router.push("/agent/sales/add-sale/select-sale-type");
      } else {
        this.$router.push("/vendor/sales/add-sale/select-products");
      }
    },

    async onSearch(event: Event) {
      this.refreshing = true;
      await this.fetchCustomers({
        name_like: (event.target as HTMLIonSearchbarElement).value,
      });
      this.refreshing = false;
    },
  },

  mounted() {
    this.fetchCustomers();
  },
});
</script>
