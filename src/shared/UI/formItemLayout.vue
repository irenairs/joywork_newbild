<template>
  <div class="itemLayout">
    <label class="itemLayout__label">{{ label }}</label>
    <div
      class="itemLayout__content"
      :class="direction === 'column' ? 'flex-col' : 'flex-row'"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    direction?: string;
  }>(),
  {
    direction: "column",
  }
);
</script>

<style scoped lang="scss">
.itemLayout {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 468px;
  grid-column-gap: 30px;
  align-items: flex-start;

  &__label {
    @apply text-grey-900;
    font-size: 14px;
    line-height: 100%;
    margin-top: 12px;
  }
  &__content {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 20px;
    column-gap: 16px;
  }
}
</style>
