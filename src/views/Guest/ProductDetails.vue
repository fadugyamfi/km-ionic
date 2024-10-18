<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/guest/home"
              :icon="close"
            ></IonBackButton>
          </IonButtons>

          <IonTitle>
            {{ $t("shopper.productDetails.productDetails") }}
          </IonTitle>

          <IonButtons slot="end">
            <FavoriteButton :product="product || undefined"></FavoriteButton>

            <CartStatusButton
              :product="product || undefined"
            ></CartStatusButton>
            <ShareButton :title="product?.product_name || ''"></ShareButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent class="ion-padding" v-if="product">
      <ProductImages :product="product" />
      <main>
        <section class="section business-section ion-margin-top">
          <section class="d-flex ion-align-items-center">
            <ion-icon color="medium" :icon="briefcase"></ion-icon>

            <IonLabel>{{ product?.business?.name }}</IonLabel>
          </section>
          <!-- <BusinessRatingAndReviews
            :business="product?.business"
          ></BusinessRatingAndReviews> -->
        </section>
        <section class="section title-section d-flex ion-align-items-start">
          <span class="product-name">
            {{ product?.product_name }}
          </span>
        </section>
        <section
          class="section product-weight d-flex"
          v-if="product?.weight_value"
        >
          <ion-card class="weight">
            <ion-card-content>
              {{ product?.weight_value
              }}{{ product?.weight_unit?.symbol || "g" }}
            </ion-card-content>
          </ion-card>
        </section>

        <section class="section d-flex" style="gap: 8px">
          <IonText
            class="price"
            color="danger"
            v-if="product?.is_on_sale && product?.discountApplied > 0"
          >
            {{
              Filters.currency(
                Number(product?.sale_price),
                String(product?.currency?.symbol || "GHS")
              ).split(".")[0]
            }}.<span class="main-sub-price">
              {{
                Filters.currency(
                  Number(product?.sale_price),
                  String(product?.currency?.symbol || "GHS")
                ).split(".")[1]
              }}
            </span>
          </IonText>
          <span
            class="price"
            :class="{
              strikethrough:
                product?.is_on_sale && product?.discountApplied > 0,
            }"
          >
            {{
              Filters.currency(
                Number(product?.product_price),
                String(product?.currency?.symbol || "GHS")
              )
            }}
          </span>
          <ion-badge v-if="product?.is_on_sale && product?.discountApplied > 0">
            {{ product?.discountApplied }}% off
          </ion-badge>
        </section>
        <section
          class="section msrp-price"
          v-if="!product.preferRetailPrice && product?.retail_price as number > 0"
        >
          <IonText color="medium">
            MSRP:
            {{
              Filters.currency(
                Number(product?.retail_price),
                String(product?.currency?.symbol || "GHS")
              )
            }}
          </IonText>
        </section>
        <section
          v-if="product?.product_description"
          class="section description-section"
        >
          <IonText>
            {{ product.product_description || "No Description Available" }}
          </IonText>
        </section>
        <section class="section delivery-section">
          <IonText>
            Delivery: Shipping within Ghana <span>(GHS 10 – 15)</span>
          </IonText>
        </section>

        <section class="section min-order-section">
          <BusinessMinimumOrder
            :business="product?.business"
          ></BusinessMinimumOrder>
        </section>

        <section class="section tags">
          <ProductTags :product="product"></ProductTags>
        </section>
        <section
          v-if="!hideCartFunctions"
          class="section product-quantity-selection"
        >
          Qty
          <ProductQuantitySelector
            :hide-product-unit-selector="true"
            @change="updateQuantity($event)"
          />
        </section>
      </main>
      <LoginRequiredSheet
        :isOpen="showFilterSheet"
        @didDismiss="showFilterSheet = false"
      >
      </LoginRequiredSheet>
    </IonContent>

    <IonSkeletonText
      v-if="!product"
      style="height: 300px"
      :animated="true"
    ></IonSkeletonText>

    <IonFooter class="ion-padding ion-no-border" v-if="!hideCartFunctions">
      <KolaButton
        class="ion-margin-bottom"
        :disabled="cartHasProduct"
        @click="buyNow()"
      >
        {{ $t("shopper.productDetails.buyNow") }}
      </KolaButton>
      <KolaButton
        color="light-blue"
        @click="addToCart()"
        :disabled="cartHasProduct"
      >
        <IonIcon size="meduim" :icon="addOutline" v-if="!cartHasProduct" />
        {{
          !cartHasProduct
            ? $t("shopper.productDetails.addToCart")
            : $t("shopper.productDetails.addedToCart")
        }}
      </KolaButton>
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
  IonCard,
  IonCardContent,
  IonBadge,
} from "@ionic/vue";
import { defineComponent } from "vue";

import {
  close,
  heartOutline,
  heart,
  cart,
  cartOutline,
  shareOutline,
  briefcase,
  addOutline,
} from "ionicons/icons";
import Product from "@/models/Product";
import { mapStores } from "pinia";
import { useProductStore } from "@/stores/ProductStore";
import KolaButton from "@/components/buttons/KolaButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import Image from "@/components/Image.vue";
import BusinessRatingAndReviews from "@/components/modules/business/BusinessRatingAndReviews.vue";
import BusinessMinimumOrder from "@/components/modules/business/BusinessMinimumOrder.vue";
import ProductTags from "@/components/modules/products/ProductTags.vue";
import ProductQuantitySelector from "@/components/modules/products/ProductQuantitySelector.vue";
import FavoriteButton from "@/components/modules/products/FavoriteButton.vue";
import CartStatusButton from "@/components/modules/products/CartStatusButton.vue";
import { useUserStore } from "@/stores/UserStore";
import { useCartStore } from "@/stores/CartStore";
import { handleAxiosRequestError } from "@/utilities";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import LoginRequiredSheet from "@/components/modules/LoginRequiredSheet.vue";
import Filters from "../../utilities/Filters";
import ProductImages from "@/components/modules/products/ProductImages.vue";
import ShareButton from "@/components/buttons/ShareButton.vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonBadge,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonFooter,
    KolaButton,
    KolaWhiteButton,
    Image,
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
    LoginRequiredSheet,
    ProfileAvatar,
    ProductImages,
    ShareButton,
  },

  data() {
    return {
      close,
      briefcase,
      heartOutline,
      cartOutline,
      shareOutline,
      addOutline,
      cart,
      heart,
      product: null as Product | null,
      quantity: 0,
      defaultBanner: "/images/vendor/banner.png",
      showFilterSheet: false,
      Filters,
      noImage: "/images/product-placeholder.png",
    };
  },

  props: {
    showCartButtons: {
      default: true,
    },
  },

  computed: {
    ...mapStores(useProductStore, useCartStore, useUserStore),

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
        if (this.productStore.selectedProduct) {
          this.product = this.productStore.selectedProduct;
        } else {
          this.product = await this.productStore.fetchGuestProduct(productId);
        }

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

    addToCart() {
      this.showFilterSheet = true;
    },
    buyNow() {
      this.showFilterSheet = true;
    },
  },

  ionViewWillEnter() {
    this.fetchProductDetails();
  },
});
</script>

<style scoped lang="scss">
main {
  border-radius: 10px;
  background-color: white;
  margin-top: 15px;
  padding: 10px 0px;
  color: #111;

  .section {
    padding: 4px 5px;
    font-size: 0.95em;

    .price {
      text-align: right;
      min-width: 80px;

      font-size: 20px;
      line-height: 28px;
      font-weight: 700;
      color: #b87c16;

      span.main-sub-price {
        font-size: 16px;
        line-height: 32px;
        font-weight: 600;
      }

      &.strikethrough {
        text-decoration: line-through;
        font-size: 16px;
        font-weight: 700;
        color: #f5aa29;
      }
    }
    &.msrp-price {
      ion-text {
        font-size: 14px;
        font-weight: 700;
        color: #6d7280;
      }
    }
    ion-badge {
      --background: #f1f1f1;
      --color: #6d7280;
      --padding-end: 8px;
      --padding-top: 4px;
      --padding-bottom: 4px;
      --padding-start: 8px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      height: 28px;
    }
  }
  .title-section {
    font-weight: 500;
    font-size: 1em;
  }

  .business-section {
    ion-icon {
      margin-right: 8px;
    }
    ion-label {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #6d7280;
    }
  }

  .product-weight {
    ion-card {
      margin: 0px;
      &.weight {
        width: auto !important;
        min-width: 40px !important;
        border-radius: 16px;
        background: #faf5ff;
        border: none;
        padding: 0px;

        ion-card-content {
          font-size: 12px;
          font-weight: 700;
          line-height: 14px;
          text-align: center;
          color: #581c87;
          padding: 4px 8px;
        }
      }
    }
  }

  .delivery-section {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #6d7280;
    span {
      font-weight: 600;
    }
  }
  .description-section {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #6d7280;
  }
  .product-quantity-selection {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    color: #6d7280;
  }

  .section.tags {
    border-top: solid 1px #f1f1f1;
    margin-top: 16px;
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
