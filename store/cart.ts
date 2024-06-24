import { defineStore } from 'pinia';
import type { Product } from '~/interfaces/IProduct.ts'
import type { CartItem } from '~/interfaces/ICart.ts'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Array<CartItem>,
  }),
  actions: {
    addToCart(product: Product, quantity: number = 1) {
      const existingItem = this.items.find((item: { product: { id: number; }; }) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      localStorage.setItem('cart-items', JSON.stringify(this.items));
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((item: { product: { id: number; }; }) => item.product.id !== productId);
      localStorage.removeItem('cart-items');
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item: { product: { id: number; }; }) => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveToLocalStorage();
      }
    },
    toggleCart(product: Product) {
      const existingItem = this.items.find((item: { product: { id: number; }; }) => item.product.id === product.id);
      if (existingItem) {
        this.removeFromCart(product.id);
      } else {
        this.addToCart(product);
      }
    },
    loadFromLocalStorage() {
      const savedItems = localStorage.getItem('cart-items');
      if (savedItems) {
        this.items = JSON.parse(savedItems);
      }
    },
  },
});
