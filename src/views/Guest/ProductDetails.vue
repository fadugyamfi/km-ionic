<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/guest/home" :icon="close"></IonBackButton>
          </IonButtons>

          <IonTitle >
            {{ $t("shopper.productDetails.productDetails") }}
          </IonTitle>

          <IonButtons slot="end">
            <FavoriteButton :product="product || undefined"></FavoriteButton>

            <CartStatusButton :product="product || undefined"></CartStatusButton>

            <IonButton slot="icon-only">
              <IonIcon :icon="shareOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>

    <IonContent class="ion-padding" v-if="product">
      <ProductImages :product="product" />

      <main>
        <section class="section title-section d-flex ion-align-items-start">
          <span class="product-name">
            {{ product?.product_name }}

            <span v-if="product?.is_on_sale">
              - {{ product?.discountApplied }}% {{ $t("general.discount") }}
            </span>
          </span>
        </section>

        <section class="section d-flex ion-align-items-start ion-justify-content-between">
          <span class="price fw-semibold" :class="{ strikethrough: product.is_on_sale }">
            {{
              Filters.currency(
                Number(product?.product_price),
                String(product?.currency?.symbol || 'GHS')
              )
            }}
          </span>

          <IonText class="price fw-semibold" color="danger" v-if="product.is_on_sale">
            {{
              Filters.currency(
                Number(product?.sale_price),
                String(product?.currency?.symbol || 'GHS')
              )
            }}
          </IonText>

          <IonText class="price" color="medium" v-if="product?.retail_price as number > 0">
            MSRP:
            {{
              Filters.currency(
                Number(product?.retail_price),
                String(product?.currency?.symbol || 'GHS')
              )
            }}
          </IonText>
        </section>

        <section class="section business-section">
          <section class="d-flex ion-align-items-center">
            <ProfileAvatar :image="product?.business?.logo" class="ion-no-margin" :username="product?.business?.name"
                           customSize="30px"></ProfileAvatar>

            <IonLabel>{{ product?.business?.name }}</IonLabel>
          </section>
          <!-- <BusinessRatingAndReviews
            :business="product?.business"
          ></BusinessRatingAndReviews> -->
        </section>

        <section class="section description-section">
          <IonText color="medium">
            {{ product?.product_description || "No Description Available" }}
          </IonText>
        </section>

        <section class="section min-order-section">
          <BusinessMinimumOrder :business="product?.business"></BusinessMinimumOrder>
        </section>

        <section v-if="!hideCartFunctions" class="section product-quantity-selection">
          <ProductQuantitySelector :hide-product-unit-selector="true" @change="updateQuantity($event)"></ProductQuantitySelector>
        </section>

        <section class="section tags">
          <ProductTags :product="product"></ProductTags>
        </section>
      </main>
      <LoginRequiredSheet :isOpen="showFilterSheet" @didDismiss="showFilterSheet = false">
      </LoginRequiredSheet>
    </IonContent>

    <IonSkeletonText v-if="!product" style="height: 300px" :animated="true"></IonSkeletonText>

    <IonFooter class="ion-padding ion-no-border" v-if="!hideCartFunctions">
      <KolaYellowButton @click="buyNow()" class="ion-margin-bottom">
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
    ProductImages
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
        if( this.productStore.selectedProduct ) {
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
  padding: 10px;
  color: #111;

  .section {
    padding: 4px 5px;
    font-size: 0.8em;
  }

  .title-section {
    font-weight: 500;
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
