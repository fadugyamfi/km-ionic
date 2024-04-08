<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/agent/sales/add-sale/select-payment-mode"
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
            $t("vendor.sales.selectInventory")
          }}</IonLabel>
        </IonListHeader>

        <IonItem
          v-for="inventory in inventories"
          :key="inventory.id"
          @click="selectInventory(inventory)"
        >
          <IonLabel>
            <p class="ion-no-margin">{{ inventory.name }}</p>
          </IonLabel>
          <IonCheckbox
            :aria-label="inventory.name"
            slot="end"
            mode="ios"
            :value="inventory.id"
            :checked="saleStore?.newSale?.inventory_id == inventory.id"
          ></IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="payment-mode-continue"
        :disabled="!saleStore.newSale.inventory_id"
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
  IonSpinner,
} from "@ionic/vue";
import { arrowBack, close, search } from "ionicons/icons";
import { defineComponent } from "vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { mapStores } from "pinia";
import { useSaleStore } from "@/stores/SaleStore";
import Inventory from "@/models/Inventory";
import { useToastStore } from "@/stores/ToastStore";
import { useUserStore } from "@/stores/UserStore";

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
    IonSpinner,
  },

  data() {
    return {
      search,
      close,
      arrowBack,
      inventories: [
        new Inventory({ id: 1, name: this.$t("profile.stock.myStock") }),
        new Inventory({ id: 2, name: this.$t("vendor.sales.businessStock") }),
      ],
    };
  },

  ionViewDidEnter() {
    this.saleStore.newSale.sale_items = [];
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore),
  },

  methods: {
    selectInventory(inventory: Inventory) {
      this.saleStore.newSale.inventory_id = inventory.id as number;
    },

    onContinue() {
      if (!this.saleStore.newSale.inventory_id) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.selectInventoryToContinue"),
          "",
          "bottom",
          "inventory-type-continue"
        );
        return;
      }

      if (this.saleStore.newSale.inventory_id == 1) {
        this.$router.push("/agent/sales/add-sale/select-agent-products");
      } else {
        this.$router.push("/vendor/sales/add-sale/select-products");
      }
    },
  },

  mounted() {},
});
</script>
