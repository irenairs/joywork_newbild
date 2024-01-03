<template>
  <div
    class="chessLayoutsCart chessLayouts__item rounded-md border border-grey-400 p-5"
  >
    <div class="chessLayoutsCart__found">
      <div class="chessLayoutsCart__countRoom">1к</div>
      <div class="chessLayoutsCart__text">25 квартир найдено</div>
    </div>
    <div class="chessLayoutsCart__image">
      <div class="image__hover">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M72.8025 62.1975L60.3037 49.6975C58.0856 47.4794 54.5888 47.0231 51.8113 48.2762L49.3456 45.8106C52.8763 41.4994 55 35.9944 55 30C55 16.2144 43.7856 5 30 5C16.2144 5 5 16.2144 5 30C5 43.7856 16.2144 55 30 55C35.9944 55 41.4994 52.8763 45.8106 49.3456L48.2506 51.7856C47.7756 52.7806 47.5 53.865 47.5 55C47.5 57.0031 48.28 58.8869 49.6975 60.3025L62.1963 72.8025C63.6138 74.22 65.4969 75 67.5 75C69.5031 75 71.3869 74.22 72.8025 72.8037C74.22 71.3863 75 69.5031 75 67.5C75 65.4969 74.22 63.6131 72.8025 62.1975ZM30 50C18.9719 50 10 41.0281 10 30C10 18.9719 18.9719 10 30 10C41.0281 10 50 18.9719 50 30C50 41.0281 41.0281 50 30 50ZM69.2663 69.2675C68.3237 70.2125 66.6769 70.2125 65.7325 69.2675L53.2325 56.7675C53.2325 56.7675 53.2325 56.7675 53.2325 56.7662C52.76 56.295 52.5 55.6675 52.5 55C52.5 54.3325 52.76 53.705 53.2338 53.2325C53.705 52.76 54.3325 52.5 55 52.5C55.6675 52.5 56.295 52.76 56.7675 53.2325L69.2675 65.7338C69.74 66.205 70 66.8325 70 67.5C70 68.1675 69.74 68.795 69.2663 69.2675ZM40 30C40 31.3806 38.8806 32.5 37.5 32.5H32.5V37.5C32.5 38.8806 31.3806 40 30 40C28.6194 40 27.5 38.8806 27.5 37.5V32.5H22.5C21.1194 32.5 20 31.3806 20 30C20 28.6194 21.1194 27.5 22.5 27.5H27.5V22.5C27.5 21.1194 28.6194 20 30 20C31.3806 20 32.5 21.1194 32.5 22.5V27.5H37.5C38.8806 27.5 40 28.6194 40 30Z"
            fill="#222222"
          />
        </svg>
      </div>
      <img
        :src="require('@/shared/assets/images/layoutsRoom/layout1.png')"
        alt=""
      />
    </div>
    <Dropdown
      class="mb-2.5"
      :options="apartaments"
      :pt="{
        root: {
          class: ['!h-max'],
        },
        input: {
          class: ['!p-0 !flex !h-max'],
        },
        trigger: {
          class: ['ml-2'],
        },
        item: {
          class: ['!flex'],
        },
      }"
    >
      <template #dropdownicon>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.76693 8.7418L10.0003 11.9752L13.2336 8.7418C13.5586 8.4168 14.0836 8.4168 14.4086 8.7418C14.7336 9.0668 14.7336 9.59183 14.4086 9.91683L10.5836 13.7418C10.2586 14.0668 9.73362 14.0668 9.40862 13.7418L5.58359 9.91683C5.25859 9.59183 5.25859 9.0668 5.58359 8.7418C5.90859 8.42513 6.44193 8.4168 6.76693 8.7418Z"
            fill="#666666"
          />
        </svg>
      </template>
      <template #value>
        <div class="chessLayoutsCart__status bg-green"></div>
        <div class="chessLayoutsCart__price border-r border-grey-400 grow">
          <div class="mainPrice font-bold mb-2">1 250 000 руб.</div>
          <div class="desc text-xs">
            35,6 м2 <span class="text-grey-900">- 56 450 руб./м2</span>
          </div>
        </div>
        <div class="chessLayoutsCart__floor flex flex-col ml-5 py-1 xl:ml-2">
          <div class="floor text-xs text-black mb-2.5">25 этаж</div>
          <div class="numberRoom text-grey-900 text-xs">№99</div>
        </div>
      </template>
      <template #option="slotProps">
        <div
          class="chessLayoutsCart__status"
          :class="[slotProps.option.status === 'free' ? 'bg-green' : '']"
        ></div>
        <div class="chessLayoutsCart__price border-r border-grey-400 grow">
          <div class="mainPrice font-bold mb-2">
            {{ slotProps.option.price }}
          </div>
          <div class="desc text-xs">
            {{ slotProps.option.square }} м2
            <span class="text-grey-900"
              >- {{ slotProps.option.priceForMetr }} руб./м2</span
            >
          </div>
        </div>
        <div class="chessLayoutsCart__floor flex flex-col ml-5 py-1 xl:ml-2">
          <div class="floor text-xs text-black mb-2.5">
            {{ slotProps.option.floor }} этаж
          </div>
          <div class="numberRoom text-grey-900 text-xs">
            №{{ slotProps.option.numberApartament }}
          </div>
        </div>
      </template>
    </Dropdown>
    <MyButton
      :theme="'green'"
      class="!w-max !rounded-2xl mx-auto !px-5"
      @click="emits('openWindow')"
      >Подробнее</MyButton
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const apartaments = ref([
  {
    countRoom: 1,
    price: "1 250 000 руб.",
    square: "35",
    priceForMetr: "56 450",
    status: "free",
    floor: 25,
    numberApartament: 100,
  },
  {
    countRoom: 1,
    price: "1 250 000 руб.",
    square: "35",
    priceForMetr: "56 450",
    status: "free",
    floor: 25,
    numberApartament: 100,
  },
  {
    countRoom: 1,
    price: "1 250 000 руб.",
    square: "35",
    priceForMetr: "56 450",
    status: "free",
    floor: 25,
    numberApartament: 100,
  },
  {
    countRoom: 1,
    price: "1 250 000 руб.",
    square: "35",
    priceForMetr: "56 450",
    status: "free",
    floor: 25,
    numberApartament: 100,
  },
]);

const emits = defineEmits<{
  (e: "openWindow"): void;
}>();
</script>

<style scoped lang="scss">
.chessLayoutsCart {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &__found {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }

  &__countRoom {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    @apply border;
    @apply border-grey-900;
    @apply text-grey-900;
    margin-right: 10px;
  }

  &__text {
    font-size: 12px;
    @apply text-grey-900;
  }

  &__image {
    position: relative;
    width: 100%;
    height: auto;
    padding: 0 22px;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    .image__hover {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      background-color: rgba(#ffffff, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: 0.5s all ease-in-out;
    }

    &:hover {
      .image__hover {
        opacity: 1;
        visibility: visible;
        transition: 0.5s all ease-in-out;
        cursor: pointer;
      }
    }
  }

  &__info {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__status {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    margin-top: 8px;
    margin-right: 10px;
  }

  &__price {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
