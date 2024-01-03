<template>
  <div class="entranceList">
    <div
      class="entranceList__head flex flex-row items-center border-b border-grey-400"
    >
      <TabItem
        v-for="entrance in sortedEntranceList"
        :key="entrance.title"
        :title="entrance.title"
        :active="entrance.id === activeEntrance"
        @dragstart="(e: DragEvent) => dragStartHandler(e, entrance.id)"
        @dragleave="(e: DragEvent) => dragEndHandler(e)"
        @dragend.prevent="(e: DragEvent) => dragEndHandler(e)"
        @dragover.prevent="(e: DragEvent) => dragOverHandler(e)"
        @drop.prevent="(e: DragEvent) => dropHandler(e, entrance.id)"
        @update:title="updateTitle(entrance.id, $event)"
      />
      <button class="entranceList__addBtn" @click="addNewEntrance()">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6445 1.21826H10.3555V20.7841H11.6445V1.21826Z"
            fill="#4CAF50"
          />
          <path
            d="M20.7836 10.3555H1.21777V11.6445H20.7836V10.3555Z"
            fill="#4CAF50"
          />
        </svg>
        Добавить подъезд
      </button>
    </div>
    <div class="entranceList__body mt-7.5 w-full">
      <template v-if="entranceList.length !== 0">
        <div
          class="entranceList__aboveground pb-7.5 border-b-8 border-grey-100 w-full"
        >
          <MyButton :theme="'green'" class="mb-7.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.25 14.9999H3.75C3.55109 14.9999 3.36032 15.0789 3.21967 15.2196C3.07902 15.3602 3 15.551 3 15.7499C3 15.9488 3.07902 16.1396 3.21967 16.2803C3.36032 16.4209 3.55109 16.4999 3.75 16.4999H14.25C14.4489 16.4999 14.6397 16.4209 14.7803 16.2803C14.921 16.1396 15 15.9488 15 15.7499C15 15.551 14.921 15.3602 14.7803 15.2196C14.6397 15.0789 14.4489 14.9999 14.25 14.9999ZM6.5325 5.78242L8.25 4.05742V12.7499C8.25 12.9488 8.32902 13.1396 8.46967 13.2803C8.61032 13.4209 8.80109 13.4999 9 13.4999C9.19891 13.4999 9.38968 13.4209 9.53033 13.2803C9.67098 13.1396 9.75 12.9488 9.75 12.7499V4.05742L11.4675 5.78242C11.5372 5.85272 11.6202 5.90851 11.7116 5.94659C11.803 5.98467 11.901 6.00427 12 6.00427C12.099 6.00427 12.197 5.98467 12.2884 5.94659C12.3798 5.90851 12.4628 5.85272 12.5325 5.78242C12.6028 5.7127 12.6586 5.62975 12.6967 5.53835C12.7347 5.44696 12.7543 5.34893 12.7543 5.24992C12.7543 5.15091 12.7347 5.05288 12.6967 4.96149C12.6586 4.8701 12.6028 4.78714 12.5325 4.71742L9.5325 1.71742C9.46117 1.64914 9.37706 1.59562 9.285 1.55992C9.1024 1.48491 8.8976 1.48491 8.715 1.55992C8.62294 1.59562 8.53883 1.64914 8.4675 1.71742L5.4675 4.71742C5.39757 4.78735 5.3421 4.87037 5.30426 4.96174C5.26641 5.0531 5.24693 5.15103 5.24693 5.24992C5.24693 5.34882 5.26641 5.44674 5.30426 5.53811C5.3421 5.62948 5.39757 5.71249 5.4675 5.78242C5.53743 5.85235 5.62045 5.90782 5.71181 5.94567C5.80318 5.98351 5.90111 6.00299 6 6.00299C6.09889 6.00299 6.19682 5.98351 6.28819 5.94567C6.37955 5.90782 6.46257 5.85235 6.5325 5.78242Z"
                fill="white"
              />
            </svg>

            Добавить надземный этаж
          </MyButton>
          <FloorList />
        </div>
        <div class="entranceList__underground pt-7.5">
          <MyButton :theme="'green'" class="mb-7.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4675 12.2175L9.75 13.9425V5.25C9.75 5.05109 9.67098 4.86032 9.53033 4.71967C9.38968 4.57902 9.19891 4.5 9 4.5C8.80109 4.5 8.61032 4.57902 8.46967 4.71967C8.32902 4.86032 8.25 5.05109 8.25 5.25V13.9425L6.5325 12.2175C6.39127 12.0763 6.19973 11.9969 6 11.9969C5.80027 11.9969 5.60873 12.0763 5.4675 12.2175C5.32627 12.3587 5.24693 12.5503 5.24693 12.75C5.24693 12.9497 5.32627 13.1413 5.4675 13.2825L8.4675 16.2825C8.53883 16.3508 8.62294 16.4043 8.715 16.44C8.80478 16.4797 8.90185 16.5002 9 16.5002C9.09815 16.5002 9.19522 16.4797 9.285 16.44C9.37706 16.4043 9.46117 16.3508 9.5325 16.2825L12.5325 13.2825C12.6737 13.1413 12.7531 12.9497 12.7531 12.75C12.7531 12.5503 12.6737 12.3587 12.5325 12.2175C12.4626 12.1476 12.3796 12.0921 12.2882 12.0543C12.1968 12.0164 12.0989 11.9969 12 11.9969C11.8003 11.9969 11.6087 12.0763 11.4675 12.2175ZM14.25 1.5H3.75C3.55109 1.5 3.36032 1.57902 3.21967 1.71967C3.07902 1.86032 3 2.05109 3 2.25C3 2.44891 3.07902 2.63968 3.21967 2.78033C3.36032 2.92098 3.55109 3 3.75 3H14.25C14.4489 3 14.6397 2.92098 14.7803 2.78033C14.921 2.63968 15 2.44891 15 2.25C15 2.05109 14.921 1.86032 14.7803 1.71967C14.6397 1.57902 14.4489 1.5 14.25 1.5Z"
                fill="white"
              />
            </svg>

            Добавить подземный этаж
          </MyButton>
          <FloorList />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import useEntranceHooks from "@/features/useEntranceHooks";
import MyButton from "@/shared/UI/MyButton.vue";
import TabItem from "@/widgets/homePage/entranceList/components/tabItem.vue";
import FloorList from "@/widgets/homePage/entranceList/components/floorList.vue";
import { ref } from "vue";

const activeEntrance = ref<number>(1);

const { entranceList, sortedEntranceList, addNewEntrance, updateTitle } =
  useEntranceHooks();
const dragEntranceIndex = ref<number>(1);

const dragStartHandler = (e: DragEvent, index: number) => {
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
  dragEntranceIndex.value = index;
};
const dragEndHandler = (e: DragEvent) => {
  (e.target as HTMLElement).style.background = "#ffffff";
};
const dragOverHandler = (e: DragEvent) => {
  (e.target as HTMLElement).style.background = "#F2EED6";
};
const dropHandler = (e: DragEvent, index: number) => {
  entranceList.value = entranceList.value.map((entrance) => {
    if (entrance.id === index) {
      return { ...entrance, id: dragEntranceIndex.value };
    }
    if (entrance.id === dragEntranceIndex.value) {
      return { ...entrance, id: index };
    }
    return entrance;
  });
  (e.target as HTMLElement).style.background = "#ffffff";
};
</script>

<style scoped lang="scss">
.entranceList {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &__head {
    width: 100%;
    height: auto;
    column-gap: 20px;
  }

  &__addBtn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 8px;
    padding-bottom: 16px;
  }
}
</style>
