<template>
    <section class="suppliers-list d-flex">
      <section v-if="leftColumnItems.length > 0" class="d-flex flex-column ion-align-items-stretch">
        <SupplierCard
          v-for="(supplier, index) of leftColumnItems"
          :key="supplier.id"
          :supplier="supplier"
          :tall="index % 2 == 0"
          @click="onSupplierSelected(supplier)"
          :data-index="index"
        ></SupplierCard>
      </section>
  
      <section v-if="rightColumnItems.length > 0" class="d-flex flex-column ion-align-items-stretch">
        <SupplierCard
          v-for="(supplier, index) of rightColumnItems"
          :key="supplier.id"
          :supplier="supplier"
          :tall="index % 2 != 0"
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
  
    components: { SupplierCard },
  
    methods: {
      fillColumns() {
        this.leftColumnItems = this.suppliers.filter((supplier, index) => {
          return index % 2 == 0;
        });
  
        this.rightColumnItems = this.suppliers.filter((supplier, index) => {
          return index % 2 != 0;
        });
      },
  
      onSupplierSelected(supplier: Business) {
        this.$router.push(`/supplier/details/${supplier.id}`);
      },
    },
  
    mounted() {
      setTimeout(() => {
        this.fillColumns();
      }, 200);
    },
  });
  </script>
  
  <style lang="scss">
  .suppliers-list {
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
  