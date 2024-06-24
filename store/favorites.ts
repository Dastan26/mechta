import { defineStore } from 'pinia';
import type { Product } from '~/interfaces/IProduct.ts'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as Array<Product>,
  }),
  actions: {
    addToFavorites(product: Product) {
      if (!this.items.find((item: { id: number; }) => item.id === product.id)) {
        this.items.push(product);
        localStorage.setItem('favorites-items', JSON.stringify(this.items));
      }
    },
    removeFromFavorites(productId: number) {
      this.items = this.items.filter((item: { id: number; }) => item.id !== productId);
      localStorage.removeItem('favorites-items')
    },
    toggleFavorite(product: Product) {
      const existingItem = this.items.find((item: { id: number; }) => item.id === product.id);
      if (existingItem) {
        this.removeFromFavorites(product.id);
      } else {
        this.addToFavorites(product);
      }
    },
    loadFromLocalStorage() {
      const savedItems = localStorage.getItem('favorites-items');
      if (savedItems) {
        this.items = JSON.parse(savedItems);
      }
    },
  },
});