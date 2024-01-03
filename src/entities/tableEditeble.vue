<template>
  <table
    class="tableEditeble flex flex-col overflow-x-scroll"
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
      :class="[
        'min-h-[200px] min-w-full w-max grid text-center border-t border-x border-grey-400',
        `grid-cols-[30px_repeat(9,_1fr)]`,
      ]"
    >
      <tr
        class="grid grid-cols-1 border-r border-grey-400"
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
        v-for="(col, indexCol) in props.data.head"
        :key="indexCol"
        class="grid grid-cols-1 min-w-[251px] w-max border-x border-grey-400"
        :class="[`grid-rows-[repeat(${col.length},_1fr)]`]"
        @dragend.prevent="(e) => dragEndHandler(e)"
        @dragover="(e) => dragOverHandler(e)"
      >
        <td
          v-for="(cell, indexCell) in props.data.body[indexCol]"
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

const dragOverHandler = (e: DragEvent) => {
  (e.target as HTMLElement).style.backgroundColor = "#FFFBE3";
};
const dragEndHandler = (e: DragEvent) => {
  console.log(e.target);
  (e.target as HTMLElement).style.backgroundColor = "#ffffff";
};
</script>

<style scoped lang="scss">
table {
  & * {
    box-sizing: border-box;
  }
  td {
    margin: 0;
  }
}
</style>
