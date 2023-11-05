<template>
  <ion-page>
    <!-- Header -->
    <section class="ion-padding">
      <PaymentOptionsHeader />
    </section>

    <!-- Main Content -->
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <form>
        <section class="d-flex flex-column ion-margin-bottom">
          <IonText class="fw-semibold">Pay Now</IonText>
          <IonText color="medium" class="font-medium"
            >Select a payment method</IonText
          >
        </section>

        <section class="d-flex flex-column ion-margin-bottom">
          <PayOnDelivery />
        </section>

        <section class="d-flex flex-column ion-margin-bottom">
          <IonText class="fw-semibold">Pay Later</IonText>
          <IonText color="medium" class="font-medium"
            >Select a pay later option</IonText
          >
        </section>

        <section class="d-flex flex-column ion-margin-bottom">
          <!-----------Pay over 2 weeks----------------->
          <ion-card>
            <ion-card-content>
              <section
                class="d-flex ion-justify-content-between ion-align-items-center"
              >
                <IonText class="fw-semibold">Pay over 2 weeks</IonText>
                <section class="d-flex ion-align-items-center">
                  <img
                    loading="lazy"
                    src="/img/icons/chevron-down.svg"
                    class="image"
                    @click="toggleDropdown('pay2Weeks')"
                  />
                </section>
              </section>
            </ion-card-content>
          </ion-card>
          <ion-card v-if="showDropdown.pay2Weeks">
            <section class="card-section">
              <ion-radio-group>
                <section class="radio-section">
                  <p class="radio-text">Pay 50% installment each week</p>
                  <section class="d-flex ion-align-items-center">
                    <IonText class="fw-semibold ion-margin-end"></IonText>
                    <ion-radio
                      v-model="form.fields.payLaterDueDate"
                      :disabled="form.fields.payLaterInstallmentWeeks"
                    ></ion-radio>
                  </section>
                </section>
              </ion-radio-group>
              <ion-radio-group>
                <section class="radio-section">
                  <p class="radio-text">Pay 100% on the due date</p>
                  <section class="d-flex ion-align-items-center">
                    <IonText class="fw-semibold ion-margin-end"></IonText>
                    <ion-radio
                      v-model="form.fields.payLaterInstallmentWeeks"
                      :disabled="form.fields.payLaterDueDate"
                    ></ion-radio>
                  </section>
                </section>
              </ion-radio-group>
              <p class="radio-text">
                Subject to Approval. Markup of 2.5% will be added to the total
                price
              </p>
            </section>
          </ion-card>

          <!-----------Pay over 4 weeks----------------->
          <ion-card>
            <ion-card-content>
              <section
                class="d-flex ion-justify-content-between ion-align-items-center"
              >
                <IonText class="fw-semibold">Pay over 4 weeks</IonText>
                <section class="d-flex ion-align-items-center">
                  <img
                    loading="lazy"
                    src="/img/icons/chevron-down.svg"
                    class="image"
                    @click="toggleDropdown('pay4Weeks')"
                  />
                </section>
              </section>
            </ion-card-content>
          </ion-card>
          <ion-card v-if="showDropdown.pay4Weeks">
            <section class="card-section">
              <ion-radio-group>
                <section class="radio-section">
                  <p class="radio-text">Pay 25% instalment each week</p>
                  <section class="d-flex ion-align-items-center">
                    <IonText class="fw-semibold ion-margin-end"></IonText>
                    <ion-radio
                      v-model="form.fields.payInstalmentWeek"
                    ></ion-radio>
                  </section>
                </section>
              </ion-radio-group>
              <ion-radio-group>
                <section class="radio-section">
                  <p class="radio-text">Pay 50% instalment every 2 weeks</p>
                  <section class="d-flex ion-align-items-center">
                    <IonText class="fw-semibold ion-margin-end"></IonText>
                    <ion-radio v-model="form.fields.payInstalment"></ion-radio>
                  </section>
                </section>
              </ion-radio-group>
              <ion-radio-group>
                <section class="radio-section">
                  <p class="radio-text">Pay 100% on the due date</p>
                  <section class="d-flex ion-align-items-center">
                    <IonText class="fw-semibold ion-margin-end"></IonText>
                    <ion-radio v-model="form.fields.payDueDate"></ion-radio>
                  </section>
                </section>
              </ion-radio-group>
              <p class="radio-text">
                Subject to Approval. Markup of 2.5% will be added to the total
                price
              </p>
            </section>
          </ion-card>
        </section>

        <IonFooter class="ion-padding ion-no-border">
          <KolaYellowButton @click="viewItemReview">Continue</KolaYellowButton>
        </IonFooter>
      </form>
    </ion-content>
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
import { mapStores } from "pinia";
import { useProductStore } from "@/stores/ProductStore";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import Image from "@/components/Image.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import NoResults from "../../../components/layout/NoResults.vue";
import PaymentOptionsHeader from "@/components/header/PaymentOptionsHeader.vue";
import PayOnDelivery from "@/components/modules/deliveryDetails/PayOnDelivery.vue";

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
          payLaterInstallmentWeeks: false,
          payLaterDueDate: false,
          payInstalment: false,
          payInstalmentWeek: false,
          payDueDate: false,
        },
      },
    };
  },

  // ...mapStores(useProductStore)
  handleRadioSelection(selectedOption: string) {
    if (selectedOption === "payLaterInstallmentWeeks") {
      this.form.fields.payLaterDueDate = false;
      this.form.fields.payLaterInstallmentWeeks = true; // Enable installment radio
    } else if (selectedOption === "payLaterDueDate") {
      this.form.fields.payLaterInstallmentWeeks = false;
      this.form.fields.payLaterDueDate = true; // Enable due date radio
    }
  },

  methods: {
    handleRadioSelection(selectedOption: string) {
      if (selectedOption === "payLaterInstallmentWeeks") {
        this.form.fields.payLaterDueDate = false;
        this.form.fields.payLaterInstallmentWeeks = true;
      } else if (selectedOption === "payLaterDueDate") {
        this.form.fields.payLaterInstallmentWeeks = false;
        this.form.fields.payLaterDueDate = true;
      }
    },
    viewItemReview() {
      this.$router.push(
        `/shopper/cart/business/${this.$route.params.id}/item-review`
      );
    },

    toggleDropdown(dropdownName: DropdownName) {
      this.showDropdown[dropdownName] = !this.showDropdown[dropdownName];
    },
  },
});
</script>

<style scoped lang="scss">
ion-card {
  margin: 2px;
  color: #000000;
  padding: 9px;
}

.card-section {
  margin: 0;
}

.radio-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

ion-radio.radio-checked::part(container) {
  background: #21d187;
  border-color: transparent;
}

.radio-text {
  color: #787486;
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
