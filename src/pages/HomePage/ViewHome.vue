<template>
  <div
    class="viewHome flex flex-col w-full h-full min-h-full justify-start items-start"
    :class="[filters.view?.value !== 'facades' ? 'px-7.5 py-5' : '']"
    ref="viewHome"
  >
    <teleport to="body">
      <WindowInfoForList
        :isOpen="isOpenWindow"
        @update:is-open="isOpenWindow = false"
      />
    </teleport>

    <ViewHead
      @update:isOpenFiltersMenu="isOpenFiltersMenu = $event"
      @update:filters="filters = $event"
      @update:viewType="viewType = $event"
    />
    <div class="viewHome__body w-full h-full">
      <ChessTile
        :typeView="filters.view?.value"
        :hidden-price="filters.hiddenPrice"
        v-if="filters.view?.value === 'tile' || filters.view?.value === 'grid'"
        @openWindow="isOpenWindow = true"
      />
      <ChessLayouts
        v-if="filters.view?.value === 'layouts'"
        @update:is-open-window="isOpenWindow = true"
      />
      <ChessFloors
        v-if="filters.view?.value === 'floors'"
        @update:is-open-window="isOpenWindow = true"
      />
      <ChessFacade
        v-if="filters.view?.value === 'facades'"
        :view-type="viewType"
      />
      <ChessList
        v-if="filters.view?.value === 'list'"
        @update:is-open-window="isOpenWindow = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChessTile from "@/widgets/homePage/viewHome/chessTile.vue";
import ChessLayouts from "@/widgets/homePage/viewHome/chessLayouts.vue";
import ChessFloors from "@/widgets/homePage/viewHome/chessFloors.vue";
import ChessList from "@/widgets/homePage/viewHome/chessList.vue";
import ViewHead from "@/widgets/homePage/viewHome/viewHead.vue";
import WindowInfoForList from "@/widgets/homePage/viewHome/windowInfoForList.vue";
import { IFilters } from "@/widgets/homePage/viewHome/types";
import { onMounted, ref } from "vue";
import ChessFacade from "@/widgets/homePage/viewHome/chessFacade.vue";

const viewHome = ref<HTMLElement>();
const isOpenFiltersMenu = ref<boolean>(false);
const isOpenWindow = ref<boolean>(false);
const viewType = ref<string>("park");
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

onMounted(() => {
  const height = viewHome.value.parentElement.clientHeight;
  // viewHome.value.style.height = height + "px";
});
</script>

<style scoped lang="scss">
.viewHome {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;

  &__body {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 700px;
  }
}
</style>
