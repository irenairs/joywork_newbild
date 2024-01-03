<template>
  <div class="markupFloor">
    <div
      class="markupFloor__head flex flex-row justify-between items-center mb-7.5"
    >
      <div class="markupFloor__title text-[32px]">Разметка</div>
      <div class="updateImage" v-show="sourceImage">
        <input
          type="file"
          ref="inputFile"
          class="hidden"
          id="changeFileInput"
          @change="changeFile($event)"
        /><label
          for="changeFileInput"
          class="py-2 px-3 bg-green text-white rounded cursor-pointer mx-auto"
          >Заменить изображение</label
        >
      </div>
    </div>
    <Message severity="warn" :closable="false">
      <template #messageicon>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[22px] h-auto mr-2.5"
        >
          <path
            d="M9.00161 8.25C8.8027 8.25 8.61193 8.32902 8.47128 8.46967C8.33063 8.61032 8.25161 8.80109 8.25161 9V11.25C8.25161 11.4489 8.33063 11.6397 8.47128 11.7803C8.61193 11.921 8.8027 12 9.00161 12C9.20052 12 9.39129 11.921 9.53194 11.7803C9.67259 11.6397 9.75161 11.4489 9.75161 11.25V9C9.75161 8.80109 9.67259 8.61032 9.53194 8.46967C9.39129 8.32902 9.20052 8.25 9.00161 8.25ZM9.00161 6C8.85327 6 8.70827 6.04399 8.58493 6.1264C8.46159 6.20881 8.36546 6.32594 8.3087 6.46299C8.25193 6.60003 8.23708 6.75083 8.26602 6.89632C8.29496 7.0418 8.36639 7.17544 8.47128 7.28033C8.57617 7.38522 8.70981 7.45665 8.85529 7.48559C9.00078 7.51453 9.15158 7.49968 9.28862 7.44291C9.42567 7.38614 9.5428 7.29001 9.62521 7.16668C9.70762 7.04334 9.75161 6.89834 9.75161 6.75C9.75161 6.55109 9.67259 6.36032 9.53194 6.21967C9.39129 6.07902 9.20052 6 9.00161 6ZM9.00161 1.5C8.01669 1.5 7.04142 1.69399 6.13148 2.0709C5.22154 2.44781 4.39475 3.00026 3.69831 3.6967C2.29178 5.10322 1.50161 7.01088 1.50161 9C1.49505 10.7319 2.0947 12.4114 3.19661 13.7475L1.69661 15.2475C1.59254 15.353 1.52204 15.4869 1.49401 15.6324C1.46598 15.7779 1.48167 15.9284 1.53911 16.065C1.6014 16.1999 1.70239 16.3133 1.82924 16.3908C1.9561 16.4682 2.10311 16.5063 2.25161 16.5H9.00161C10.9907 16.5 12.8984 15.7098 14.3049 14.3033C15.7114 12.8968 16.5016 10.9891 16.5016 9C16.5016 7.01088 15.7114 5.10322 14.3049 3.6967C12.8984 2.29018 10.9907 1.5 9.00161 1.5ZM9.00161 15H4.05911L4.75661 14.3025C4.82747 14.233 4.88385 14.1502 4.92247 14.0588C4.9611 13.9674 4.9812 13.8692 4.98161 13.77C4.97879 13.5722 4.89792 13.3835 4.75661 13.245C3.77455 12.264 3.16299 10.9729 3.02613 9.59159C2.88926 8.21029 3.23557 6.82425 4.00603 5.66964C4.77649 4.51503 5.92345 3.66327 7.25149 3.25948C8.57954 2.85569 10.0065 2.92485 11.2893 3.45519C12.572 3.98552 13.6312 4.94421 14.2864 6.16792C14.9416 7.39163 15.1523 8.80466 14.8825 10.1663C14.6126 11.5279 13.8791 12.7538 12.8068 13.6352C11.7344 14.5166 10.3897 14.9989 9.00161 15Z"
            fill="#F57C00"
          />
        </svg>
      </template>
      <template #default>
        <p class="2xl:text-base xl:text-sm">
          Текущий размер изображения 3000x1298px. Если новое изображение будет
          отличаться по высоте или ширине, то разметка будет удалена.
        </p>
      </template>
    </Message>
    <div
      class="markupFloor__content mt-7.5 grid grid-cols-[1fr_312px] gap-x-[90px] 2xl:max-w-[1400px] xl:max-w-[1100px]"
    >
      <div class="markupFloor__fields flex flex-col">
        <div class="field flex flex-col mb-5">
          <label for="" class="mb-5"
            >Укажите этажи, соответствующие планировке
            <span class="text-red">*</span></label
          >
          <MultiSelect
            v-model="selectedFloors"
            display="chip"
            :options="foors"
            placeholder=""
            :showToggleAll="false"
            :pt="multiSelectStyle"
          >
            <template #itemcheckboxicon> </template>
            <template #option="slotProps">
              <div class="flex">{{ slotProps.option }}</div>
            </template>
          </MultiSelect>
        </div>
        <div class="smallTitle text-xl mb-5">Подъезды</div>
        <div class="flex flex-row mb-7.5 items-center">
          <InputSwitch v-model="isCommon" />
          <label for="" class="ml-5 2xl:text-base xl:text-sm"
            >У подъездов общая планировка</label
          >
        </div>
        <div class="field flex flex-col mb-5" v-if="!isCommon">
          <label for="" class="mb-5"
            >Привязать планировку к подъездам
            <span class="text-red">*</span></label
          >
          <MultiSelect
            v-model="selectedSections"
            display="chip"
            :options="sections"
            placeholder=""
            :showToggleAll="false"
            :pt="multiSelectStyle"
          >
            <template #itemcheckboxicon> </template>
            <template #option="slotProps">
              <div class="flex">{{ slotProps.option }}</div>
            </template>
          </MultiSelect>
        </div>
      </div>
      <div class="markupFloor__sideWorld">
        <div class="flex flex-row mb-7.5 items-center">
          <InputSwitch v-model="viewChangeSideWorld" />
          <label for="" class="ml-5 2xl:text-base xl:text-sm"
            >Отображать стороны света</label
          >
        </div>
        <ChangeSideWorld v-if="viewChangeSideWorld" />
      </div>
    </div>
    <div
      class="markupFloor__editPlanFloors border-2 border-dashed border-grey-400 flex justify-center items-center mt-7.5"
    >
      <CanvasMarkupFloor :image="sourceImage" v-show="sourceImage" />
      <div class="uploadImageBtn" v-show="!sourceImage">
        <input
          type="file"
          ref="inputFile"
          class="hidden"
          id="changeFileInput"
          @change="changeFile($event)"
        /><label
          for="changeFileInput"
          class="py-2 px-3 bg-green text-white rounded cursor-pointer mx-auto"
          >Загрузить изображение этажа</label
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChangeSideWorld from "@/entities/changeSideWorld.vue";
import { MultiSelectPassThroughOptions } from "primevue/multiselect";
import { PTOptions } from "primevue/ts-helpers";
import { ref } from "vue";
import CanvasMarkupFloor from "./canvasMarkupFloor.vue";

const sourceImage = ref<File | null>(null);
const viewChangeSideWorld = ref<boolean>(false);
const isCommon = ref<boolean>(false);
const foors = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
const selectedFloors = ref<number[]>([]);
const sections = ref<string[]>([
  "Секция 1",
  "Секция 2",
  "Секция 3",
  "Секция 4",
]);
const selectedSections = ref<string[]>([]);
const multiSelectStyle = ref<PTOptions<MultiSelectPassThroughOptions>>({
  root: {
    class: ["min-h-[40px] h-auto !py-[3px] !px-[10px] !border-grey-400"],
  },
  label: {
    class: ["!p-0"],
  },
  token: {
    class: ["!bg-green-300 !p-2.5 !rounded !h-[34px]"],
  },
  wrapper: {
    class: ["!p-0"],
  },
  list: {
    class: ["!p-0"],
  },
  item: ({ context }) => {
    return {
      class: [context.selected ? "!bg-green-300 text-black" : ""],
    };
  },
  checkboxContainer: {
    class: ["!hidden"],
  },
});
const changeFile = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;

  if (files && files.length !== 0) sourceImage.value = files[0];
  console.log(sourceImage.value);
};
</script>

<style lang="scss" scoped>
.markupFloor {
  &__editPlanFloors {
    width: 100%;
    min-height: 400px;
  }
}
</style>
