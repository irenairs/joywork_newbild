<template>
  <DefaultLayout>
    <div class="defaultPage planLayoutPage bg-white h-full">
      <div class="titlePage planLayoutPage__title">
        Тестовый ЖК Невский — Тестовый дом
      </div>
      <TabView class="w-full" :active-index="activeIndex">
        <TabPanel header="Планировка помещений">
          <PlanRooms />
        </TabPanel>
        <TabPanel header="Планировка этажей">
          <PlanFloors />
        </TabPanel>
      </TabView>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/shared/layouts/defaultLayout.vue";
import PlanRooms from "@/widgets/homePage/planLayout/planRooms.vue";
import PlanFloors from "@/widgets/homePage/planFloors/planFloors.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const activeIndex = ref<number>(0);

onMounted(() => {
  if (route.hash && route.hash.split("#")[1] === "floors")
    activeIndex.value = 1;
});
</script>

<style scoped lang="scss">
.defaultPage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px;
  overflow-y: auto;
}
.titlePage {
  font-size: 32px;
  line-height: 120%;
  font-weight: 400;
}
.tabWidget {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &__nav {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    @apply border-b;
    @apply border-grey-400;
    column-gap: 40px;

    .nav__item {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding-bottom: 23px;
      font-size: 16px;
      margin-bottom: -1px;

      &.active {
        font-weight: 700;
        border-bottom: 3px solid;
        @apply border-green;
      }
    }
  }

  @media screen and (max-width: 1600px) {
    column-gap: 30px;
    .nav__item {
      padding-bottom: 18px;
      font-size: 14px;
      &.active {
        border-bottom-width: 2px;
      }
    }
  }
}

.planLayoutPage {
  &__title {
    margin-bottom: 50px;
  }

  @media screen and (max-width: 1600px) {
    &__title {
      margin-bottom: 30px;
    }
  }
}
</style>
