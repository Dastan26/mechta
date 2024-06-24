<script setup lang="ts">
import { formatReviewsLabel, formatPrice } from '~/utils/index.js'

const router = useRouter();
const { id } = router.currentRoute.value.params;

const { data: res } = await useFetch(`https://665801795c36170526468b7c.mockapi.io/api/v1/products/${id}`)
</script>

<template>
  <div class="container">
    <div class="">
      <h1 class="card-title font-semibold	mt-3 text-3xl">{{res.title}}</h1>
      <div class="card-rating__block flex gap-2 mt-2">
        <span v-for="score in 5">
          <img class="rating" src="~/assets/icons/grey-star.svg"/>
        </span>
        <span>
          {{ formatReviewsLabel(res.ratesCount)  }}
        </span>
      </div>
    </div>
    <div
      class="card-wrapper flex gap-6"
    >
      <img class="card py-6 px-5 mt-5 max-w-2xl" :src="res.image" alt="good's image">

      <div class="text-base mt-5">
        <p>{{res.description}}</p>

        <h3 class="font-bold text-base mt-8">О товаре</h3>
        <table>
          <tr>
            <th>Страна-изготовитель</th>
            <td>{{res.countryManufacturer}}</td>
          </tr>
          <tr>
            <th>Материал оправы</th>
            <td>{{res.material}}</td>
          </tr>
          <tr>
            <th>Материал линзы</th>
            <td>{{res.lenseMaterial}}</td>
          </tr>
          <tr>
            <th>Ширина линзы, мм</th>
            <td>{{res.lenseWidth}}</td>
          </tr>
          <tr>
            <th>Разъем</th>
            <td>{{res.connector}}</td>
          </tr>
        </table>
        <div class="buttons-block w-full mt-20 rounded-2xl p-4 drop-shadow-lg">
          <div class="flex items-end gap-1 mb-6">
            <h2 class="text-3xl font-bold">
              {{ formatPrice(res.price) }} ₸
            </h2>
            <p class="old-price line-through text-base">
              {{ formatPrice((res.price * 100) / (100 - res.discount)) }} ₸
            </p>
          </div> 
          <div class="grid grid-cols-3 gap-4">
            <button class="main-btn col-span-2 ">
              купить
            </button>
            <button class="like-btn rounded-full p-2 max-w-fit	">
              <img src="~/assets/icons/heart-outline.svg" alt="">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

p{
  color: $desc-text-color
}
.card{
  border: 1px solid $border-color;
  border-radius: 16px;
  max-width: fit-content;
  position: relative;
}
.card-rating__block{
  color: $light-text;
}
table{
  display: flex;
  flex-direction: column;
  tr{
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    th{
      color: $table-text-color;
      font-weight: 500;
      text-align: start;
      padding: 12px 0;
    }
    td{
      font-weight: 600;
      text-align: start;
    }
  }
}

.old-price{
  color: $secondary-color;
}
.like-btn{
  background-color:  $like-bg-click;

  &:active{
    background: $like-bg;
  }
}

@media (max-width: 390px) {
  .card-wrapper{
    flex-direction: column;
  }
  .buttons-block{
    margin-top: 12px;
  }
}
</style>