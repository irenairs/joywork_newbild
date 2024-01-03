<template>
  <div class="objectStep">
    <div class="objectStep__title mb-5 text-xl">
      Связь дома с объектом из файла
    </div>
    <div class="objectStep__desc mb-7.5 text-sm">
      Выберите дом связанный с объектами из файла. Если это новый дом,
      воспользуйтесь ссылкой «Создать дом»
    </div>
    <div class="grid grid-cols-[repeat(2,_1fr)] gap-x-12.5 mb-16">
      <div class="homeFromFile w-full">
        <div class="homeFromFile__title font-bold mb-5">
          Дома найденые в файле
        </div>
        <InputText disabled v-model="homeFromFile" class="w-full mb-5" />
        <div class="isImport flex items-center">
          <label for="isImport" class="mr-5">Импортировать</label>
          <InputSwitch id="isImport" v-model="isImport" />
        </div>
      </div>
      <div class="homeFromJW flex flex-col">
        <div class="homeFromJW__title mb-5 font-bold">Дома в JoyWork</div>
        <Dropdown
          v-model="homeFromSystem"
          :options="homes"
          placeholder="Выберите дом из системы JoyWork"
          :pt="{
            root: {
              class: ['h-max'],
            },
            input: {
              class: ['h-max'],
            },
          }"
        >
          <template #dropdownicon>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.375 7.875H0.625C0.279813 7.875 0 8.15481 0 8.5C0 8.84519 0.279813 9.125 0.625 9.125H15.375C15.7202 9.125 16 8.84519 16 8.5C16 8.15481 15.7202 7.875 15.375 7.875Z"
                fill="#9E9E9E"
              />
              <path
                d="M15.375 2.875H0.625C0.279813 2.875 0 3.15481 0 3.5C0 3.84519 0.279813 4.125 0.625 4.125H15.375C15.7202 4.125 16 3.84519 16 3.5C16 3.15481 15.7202 2.875 15.375 2.875Z"
                fill="#9E9E9E"
              />
              <path
                d="M15.375 12.875H0.625C0.279813 12.875 0 13.1548 0 13.5C0 13.8452 0.279813 14.125 0.625 14.125H15.375C15.7202 14.125 16 13.8452 16 13.5C16 13.1548 15.7202 12.875 15.375 12.875Z"
                fill="#9E9E9E"
              />
            </svg>
          </template>
          <template #value="slotProps">
            <div
              class="home w-full grid grid-cols-[100px,_1fr] gap-3.5"
              v-if="slotProps.value"
            >
              <div class="home__image">
                <img
                  :src="
                    slotProps.value.image ? require(slotProps.value.image) : ''
                  "
                  alt=""
                />
              </div>
              <div class="home__content">
                <div class="home__title">{{ slotProps.value.title }}</div>
                <div class="home__address">{{ slotProps.value.address }}</div>
                <div class="home__description">
                  {{ slotProps.value.countRooms }} квартир - от
                  {{ slotProps.value.minPrice }} руб.
                  {{ slotProps.value.dateFinaly }}
                </div>
              </div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="home w-full grid grid-cols-[100px,_1fr] gap-3.5">
              <div class="home__image">
                <img
                  :src="
                    slotProps.option.image
                      ? require(slotProps.option.image)
                      : ''
                  "
                  alt=""
                />
              </div>
              <div class="home__content flex flex-col">
                <div class="home__title text-black">
                  {{ slotProps.option.title }}
                </div>
                <div class="home__address text-sm">
                  {{ slotProps.option.address }}
                </div>
                <div class="home__description text-sm">
                  {{ slotProps.option.countRooms }} квартир - от
                  {{ slotProps.option.minPrice }} руб.
                  {{ slotProps.option.dateFinaly }}
                </div>
              </div>
            </div>
          </template>
        </Dropdown>
        <Button
          class="addHome flex items-center gap-x-2 mt-5 !text-black !px-0"
          text
          plain
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1.5C7.51664 1.5 6.0666 1.93987 4.83323 2.76398C3.59986 3.58809 2.63856 4.75943 2.07091 6.12987C1.50325 7.50032 1.35472 9.00832 1.64411 10.4632C1.9335 11.918 2.64781 13.2544 3.6967 14.3033C4.7456 15.3522 6.08197 16.0665 7.53683 16.3559C8.99168 16.6453 10.4997 16.4968 11.8701 15.9291C13.2406 15.3614 14.4119 14.4001 15.236 13.1668C16.0601 11.9334 16.5 10.4834 16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98492 1.5 9 1.5ZM9 15C7.81332 15 6.65328 14.6481 5.66658 13.9888C4.67989 13.3295 3.91085 12.3925 3.45673 11.2961C3.0026 10.1997 2.88378 8.99334 3.11529 7.82946C3.3468 6.66557 3.91825 5.59647 4.75736 4.75736C5.59648 3.91824 6.66558 3.3468 7.82946 3.11529C8.99335 2.88378 10.1997 3.0026 11.2961 3.45672C12.3925 3.91085 13.3295 4.67988 13.9888 5.66658C14.6481 6.65327 15 7.81331 15 9C15 10.5913 14.3679 12.1174 13.2426 13.2426C12.1174 14.3679 10.5913 15 9 15ZM12 8.25H9.75V6C9.75 5.80109 9.67099 5.61032 9.53033 5.46967C9.38968 5.32902 9.19892 5.25 9 5.25C8.80109 5.25 8.61033 5.32902 8.46967 5.46967C8.32902 5.61032 8.25 5.80109 8.25 6V8.25H6C5.80109 8.25 5.61033 8.32902 5.46967 8.46967C5.32902 8.61032 5.25 8.80109 5.25 9C5.25 9.19891 5.32902 9.38968 5.46967 9.53033C5.61033 9.67098 5.80109 9.75 6 9.75H8.25V12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61033 12.671 8.80109 12.75 9 12.75C9.19892 12.75 9.38968 12.671 9.53033 12.5303C9.67099 12.3897 9.75 12.1989 9.75 12V9.75H12C12.1989 9.75 12.3897 9.67098 12.5303 9.53033C12.671 9.38968 12.75 9.19891 12.75 9C12.75 8.80109 12.671 8.61032 12.5303 8.46967C12.3897 8.32902 12.1989 8.25 12 8.25Z"
              fill="#4CAF50"
            />
          </svg>
          Создать дом
        </Button>
      </div>
    </div>
    <Message :closable="false" severity="info">
      <template #messageicon>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-3"
        >
          <path
            d="M8.99966 8.25C8.80074 8.25 8.60998 8.32902 8.46933 8.46967C8.32867 8.61032 8.24966 8.80109 8.24966 9V11.25C8.24966 11.4489 8.32867 11.6397 8.46933 11.7803C8.60998 11.921 8.80074 12 8.99966 12C9.19857 12 9.38933 11.921 9.52999 11.7803C9.67064 11.6397 9.74965 11.4489 9.74965 11.25V9C9.74965 8.80109 9.67064 8.61032 9.52999 8.46967C9.38933 8.32902 9.19857 8.25 8.99966 8.25ZM8.99966 6C8.85132 6 8.70631 6.04399 8.58298 6.1264C8.45964 6.20881 8.36351 6.32594 8.30675 6.46299C8.24998 6.60003 8.23513 6.75083 8.26407 6.89632C8.293 7.0418 8.36444 7.17544 8.46933 7.28033C8.57421 7.38522 8.70785 7.45665 8.85334 7.48559C8.99882 7.51453 9.14962 7.49968 9.28667 7.44291C9.42371 7.38614 9.54085 7.29001 9.62326 7.16668C9.70567 7.04334 9.74965 6.89834 9.74965 6.75C9.74965 6.55109 9.67064 6.36032 9.52999 6.21967C9.38933 6.07902 9.19857 6 8.99966 6ZM8.99966 1.5C8.01474 1.5 7.03947 1.69399 6.12953 2.0709C5.21959 2.44781 4.39279 3.00026 3.69635 3.6967C2.28983 5.10322 1.49966 7.01088 1.49966 9C1.4931 10.7319 2.09275 12.4114 3.19466 13.7475L1.69466 15.2475C1.59059 15.353 1.52009 15.4869 1.49206 15.6324C1.46403 15.7779 1.47972 15.9284 1.53716 16.065C1.59945 16.1999 1.70043 16.3133 1.82729 16.3908C1.95415 16.4682 2.10116 16.5063 2.24966 16.5H8.99966C10.9888 16.5 12.8964 15.7098 14.303 14.3033C15.7095 12.8968 16.4997 10.9891 16.4997 9C16.4997 7.01088 15.7095 5.10322 14.303 3.6967C12.8964 2.29018 10.9888 1.5 8.99966 1.5ZM8.99966 15H4.05716L4.75466 14.3025C4.82552 14.233 4.8819 14.1502 4.92052 14.0588C4.95914 13.9674 4.97924 13.8692 4.97966 13.77C4.97684 13.5722 4.89597 13.3835 4.75466 13.245C3.77259 12.264 3.16104 10.9729 3.02417 9.59159C2.88731 8.21029 3.23361 6.82425 4.00408 5.66964C4.77454 4.51503 5.9215 3.66327 7.24954 3.25948C8.57758 2.85569 10.0045 2.92485 11.2873 3.45519C12.5701 3.98552 13.6293 4.94421 14.2845 6.16792C14.9397 7.39163 15.1503 8.80466 14.8805 10.1663C14.6107 11.5279 13.8771 12.7538 12.8048 13.6352C11.7325 14.5166 10.3877 14.9989 8.99966 15Z"
            fill="#3A8EFA"
          />
        </svg>
      </template>
      <template #default>
        Смотрите пошаговые инструкции по созданию шахматки в Базе знаний.
        Клиентская поддержка: 8 999 999 99 99 (бесплатно из России),
        support@support.ru
      </template>
    </Message>
    <div class="objectStep__btns flex flex-row gap-x-3 mt-7.5">
      <Button severity="secondary" @click="emits('update:activeItem', 1)"
        >Назад</Button
      >
      <Button severity="success" @click="emits('update:activeItem', 3)"
        >Далее</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Message from "primevue/message";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import { ref } from "vue";

const emits = defineEmits<{
  (e: "update:activeItem", value: number): void;
}>();

const homeFromFile = ref<string>("Тестовый ЖК Невский");
const homeFromSystem = ref();
const isImport = ref<boolean>(false);

const homes = ref([
  {
    image: "",
    title: "Тестовый ЖК Невский",
    address: "г. Санкт-Петербург, Невский проспект",
    countRooms: 340,
    minPrice: 2280000,
    dateFinaly: "1 квартал 2023",
  },
]);
</script>

<style scoped lang="scss"></style>
