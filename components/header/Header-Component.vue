<script setup lang="ts">
import { useFavoritesStore } from '@/store/favorites';
import { useCartStore } from '@/store/cart';
import SearchComponent from '../inputs/Search-Component.vue';


const favorites = useFavoritesStore();
const cart = useCartStore()

onMounted(() => {
  favorites.loadFromLocalStorage();
  cart.loadFromLocalStorage();
});
</script>

<template>
  <header class="header mx-auto py-5">
    <div class="container flex gap-6 justify-center items-center">
      <nuxt-link to="/">
        <img src="~/assets/icons/logo.svg" class="logo" alt="">
      </nuxt-link>
      <SearchComponent />
      <nav class="flex items-center">
        <ul class="flex gap-6">
          <li
            :class="{ 'favorite': favorites.items.length > 0 }"
            :data-content="favorites.items.length" 
            class="cursor-pointer "
          >
            <nuxt-link to="/liked"><img src="~/assets/icons/heart.svg" alt=""></nuxt-link>
          </li>
          <li
            :class="{ 'favorite': cart.items.length > 0 }"
            :data-content="cart.items.length"  
            class="cursor-pointer"
          >
            <nuxt-link to="/cart"><img src="~/assets/icons/cart.svg" alt=""></nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
@import '~/assets/styles/variables';

.header{
  background: $primary-color;

  .favorite{
    position: relative;
  }
  .favorite::after{
    content: attr(data-content);
    position: absolute;
    display: inline-block;
    background-color: red;
    bottom: -10px;
    right: -6px;
    color: white;
    padding: 0 5px;
    border-radius: 50%;
    font-size: 12px;
  }
}

@media (max-width: 390px) {
  .header{
    .logo{
      display: none;
    }
  }
  .container {
    padding: 0 16px;
  }
}
</style>