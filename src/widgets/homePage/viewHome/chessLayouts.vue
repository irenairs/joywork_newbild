<template>
  <div
    class="chessLayouts grid grid-cols-4 gap-[25px] xl:grid-cols-3 xl:gap-[20px]"
  >
    <ChessLayoutsItem @openWindow="emits('update:is-open-window')" />
    <ChessLayoutsItem @openWindow="emits('update:is-open-window')" />
    <ChessLayoutsItem @openWindow="emits('update:is-open-window')" />
    <ChessLayoutsItem @openWindow="emits('update:is-open-window')" />
    <ChessLayoutsItem @openWindow="emits('update:is-open-window')" />
    <ChessLayoutsItem @openWindow="emits('update:is-open-window')" />
  </div>
</template>

<script setup lang="ts">
import ChessLayoutsItem from "@/entities/viewHome/chessLayoutsItem.vue";

const emits = defineEmits<{
  (e: "update:is-open-window"): void;
}>();
</script>
