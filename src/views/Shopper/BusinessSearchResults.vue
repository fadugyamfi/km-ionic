<template>
  <ion-searchbar
    v-model="searchTerm"
    @ionInput="onSearchInput"
    @ionClear="onClearSearch"
    placeholder="Search suppliers"
  ></ion-searchbar>

  <SuppliersList :suppliers="filteredSuppliers"></SuppliersList>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { IonSearchbar } from '@ionic/vue';
import { useSupplierStore } from '@/stores/SupplierStore';
import SuppliersList from '@/components/lists/SuppliersList.vue';
import Business from '@/models/Business';

const { getSuppliers } = useSupplierStore();
const suppliers = ref<Business[]>([]);
const searchTerm = ref<string>('');
const filteredSuppliers = ref<Business[]>([]);

const fetchSuppliers = async () => {
  suppliers.value = await getSuppliers();
  // Initial filtered list is the same as the full list
  filteredSuppliers.value = [...suppliers.value];
};

const filterSuppliers = (source: Business[], term: string) =>
  source.filter((supplier) =>
    supplier.name.toLowerCase().includes(term.toLowerCase())
  );

const onSearchInput = () => {
  // Reuse the filtering logic
  filteredSuppliers.value = filterSuppliers(suppliers.value, searchTerm.value);
};

const onClearSearch = () => {
  searchTerm.value = '';
  // Reset filtered list to the full list
  filteredSuppliers.value = [...suppliers.value];
};

watch(searchTerm, onSearchInput);

onMounted(fetchSuppliers);
</script>
