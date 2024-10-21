<template>
  <section class="product-card">
    <ion-card @click="doAction()" class="ion-activatable">
      <IonRippleEffect style="z-index: 999"></IonRippleEffect>

      <FavoriteButton
        v-if="showAddToFavorites"
        class="favorite-button"
        :product="product"
        color="dark"
      >
      </FavoriteButton>

      <IonCheckbox
        v-if="showAddToSelected"
        mode="ios"
        @click.prevent=""
        v-model="selected"
      ></IonCheckbox>
      <div style="position: relative; background-color: #f9fafb">
        <Image
          class="product-image"
          :class="{ float: !imgLoaded }"
          :alt="product?.product_name"
          :src="imageURL"
          :path="imagePath"
          :no-img-src="noImage"
          w="180"
          @loaded="imgLoaded = true"
        />
        <WeightChip class="product-weight-chip" v-if="product?.weight_value">
          {{ product?.weight_value
          }}{{ product?.weight_unit?.symbol || "g" }}</WeightChip
        >
        <DiscountBadge
          v-if="product?.is_on_sale && product?.discountApplied > 0"
          class="discount-badge"
        >
          - {{ product?.discountApplied }}%</DiscountBadge
        >
      </div>

      <!-- <IonSkeletonText
        v-if="!imgLoaded"
        :animated="true"
        class="product-image"
      ></IonSkeletonText> -->

      <IonCardHeader>
        <section>
          <p class="product-title line-clamp">
            {{ product?.product_name }}
          </p>
        </section>

        <section class="pricing d-flex flex-column">
          <section
            class="d-flex flex-column ion-align-items-center ion-justify-content-between"
          >
            <aside>
              <section
                class="fw-medium main-price"
                v-if="product?.is_on_sale && product.sale_price > 0"
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
              </section>
              <section class="fw-medium main-price" v-else>
                {{
                  Filters.currency(
                    Number(product?.product_price),
                    String(product?.currency?.symbol || "GHS")
                  ).split(".")[0]
                }}.<span class="main-sub-price">
                  {{
                    Filters.currency(
                      Number(product?.product_price),
                      String(product?.currency?.symbol || "GHS")
                    ).split(".")[1]
                  }}
                </span>
              </section>

              <section class="product-weight">
                <span v-if="product?.group_quantity">
                  {{ product?.group_quantity }} pieces
                </span>
              </section>
            </aside>
            <IonButton
              v-if="showAddToCart"
              expand="block"
              @click.prevent.stop="addToCart()"
              class="add-to-cart-button"
            >
              <IonIcon size="meduim" slot="icon-only" :icon="addOutline" />
              Add to cart
            </IonButton>
          </section>
        </section>

        <section
          v-if="showDescription && product?.product_description"
          class="product-description"
        >
          <p class="ion-no-margin">{{ product?.product_description }}</p>
        </section>
        <IonRippleEffect></IonRippleEffect>
      </IonCardHeader>
    </ion-card>
    <LoginRequiredSheet
      :isOpen="showFilterSheet"
      @didDismiss="showFilterSheet = false"
    >
    </LoginRequiredSheet>
  </section>
</template>

<script lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonIcon,
  IonRippleEffect,
  IonSkeletonText,
  IonText,
} from "@ionic/vue";
import { PropType, defineComponent } from "vue";
import { addOutline, locationOutline } from "ionicons/icons";
import Product from "@/models/Product";
import { addCircleOutline } from "ionicons/icons";
import Image from "@/components/Image.vue";
import { useCartStore } from "@/stores/CartStore";
import FavoriteButton from "../modules/products/FavoriteButton.vue";
import Business from "../../models/Business";
import Filters from "../../utilities/Filters";
import LoginRequiredSheet from "../modules/LoginRequiredSheet.vue";
import { useProductStore } from "../../stores/ProductStore";
import DiscountBadge from "../modules/products/DiscountBadge.vue";
import WeightChip from "../modules/products/WeightChip.vue";

export type ProductSelection = {
  selected: Boolean;
  product: Product;
};

export default defineComponent({
  props: {
    product: {
      required: true,
      type: Product,
    },

    tall: {
      default: false,
      type: Boolean,
    },

    showDescription: {
      default: true,
      type: Boolean,
    },

    showAddToCart: {
      default: true,
      type: Boolean,
    },

    showAddToFavorites: {
      default: true,
      type: Boolean,
    },

    showAddToSelected: {
      default: false,
      type: Boolean,
    },

    initiallySelected: {
      default: false,
      type: Boolean,
    },

    action: {
      default: "viewProduct",
      type: String as PropType<"viewProduct" | "toggleSelect">,
    },

    business: {
      defaut: null,
      type: Object as PropType<Business | null>,
    },

    showRetailPrice: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      locationOutline,
      addCircleOutline,
      addOutline,
      imgLoaded: false,
      selected: false,
      noImage: "/images/product-placeholder.png",
      Filters,
      showFilterSheet: false,
    };
  },

  emits: ["toggleSelect"],

  components: {
    IonCard,
    IonCardHeader,
    WeightChip,
    DiscountBadge,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    IonButton,
    Image,
    IonSkeletonText,
    FavoriteButton,
    IonCheckbox,
    LoginRequiredSheet,
    IonText,
    IonRippleEffect,
  },
  computed: {
    imageURL: function () {
      if (
        this.product?.product_images &&
        this.product?.product_images?.length > 0
      ) {
        return this.product.product_images[0].image;
      }

      return this.product.image;
    },

    imagePath: function () {
      if (
        this.product?.product_images &&
        this.product.product_images?.length > 0
      ) {
        return this.product.product_images[0].image_path;
      }

      return this.product.product_banner_image;
    },
  },
  methods: {
    doAction() {
      if (this.action == "viewProduct") {
        this.viewProduct();
      }

      if (this.action == "toggleSelect") {
        this.toggleSelected();
      }
    },

    viewProduct() {
      const productStore = useProductStore();
      productStore.setSelectedProduct(this.product);
      this.$router.push(`/guest/products/${this.product.id}`);
    },

    toggleSelected() {
      this.selected = !this.selected;
      this.$emit("toggleSelect", {
        selected: this.selected,
        product: this.product,
      } as ProductSelection);
    },

    addToCart() {
      this.showFilterSheet = true;
    },
  },

  beforeMount() {
    this.selected = this.initiallySelected;
  },

  mounted() {
    this.product.preferRetailPrice = this.showRetailPrice;
  },
});
</script>

<style scoped lang="scss">
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card {
  width: 100%;
  ion-card {
    width: 96%;
    min-width: 148px;
    margin: 0px auto;
    position: relative;
    overflow: hidden;

    .product-image {
      height: 200px;
      width: 100%;
      object-fit: contain;
      padding: 0px;
      display: block;
      opacity: 1;

      &.float {
        // position: absolute;
        // display: none;
        // height: 1px;
        opacity: 0.1;
      }
    }

    ion-card-header {
      text-align: left;
      padding: 10px 10px;

      .product-title {
        // font-size: 1em;
        // font-weight: 500;
        margin-top: 0px;
        margin-bottom: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 40px;
        color: #111;
        text-transform: capitalize !important;
        font-size: 1em;
        font-weight: 400;
        line-height: 20px;
        text-align: center;
      }

      .pricing {
        font-size: 1em;
        font-weight: 600;
        color: #265da5;

        .main-price {
          font-size: 24px;
          line-height: 32px;
          font-weight: 600;
          color: #b87c16;
          margin-bottom: 8px;

          span.main-sub-price {
            font-size: 16px;
            line-height: 32px;
            font-weight: 600;
          }
        }

        .add-to-cart-button {
          --background: #e0f0ff;
          --box-shadow: 0px -2px 2px 0px #007af53d inset;
          --color: #003366;
          --padding-top: 10px;
          --padding-bottom: 10px;
          text-transform: none;
          width: 100%;
        }
      }
      .product-weight {
        text-align: center;
        font-weight: 500;
        font-size: 0.9em;
        color: #9e9e9e;
        margin-bottom: 20px;
      }
      .product-description {
        font-size: 0.85em;
        margin-top: 5px;
        color: #9e9e9e;
      }

      .stock-status {
        margin-top: 2px;
        ion-icon {
          font-size: 20px;
          &.warning {
            --background: #fdf0ed;
            --border-color: #ef3e3233;
            padding: 2px;
            border-radius: 50%;
            background-color: #fa2b3928;
            color: #d92d20;
            margin-right: 5px;
          }
          &.success {
            --background: #fdf0ed;
            padding: 2px;
            border-radius: 50%;
            background-color: #21d1882f;
            color: #21d187;
            margin-right: 5px;
          }
        }
      }

      ion-card-subtitle {
        font-size: 0.8em;
        padding: 0px;
        margin: 0px;
        color: #bdbdbd;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    ion-card-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8em;

      .distance {
        color: #666eed;
      }
    }
  }

  .favorite-button {
    --padding-start: 12px;
    --padding-end: 12px;
    --padding-top: 12px;
    --padding-bottom: 12px;
    position: absolute;
    top: 16px;
    right: 16px;
    min-height: 24px;
    font-size: 12px;
    border-radius: 50%;
    background: #f1f1f1;
    border: solid 1px #f1f1f1;
    z-index: 999;
  }

  .product-weight-chip {
    position: absolute;
    bottom: 16px;
    right: 0;
  }

  .discount-badge {
    position: absolute;
    top: 16px;
    left: 16px;
  }

  ion-checkbox {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
