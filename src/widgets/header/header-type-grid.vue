<template>
  <div class="typeGrid">
    <button
      v-for="(type, typeIndex) in types"
      :key="typeIndex"
      :class="['typeGrid__btn', typeIndex === activeType ? 'active' : '']"
      @click="
        () => {
          changeActiveType(typeIndex);
          activeType = typeIndex;
        }
      "
    >
      <img
        :src="require(`@/shared/assets/icons/typeNav/${typeIndex}.svg`)"
        :alt="type"
      />
      <div class="text">{{ type }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useComplexStore } from "@/app/store/complex";
import { storeToRefs } from "pinia";

const { changeActiveType } = useComplexStore();
const { activeType, types } = storeToRefs(useComplexStore());
</script>

<style scoped lang="scss">
.typeGrid {
  width: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 24px;

  &__btn {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.active {
      .text {
        @apply text-green;
        @apply font-semibold;
        &::before {
          height: 0;
        }
      }
    }
    .text {
      position: relative;
      @apply text-grey-900;

      &::before {
        width: 100%;
        height: 1px;
        @apply bg-grey-900;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        content: "";
      }
    }

    img {
      width: 37px;
      height: 37px;
      margin-right: 10px;
    }
  }
}
</style>
