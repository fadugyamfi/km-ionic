<template>
  <ion-page>
    <section class="ion-padding">
      <OrderSummaryHeader />
    </section>

    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <section class="ion-padding">
        <IonText>{{ orderBusiness?._business.name }}</IonText>
        <p>GHS 3000 minimum reached</p>
      </section>
      <IonList>
        <IonItem
          v-for="(item, index) in orderBusiness?.order_items"
          :key="item.product?.id"
        >
          <ion-thumbnail slot="start" class="custom-thumbnail">
            <Image :src="item.product_image"></Image>
          </ion-thumbnail>

          <ion-row class="item-row">
            <ion-col size="10 ">
              <p class="text-product">{{ item.product_name }}</p>
              <p>Quantity: {{ item.quantity }}</p>
              <p class="price">
                {{ item.currency_symbol || "GHS" }}
                {{ item.quantity * (item.product_price || 0) }}
              </p>
            </ion-col>
            <ion-col size="1" class="remove-button">
              <ion-button
                fill="clear"
                color=""
                @click.prevent.stop="removeFromCart(index)"
              >
                <ion-icon
                  class="remove-icon"
                  :icon="closeCircleOutline"
                ></ion-icon>
              </ion-button>
            </ion-col>
            <ProductQuantitySelector
              @change="updateQuantity(item, $event)"
            ></ProductQuantitySelector>
          </ion-row>
        </IonItem>
        <ItemReview />
      </IonList>
      <UpdateDeliveryDate></UpdateDeliveryDate>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton> Continue </KolaYellowButton>
    </IonFooter>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  IonThumbnail,
  IonItem,
  IonList,
  IonCol,
  IonPage,
  IonContent,
  IonRow,
  IonButton,
  IonIcon,
  IonFooter,
  IonText,
} from "@ionic/vue";
import { CartItem, useCartStore } from "@/stores/CartStore";
import ProductQuantitySelector from "@/components/modules/products/ProductQuantitySelector.vue";
import { business, closeCircleOutline } from "ionicons/icons";
import ItemReview from "@/components/cards/ItemReview.vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import OrderSummaryHeader from "@/components/header/OrderSummaryHeader.vue";
import Image from "@/components/Image.vue";
import { useRoute } from "vue-router";


const route = useRoute();

const cartStore = useCartStore();

const orderBusiness = ref<any>(null);
const orders = computed(() => cartStore.orders);

cartStore.loadFromStorage();
const viewing = ref("cart");

const segmentValue = ref("cart");
const updateQuantity = (item: CartItem, newQuantity: number) => {
  item.quantity = newQuantity;
  item.total_price = item.quantity * item.product_price;
};

const removeFromCart = (index: number) => {
  cartStore.removeAtItemIndex(orderBusiness.value, index);
};



const getOrderBusiness = async () => {
  await cartStore.persist();
  const business = orders.value.find(
    (order: any) => order?.businesses_id == route.params.id
  );
  console.log("Found business:", business); // Add this line for debugging
  orderBusiness.value = business;
  cartStore.items = orderBusiness.value?.order_items;
};

onMounted(async () => {
  await cartStore.loadFromStorage();
  getOrderBusiness();
});
</script>

<style scoped lang="scss">
.item-row {
  align-items: center;
}

.remove-button {
  text-align: end;
}

.item-row ion-col {
  margin: 0;
  padding: 0;
}

p {
  color: #667085;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.text-product,
p {
  margin: 0;
  padding: 0;
  color: #667085;
}

.custom-thumbnail {
  align-self: flex-start;
  margin-right: 16px;
}

.segment-button {
  display: flex;
  align-items: center;
}

ion-badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}

.custom-thumbnail {
  width: 94px;
  height: 120px;
}

.custom-label {
  color: black;

  p {
    font-size: 14px;
    font-family: "Poppins";
    font-weight: 400;
    text-transform: capitalize;
    line-height: 22px;
    word-wrap: break-word;
  }

  .price {
    font-size: 14px;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 18px;
    word-wrap: break-word;
  }
}

.item-row[data-v-c11d03b0] {
  align-items: baseline;
}

ion-icon.remove-icon {
  color: #000;
  vertical-align: text-top;
}

.text-product {
  color: black;
}
</style>
