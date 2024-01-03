<template>
  <Teleport to="body">
    <div id="popup" class="popup" ref="popup">
      <div class="popup__countRoom">2к</div>
      <div class="popup__number">№99</div>
      <div class="popup__price">1 250 000 руб.</div>
      <div class="popup__square">153,6 м2 <span>- 56 450 руб./м2</span></div>
    </div>
  </Teleport>
  <div class="chessFloors relative">
    <div
      class="chessFloors__head col-span-2 flex flex-row justify-start items-center sticky top-0 bg-white z-10"
    >
      <div class="chessFloors__title text-2xl mr-12">План 22 этажа</div>
      <MyButton
        :theme="'green'"
        class="chessFloors__btn"
        @click="
          emits('update:activeFloor', activeFloor), emits('update:viewGrid')
        "
        >Показать этаж на фасаде
      </MyButton>
      <div class="chessFloors__resize" ref="zoomSlider"></div>
    </div>
    <div class="chessFloors__listFloor">
      <div
        v-for="index in 25"
        :key="`floor${index}`"
        class="floor flex flex-row py-2.5 px-3 gap-4 text-grey-900 rounded-md w-max"
        :class="
          activeFloor === index
            ? 'bg-green text-white cursor-default'
            : 'cursor-pointer'
        "
        @click="activeFloor = index"
      >
        <div
          class="after text-white"
          :class="activeFloor !== index ? 'hidden' : ''"
        >
          План
        </div>
        {{ index + 1 }}
        <div
          class="before text-white"
          :class="activeFloor !== index ? 'hidden' : ''"
        >
          этажа
        </div>
      </div>
    </div>
    <div
      class="chessFloors__mapFloor overflow-x-scroll relative"
      ref="container"
    >
      <div class="map ol-map" id="map" ref="map"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useViewFloors from "@/features/useViewFloors";
import { onMounted, ref, watch } from "vue";

const emits = defineEmits<{
  (e: "update:activeFloor", value: number): void;
  (e: "update:viewGrid"): void;
  (e: "update:is-open-window"): void;
}>();
const zoomSlider = ref<HTMLElement>();
const container = ref<HTMLElement>();
const map = ref<HTMLElement>();
const popup = ref<HTMLElement>();
const activeFloor = ref<number>(22);
const areas = ref([
  {
    id: "7f51a80cc77f1",
    points: [
      [116.1032753861294, 690.850052664736],
      [257.4075880500405, 812.148117785628],
      [220.33297737284414, 860.9736684670454],
      [307.9609606868268, 928.2584633128379],
      [441.52733861132873, 777.4647347916844],
      [397.71503438345815, 740.7008571561269],
      [434.073837087463, 697.9153678303446],
      [391.669136507423, 662.404159133157],
      [533.0553343710772, 503.65880023517036],
      [456.564617137835, 443.6237575345981],
      [407.8238597697372, 492.01135004962384],
      [337.80441025983794, 436.1172290907639],
      [116.1032753861294, 690.850052664736],
    ],
  },
  {
    id: "9256b7f43f8cd",
    points: [
      [533.0553343710772, 503.65880023517036],
      [391.669136507423, 662.404159133157],
      [734.0983897447586, 948.3440032005308],
      [824.6818631887436, 843.643437862396],
      [667.1393662691116, 718.1173076629636],
      [718.2954847812653, 662.0895376205442],
      [533.0553343710772, 503.65880023517036],
    ],
  },
  {
    id: "fe877a5091815",
    points: [
      [479.48862612247467, 1079.2134513854978],
      [568.7691271305084, 1159.9410583972929],
      [607.5827926397324, 1117.2849049568174],
      [721.3806509971619, 1203.3220341205595],
      [810.9593242406845, 1175.7829000949857],
      [768.5627639293671, 1051.3391306400297],
      [612.4483197927475, 925.208162307739],
      [479.48862612247467, 1079.2134513854978],
    ],
  },
  {
    id: "94c9be68a6663",
    points: [
      [768.5627639293671, 1051.3391306400297],
      [810.9593242406845, 1175.7829000949857],
      [911.337165264337, 1142.3701256863555],
      [926.3700461387467, 1178.0865869644474],
      [1044.6793616756038, 1142.743667103643],
      [902.1989850468316, 817.2351132451595],
      [824.6818631887436, 843.643437862396],
      [734.0983897447586, 948.3440032005308],
      [698.0501866132308, 994.3692601986593],
      [768.5627639293671, 1051.3391306400297],
    ],
  },
]);
const useViewFloor = useViewFloors(
  areas.value,
  "https://pb17884.profitbase.ru/uploads/layout/17884/b64a681c2edc39cccd3550715d0e26c8.png"
);

watch(useViewFloor.openWindowInfo, (newV) => {
  emits("update:is-open-window");
});

onMounted(() => {
  useViewFloor.start(map.value, container.value, zoomSlider.value, popup.value);
});
</script>

<style lang="scss">
.chessFloors {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 50px 40px;

  &__listFloor {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    row-gap: 30px;
    padding-right: 30px;
    scrollbar-color: #9e9e9e #dedede;
    padding-bottom: 38px;
    &::-webkit-scrollbar {
      height: 100%;
      width: 3px;
      border-radius: 3px;
      background-color: #dedede;
    }
    &::-webkit-scrollbar-thumb {
      width: 100%;
      height: auto;
      border-radius: 3px;
      background-color: #9e9e9e;
    }
  }

  &__resize {
    width: max-content;
    height: auto;
    margin-left: auto;
    .ol-map {
      &__zoom {
        position: relative;
        max-width: 250px;
        width: 250px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-bottom: 20px;

        &-slider {
          padding: 0;
          position: relative;
          width: 4px;
          height: 150px;
          background: #9e9e9e !important;
          z-index: 2;
          transform: rotate(90deg);
          button {
            position: absolute;
            top: -9px;
            left: -9px;
            width: 20px;
            height: 20px;
            -webkit-border-radius: 11px !important;
            border-radius: 11px !important;
            background: #519ef3;
            -webkit-transition: background 0.2s ease;
            transition: background 0.2s ease;
          }
        }
        &-label {
          position: absolute;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          color: #000;
          font-size: 18px;
          text-align: center;
        }
        &-btns {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: rotate(180deg) translateY(50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          button {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            background-color: rgba(76, 175, 80, 1);
            color: white;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 2px;
          }
        }
      }
      @media screen and (max-width: 1600px) {
        &__zoom {
          position: relative;
          max-width: 230px;
          height: 80px;
          margin-bottom: 20px;
          &-label {
            position: absolute;
            top: 70px;
            font-size: 16px;
          }
          &-btns {
            button {
              width: 30px;
              height: 30px;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}

.ol-map {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__pane {
    height: 100%;
  }
}

.popup {
  position: absolute;
  display: grid;
  width: max-content;
  grid-template-columns: 30px 1fr;
  grid-gap: 4px 20px;
  background-color: #ffffff;
  border: 1px solid;
  @apply border-green;
  padding: 10px;
  border-radius: 10px;
  &::after {
    content: "";
    position: absolute; /* Абсолютное позиционирование */
    left: -7px;
    top: -10px; /* Положение треугольника */
    border: 5px solid transparent; /* Прозрачные границы */
    border-bottom: 10px solid; /* Добавляем треугольник */
    @apply border-b-green;
    transform: rotate(-45deg);
  }

  &__countRoom {
    grid-column: 1;
    grid-row: 1;
    width: 24px;
    height: 24px;
    background-color: #4caf50;
    color: white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__number {
    grid-column: 1;
    grid-row: 2;
    font-size: 14px;
    align-self: center;
    color: grey;
  }
  &__price {
    grid-column: 2;
    grid-row: 2;
    font-weight: 700;
    opacity: 1;
    visibility: visible;
  }
  &__square {
    grid-row: 1;
    grid-column: 2;
    font-size: 16px;
    color: black;
    span {
      opacity: 0;
      visibility: hidden;
      display: none;
    }
  }
}
</style>
