<template>
  <section class="supplier-list d-flex">
    <IonSpinner name="crescent" v-if="leftColumnItems.length == 0"></IonSpinner>

    <section v-if="leftColumnItems.length > 0" class="d-flex flex-column ion-align-items-stretch">
      <SupplierCard
        v-for="(supplier, index) of leftColumnItems"
        :key="supplier.id"
        :supplier="supplier"
        :tall="index % 2 === 0"
        @click="onSupplierSelected(supplier)"
        :data-index="index"
      ></SupplierCard>
    </section>

    <section v-if="rightColumnItems.length > 0" class="d-flex flex-column ion-align-items-stretch">
      <SupplierCard
        v-for="(supplier, index) of rightColumnItems"
        :key="supplier.id"
        :supplier="supplier"
        :tall="index % 2 !== 0"
        @click="onSupplierSelected(supplier)"
        :data-index="index"
      ></SupplierCard>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Business from '@/models/Business';
import SupplierCard from '@/components/cards/SupplierCard.vue';
import { IonSpinner } from '@ionic/vue';

export default defineComponent({
  props: {
    suppliers: {
      default: [],
      type: Array as PropType<Array<Business>>,
    },
  },

  data() {
    return {
      leftColumnItems: [] as Array<Business>,
      rightColumnItems: [] as Array<Business>,
    };
  },

  components: { SupplierCard, IonSpinner },

  methods: {
    fillColumns() {
      this.leftColumnItems = this.suppliers.filter((supplier, index) => index % 2 === 0);
      this.rightColumnItems = this.suppliers.filter((supplier, index) => index % 2 !== 0);
      console.log(this.leftColumnItems, this.rightColumnItems)
    },

    onSupplierSelected(supplier: Business) {
      this.$router.push(`/shopper/home/businesses/${supplier.id}`);
    },
  },

  watch: {
    suppliers: function() {
      if( this.suppliers ) {
        this.fillColumns();
      }
    }
  }
});
</script>

<style lang="scss">
.supplier-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;

  .flex-column {
    width: 48%;
  }
}
</style>
