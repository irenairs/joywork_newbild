<template>
  <div class="steps">
    <div
      v-for="item in items"
      :key="item.id"
      class="steps__item"
      :class="[activeItem === item.id ? 'active' : '']"
    >
      <div class="item__number">{{ item.id + 1 }}</div>
      <div class="item__text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type TStepItem = {
  id: number;
  text: string;
};
withDefaults(
  defineProps<{
    activeItem: number;
    items: TStepItem[];
  }>(),
  {
    activeItem: 0,
  }
);
</script>

<style scoped lang="scss">
.steps {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 20px;

  &__item {
    width: auto;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .item__number {
      width: 28px;
      height: 28px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      @apply text-grey-900;
      @apply bg-[#F2F3F3];
      @apply border-2;
      @apply border-grey-900;
    }

    .item__text {
      font-size: 14px;
      @apply text-grey-900;
    }

    &.active {
      .item__number {
        @apply border-blue;
        @apply text-blue;
        @apply bg-white;
      }
      .item__text {
        @apply text-black;
        font-weight: 400;
      }
    }
  }
}
</style>
