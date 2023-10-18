<!-- SupplierPills.vue -->
<template>
    <section class="ion-no-border">
      <Swiper :slides-per-view="4">
        <SwiperSlide v-for="supplier in suppliers" :key="supplier.id">
          <SupplierPill :supplier="supplier" @click="viewSupplier(supplier)"></SupplierPill>
        </SwiperSlide>
      </Swiper>
    </section>
  </template>
  
  <script lang="ts">
  import 'swiper/scss';
  import '@ionic/vue/css/ionic-swiper.css';
  
  import { IonSearchbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import SupplierPill from './SupplierPill.vue';
  import { useSupplierStore } from '@/stores/SupplierStore';
  import Business from '@/models/Business';
  import { mapStores } from 'pinia';
  
  export default defineComponent({
    components: {
      IonSearchbar,
      SupplierPill,
      Swiper,
      SwiperSlide,
    },
  
    data() {
      return {
        suppliers: [] as Business[],
      };
    },
  
    computed: {
      ...mapStores(useSupplierStore),
    },
  
    methods: {
        async fetchSuppliers(supplierId?: number) {
      // Pass the supplierId to the getSuppliers method
      this.suppliers = await this.supplierStore.getSupplier(supplierId);
    },
  
      viewSupplier(supplier: Business) {
        this.$router.push(`/shopper/home/suppliers/${supplier.id}`);
      },
    },
  
    mounted() {
      setTimeout(() => this.fetchSuppliers(), 300);
    },
  });
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  