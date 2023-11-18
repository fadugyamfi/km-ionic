<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <PaymentMethodHeader />
    </section>

    <!-- Main Content -->
    <ion-content>
      <form>
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
      </form>
    </ion-content>
    <IonFooter class="ion-padding ion-no-border">
      <KolaYellowButton @click="storePaymentOption"
        >Make Payment</KolaYellowButton
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
import { useCartStore } from "@/stores/CartStore";
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
          payment_option_id: "1",
        },
      },
    };
  },
  methods: {
    storePaymentOption() {
      const cartStore = useCartStore();
      const order = cartStore.orders.find(
        (b) => b.businesses_id == Number(this.$route.params.id)
      );

      if (order) {
        order.payment_option_id = +this.form.fields.payment_option_id;
      }

      cartStore.persist();
      this.$router.push(
        `/shopper/cart/business/${this.$route.params.id}/delivery-details`
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
.new-card {
  color: #666EED !important;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
}

.ion-margin-bottom {
  margin-bottom: -5px;
}
</style>
