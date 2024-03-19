<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/vendor/sales/add-sale/select-payment-mode"
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
            $t("vendor.sales.selectInventories")
          }}</IonLabel>
        </IonListHeader>

        <IonItem
          v-for="inventoryType in inventoryTypes"
          :key="inventoryType.id"
          @click="selectInventoryType(inventoryType)"
        >
          <IonLabel>
            <p class="ion-no-margin">{{ inventoryType.name }}</p>
            <IonText color="medium" class="font-medium">
              {{ inventoryType.description }}
            </IonText>
          </IonLabel>
          <IonCheckbox
            :aria-label="inventoryType.name"
            slot="end"
            mode="ios"
            :value="inventoryType.id"
            :checked="saleStore.newSale.inventory_type_id == inventoryType.id"
          ></IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton
        id="payment-mode-continue"
        :disabled="!saleStore.newSale.inventory_type_id"
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
import { InventoryType } from "@/models/InventoryType";
import { useToastStore } from "@/stores/ToastStore";
import { useUserStore } from "../../../../stores/UserStore";

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
      inventoryTypes: [
        new InventoryType({ id: 1, name: this.$t("vendor.sales.myStock") }),
        new InventoryType({
          id: 2,
          name: this.$t("vendor.sales.businessStock"),
        }),
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
    selectInventoryType(inventoryType: InventoryType) {
      this.saleStore.newSale.inventory_type_id = inventoryType.id as number;
    },

    onContinue() {
      if (!this.saleStore.newSale.inventory_type_id) {
        const toastStore = useToastStore();
        toastStore.showError(
          this.$t("vendor.sales.selectInventoryTypeToContinue"),
          "",
          "bottom",
          "inventory-type-continue"
        );
        return;
      }

      if (this.saleStore.newSale.inventory_type_id === 1) {
        this.$router.push("/agent/sales/add-sale/select-agent-products");
      } else {
        this.$router.push("/vendor/sales/add-sale/select-products");
      }
    },

    refresh() {},
  },

  mounted() {},
});
</script>
