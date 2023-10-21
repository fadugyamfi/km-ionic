<template>
  <ion-searchbar
    v-model="searchTerm"
    @ionInput="onSearchInput"
    @ionClear="onClearSearch"
    placeholder="Search businesses"
  ></ion-searchbar>

  <BusinessesList :businesses="filteredBusinesses"></BusinessesList>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { IonSearchbar } from '@ionic/vue';
import { useBusinessStore } from '@/stores/BusinessStore';
import BusinessesList from '@/components/lists/BusinessesList.vue';
import Business from '@/models/Business';

const { getBusinesses } = useBusinessStore();
const businesses = ref<Business[]>([]);
const searchTerm = ref<string>('');
const filteredBusinesses = ref<Business[]>([]);

const fetchBusinesses = async () => {
  businesses.value = await getBusinesses();
  // Initial filtered list is the same as the full list
  filteredBusinesses.value = [...businesses.value];
};

const filterBusinesses = (source: Business[], term: string) =>
  source.filter((business) =>
    business.name.toLowerCase().includes(term.toLowerCase())
  );

const onSearchInput = () => {
  // Reuse the filtering logic
  filteredBusinesses.value = filterBusinesses(businesses.value, searchTerm.value);
};

const onClearSearch = () => {
  searchTerm.value = '';
  // Reset filtered list to the full list
  filteredBusinesses.value = [...businesses.value];
};

watch(searchTerm, onSearchInput);

onMounted(fetchBusinesses);
</script>
