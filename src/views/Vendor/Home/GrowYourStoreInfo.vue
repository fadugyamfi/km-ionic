<template>
  <IonCard>
    <IonCardContent>
      <section class="intro-point">
        <span class="icon">
          <IonImg src="/images/vendor/coin-stack.svg"></IonImg>
        </span>

        <section class="content">
          <h6>Invite Customers</h6>
          <p>
            Invite your customers offline to find your store and shop from you.
            Shops who use this approach see a spike in order value and repeat
            purchases
          </p>
        </section>
      </section>
      <InviteCustomerButton />
      <section class="intro-point">
        <span class="icon">
          <IonImg src="/images/vendor/trending.svg"></IonImg>
        </span>

        <section class="content">
          <h6>Promote Your Store</h6>
          <p>
            Kola connects you with a diverse community of customers actively
            seeking quality products like yours. We promote your store for FREE
            for 4 weeks. Keep promoting your store to get more orders
          </p>
        </section>
      </section>

      <!-- <ShareProfileButton /> -->
      <section class="d-flex">
        <IonButton
          expand="block"
          class="intro-btn white ion-margin-bottom"
          :router-link="`/vendor/home/businesses/${userStore?.activeBusiness?.id}`"
        >
          {{ $t("vendor.home.viewYourStock") }}
        </IonButton>
        <ShareProfileButton></ShareProfileButton>
      </section>

      <section class="intro-point">
        <span class="icon">
          <IonImg src="/images/vendor/phone-outgoing.svg"></IonImg>
        </span>

        <section class="content">
          <h6>Offers, discounts & promotions</h6>
          <p>
            Shops who offer discounts and FREE Delivery receive 2x more orders.
            Get in touch with us to set up your first promotion. We use data to
            help you optimise for sales
          </p>
        </section>
      </section>

      <IonButton
        expand="block"
        class="intro-btn warning ion-margin-bottom"
        @click="openWhatsAppChat()"
      >
        {{ $t("vendor.home.chatWithUs") }}
      </IonButton>
    </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/vue";
import { defineComponent } from "vue";
import InviteCustomerButton from "@/components/buttons/InviteCustomerButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
// import ShareProfileButton from "@/components/buttons/ShareProfileButton.vue";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import ShareProfileButton from "@/components/buttons/ShareProfileButton.vue";
export default defineComponent({
  data() {
    return {};
  },

  components: {
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg,
    IonButton,
    InviteCustomerButton,
    KolaWhiteButton,
    ShareProfileButton,
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    openWhatsAppChat() {
      window.open("https://wa.me/233270404501", "_system", "location=yes");
    },
  },
});
</script>

<style scoped>
ion-card {
  --background: #fffbf5;
}

ion-card ion-card-content {
  --padding-top: 50px;
}

.intro-point {
  display: flex;
  align-items: start;
  margin-bottom: 1em;
}

.intro-point .icon {
  background-color: #f5aa2933;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  padding: 12px;
  margin-right: 10px;
}

.content h6 {
  font-weight: 500;
  font-size: 1em;
  margin-bottom: 5px;
  margin-top: 5px;
  color: #111;
}

.content p {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 0.75em;
  line-height: 1.8em;
  color: #74787c;
}

.intro-btn {
  text-transform: none;
  font-weight: 500;
  font-size: 0.85em;
  width: 100%;
}

.intro-btn.success {
  --background: #66f48e;
  --color: #101828;
  --box-shadow: none;
  --border-radius: 8px;
  margin-bottom: 3em;
}
.intro-btn.warning {
  --background: #f5aa29;
  --color: #101828;
  --box-shadow: none;
  --border-radius: 8px;
  margin-top: 1em;
}
.intro-btn.white {
  --background: #fff;
  --color: #101828;
  --box-shadow: none;
  --border-width: 1px;
  --border-style: solid;
  --border-radius: 8px;
  margin-bottom: 3em;
}
</style>
