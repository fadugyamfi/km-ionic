<template>
  <section class="product-category-card" :class="{ tall: tall === true }">
    <ion-card>
      <Image :alt="category.name" :src="category.image" />

      <IonCardHeader>
        <IonCardHeader>
          <section>
            <IonText class="d-flex ion-align-items-center">
              <IonIcon
                class="warning"
                :icon="alertCircleOutline"
              ></IonIcon
              >out of stock</IonText
            >
          </section>
          <section class="pricing d-flex ion-align-items-center ion-justify-content-between">
            <span> GHS 3000.00 </span>
            <span class="weight ion-text-end"> 25kg/24pcs kg </span>
          </section>
          <section
            class="d-flex ion-align-items-center ion-justify-content-between"
          >
            <p class="product-title fw-semibold line-clamp">Frytol oil</p>

            <IonButton
              fill="clear"
              color="medium"
              @click.prevent.stop="addToCart()"
              class="ion-no-padding ion-no-margin"
            >
              <IonIcon slot="icon-only" :icon="closeCircleOutline"></IonIcon>
            </IonButton>
          </section>
        </IonCardHeader>
      </IonCardHeader>
    </ion-card>
  </section>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonText,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  locationOutline,
  closeCircleOutline,
  alertCircleOutline,
} from "ionicons/icons";
import ProductCategory from "@/models/ProductCategory";
import Image from "@/components/Image.vue";

export default defineComponent({
  props: {
    category: {
      required: true,
      type: ProductCategory,
    },

    tall: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      locationOutline,
      closeCircleOutline,
      alertCircleOutline,
    };
  },

  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    Image,
    IonList,
    IonButton,
    IonLabel,
    IonText,
  },

  methods: {
    addToCart() {

    }
  }
});
</script>

<style scoped lang="scss">
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-category-card {
  ion-card {
    width: 100%;
    margin: 5px auto;
    position: relative;
    // border: solid 1px #f4f4f4;
    // border-radius: 8px;
    // box-shadow: 1px 2px 9px #f9f9f9;

    ion-img {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }

    ion-card-header {
      text-align: left;
      padding: 5px;
      .product-title {
        font-size: 0.95em;
        font-weight: 600;
        margin-top: 0px;
        margin-bottom: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #111;
      }

      .pricing {
        font-size: 0.93em;
        font-weight: normal;
        color: #212121;
        span {
          font-size: 11px;
          &.weight {
            color: #787486;
            font-size: 9px;
          }
        }
      }
    }
  }

  &.tall {
    ion-img {
      height: 180px;
      object-fit: cover;
    }
  }
}
ion-button {
  font-size: 0px;
}
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
}
ion-text {
  font-size: 12px;
  font-weight: normal;
  color: #212121;
}
</style>
