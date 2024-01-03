<template>
  <nav class="navList">
    <div class="navList__item" v-for="item in items" :key="item.path">
      <RouterLink
        :to="item.path ? item.path : ''"
        class="navList__link"
        v-if="item.isBtn"
        >{{ item.name }}</RouterLink
      >
      <button
        class="navLink__btn"
        v-else
        @click="item.actionsBtn ? item.actionsBtn() : ''"
      >
        {{ item.name }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
export type TNavItem = {
  name: string;
  path?: string;
  isBtn: boolean;
  actionsBtn?: () => void;
};

const props = defineProps<{
  items: TNavItem[];
}>();
</script>

<style scoped lang="scss">
.navList {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &__item {
    width: auto;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
