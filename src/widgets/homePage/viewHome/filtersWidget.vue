<template>
  <div class="filters viewHome__filters flex flex-col w-max bg-white">
    <div
      class="filters__content flex flex-row flex-wrap items-stretch gap-x-[80px] xl:gap-x-[50px] xl:gap-y-[20px] w-full pt-3.5"
    >
      <div
        class="filters__roms flex flex-col justify-start items-start h-full w-max"
      >
        <label class="text-grey-900 mb-2">Кол-во комнат</label>
        <div class="btns flex flex-row items-stretch grow h-full">
          <SelectButton
            v-model="filters.rooms"
            :options="typeRooms"
            option-label="name"
            multiple
            aria-labelledby="multiple"
            :pt="{
              button: {
                class: ['2xl:!h-[37px] xl:!h-[37px]'],
              },
            }"
          ></SelectButton>
        </div>
      </div>
      <div class="filters__price max-w-[300px] flex flex-col h-full">
        <label class="text-grey-900 mb-2">Стоимость, руб.</label>
        <div class="inputs grid grid-cols-2 gap-x-2 grow h-full">
          <InputText
            type="text"
            v-model.number="filters.price.min"
            placeholder="от 500 000"
            :pt="{
              root: {
                class: [
                  'h-full mt-0.5 placeholder:text-sm placeholder:text-grey-900',
                  '2xl:h-full !py-2 xl:h-[37px] xl:!mt-0',
                ],
              },
            }"
          />
          <InputText
            type="text"
            v-model.number="filters.price.max"
            placeholder="до 10 000 000"
            :pt="{
              root: {
                class: [
                  'mt-0.5 placeholder:text-sm placeholder:text-grey-900',
                  '2xl:h-full !py-2 xl:h-[37px] xl:!mt-0',
                ],
              },
            }"
          />
        </div>
      </div>
      <div class="filters__square max-w-[160px] flex flex-col h-full">
        <label class="text-grey-900 mb-2">Площадь, м2</label>
        <div class="inputs grid grid-cols-2 gap-x-2 grow">
          <InputText
            type="text"
            v-model.number="filters.square.min"
            placeholder="от 10"
            :pt="{
              root: {
                class: [
                  'h-full mt-0.5 placeholder:text-sm placeholder:text-grey-900',
                  '2xl:h-full !py-2 xl:h-[37px] xl:!mt-0',
                ],
              },
            }"
          />
          <InputText
            type="text"
            v-model.number="filters.square.max"
            placeholder="до 300"
            :pt="{
              root: {
                class: [
                  'mt-0.5 placeholder:text-sm placeholder:text-grey-900',
                  '2xl:h-full !py-2 xl:h-[37px] xl:!mt-0',
                ],
              },
            }"
          />
        </div>
      </div>
      <button
        class="btnClearFilters bg-white border border-red text-sm px-4 py-2.5 text-red rounded-[30px] h-max self-end"
        @click="clearFilters()"
        v-if="!isEmpty"
      >
        Очистить фильтры
      </button>
    </div>
    <div class="head__foundText text-black mt-7.5">
      Найдено 500 помещений. Из них свободно:
      <span class="text-green">500</span>.
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectButton from "primevue/selectbutton";
import { ref, watch } from "vue";
import { IFilters } from "./types";
import { IRoom } from "./types";

const emits = defineEmits<{
  (e: "update:filters", value: IFilters): void;
}>();

const filters = ref<IFilters>({
  rooms: [],
  price: {
    min: "",
    max: "",
  },
  square: {
    min: "",
    max: "",
  },
  hiddenPrice: false,
  onlyFree: false,
});

const isEmpty = ref<boolean>(true);

const checkEmptyFilters = () => {
  console.log(filters.value);
  const entries1 = Object.entries(filters.value);
  const entries2 = Object.entries(filterClear.value);
  if (entries1.length !== entries2.length) {
    isEmpty.value = false;
  }
  for (let i = 0; i < entries1.length; ++i) {
    // Ключи
    if (entries1[i][0] !== entries2[i][0]) {
      isEmpty.value = false;
    }
    // Значения
    if (entries1[i][1] !== entries2[i][1]) {
      isEmpty.value = false;
    }
  }

  isEmpty.value = true;
};

const filterClear = ref<IFilters>({
  rooms: [],
  price: {
    min: "",
    max: "",
  },
  square: {
    min: "",
    max: "",
  },
  hiddenPrice: false,
  onlyFree: false,
});

const typeRooms = ref<IRoom[]>([
  {
    name: "Студия",
    value: "studio",
  },
  {
    name: "1",
    value: "oneroom",
  },
  {
    name: "2",
    value: "tworoom",
  },
  {
    name: "3",
    value: "threeroom",
  },
  {
    name: "4",
    value: "fourroom",
  },
  {
    name: "5 и более",
    value: "fiveroom",
  },
]);

watch(
  filters,
  (newV) => {
    checkEmptyFilters();
    emits("update:filters", newV);
  },
  { deep: true }
);

const clearFilters = () => {
  filters.value = filterClear.value;
};
</script>

<style scoped lang="scss">
.filters {
  background-color: #ffffff;
  position: relative;
  &.filters--facades {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding-top: 126px;
    padding-bottom: 53px;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s all ease-in-out;

    &.open {
      opacity: 1;
      visibility: visible;
      transition: 0.5s all ease-in-out;
    }
  }
}
</style>
