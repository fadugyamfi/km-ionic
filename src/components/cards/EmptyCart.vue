<template>
  <div class="ion-text-center ion-padding-horizontal">
    <div class="ion-text-center ion-margin-bottom" style="margin-top: 90px">
      <img
        src="/images/vendor/shopping-cart.png"
        style="width: 120x; height: 150px"
      />
    </div>
    <section class="ion-text-center" style="margin-bottom: 24px">
      <h5><b>Your cart is empty</b></h5>
      <p class="ion-margin-top" style="font-size: 0.88em; color: #74787c">
        Looks like you haven’t added anything to your cart yet. Add items to get
        started.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonButton, IonList, IonFooter } from "@ionic/vue";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { Order } from "@/models/Order";

export default defineComponent({
  data() {
    return {
      orders: [] as Order[],
    };
  },
  components: {
    IonButton,
    IonList,
    KolaYellowButton,
    IonFooter,
  },
  methods: {
    startShopping() {
      this.$router.push("/shopper/home");
    },
  },
});
</script>

<style lang="scss" scoped></style>
