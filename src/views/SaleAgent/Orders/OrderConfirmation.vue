<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/agent/orders"
              :icon="arrowBack"
              mode="md"
            ></IonBackButton>
          </IonButtons>
          <IonTitle size="small" v-if="$route.fullPath.includes('request')"
            ><b>Request Confirmation</b></IonTitle
          >
          <IonTitle size="small" v-else
            ><b>{{ $t("vendor.orders.orderConfirmation") }}</b></IonTitle
          >
          <!-- <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon :icon="search"></IonIcon>
            </IonButton>
          </IonButtons> -->
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent>
      <IonCard class="ion-no-border">
        <IonCardContent>
          <section class="ion-padding ion-text-center">
            <IonImg
              :src="'/images/vendor/sale-confirmation-smiley.svg'"
            ></IonImg>
            <IonLabel
              class="fw-bold"
              v-if="$route.fullPath.includes('request')"
            >
              Request has been recorded successfully!
            </IonLabel>
            <IonLabel class="fw-bold" v-else>
              {{ $t("vendor.orders.orderHasBeenPlaced") }}
            </IonLabel>
          </section>

          <KolaYellowButton
            @click="onAddNewOrder()"
            v-if="$route.fullPath.includes('request')"
          >
            Record new request
          </KolaYellowButton>
          <KolaYellowButton @click="onAddNewOrder()" v-else>
            {{ $t("shopper.cart.placeNewOrder") }}
          </KolaYellowButton>

          <KolaWhiteButton @click="onDone()">
            {{ $t("vendor.sales.done") }}
          </KolaWhiteButton>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { arrowBack, search } from "ionicons/icons";
import { defineComponent } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { mapStores } from "pinia";
import { useSaleStore } from "@/stores/SaleStore";
import { useUserStore } from "@/stores/UserStore";
import { useOrderStore } from "@/stores/OrderStore";

export default defineComponent({
  data() {
    return {
      arrowBack,
      search,
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
    IonIcon,
    IonContent,
    IonCard,
    IonCardContent,
    IonImg,
    KolaYellowButton,
    KolaWhiteButton,
    IonLabel,
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore, useOrderStore),
  },

  methods: {
    onAddNewOrder() {
      this.orderStore.resetForNewOrder();
      if (this.userStore.user?.isSalesAssociate()) {
        this.$router.replace("/agent/orders/place-order/select-customer");
      } else if (this.$route.fullPath.includes("request")) {
        this.$router.replace("/agent/request/place-request/select-customer");
      } else {
        this.$router.replace("/vendor/orders/record-order/select-agent");
      }
    },

    onDone() {
      this.orderStore.resetForNewOrder();
      if (this.userStore.user?.isSalesAssociate()) {
        this.$router.replace("/agent/orders");
      } else if (this.$route.fullPath.includes("request")) {
        this.$router.replace("/agent/request");
      } else {
        this.$router.replace("/vendor/orders");
      }
    },
  },
});
</script>

<style scoped>
ion-card {
  box-shadow: none;
  border: none;
}

ion-card-content {
  background-image: url("/images/vendor/sale-confirmation-bg.png");
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
}

ion-img {
  height: 150px;
  margin-top: 100px;
}
</style>
