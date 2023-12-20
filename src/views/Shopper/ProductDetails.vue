<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/shopper/home"
              :icon="close"
            ></IonBackButton>
          </IonButtons>

          <IonTitle size="small">
            {{ $t("shopper.productDetails.productDetails") }}
          </IonTitle>

          <IonButtons slot="end">
            <FavoriteButton :product="product || undefined"></FavoriteButton>

            <CartStatusButton
              :product="product || undefined"
            ></CartStatusButton>

            <IonButton slot="icon-only">
              <IonIcon :icon="shareOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent class="ion-padding" v-if="product">
      <header>
        <Swiper>
          <SwiperSlide>
            <section style="height: 200px; border-radius: 10px">
              <Image :src="product?.image" style="height: 200px"></Image>
            </section>
          </SwiperSlide>
        </Swiper>
      </header>

      <main>
        <section class="section title-section d-flex ion-align-items-start">
          <span class="product-name">
            {{ product?.product_name }}

            <span v-if="product?.is_on_sale">
              - {{ product?.discountApplied }}% {{ $t("general.discount") }}
            </span>
          </span>
        </section>

        <section
          class="section d-flex ion-align-items-start ion-justify-content-between"
        >
          <span
            class="price fw-semibold"
            :class="{ strikethrough: product.is_on_sale }"
          >
            {{
              Filters.currency(
                Number(product?.product_price),
                String(product?.currency?.symbol)
              )
            }}
          </span>

          <IonText
            class="price fw-semibold"
            color="danger"
            v-if="product.is_on_sale"
          >
            {{
              Filters.currency(
                Number(product?.sale_price),
                String(product?.currency?.symbol)
              )
            }}
          </IonText>

          <IonText
            class="price"
            color="medium"
            v-if="product?.retail_price as number > 0"
          >
            MSRP:
            {{
              Filters.currency(
                Number(product?.retail_price),
                String(product?.currency?.symbol)
              )
            }}
          </IonText>
        </section>

        <section class="section business-section">
          <section class="d-flex ion-align-items-center">
            <ProfileAvatar
              :image="product?.business?.logo"
              class="ion-no-margin"
              :username="product?.business?.name"
              customSize="30px"
            ></ProfileAvatar>

            <IonLabel>{{ product?.business?.name }}</IonLabel>
          </section>
          <!-- <BusinessRatingAndReviews
            :business="product?.business"
          ></BusinessRatingAndReviews> -->
        </section>

        <section class="section description-section">
          <IonText color="medium">{{
            product?.product_description || "No Description Available"
          }}</IonText>
        </section>

        <section class="section min-order-section">
          <BusinessMinimumOrder
            :business="product?.business"
          ></BusinessMinimumOrder>
        </section>

        <section
          v-if="!hideCartFunctions"
          class="section product-quantity-selection"
        >
          <ProductQuantitySelector
            @change="updateQuantity($event)"
          ></ProductQuantitySelector>
        </section>

        <section class="section tags">
          <ProductTags :product="product"></ProductTags>
        </section>
      </main>
    </IonContent>

    <IonSkeletonText
      v-if="!product"
      style="height: 300px"
      :animated="true"
    ></IonSkeletonText>

    <IonFooter class="ion-padding ion-no-border" v-if="!hideCartFunctions">
      <KolaYellowButton
        class="ion-margin-bottom"
        :disabled="cartHasProduct"
        @click="buyNow()"
      >
        {{ $t("shopper.productDetails.buyNow") }}
      </KolaYellowButton>
      <KolaWhiteButton @click="addToCart()" :disabled="cartHasProduct">
        {{ $t("shopper.productDetails.addToCart") }}
      </KolaWhiteButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonText,
} from "@ionic/vue";
import { defineComponent } from "vue";

import {
  close,
  heartOutline,
  heart,
  cart,
  cartOutline,
  shareOutline,
} from "ionicons/icons";
import Product from "@/models/Product";
import { mapStores } from "pinia";
import { useProductStore } from "@/stores/ProductStore";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import Image from "@/components/Image.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import BusinessRatingAndReviews from "@/components/modules/business/BusinessRatingAndReviews.vue";
import BusinessMinimumOrder from "@/components/modules/business/BusinessMinimumOrder.vue";
import ProductTags from "@/components/modules/products/ProductTags.vue";
import ProductQuantitySelector from "@/components/modules/products/ProductQuantitySelector.vue";
import FavoriteButton from "@/components/modules/products/FavoriteButton.vue";
import CartStatusButton from "@/components/modules/products/CartStatusButton.vue";
import { useCartStore } from "@/stores/CartStore";
import { handleAxiosRequestError } from "@/utilities";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import Filters from "../../utilities/Filters";

export default defineComponent({
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
    IonFooter,
    KolaYellowButton,
    KolaWhiteButton,
    Image,
    Swiper,
    SwiperSlide,
    IonAvatar,
    IonSkeletonText,
    IonLabel,
    BusinessRatingAndReviews,
    BusinessMinimumOrder,
    IonText,
    ProductTags,
    ProductQuantitySelector,
    FavoriteButton,
    CartStatusButton,
    ProfileAvatar,
  },

  data() {
    return {
      close,
      heartOutline,
      cartOutline,
      shareOutline,
      cart,
      heart,
      product: null as Product | null,
      quantity: 1,
      defaultBanner: "/images/vendor/banner.png",
      Filters,
    };
  },

  props: {
    showCartButtons: {
      default: true,
    },
  },

  computed: {
    ...mapStores(useProductStore, useCartStore),

    cartHasProduct() {
      return this.cartStore.hasProduct(this.product as Product);
    },

    hideCartFunctions() {
      return (
        this.showCartButtons == false ||
        this.$route.meta.showCartButtons == false
      );
    },
  },

  methods: {
    async fetchProductDetails() {
      const productId = +this.$route.params.id;
      try {
        this.product = await this.productStore.fetchProduct(productId);

        if (this.cartHasProduct) {
          this.quantity = this.cartStore.getProductItem(this.product as Product)
            ?.quantity as number;
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },

    onLoadError(event: Event) {
      (event.target as HTMLImageElement).src = this.defaultBanner;
    },

    updateQuantity(amount: number) {
      this.quantity = amount;

      this.cartStore.updateQuantity(this.product as Product, this.quantity);
    },

    async addToCart() {
      await this.cartStore.addProduct(this.product as Product, this.quantity);
    },

    async buyNow() {
      console.log(this.product);
      this.cartStore.clearCart()
      await this.cartStore.addProduct(this.product as Product, this.quantity);
      this.$router.push(
        `/shopper/cart/business/${this.product?.businesses_id}/orders`
      );
    },
  },

  mounted() {
    this.fetchProductDetails();
  },
});
</script>

<style scoped lang="scss">
.strikethrough {
  text-decoration: line-through;
}

main {
  border-radius: 10px;
  background-color: white;
  margin-top: 15px;
  padding: 10px;
  color: #111;

  .section {
    padding: 4px 5px;
    font-size: 0.8em;
  }
  .title-section {
    font-weight: bold;
    font-size: 1em;

    .price {
      text-align: right;
      min-width: 80px;
    }
  }

  .business-section {
    margin-left: -3px;

    ion-avatar {
      height: 24px;
      width: 24px;
      margin-right: 5px;
    }

    .rating-and-reviews {
      padding: 10px 5px;
    }
  }

  .section.tags {
    border-top: solid 1px #f1f1f1;
    padding-top: 5px;
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
