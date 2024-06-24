<script setup lang="ts">
import { useFiltersStore } from '@/store/filters';

const filters = useFiltersStore();

const searchQuery = ref('');

function applyFilters() {
  filters.setFilters({
    searchQuery: searchQuery.value,
  });
}

const search = ref<string>('Поиск товара')
</script>

<template>
  <label for="" class="relative block max-w-2xl w-full">
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
    </span>
    <input 
      v-model="searchQuery" 
      type="text" 
      :placeholder="search" 
      class="bg-white rounded-full px-6 py-3 w-full"
      @input="applyFilters"  
    >
  </label>
</template>