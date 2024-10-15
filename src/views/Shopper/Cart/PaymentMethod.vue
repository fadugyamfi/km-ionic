<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <PaymentMethodHeader />
    </section>

    <!-- Main Content -->
    <ion-content>
      <IonList lines="none" class="sales-select-list ion-padding-horizontal">
        <IonListHeader>
          <IonLabel class="fw-semibold">{{
            $t("vendor.sales.selectPaymentMethod")
          }}</IonLabel>
        </IonListHeader>

        <IonItem
          v-for="paymentMode in paymentModes"
          :key="paymentMode.id"
          @click="selectPaymentMethod(paymentMode)"
        >
          <IonCheckbox
            :aria-label="paymentMode.name"
            justify="space-between"
            mode="ios"
            :value="paymentMode.id"
            :checked="form.fields?.payment_modes_id == paymentMode?.id"
          >
            <IonLabel>
              <p class="ion-no-margin">{{ paymentMode.name }}</p>
              <IonText color="medium" class="font-medium">
                {{ paymentMode.description }}
              </IonText>
            </IonLabel>
          </IonCheckbox>
        </IonItem>
      </IonList>
      <!-- <form>
        <ion-radio-group v-model="form.fields.payment_option_id">
          <section class="d-flex flex-column ion-margin-horizontal">
            <IonText class="fw-semibold">Pay Method</IonText>
            <IonText color="medium" class="font-medium"
              >Select a payment method</IonText
            >
          </section>
          <section class="d-flex flex-column ion-margin-bottom">
            <SelectPaymentMethod />
          </section>
        </ion-radio-group>
      </form> -->
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="storePaymentOption"
        >Proceed to checkout</KolaYellowButton
      >
    </IonFooter>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonText,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonButton,
  IonIcon,
  IonCardContent,
  IonContent,
  IonListHeader,
  IonFooter,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonSkeletonText,
  IonCheckbox,
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
import { useCartStore } from "@/stores/CartStore";
import { PaymentMode } from "@/models/PaymentMode";
import PaymentMethodHeader from "@/components/header/PaymentMethodHeader.vue";
import SelectPaymentMethod from "@/components/modules/PaymentMethod/SelectPaymentMethod.vue";

export default defineComponent({
  components: {
    IonPage,
    IonText,
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
    IonListHeader,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonSkeletonText,
    IonRow,
    IonCol,
    IonCheckbox,
    NoResults,
    IonInput,
    IonCardHeader,
    IonCardSubtitle,
    IonImg,
    IonCardTitle,
    PaymentOptionsHeader,
    SelectPaymentMethod,
    IonRadio,
    IonRadioGroup,
    PaymentMethodHeader,
  },

  data() {
    return {
      showPayDropdown: false,
      form: {
        fields: {
          payment_modes_id: 1,
        },
      },
      paymentModes: [
        new PaymentMode({
          id: 1,
          name: this.$t("vendor.sales.cash"),
          description: "Pay cash on delivery",
        }),
        new PaymentMode({
          id: 2,
          name: this.$t("vendor.sales.mobileMoney"),
          description: "Pay cash on delivery",
        }),
        new PaymentMode({
          id: 3,
          name: this.$t("vendor.sales.cheque"),
          description: "Pay cash on delivery",
        }),
      ],
    };
  },
  methods: {
    selectPaymentMethod(paymentMode: PaymentMode) {
      this.form.fields.payment_modes_id = paymentMode.id as number;
    },
    storePaymentOption() {
      const cartStore = useCartStore();
      const order = cartStore.orders.find(
        (b) => b.businesses_id == Number(this.$route.params.id)
      );

      if (order) {
        order.payment_modes_id = +this.form.fields.payment_modes_id;
      }

      cartStore.persist();
      this.$router.push(
        `/shopper/cart/business/${this.$route.params.id}/item-review`
      );
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
ion-item {
  &::part(native) {
    padding: 8px 10px;
    --padding-start: 0px;
    --inner-padding-end: 0px;
  }
}
</style>
