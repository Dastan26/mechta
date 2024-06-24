<script setup lang="ts">
import type { Product } from '~/interfaces/IProduct.ts'
import { useFavoritesStore } from '@/store/favorites';
import { useCartStore } from '@/store/cart';
import { formatReviewsLabel, formatPrice } from '~/utils/index.js'
import { useFiltersStore } from '@/store/filters';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})

const filters = useFiltersStore();

const favorites = useFavoritesStore();
const cart = useCartStore()

function toggleFavorite(product: Product) {
  favorites.toggleFavorite(product);
}

function toggleCart(product: Product) {
  cart.toggleCart(product);

}

const isActive = ref('')
function applyFilters(val: string) {
  isActive.value = val
  filters.setFilters({
    priceSort: val,
  });
  localStorage.setItem('priceSort', val);
}

onMounted(() => {
  cart.loadFromLocalStorage();
});
</script>
<template>
  <div class="filters mt-6 max-w-6xl mx-56 flex items-center gap-4">
    <span class="text-black">Сортировать:</span>
    <button 
      :class="{'active' : isActive === 'asc'}"
      class="text-black text-sm" 
      @click="applyFilters('asc')"
    >
      Сначала подешевле
    </button>
    <button 
      :class="{'active' : isActive === 'desc'}"
      class="text-black" 
      @click="applyFilters('desc')"
    >
      Сначала подороже
    </button>
  </div>
  <div class="container flex flex-wrap gap-6">
    <div v-for="card in props.data" class="card-wrapper">
      <div 
        class="card py-6 px-5 mt-6 flex flex-col justify-center cursor-pointer"
      >
        <nuxt-link :to="card.id" class="mx-auto">
          <img class="max-w-60" :src="card.image" alt="good's image">
        </nuxt-link>
        <h4 class="card-title font-semibold	mt-3">{{card.title}}</h4>
        <div class="card-rating__block flex gap-2 mt-2">
          <span v-for="score in 5">
            <img class="rating" src="~/assets/icons/grey-star.svg"/>
          </span>
          <span>
            {{ formatReviewsLabel(card.ratesCount)  }}
          </span>
        </div>
        <div class="flex gap-2 items-center mt-6">
          <span class="old-price line-through text-base">{{ formatPrice((card.price * 100) / (100 - card.discount)) }} ₸</span>
          <span class="discount rounded-full px-2 py-0.5">{{ card.discount }}%</span>
        </div>
        <div class="flex justify-between items-end">
          <h2 class="text-3xl font-bold">{{ formatPrice(card.price) }} ₸</h2>
          <button 
            class="main-btn"
            @click.stop="toggleCart(card)"
          >
            <img src="~/assets/icons/btn-cart.svg" alt="">
          </button>
        </div>
      </div>
      <button
        class="like-btn rounded-full p-2 max-w-fit"
        @click.stop="toggleFavorite(card)"
      >
        <img src="~/assets/icons/heart-outline.svg" alt="">
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.filters{
  border: 1px solid $border-color;
  padding: 4px 20px;
  border-radius: 12px;

  button {
    color: $filters;
    font-size: 14px;
    font-weight: 400;
    text-transform: capitalize;
    transition: ease-in 0.3s;
  }
}
.active{
  color: $primary-color !important;
  border-bottom: 1px solid $primary-color;
}
.card-wrapper{
  position: relative;
}
.card{
  border: 1px solid $border-color;
  border-radius: 16px;
  max-width: 306px;
}
.card-rating__block{
  color: $light-text;
}
.old-price{
  color: $secondary-color;
}
.discount{
  background: $red;
  color: white
}

.like-btn{
  background-color: $like-bg;
  position: absolute;
  top: 36px;
  right: 12px;
  z-index: 10;

  &:active{
    background: $like-bg-click;
  }
}

@media (max-width: 390px) {
  .filters{
    margin: 16px 0;
  }
  .container{
    justify-content: center;
  }
}
</style>