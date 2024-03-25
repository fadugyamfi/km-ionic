<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <PaymentOptionsHeader />
    </section>

    <!-- Main Content -->
    <ion-content>
      <form>
        <ion-radio-group v-model="form.fields.payment_option_id">
          <section class="d-flex flex-column ion-margin-horizontal">
            <IonText class="fw-semibold">Pay Now</IonText>
            <IonText color="medium" class="font-medium"
              >Select a payment method</IonText
            >
          </section>

          <section class="d-flex flex-column ion-margin-bottom">
            <PayOnDelivery />
          </section>

          <!-- <section class="d-flex flex-column ion-margin-horizontal">
            <IonText class="fw-semibold">Pay Later</IonText>
            <IonText color="medium" class="font-medium">Select a pay later option</IonText>
          </section>
          <section class="d-flex flex-column ion-margin-bottom">
            <ion-card style="margin-bottom: 0px;">
              <ion-card-content @click="toggleDropdown('pay2Weeks')">
                <section class="d-flex ion-justify-content-between ion-align-items-center">
                  <IonText class="fw-semibold">Pay over 2 weeks</IonText>
                  <section class="d-flex ion-align-items-center">
                    <img loading="lazy" src="/img/icons/chevron-down.svg" class="image" />
                  </section>
                </section>
              </ion-card-content>
            </ion-card>
            <ion-card v-if="showDropdown.pay2Weeks">
              <IonCardContent>
                <ion-radio value="3">
                  <section class="radio-section">
                    <p class="radio-text">Pay 50% installment each week</p>
                    <section class="d-flex ion-align-items-center">
                      <IonText class="fw-semibold ion-margin-end"></IonText>
                    </section>
                  </section>
                </ion-radio>
                <ion-radio value="4">
                  <section class="radio-section">
                    <p class="radio-text">Pay 100% on the due date</p>
                    <section class="d-flex ion-align-items-center">
                      <IonText class="fw-semibold ion-margin-end"></IonText>
                    </section>
                  </section>
                </ion-radio>

                <p class="radio-text info-text">
                  Subject to Approval. Markup of 2.5% will be added to the total
                  price
                </p>
              </IonCardContent>
            </ion-card>
            <ion-card style="margin-bottom: 0px;">
              <ion-card-content @click="toggleDropdown('pay4Weeks')">
                <section class="d-flex ion-justify-content-between ion-align-items-center">
                  <IonText class="fw-semibold">Pay over 4 weeks</IonText>
                  <section class="d-flex ion-align-items-center">
                    <img loading="lazy" src="/img/icons/chevron-down.svg" class="image" />
                  </section>
                </section>
              </ion-card-content>
            </ion-card>
            <ion-card v-if="showDropdown.pay4Weeks">
              <IonCardContent>
                <ion-radio value="5">
                  <section class="radio-section">
                    <p class="radio-text">Pay 25% instalment each week</p>
                    <section class="d-flex ion-align-items-center">
                      <IonText class="fw-semibold ion-margin-end"></IonText>
                    </section>
                  </section>
                </ion-radio>
                <ion-radio value="6">
                  <section class="radio-section">
                    <p class="radio-text">Pay 50% instalment every 2 weeks</p>
                    <section class="d-flex ion-align-items-center">
                      <IonText class="fw-semibold ion-margin-end"></IonText>
                    </section>
                  </section>
                </ion-radio>
                <ion-radio value="7">
                  <section class="radio-section">
                    <p class="radio-text">Pay 100% on the due date</p>
                    <section class="d-flex ion-align-items-center">
                      <IonText class="fw-semibold ion-margin-end"></IonText>
                    </section>
                  </section>
                </ion-radio>

                <p class="radio-text info-text">
                  Subject to Approval. Markup of 2.5% will be added to the total
                  price
                </p>
              </IonCardContent>
            </ion-card>
          </section> -->
        </ion-radio-group>
      </form>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="storePaymentOption"
        >Proceed To Checkout</KolaYellowButton
      >
    </IonFooter>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonText,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonButton,
  IonIcon,
  IonCardContent,
  IonContent,
  IonFooter,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonSkeletonText,
  IonRow,
  IonCol,
  IonInput,
  IonImg,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonRadio,
  IonRadioGroup,
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
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import Image from "@/components/Image.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import NoResults from "../../../components/layout/NoResults.vue";
import PaymentOptionsHeader from "@/components/header/PaymentOptionsHeader.vue";
import PayOnDelivery from "@/components/modules/deliveryDetails/PayOnDelivery.vue";
import { useCartStore } from "@/stores/CartStore";
import { Order } from "@/models/Order";

type DropdownName = "pay2Weeks" | "pay4Weeks";

export default defineComponent({
  components: {
    IonPage,
    IonText,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonCard,
    IonButton,
    IonIcon,
    IonCardContent,
    IonContent,
    IonFooter,
    KolaYellowButton,
    KolaWhiteButton,
    Image,
    Swiper,
    SwiperSlide,
    IonAvatar,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonSkeletonText,
    IonRow,
    IonCol,
    NoResults,
    IonInput,
    IonCardHeader,
    IonCardSubtitle,
    IonImg,
    IonCardTitle,
    PaymentOptionsHeader,
    PayOnDelivery,
    IonRadio,
    IonRadioGroup,
  },
  data() {
    return {
      close,
      heartOutline,
      cartOutline,
      shareOutline,
      cart,
      heart,
      fetching: false,
      defaultBanner: "/images/vendor/banner.png",
      showDropdown: {
        pay2Weeks: false,
        pay4Weeks: false,
      },
      showPayDropdown: false,
      form: {
        fields: {
          payment_option_id: "1",
        },
      },
    };
  },
  computed: {
    buttonText(): string {
      return this.form.fields.payment_option_id === "1"
        ? "Place Order"
        : "Proceed To Checkout";
    },
  },
  methods: {
    storePaymentOption() {
      const cartStore = useCartStore();

      // Find the order based on the business ID
      const order = cartStore.orders.find(
        (b) => b.businesses_id === Number(this.$route.params.id)
      );

      if (order) {
        // Update the payment option ID
        order.payment_option_id = +this.form.fields.payment_option_id;

        // Persist the changes
        cartStore.persist();

        // Define the route path based on payment_option_id
        const routePath =
          this.form.fields.payment_option_id === "1"
            ? `/shopper/cart/business/${this.$route.params.id}/item-review`
            : `/shopper/cart/business/${this.$route.params.id}/payment-method`;

        // Push the new route
        this.$router.push(routePath);
      } else {
        console.error("Order not found for the specified business ID");
      }
    },

    toggleDropdown(dropdownName: DropdownName) {
      this.showDropdown[dropdownName] = !this.showDropdown[dropdownName];
    },
  },

  mounted() {
    const cartStore = useCartStore();
    if (cartStore.orders.length == 0) {
      cartStore.loadFromStorage();
    }
  },
});
</script>

<style scoped lang="scss">
ion-card {
  color: #000000;
}

ion-footer {
  background-color: #fefefe;
}
.radio-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

ion-radio {
  width: 100%;
  margin: 8px auto;
}

ion-radio.radio-checked::part(container) {
  background: #21d187;
  border-color: transparent;
}

.radio-text {
  color: #787486;
}

.info-text {
  font-size: 0.8em;
}

ion-radio::part(container) {
  width: 18px;
  height: 18px;

  border-radius: 20px;
  border: 1.5px solid #e7eaec;
}

ion-radio::part(mark) {
  background: none;
  transition: none;
  transform: none;
  border-radius: 0;
}

ion-radio.radio-checked::part(container) {
  background: #21d187;
  border-color: transparent;
}

ion-radio.radio-checked::part(mark) {
  width: 6px;
  height: 9px;
  border-width: 0px 2px 2px 0px;
  border-style: solid;
  border-color: #fff;
  transform: rotate(45deg);
}
</style>
