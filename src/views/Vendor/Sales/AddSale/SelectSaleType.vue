<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/vendor/sales/add-sale/select-agent"
              :icon="arrowBack"
              mode="md"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small"
            ><b>{{ $t("vendor.sales.addSale") }}</b></IonTitle
          >
          <IonButtons slot="end">
            <ion-button color="dark" style="opacity: 0">
              <IonIcon :icon="search"></IonIcon>
            </ion-button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent :fullscreen="true">
      <IonList lines="none" class="sales-select-list ion-padding-horizontal">
        <IonListHeader>
          <IonLabel class="fw-bold">{{
            $t("vendor.sales.selectSaleType")
          }}</IonLabel>
        </IonListHeader>

        <IonItem
          v-for="saleType in saleTypes"
          :key="saleType.id"
          @click="selectSaleType(saleType)"
        >
          <IonCheckbox
            :aria-label="saleType.name"
            justify="space-between"
            mode="ios"
            :value="saleType.id"
            :checked="saleStore.newSale.sale_types_id == saleType.id"
          >
            <IonLabel>
              <p class="ion-no-margin">{{ saleType.name }}</p>
            </IonLabel>
          </IonCheckbox>
        </IonItem>
      </IonList>
      <section
        class="sales-select-list ion-padding-horizontal"
        v-if="saleStore.newSale.sale_types_id == 5"
      >
        <h6>Due Date</h6>
        <DateTimeButton
          v-model="saleStore.newSale.due_date"
          :min="saleStore.newSale.sale_started_at"
        ></DateTimeButton>
        <h4 class="ion-text-end">{{ creditDays }} {{ $t("Credit Day(s)") }}</h4>
      </section>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="sale-type-continue"
        :disabled="!saleStore.newSale.sale_types_id"
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
  IonInput,
  IonText,
  IonFooter,
  IonDatetime,
} from "@ionic/vue";
import { arrowBack, close, refreshOutline, search } from "ionicons/icons";
import { defineComponent } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { mapStores } from "pinia";
import { useSaleStore } from "@/stores/SaleStore";
import { SaleType } from "@/models/SaleType";
import { useToastStore } from "@/stores/ToastStore";
import { useUserStore } from "@/stores/UserStore";
import DateTimeButton from "@/components/buttons/DateTimeButton.vue";
import { formatMySQLDateTime } from "@/utilities";

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
    IonInput,
    IonDatetime,
    DateTimeButton,
  },

  data() {
    return {
      search,
      close,
      arrowBack,
      saleTypes: [
        new SaleType({ id: 1, name: this.$t("vendor.sales.cashSale") }),
        new SaleType({ id: 5, name: this.$t("vendor.sales.creditSale") }),
      ],
    };
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore, useToastStore),

    creditDays() {
      if (!this.saleStore.newSale.due_date) {
        return 0;
      }
      const due_date = formatMySQLDateTime(this.saleStore.newSale.due_date);
      const start_date = this.saleStore.newSale.sale_started_at;

      const diffInMs =
        (new Date(due_date) as any) - (new Date(start_date) as any);

      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return Math.ceil(diffInDays);
    },
  },

  methods: {
    formatMySQLDateTime,
    handleSetDueDate() {
      if (this.creditDays < 0) {
        this.toastStore.showError("Invalid date! Select a future date");
        this.saleStore.newSale.due_date = null;
      }
    },
    selectSaleType(saleType: SaleType) {
      this.saleStore.newSale.sale_types_id = saleType.id as number;
      if (this.saleStore.newSale.sale_types_id == 1) {
        this.saleStore.newSale.due_date = null;
      }
    },

    onContinue() {
      if (!this.saleStore.newSale.sale_types_id) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.selectSaleTypeToContinue"),
          "",
          "bottom",
          "sale-type-continue"
        );
        return;
      }

      if (this.userStore.activeRole?.isSalesAssociate()) {
        this.$router.push("/agent/sales/add-sale/select-payment-mode");
      } else {
        this.$router.push("/vendor/sales/add-sale/select-payment-mode");
      }
    },

    refresh() {},
  },

  mounted() {},
});
</script>

<style scoped>
h6 {
  font-size: 14px;
  margin-top: 24px;
}
h4 {
  font-size: 12px;
  margin: 10px 0px;
}
</style>
