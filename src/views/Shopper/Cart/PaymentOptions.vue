<template>
  <ion-page>
    <section class="ion-padding">
      <PaymentOptionsHeader />
    </section>

    <ion-content class="ion-padding">
      <form>
        <section class="d-flex flex-column">
          <h6 style="margin-top: 0px" class="fw-semibold">Pay Now</h6>
          <IonText color="medium" class="font-medium"
            >Select a payment method</IonText
          >
        </section>

        <section style="margin-top: 10px">
          <IonItem lines="none" @click="selectPaymentOption(1)">
            <IonLabel class="ion-no-margin">
              <p class="ion-no-margin font-medium" style="margin-bottom: 8px">
                Pay now
              </p>
              <IonText
                color="medium"
                class="font-medium location"
                style="margin-bottom: 8px"
              >
                1% Discount Per Box
              </IonText>
              <IonText
                color="medium"
                class="font-medium d-flex ion-align-items-center"
                style="margin-bottom: 8px"
              >
                <IonIcon
                  :icon="timeOutline"
                  style="margin-right: 6px"
                ></IonIcon>
                Guaranteed 3-Day Delivery
              </IonText>
            </IonLabel>
            <div class="d-flex metadata-end-wrapper" slot="end">
              <IonCheckbox
                aria-label="standard-delivery"
                justify="end"
                mode="ios"
                value="pay-now"
                :checked="form.fields?.payment_option_id == 1"
              ></IonCheckbox>
            </div>
          </IonItem>
          <IonItem lines="none" @click="selectPaymentOption(2)">
            <IonLabel class="ion-no-margin">
              <p class="ion-no-margin font-medium" style="margin-bottom: 8px">
                Pay on Delivery
              </p>
              <IonText color="medium" class="font-medium">
                Standard Pricing
              </IonText>
            </IonLabel>
            <div class="d-flex metadata-end-wrapper" slot="end">
              <IonCheckbox
                aria-label="express-delivery"
                justify="end"
                mode="ios"
                value="pay-on-delivery"
                :checked="form.fields?.payment_option_id == 2"
              ></IonCheckbox>
            </div>
          </IonItem>
        </section>

        <!-- <section class="d-flex flex-column" style="margin-top: 20px">
          <h6 class="fw-semibold">Pay Later</h6>
          <IonText color="medium" class="font-medium"
            >Select a pay later option</IonText
          >
        </section>
        <section class="d-flex flex-column ion-margin-bottom">
          <ion-card style="margin-bottom: 0px">
            <ion-card-content @click="toggleDropdown('pay2Weeks')">
              <section
                class="d-flex ion-justify-content-between ion-align-items-center"
              >
                <IonText class="fw-semibold">Pay over 2 weeks</IonText>
                <section class="d-flex ion-align-items-center">
                  <img
                    loading="lazy"
                    src="/img/icons/chevron-down.svg"
                    class="image"
                  />
                </section>
              </section>
            </ion-card-content>
          </ion-card>
          <IonCardContent v-if="showDropdown.pay2Weeks">
            <IonItem lines="none" @click="selectPaymentOption(3)">
              <IonLabel class="ion-no-margin">
                <IonText
                  color="medium"
                  class="font-medium location"
                  style="margin-bottom: 8px"
                >
                  Pay 50% installment each week
                </IonText>
              </IonLabel>
              <div class="d-flex metadata-end-wrapper" slot="end">
                <IonCheckbox
                  aria-label="standard-delivery"
                  justify="end"
                  mode="ios"
                  value="pay-50-percent"
                  :checked="form.fields?.payment_option_id == 3"
                ></IonCheckbox>
              </div>
            </IonItem>
            <IonItem lines="none" @click="selectPaymentOption(4)">
              <IonLabel class="ion-no-margin">
                <IonText color="medium" class="font-medium">
                  Pay 100% on the due date
                </IonText>
              </IonLabel>
              <div class="d-flex metadata-end-wrapper" slot="end">
                <IonCheckbox
                  aria-label="express-delivery"
                  justify="end"
                  mode="ios"
                  value="pay-100-percent"
                  :checked="form.fields?.payment_option_id == 4"
                ></IonCheckbox>
              </div>
            </IonItem>
            <p class="radio-text info-text">
              Subject to Approval. Markup of 2.5% will be added to the total
              price
            </p>
          </IonCardContent>

          <ion-card style="margin-bottom: 0px">
            <ion-card-content @click="toggleDropdown('pay4Weeks')">
              <section
                class="d-flex ion-justify-content-between ion-align-items-center"
              >
                <IonText class="fw-semibold">Pay over 4 weeks</IonText>
                <section class="d-flex ion-align-items-center">
                  <img
                    loading="lazy"
                    src="/img/icons/chevron-down.svg"
                    class="image"
                  />
                </section>
              </section>
            </ion-card-content>
          </ion-card>
          <ion-card v-if="showDropdown.pay4Weeks">
            <IonCardContent>
              <IonItem lines="none" @click="selectPaymentOption(5)">
                <IonLabel class="ion-no-margin">
                  <IonText
                    color="medium"
                    class="font-medium location"
                    style="margin-bottom: 8px"
                  >
                    Pay 25% instalment each week
                  </IonText>
                </IonLabel>
                <div class="d-flex metadata-end-wrapper" slot="end">
                  <IonCheckbox
                    aria-label="standard-delivery"
                    justify="end"
                    mode="ios"
                    value="pay-25-percent-per-week"
                    :checked="form.fields?.payment_option_id == 5"
                  ></IonCheckbox>
                </div>
              </IonItem>
              <IonItem lines="none" @click="selectPaymentOption(6)">
                <IonLabel class="ion-no-margin">
                  <IonText color="medium" class="font-medium">
                    Pay 50% instalment every 2 weeks
                  </IonText>
                </IonLabel>
                <div class="d-flex metadata-end-wrapper" slot="end">
                  <IonCheckbox
                    aria-label="express-delivery"
                    justify="end"
                    mode="ios"
                    value="pay-50-percent-per-two-week"
                    :checked="form.fields?.payment_option_id == 6"
                  ></IonCheckbox>
                </div>
              </IonItem>
              <IonItem lines="none" @click="selectPaymentOption(7)">
                <IonLabel class="ion-no-margin">
                  <IonText color="medium" class="font-medium">
                    Pay 100% on the due date
                  </IonText>
                </IonLabel>
                <div class="d-flex metadata-end-wrapper" slot="end">
                  <IonCheckbox
                    aria-label="express-delivery"
                    justify="end"
                    mode="ios"
                    value="pay-100-percent-on-due-date"
                    :checked="form.fields?.payment_option_id == 7"
                  ></IonCheckbox>
                </div>
              </IonItem>

              <p class="radio-text info-text">
                Subject to Approval. Markup of 2.5% will be added to the total
                price
              </p>
            </IonCardContent>
          </ion-card>
        </section> -->
      </form>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="storePaymentOption">{{
        buttonText
      }}</KolaYellowButton>
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
  IonCheckbox,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  close,
  heartOutline,
  heart,
  cart,
  cartOutline,
  shareOutline,
  timeOutline,
} from "ionicons/icons";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import Image from "@/components/Image.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import NoResults from "../../../components/layout/NoResults.vue";
import PaymentOptionsHeader from "@/components/header/PaymentOptionsHeader.vue";
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
    IonRadio,
    IonRadioGroup,
    IonCheckbox,
  },
  props: ["location", "deliveryDate"],

  data() {
    return {
      close,
      heartOutline,
      cartOutline,
      shareOutline,
      timeOutline,
      cart,
      heart,
      fetching: false,
      defaultBanner: "/images/vendor/banner.png",
      showDropdown: {
        pay2Weeks: false,
        pay4Weeks: false,
      },
      selectedPayment: "pay-now",

      showPayDropdown: false,
      form: {
        fields: {
          payment_option_id: 1,
        },
      },
    };
  },
  computed: {
    buttonText(): string {
      return this.form.fields.payment_option_id == 1
        ? "Proceed to checkout"
        : "Continue";
    },
  },
  methods: {
    selectPaymentOption(id: number) {
      this.form.fields.payment_option_id = id; // Update selectedPayment directly
    },

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
          this.form.fields.payment_option_id == 1
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

  watch: {
    "selectedPayment.value"(newValue) {
      if (newValue) {
        this.$emit("onSelectDeliveryMethod", newValue);
      }
    },
  },
});
</script>

<style scoped lang="scss">
ion-item {
  --background: #ffffff;
  margin-bottom: 4px !important;
  border: solid 1px #f4f4f4;
  border-radius: 12px;
  margin-bottom: 0.5em;
  box-shadow: 0px 4px 12px 0px #696f821a;

  &::part(native) {
    padding: 16px;
    --padding-start: 0px;
    --inner-padding-end: 0px;
  }

  ion-label {
    ion-text {
      &.location {
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    line-height: 1em;

    p {
      font-weight: 500;
      color: #111;
    }
  }
  .metadata-end-wrapper {
    position: absolute;
    top: 0px;
    inset-inline-end: 10px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    p {
      margin: 0px 10px 0px 0px;
      font-size: 14px;
    }
  }
}

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
h6 {
  font-size: 14px;
  margin-top: 24px;
}
</style>
