<template>
  <div class="ion-text-center ion-padding-horizontal">
    <div class="ion-text-center ion-margin-bottom" style="margin-top: 90px">
      <img
        src="/images/vendor/shopping-cart.png"
        style="width: 120x; height: 150px"
      />
    </div>
    <section class="ion-text-center">
      <h5 class="ion-no-margin fw-bold">Your cart is empty</h5>
      <p class="description">
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

<style lang="scss" scoped>
.description {
  font-size: 16px;
  font-weight: 400;
  margin-top: 6px;
  color: #74787c;
}
</style>
