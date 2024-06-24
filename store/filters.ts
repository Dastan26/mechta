import { defineStore } from 'pinia';
import type { Product } from '~/interfaces/IProduct.ts'
import type { FilterParams } from '~/interfaces/IFilter.ts'

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    searchQuery: '',
    categoryFilter: '',
    priceSort: 'none' as 'none' | 'asc' | 'desc',
    filteredProducts: [] as Array<Product>,
    allProducts: [] as Array<Product>,
  }),
  actions: {
    async fetchAllProducts() {
      try {
        const { data: products } = await useFetch('https://665801795c36170526468b7c.mockapi.io/api/v1/products');
        this.setAllProducts(products);

        const savedPriceSort = localStorage.getItem('priceSort');
        if (savedPriceSort) {
          this.priceSort = savedPriceSort as 'asc' | 'desc';
          this.applyFilters();
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    setFilters({ searchQuery, priceSort }: FilterParams) {
      this.searchQuery = searchQuery || '';
      this.priceSort = priceSort || 'none';
      this.applyFilters();
    },
    applyFilters() {
      const { searchQuery, priceSort, allProducts } = this;

      let filtered = allProducts.filter(product =>
        (!searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (priceSort === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (priceSort === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
      }

      this.filteredProducts = filtered;
    },
    setAllProducts(products: Array<Product>) {
      this.allProducts = products;
      this.applyFilters();
    },
  },
});
