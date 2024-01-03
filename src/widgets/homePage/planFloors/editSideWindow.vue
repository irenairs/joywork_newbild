<template>
  <Dialog
    class="editSideWindow"
    modal
    v-model:visible="isVisibleEditSideWindow"
    :draggable="false"
    :pt="dialogStyle"
    @update:visible="emits('update:isVisibleEditSideWindow')"
  >
    <template #header>
      <div class="flex flex-row justify-between">
        <div class="title font-semibold text-xl">Задать стороны света</div>
      </div>
    </template>
    <template #default>
      <div class="switch flex items-center">
        <InputSwitch v-model="isViewSide" />
        <p class="ml-5">Отображать стороны света</p>
      </div>
      <div
        class="content grid grid-cols-[312px_1fr] mt-[60px] gap-x-[50px]"
        v-if="isViewSide"
      >
        <ChangeSideWorld @update:degrees="degrees = $event" />
        <div class="content__imagePlanEntrance flex items-center">
          <img
            :src="require('@/shared/assets/images/floors/floor25.png')"
            alt=""
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import ChangeSideWorld from "@/entities/changeSideWorld.vue";
import { DialogPassThroughOptions } from "primevue/dialog";
import { PTOptions } from "primevue/ts-helpers";
import { ref, toRefs, watch } from "vue";

const props = defineProps<{
  visibleEditSideWindow: boolean;
}>();
const { visibleEditSideWindow } = toRefs(props);
const isVisibleEditSideWindow = ref<boolean>(false);
watch(visibleEditSideWindow, (newV) => {
  isVisibleEditSideWindow.value = newV;
});
const emits = defineEmits<{
  (e: "update:isVisibleEditSideWindow"): void;
}>();
const isViewSide = ref<boolean>(false);
const degrees = ref<number>(0);
const dialogStyle = ref<PTOptions<DialogPassThroughOptions>>({
  root: {
    class: ["w-[900px] bg-white 2xl:p-[50px] xl:p-[30px]"],
  },
  header: {
    class: ["!p-0 !pb-8 !border-b !border-solid !border-b-grey-400"],
  },
  content: {
    class: ["!p-0 !pt-8 h-max"],
  },
});
</script>

<style scoped></style>
