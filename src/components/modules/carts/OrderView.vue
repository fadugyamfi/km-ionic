<template>
  <IonItem class="d-flex w-100 ion-align-items-stretch">
    <section class="d-flex w-100" @click="viewOrderItems()">
      <IonThumbnail>
        <Image :src="order?.business?.logo" w="150"></Image>
      </IonThumbnail>

      <section class="w-100">
        <section
          style="height: 100%"
          class="d-flex ion-justify-content-between"
        >
          <section class="d-flex flex-column ion-justify-content-start business-description">
            <IonText class="fw-semibold ellipsis font-medium">
              {{ order?.business?.name || "Kola Market" }}
            </IonText>

            <IonText color="medium" class="font-medium">
              Item total:
              {{ Filters.currency(itemTotal as number) }}
            </IonText>

            <IonText color="medium" class="font-medium">
              <BusinessMinimumOrderReached
                :business="order?.business"
                :total-cost="(itemTotal as number)"
              ></BusinessMinimumOrderReached>
            </IonText>

            <section class="d-flex">
              <IonThumbnail
                v-for="product in topFiveItems"
                :key="product.products_id"
                class="cart-items"
              >
                <Image :src="product.product_image" w="150"></Image>
              </IonThumbnail>
            </section>
          </section>
        </section>
      </section>
    </section>

    <IonButton
      slot="end"
      fill="clear"
      color="dark"
      class="ion-no-margin ion-no-padding ion-align-self-start"
      @click="removeOrder()"
    >
      <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
    </IonButton>
  </IonItem>
</template>

<script lang="ts">
import {
  IonButton,
  IonIcon,
  IonItem,
  IonText,
  IonCol,
  IonThumbnail,
} from "@ionic/vue";
import { PropType, defineComponent } from "vue";
import ProductQuantitySelector from "../products/ProductQuantitySelector.vue";
import { closeCircleOutline } from "ionicons/icons";
import Image from "@/components/Image.vue";
import { mapStores } from "pinia";
import { useSaleStore } from "@/stores/SaleStore";
import { useCartStore } from "@/stores/CartStore";
import Product from "@/models/Product";
import { Order } from "@/models/Order";
import { OrderItem } from "../../../models/OrderItem";
import BusinessMinimumOrderReached from "../business/BusinessMinimumOrderReached.vue";
import Filters from "../../../utilities/Filters";

export default defineComponent({
  components: {
    IonItem,
    IonThumbnail,
    IonText,
    ProductQuantitySelector,
    IonButton,
    IonIcon,
    Image,
    IonCol,
    BusinessMinimumOrderReached,
  },

  props: {
    order: {
      type: Object as PropType<Order>,
    },
  },

  data() {
    return {
      closeCircleOutline,
      Filters,
    };
  },

  computed: {
    ...mapStores(useSaleStore, useCartStore),

    topFiveItems() {
      return this.order?.order_items?.filter((oi, index) => index < 4) || [];
    },

    itemTotal() {
      const total = this.order?.order_items?.reduce(
        (acc, item) => acc + (item.total_price || 0),
        0
      );
      return total;
    },
  },

  methods: {
    removeOrder() {
      this.cartStore.removeOrderAtIndex(this.order);
    },

    viewOrderItems() {
      this.$router.push(
        `/shopper/cart/business/${this.order?.businesses_id}/orders`
      );
    },
  },
  mounted() {
    console.log(this.order);
  },
});
</script>

<style scoped>
ion-item {
  --inner-padding-start: 0px;
  --inner-padding-end: 0px;
  --padding-start: 0px;
  margin-bottom: 10px;
}

.custom-image {
  width: 24px;
  height: 24px;
  border-radius: 2px;
}

ion-thumbnail {
  min-width: 85px;
  height: 120px;
  margin-right: 10px;
  --border-radius: 8px;
}

ion-thumbnail.cart-items {
  margin-top: 5px;
  min-width: 24px;
  margin-right: 0px;
  height: 45px;
  --border-radius: 2px;
}

.business-description {
  width: 239px;
}
</style>
