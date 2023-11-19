<template>
  <IonCard class="ion-no-margin">
    <IonCardContent class="ion-no-padding">
      <IonItem lines="none">
        <ProfileAvatar slot="start"></ProfileAvatar>
        <IonLabel>
          <h6>
            <IonText color="medium">Performance</IonText>
          </h6>
          <p>
            <IonText color="dark" class="fw-semibold"
              >You have met 12
              <!-- {{ percentageComplete }}  -->
              % of your target
            </IonText>
          </p>
        </IonLabel>
      </IonItem>
      <section class="ion-margin-horizontal ion-margin-bottom">
        <IonProgressBar :value="12 / 100" color="warning"></IonProgressBar>
      </section>
    </IonCardContent>
  </IonCard>
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
  IonProgressBar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { add, arrowUpOutline, optionsOutline, close } from "ionicons/icons";
import { useBusinessStore } from "../../../stores/BusinessStore";
import { useUserStore } from "../../../stores/UserStore";
import Business from "../../../models/Business";
import ProfileAvatar from "../../../components/ProfileAvatar.vue";

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
    IonProgressBar,
    ProfileAvatar
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

<style scoped></style>
