<template>
  <IonRow>
    <IonCol size="6">
      <IonCard class="ion-no-margin best-selling-card">
        <IonCardContent class="d-flex flex-column">
          <IonText color="medium">Best Selling Item</IonText>
          <IonText color="dark" class="fw-semibold"> N/A </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
    <IonCol size="6">
      <IonCard class="ion-no-margin customers-card">
        <IonCardContent class="d-flex flex-column">
          <IonText color="medium">No. of Customers</IonText>
          <IonText color="dark" class="fw-semibold">
            <!-- {{ Filters.number(businessStore.businessSummary?.customer_count) }} -->
            N/A
          </IonText>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonIcon,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonItem,
  IonText,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { add, arrowUpOutline, optionsOutline, close } from "ionicons/icons";
import { useBusinessStore } from "../../../stores/BusinessStore";
import { useUserStore } from "../../../stores/UserStore";
import Business from "../../../models/Business";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonIcon,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonItem,
    IonText,
  },

  data() {
    return {
      add,
      optionsOutline,
      arrowUpOutline,
      close,
      showFilterSheet: false,
      //   recentSales: [] as Sale[],
      fetchingSummary: false,
    };
  },

  //   computed: {
  //     ...mapStores(useSaleStore, useBusinessStore, useUserStore),

  //     percentageOfConversion() {
  //       const orders = this.businessStore.businessSummary?.orders;
  //       return (orders?.converted_to_sales_count / orders?.total_count) * 100;
  //     },

  //     percentageComplete() {
  //       return this.businessStore.businessSummary?.targets?.percentage_complete;
  //     },
  //   },

  //   methods: {
  //     onAddSale() {
  //       this.saleStore.resetForNewSale();
  //       this.$router.push("/vendor/sales/add-sale/select-agent");
  //     },

  //     onViewSales() {
  //       this.$router.push("/vendor/sales/history");
  //     },

  //     fetchRecentSales() {
  //       this.saleStore.fetchSales({ limit: 5, sort: "latest" });
  //     },

  //     async fetchBusinessSummary() {
  //       this.fetchingSummary = true;
  //       await this.businessStore.getBusinessSummary(
  //         this.userStore.activeBusiness as Business
  //       );
  //       this.fetchingSummary = false;
  //     },
  //   },

  //   mounted() {
  //     this.fetchRecentSales();
  //     this.fetchBusinessSummary();
  //   },
});
</script>

<style scoped>
.customers-card {
  --background: #f2f7f7;
}

.best-selling-card {
  --background: #fff2ebcc;
}
</style>
