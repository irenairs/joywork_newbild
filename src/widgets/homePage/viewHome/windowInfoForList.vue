<template>
  <div
    class="modelWindow"
    :class="[isOpen ? 'open' : '', openFullImage ? 'openFull' : '']"
    ref="window"
  >
    <div class="modelWindow__content">
      <div class="modelWindow__head">
        <div class="modelWindow__title mr-auto text-3xl">Квартира №32</div>
        <button
          class="modelWindow__close"
          @click="emits('update:isOpen'), (openFullImage = false)"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.8281 20L31.4141 11.4141C32.1953 10.6328 32.1953 9.36719 31.4141 8.58594C30.6328 7.80469 29.3672 7.80469 28.5859 8.58594L20 17.1719L11.4141 8.58594C10.6328 7.80469 9.36719 7.80469 8.58594 8.58594C7.80469 9.36719 7.80469 10.6328 8.58594 11.4141L17.1719 20L8.58594 28.5859C7.80469 29.3672 7.80469 30.6328 8.58594 31.4141C8.97656 31.8047 9.48828 32 10 32C10.5117 32 11.0234 31.8047 11.4141 31.4141L20 22.8281L28.5859 31.4141C28.9766 31.8047 29.4883 32 30 32C30.5117 32 31.0234 31.8047 31.4141 31.4141C32.1953 30.6328 32.1953 29.3672 31.4141 28.5859L22.8281 20Z"
              fill="#757575"
            />
          </svg>
        </button>
      </div>
      <div class="modelWindow__info">
        <div class="modelWindow__type">Студия</div>
        <div class="modelWindow__square">40,8 м2</div>
        <Dropdown
          :options="floors"
          v-model="activeFloor"
          :pt="dropdownStyle"
        ></Dropdown>
        <div class="modelWindow__status">Свободно</div>
      </div>
      <div class="modelWindow__image">
        <div class="image">
          <img
            :src="require('@/shared/assets/images/layoutsRoom/layout1.png')"
            alt=""
            class=""
          />
        </div>
        <div class="image__loop" @click="openFullImage = !openFullImage">
          <svg
            width="118"
            height="117"
            viewBox="0 0 118 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M72.75 52.7503C72.75 55.2503 71.0833 56.917 68.5833 56.917H35.25C32.75 56.917 31.0833 55.2503 31.0833 52.7503C31.0833 50.2503 32.75 48.5837 35.25 48.5837H68.5833C71.0833 48.5837 72.75 50.2503 72.75 52.7503ZM116.5 115.25C115.667 116.5 114.417 116.917 113.167 116.917C112.333 116.917 111.5 116.5 110.667 116.084L82.3333 94.0003C74 100.25 63.1667 104 51.9167 104C23.5833 104 0.25 81.0837 0.25 52.3337C0.25 23.5837 23.1667 0.666992 51.9167 0.666992C80.6667 0.666992 103.583 23.5837 103.583 52.3337C103.583 66.0837 98.1667 79.0003 89 88.167L116.083 109C117.75 110.667 118.167 113.584 116.5 115.25ZM51.9167 95.667C75.6667 95.667 95.25 76.5003 95.25 52.3337C95.25 28.167 75.6667 9.41699 51.9167 9.41699C28.1667 9.41699 8.58333 28.5837 8.58333 52.7503C8.58333 76.917 28.1667 95.667 51.9167 95.667Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <div class="modelWindow__btns">
        <RouterLink to="/" class="text-green font-bold mb-5"
          >Посмотреть на плане этажа</RouterLink
        >
        <MyButton :theme="'green'">Заявка на квартиру</MyButton>
      </div>
      <div class="modelWindow__price">10 580 000 руб.</div>
      <div class="modelWindow__priceSqure">558 000 руб./м2</div>
      <div class="modelWindow__settings">
        <div class="settings__title">Характеристики</div>
        <div class="settings__table">
          <div class="row">
            <div class="cell">Номер помещения</div>
            <div class="cell">32</div>
          </div>
          <div class="row">
            <div class="cell">Подъезд</div>
            <div class="cell">3</div>
          </div>
          <div class="row">
            <div class="cell">Этаж</div>
            <div class="cell">10</div>
          </div>
          <div class="row">
            <div class="cell">Название дома</div>
            <div class="cell">Демо Дом</div>
          </div>
          <div class="row">
            <div class="cell">Название ЖК</div>
            <div class="cell">Демо ЖК</div>
          </div>
          <div class="row">
            <div class="cell">Площадь, м2</div>
            <div class="cell">40,8</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modelWindow__fullImage" :class="openFullImage ? 'open' : ''">
      <img
        :src="require('@/shared/assets/images/layoutsRoom/layout1.png')"
        alt=""
        class=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DropdownPassThroughOptions } from "primevue/dropdown";
import { PTOptions } from "primevue/ts-helpers";
import { onMounted, ref, toRefs } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();
const emits = defineEmits<{
  (e: "update:isOpen"): void;
}>();

const { isOpen } = toRefs(props);

const window = ref<HTMLElement>();
const openFullImage = ref<boolean>(false);
const floors = ref(["10 этаж", "9 этаж", "7 этаж"]);
const activeFloor = ref("10 этаж");

const dropdownStyle = ref<PTOptions<DropdownPassThroughOptions>>({
  root: {
    class: ["!border-0"],
  },
  input: {
    class: ["!text-black"],
  },
});
</script>

<style scoped lang="scss">
.modelWindow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 0;
  height: 100% !important;
  z-index: 20;
  background-color: #ffffff;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: flex-start;
  visibility: hidden;
  transition: 0.5s all ease-in-out;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &.open {
    visibility: visible;
    width: 750px;
    transition: 0.5s all ease-in-out;
    opacity: 1;
  }

  &.openFull {
    width: 100%;
  }

  &__content {
    width: 100%;
    height: 100%;
    max-width: 750px;
    box-shadow: -2px 0px 6px 1px rgba(0, 0, 0, 0.25);
    padding: 50px;
    overflow-y: scroll;
  }

  &__fullImage {
    width: 0;
    height: 100%;
    visibility: hidden;
    transition: 0.5s all ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;

    &.open {
      width: 100%;
      visibility: visible;
      transition: 0.5s all ease-in-out;
    }

    img {
      width: 50%;
      height: auto;
      object-fit: cover;
    }
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  &__title {
    font-weight: 700;
  }

  &__info {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 30px;
    margin-bottom: 30px;
  }

  &__status {
    @apply bg-green;
    @apply text-white;
    @apply rounded-s-md;
    font-weight: 700;
    padding: 8px 10px;
    margin-left: auto;
    margin-right: -50px;
  }

  &__image {
    width: 100%;
    min-width: 500px;
    position: relative;
    margin-bottom: 30px;

    .image {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 50%;
      }
    }

    .image__loop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(#ffffff, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: 0.5s all ease-in-out;

      svg {
        width: 140px;
        height: 140px;
      }
    }

    &:hover {
      .image__loop {
        opacity: 1;
        visibility: visible;
        transition: 0.5s all ease-in-out;
        cursor: pointer;
      }
    }
  }

  &__btns {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  &__price {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  &__priceSqure {
    font-size: 18px;
    @apply text-grey-900;
    margin-bottom: 30px;
  }

  &__settings {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .settings__title {
      font-size: 18px;
      line-height: 100%;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .settings__table {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .row {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 250px 1fr;
        @apply border-b;
        @apply border-grey-400;

        .cell {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 11px 30px;
          @apply text-black;
          font-size: 14px;
          font-weight: 300;
          &:first-child {
            padding: 11px 0;
            @apply border-r;
            @apply border-grey-400;
            @apply text-grey-900;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1600px) {
    &.open {
      visibility: visible;
      width: 550px;
      transition: 0.5s all ease-in-out;
    }

    &.openFull {
      width: 100%;
    }

    &__content {
      width: 100%;
      height: 100%;
      max-width: 550px;
      box-shadow: -2px 0px 6px 1px rgba(0, 0, 0, 0.25);
      padding: 30px;
      overflow-y: scroll;
    }

    &__fullImage {
      width: 0;
      height: 100%;
      visibility: hidden;
      transition: 0.5s all ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;

      &.open {
        width: 100%;
        visibility: visible;
        transition: 0.5s all ease-in-out;
      }

      img {
        width: 50%;
        height: auto;
        object-fit: cover;
      }
    }

    &__head {
      margin-bottom: 24px;
    }

    &__title {
      font-size: 24px;
      line-height: 100%;
    }

    &__close {
      width: 32px;
      height: 32px;
      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__info {
      column-gap: 30px;
      margin-bottom: 30px;
    }

    &__status {
      padding: 6px 8px;
      margin-right: -30px;
    }

    &__image {
      margin-bottom: 24px;

      .image {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 60%;
        }
      }

      .image__loop {
        svg {
          width: 80px;
          height: 80px;
        }
      }
    }

    &__btns {
      margin-bottom: 30px;
    }

    &__price {
      font-size: 22px;
      margin-bottom: 4px;
    }

    &__priceSqure {
      font-size: 14px;
      margin-bottom: 30px;
    }
  }
}
</style>
