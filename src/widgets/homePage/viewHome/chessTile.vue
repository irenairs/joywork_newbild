<template>
  <div
    class="chessTile flex flex-row w-full justify-start items-center"
    :class="typeView === 'grid' ? 'typeGrid' : ''"
  >
    <div class="labelLeft h-full flex justify-center items-center">
      <div class="text -rotate-90 text-grey-900">ЭТАЖИ</div>
    </div>
    <div class="chessTile__left mx-5 flex flex-col-reverse gap-y-2.5">
      <div class="row" v-for="index in floors.length" :key="`floor${index}`">
        <div class="cell text-grey-900">{{ Number(index) }}</div>
      </div>
      <div class="row">
        <div class="cell"></div>
      </div>
    </div>
    <div
      class="chessTile__main w-full flex flex-row justify-start items-start gap-x-12.5 overflow-x-scroll"
    >
      <div
        class="chessTile__section flex flex-col-reverse gap-y-2.5 w-max"
        v-for="section in sections"
        :key="section.id"
      >
        <div
          class="row flex flex-row gap-x-2.5 w-max"
          v-for="index in maxFloor"
          :key="`floor${index}`"
        >
          <template
            v-if="props.typeView === 'tile' && section.floors[index - 1]"
          >
            <div
              v-for="(apartament, apartamentIndex) in section.floors[index - 1]
                ?.apartments"
              :key="`floor${index}apartament${apartamentIndex}`"
              class="cell text-white rounded cursor-pointer"
              :class="[
                apartament.status === StatusApartament.FREE
                  ? 'bg-green'
                  : apartament.status === StatusApartament.BOOKING
                  ? 'bg-orange'
                  : apartament.status === StatusApartament.SOLD
                  ? 'bg-grey-900'
                  : 'bg-grey-400',
              ]"
              @click="emits('openWindow')"
            >
              {{ apartament.roomCount }}
            </div>
          </template>
          <template
            v-else-if="props.typeView === 'grid' && section.floors[index - 1]"
          >
            <div
              :class="[
                'cell cell--grid grid grid-cols-[30px_1fr] gap-y-1 gap-x-4 grid-rows-2',
                'border border-grey-400 rounded p-2.5 w-max cursor-pointer',
              ]"
              v-for="(apartament, apartamentIndex) in section.floors[index - 1]
                ?.apartments"
              :key="`floor${index}apartament${apartamentIndex}`"
              @click="emits('openWindow')"
              v-tooltip.top="{
                value: `
                <div class='cell__countRoom w-[24px] h-[24px] rounded-3xl bg-green flex justify-center items-center text-white text-center'>${apartament.roomCount}к</div>
              <div class='cell__number text-black text-xs col-start-1 row-start-2'>№100</div>
              <div class='cell__price text-base text-black col-start-2 row-start-1 h-max'>
                3 650 000 руб.
              </div>
              <div class='cell__desc text-xs text-black row-start-2 col-start-2'>
                50,6 м2
                <span class='text-grey-900'>- 103 450 руб./м2</span
                >
              </div>`,
                escape: true,
                disabled: !hiddenPrice,
                hideDelay: 100,
                pt: {
                  text: {
                    class: [
                      '!border !border-green !bg-white !color-black !h-auto !whitespace-normal !w-max',
                      '!grid !grid-cols-[30px,_1fr] !gap-y-1 !gap-x-4 !grid-rows-2 !p-2.5 !break-normal',
                    ],
                  },
                  arrow: {
                    class: ['!border-t-green'],
                  },
                },
              }"
            >
              <div
                :class="[
                  'cell__countRoom min-w-6 min-h-6 rounded-3xl bg-green',
                  'flex justify-center items-center text-white',
                ]"
              >
                {{ apartament.roomCount }}к
              </div>
              <div class="cell__number col-start-1 row-start-2">№100</div>
              <div class="cell__price" :class="hiddenPrice ? 'hidden' : ''">
                3 650 000 руб.
              </div>
              <div class="cell__desc">
                50,6 м2
                <span :class="hiddenPrice ? 'hidden' : ''"
                  >- 103 450 руб./м2</span
                >
              </div>
            </div>
          </template>
        </div>
        <div class="row flex flex-row gap-x-2.5">
          <div class="cell text-grey-900 !w-max">{{ section.name }}</div>
        </div>
      </div>
    </div>
    <div class="chessTile__right mx-5 flex flex-col-reverse gap-y-2.5">
      <div class="row" v-for="index in floors.length" :key="`floor${index}`">
        <div class="cell text-grey-900">{{ Number(index) }}</div>
      </div>
      <div class="row">
        <div class="cell"></div>
      </div>
    </div>
    <div class="labelRight h-full flex justify-center items-center">
      <div class="text rotate-90 text-grey-900">ЭТАЖИ</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

enum StatusApartament {
  FREE = "free",
  BOOKING = "booking",
  SOLD = "sold",
  UNAVAILABLE = "unavailable",
}

interface Apartament {
  roomCount: number;
  status: StatusApartament;
}

type floor = {
  apartments: Apartament[];
};

const props = defineProps<{
  typeView: string | undefined;
  hiddenPrice: boolean;
}>();
const emits = defineEmits<{
  (e: "openWindow"): void;
}>();

const floors = ref<floor[]>([
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.SOLD,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
]);
const floors1 = ref<floor[]>([
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
  {
    apartments: [
      {
        roomCount: 1,
        status: StatusApartament.BOOKING,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 2,
        status: StatusApartament.FREE,
      },
      {
        roomCount: 3,
        status: StatusApartament.SOLD,
      },
    ],
  },
]);

const sections = ref([
  {
    id: "section134",
    name: "Секция 1",
    floors,
  },
  {
    id: "section144",
    name: "Секция 2",
    floors,
  },
  {
    id: "section154",
    name: "Секция 3",
    floors: floors1,
  },
  {
    id: "section164",
    name: "Секция 4",
    floors,
  },
  {
    id: "section174",
    name: "Секция 5",
    floors: floors1,
  },
  {
    id: "section184",
    name: "Секция 6",
    floors,
  },
  {
    id: "section194",
    name: "Секция 7",
    floors,
  },
]);

const maxFloor = computed<number>((): number => {
  let maxfloor = 0;
  sections.value.forEach((el) => {
    maxfloor = el.floors.length;
  });
  return maxfloor;
});
</script>

<style scoped lang="scss">
/* white-space: pre-line; */
/* word-break: break-word; */
.chessTile {
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;

    .cell {
      width: 32px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &.cell--grid {
        display: grid;
        width: auto;
      }

      &__countRoom {
        min-width: 24px;
        width: 24px;
        min-height: 24px;
        font-size: 12px;
      }
      &__number {
        color: #757575;
        font-size: 11px;
      }
      &__price {
        font-weight: 700;
        font-size: 16px;
      }
      &__desc {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;

        span {
          color: #757575;
          font-size: 12px;
          margin-left: 2px;
        }
      }
    }
  }

  &__left,
  &__right {
    padding-bottom: 38px;
  }

  &__main {
    scrollbar-color: #9e9e9e #dedede;
    padding-bottom: 38px;
    &::-webkit-scrollbar {
      width: 100%;
      height: 3px;
      border-radius: 3px;
      background-color: #dedede;
    }
    &::-webkit-scrollbar-thumb {
      width: auto;
      height: 100%;
      border-radius: 3px;
      background-color: #9e9e9e;
    }
  }

  &.typeGrid {
    .row {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;

      .cell {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &.cell--grid {
          display: grid;
          width: auto;
        }

        &__countRoom {
          min-width: 24px;
          width: 24px;
          min-height: 24px;
          font-size: 12px;
        }
        &__number {
          color: #757575;
          font-size: 11px;
        }
        &__price {
          font-weight: 700;
          font-size: 16px;
        }
        &__desc {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 12px;

          span {
            color: #757575;
            font-size: 12px;
            margin-left: 2px;
          }
        }
      }
    }
  }
}
</style>
