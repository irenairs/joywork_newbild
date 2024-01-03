<template>
  <div
    class="viewHome__head flex flex-col w-full z-10 pt-5"
    :class="[
      'relative bg-white mb-7.5',
      filters.view.value === 'facades' ? 'px-[30px]' : '',
    ]"
  >
    <div class="viewHome__title text-[32px]">Просмотр объекта</div>
    <div class="head__top flex flex-row w-full items-center mb-7.5">
      <FilterWidget :filters="filters" @update:filters="updateFilter($event)" />
      <div class="filters__view flex flex-col ml-auto z-20 self-start">
        <label
          class="mb-2"
          :class="[
            filters.view?.value === 'facades' ? 'text-white' : 'text-grey-900',
          ]"
          >Вид</label
        >
        <Dropdown
          v-model="filters.view"
          :options="viewGrid"
          optionLabel="name"
          placeholder="Select a City"
          class="w-full md:w-14rem"
          :pt="{
            root: {
              class: [
                '!rounded !border !border-grey-400 !p-3 !w-[165px] !h-max',
              ],
            },
            input: {
              class: [
                '!flex !flex-row !items-center !p-0 !text-sm !leading-none !text-grey-900 !mr-3',
              ],
            },
            wrapper: {
              class: ['!p-0'],
            },
            item: {
              class: ['!text-sm'],
            },
          }"
        >
          <template #value="slotProps">
            <div class="icon mr-2 2xl:w-5 2xl:h-5 xl:w-4 xl:h-4">
              <img
                :src="
                  require(`@/shared/assets/icons/viewGrid/${slotProps.value.icon}.svg`)
                "
                alt=""
                class="h-full w-full"
              />
            </div>
            <div class="text">{{ slotProps.value.name }}</div>
          </template>
          <template #dropdownicon>
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.76693 9.2418L10.0003 12.4752L13.2336 9.2418C13.5586 8.9168 14.0836 8.9168 14.4086 9.2418C14.7336 9.5668 14.7336 10.0918 14.4086 10.4168L10.5836 14.2418C10.2586 14.5668 9.73362 14.5668 9.40862 14.2418L5.58359 10.4168C5.25859 10.0918 5.25859 9.5668 5.58359 9.2418C5.90859 8.92513 6.44193 8.9168 6.76693 9.2418Z"
                fill="#666666"
              />
            </svg>
          </template>
          <template #option="slotProps">
            <div class="item flex flex-row items-center">
              <div class="item__icon mr-2 w-5 h-5">
                <img
                  :src="
                    require(`@/shared/assets/icons/viewGrid/${slotProps.option.icon}.svg`)
                  "
                  alt=""
                  class="w-full h-full"
                />
              </div>
              <div class="item__text">{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
    <div
      class="table__infoBlock w-full flex flex-row items-center bg-grey-100 py-2.5 2xl:px-[97px] xl:px-[50px] 2xl:gap-x-12.5 xl:gap-x-10 mt-7.5"
      :class="[filters.view?.value === 'facades' ? 'hidden' : '']"
    >
      <div class="infoItem flex flex-row items-center">
        <div class="infoItem__color bg-green w-4.5 h-4.5 rounded mr-2.5"></div>
        <div class="infoItem__text 2xl:text-base xl:text-sm text-grey-900">
          Свободные
        </div>
      </div>
      <div class="infoItem flex flex-row items-center">
        <div class="infoItem__color bg-orange w-4.5 h-4.5 rounded mr-2.5"></div>
        <div class="infoItem__text 2xl:text-base xl:text-sm text-grey-900">
          Забронированные
        </div>
      </div>
      <div class="infoItem flex flex-row items-center">
        <div
          class="infoItem__color bg-grey-900 w-4.5 h-4.5 rounded mr-2.5"
        ></div>
        <div class="infoItem__text 2xl:text-base xl:text-sm text-grey-900">
          Проданные
        </div>
      </div>
      <div class="infoItem flex flex-row items-center">
        <div
          class="infoItem__color bg-grey-400 w-4.5 h-4.5 rounded mr-2.5"
        ></div>
        <div class="infoItem__text 2xl:text-base xl:text-sm text-grey-900">
          Недоступные
        </div>
      </div>
      <div
        class="table__viewPrice ml-auto flex flex-row items-center gap-2"
        v-if="filters.view?.value === 'grid'"
      >
        <InputSwitch v-model="filters.hiddenPrice" />
        <label for="onlyFree" class="2xl:text-base xl:text-sm text-grey-900"
          >Скрыть стоимость</label
        >
      </div>
      <div class="table__onlyFree ml-auto flex flex-row items-center gap-2">
        <InputSwitch v-model="filters.onlyFree" />
        <label for="onlyFree" class="2xl:text-base xl:text-sm text-grey-900"
          >Только свободные</label
        >
      </div>
    </div>
    <div
      :class="[
        'head__btnsChangeSaid flex flex-row items-center gap-x-7.5 mt-5',
      ]"
      v-if="filters.view?.value === 'facades'"
    >
      <button
        :class="[
          viewFacadesSaid === 'park'
            ? 'bg-green text-white'
            : 'bg-white text-black',
          'px-4 py-2.5 rounded-3xl shadow-[2px_4px_4px_0px_rgba(0,_0,_0,_0.25)]',
        ]"
        @click="viewFacadesSaid = 'park'"
      >
        Вид со стороны парка
      </button>
      <button
        :class="[
          viewFacadesSaid === 'left'
            ? 'bg-green text-white'
            : 'bg-white text-black',
          'px-4 py-2.5 rounded-3xl shadow-[2px_4px_4px_0px_rgba(0,_0,_0,_0.25)]',
        ]"
        @click="viewFacadesSaid = 'left'"
      >
        Вид со стороны парка
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterWidget from "@/widgets/homePage/viewHome/filtersWidget.vue";
import { IFilters } from "@/widgets/homePage/viewHome/types";
import { ref, watch } from "vue";

const emits = defineEmits<{
  (e: "update:isOpenFiltersMenu", value: boolean): void;
  (e: "update:filters", value: IFilters): void;
  (e: "update:viewType", value: string): void;
}>();

const viewFacadesSaid = ref<string>("park");
const isOpenFiltersMenu = ref<boolean>(false);
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
  view: {
    name: "Плитка",
    value: "tile",
    icon: "tile",
  },
});

const viewGrid = ref([
  {
    name: "Плитка",
    value: "tile",
    icon: "tile",
  },
  {
    name: "Сетка",
    value: "grid",
    icon: "grid",
  },
  {
    name: "Планировки",
    value: "layouts",
    icon: "layouts",
  },
  {
    name: "Этажи",
    value: "floors",
    icon: "floors",
  },
  {
    name: "Фасады",
    value: "facades",
    icon: "facades",
  },
  {
    name: "Список",
    value: "list",
    icon: "list",
  },
]);

const updateFilter = (event: IFilters) => {
  filters.value = { ...event, view: filters.value.view };
};

watch(isOpenFiltersMenu, (newV) => {
  emits("update:isOpenFiltersMenu", newV);
});
watch(
  filters,
  (newV) => {
    emits("update:filters", newV);
  },
  { deep: true }
);
watch(viewFacadesSaid, (newV) => {
  emits("update:viewType", newV);
});
</script>

<style scoped></style>
