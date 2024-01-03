<template>
  <table
    class="tableFromFile flex flex-col overflow-x-scroll"
    @dragover.prevent
    @drop.prevent="(e) => emits('onDrop', e)"
  >
    <thead
      :class="[
        'w-max grid text-center bg-[#F2F3F3]',
        `grid-cols-[30px_repeat(9,_1fr)]`,
      ]"
    >
      <tr class="flex justify-center border border-b-0 border-grey-400"></tr>
      <tr
        v-for="(row, indexRow) in props.data.head"
        :key="indexRow"
        class="flex justify-center border border-b-0 border-grey-400 w-max"
      >
        <td class="min-w-[250px] max-w-[250px]">{{ row }}</td>
      </tr>
    </thead>
    <tbody
      :class="['w-max grid text-center', `grid-cols-[30px_repeat(9,_1fr)]`]"
    >
      <tr
        class="grid grid-cols-1"
        :class="[`grid-rows-[repeat(${props.data.body[0].length},_1fr)]`]"
      >
        <td
          v-for="(cell, indexCell) in props.data.body[0]"
          :key="indexCell"
          class="border border-grey-400 flex items-center justify-center px-2"
        >
          {{ indexCell }}
        </td>
      </tr>
      <tr
        v-for="(col, indexCol) in props.data.body"
        :key="indexCol"
        class="grid grid-cols-1 w-max border-x border-grey-400"
        :class="[`grid-rows-[repeat(${col.length},_1fr)]`]"
        @dragstart="(e) => onDragStart(e, indexCol)"
        @dragover.stop
        @dragend="(e) => dragEndHandler(e)"
        draggable="true"
      >
        <td
          v-for="(cell, indexCell) in col"
          :key="indexCell"
          class="border border-x-0 border-grey-400 flex items-center justify-center min-w-[250px] max-w-[250px] py-3"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ITableData } from "@/widgets/importSteps/fieldStep.vue";

const props = defineProps<{
  data: ITableData;
}>();
const emits = defineEmits<{
  (e: "onDrop", value: DragEvent): void;
}>();

const onDragStart = (event: DragEvent, index: number) => {
  if (event.dataTransfer)
    event.dataTransfer.setData("col_id", index.toString());
};

const dragEndHandler = (event: DragEvent) => {
  console.log(event.target);
};
</script>

<style scoped lang="scss">
table {
  td {
    margin: 0;
  }
}
</style>
