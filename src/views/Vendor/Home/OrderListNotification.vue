<template>
  <section class="ion-text-center">
    <img src="/images/vendor/shopping-cart.png" width="70" height="70" />

    <!-- <section v-if="orders.length == 0">
      <h4>{{ $t("vendor.home.yourOrderListIsEmpty") }}</h4>
      <p>{{ $t("vendor.home.emptyListInstruction") }}</p>
    </section> -->

    <section>
      <h4>
        {{ $t("vendor.home.youHaveXNewOrders", { orders: orders.length }) }}
      </h4>
      <p>{{ $t("vendor.home.pleaseTapOrdersButtonBelowToSeeThem") }}</p>
    </section>
  </section>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Order } from "@/models/Order";

export default defineComponent({
  props: {
    orders: {
      type: Array as PropType<Order[]>,
      default: () => [],
    },
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
section {
  width: 90%;
  margin: 0px auto;
  margin-bottom: 1.5em;

  h4 {
    font-size: 1em;
    font-weight: 500;
  }

  p {
    font-size: 0.75em;
    font-weight: normal;
    color: #74787c;
    margin-top: 0px;
  }
}
</style>
