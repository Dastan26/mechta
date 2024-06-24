<script setup lang="ts">
import { useFiltersStore } from '@/store/filters';

const filters = useFiltersStore();

onMounted(() => {
  filters.fetchAllProducts();
});
</script>
<template>
  <main>
    <div v-if="pending">
      Loading ...
    </div>
    <products v-else :data="filters.filteredProducts"/>
  </main>
</template>