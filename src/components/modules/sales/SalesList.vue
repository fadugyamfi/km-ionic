<template>
  <IonList lines="full">
    <IonItem
      :button="true"
      v-for="(sale, index) in sales"
      :key="sale.id"
      @click="viewDetails(sale)"
    >
      <ProfileAvatar
        slot="start"
        class="ion-align-self-start"
        :image="sale.customer?.logo"
        :username="sale.customer?.name"
        customSize="45px"
      ></ProfileAvatar>

      <IonLabel>
        <p class="fw-semibold">
          <IonText color="dark">{{ sale.customer?.name }}</IonText>
        </p>
        <p class="font-medium">
          <IonText color="dark">
            {{ filters.currency(sale.total_sales_price as number) }}
          </IonText>

          <span style="margin: 0px 0.7em">|</span>
          <IonText color="dark">
            {{
              $tc("general.products", sale.sale_items_count as number, {
                count: sale.sale_items_count,
              })
            }}
          </IonText>
        </p>

        <p class="font-medium">
          <IonText color="medium">
            {{ filters.datetime(sale?.sale_started_at as string, "short") }}
          </IonText>
        </p>

        <p v-if="sale.isCreditSale()">
          <IonChip color="primary" class="font-medium">
            {{ sale.sale_type?.name }}
          </IonChip>

          <IonChip
            v-if="!sale.amountOwed()"
            color="success"
            class="font-medium"
          >
            {{ "Paid" }}
          </IonChip>

          <IonChip v-else color="danger" class="font-medium">
            {{ "Owing" }}
          </IonChip>
        </p>
      </IonLabel>
      <IonButton
        slot="end"
        fill="clear"
        color="dark"
        class="ion-align-self-start ion-margin-top"
        @click.stop="openMenu($event, index)"
      >
        <IonIcon :icon="ellipsisHorizontal"></IonIcon>
      </IonButton>

      <IonPopover
        :event="event"
        :isOpen="openPopover == index"
        @didDismiss="openPopover = -1"
      >
        <IonContent class="ion-no-padding">
          <IonList lines="full" class="ion-no-padding">
            <IonItem
              v-if="sale.amountOwed()"
              :button="true"
              @click="recordRepayment(sale)"
            >
              <IonLabel>{{ $t("vendor.sales.recordRepayment") }}</IonLabel>
            </IonItem>
            <IonItem :button="true" @click="deleteSale(sale)">
              <IonLabel>{{ $t("general.delete") }}</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </IonItem>

    <DeleteSaleModal
      :isOpen="showConfirmDeleteModal"
      :sale="selectedSale"
      @dismiss="showConfirmDeleteModal = false"
      @confirm="onConfirmDelete()"
    ></DeleteSaleModal>
  </IonList>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
  IonChip,
  IonPopover,
  IonModal,
} from "@ionic/vue";
import { PropType, defineComponent } from "vue";
import { Sale } from "@/models/Sale";
import { ellipsisHorizontal } from "ionicons/icons";
import filters from "@/utilities/Filters";
import Image from "@/components/Image.vue";
import DeleteSaleModal from "./DeleteSaleModal.vue";
import { mapStores } from "pinia";
import { useSaleStore } from "@/stores/SaleStore";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import { useUserStore } from "@/stores/UserStore";

export default defineComponent({
  props: {
    sales: {
      default: [],
      type: Array as PropType<Sale[]>,
    },
  },

  components: {
    IonContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonText,
    IonChip,
    Image,
    IonPopover,
    IonModal,
    DeleteSaleModal,
    ProfileAvatar,
  },

  data() {
    return {
      ellipsisHorizontal,
      filters,
      openPopover: -1,
      event: null as any,
      selectedSale: null as Sale | null,
      showConfirmDeleteModal: false,
    };
  },

  computed: {
    ...mapStores(useSaleStore, useUserStore),
  },

  methods: {
    openMenu(e: Event, index = -1) {
      this.event = e;
      this.openPopover = index;
    },

    closeMenu() {
      this.openPopover = -1;
      this.event = null;
    },

    recordRepayment(sale: Sale) {
      this.closeMenu();
      if (this.userStore.activeRole?.isSalesAssociate()) {
        this.$router.push(`/agent/sales/${sale.id}/record-repayment`);
      } else this.$router.push(`/vendor/sales/${sale.id}/record-repayment`);
    },

    deleteSale(sale: Sale) {
      this.selectedSale = sale;
      this.showConfirmDeleteModal = true;
      this.closeMenu();
    },

    async onConfirmDelete() {
      this.showConfirmDeleteModal = false;
      await this.saleStore.deleteSale(this.selectedSale as Sale);
    },

    viewDetails(sale: Sale) {
      if (this.userStore.activeRole?.isSalesAssociate()) {
        this.$router.push(`/agent/sales/${sale.id}`);
      } else this.$router.push(`/vendor/sales/${sale.id}`);
    },
  },
});
</script>
