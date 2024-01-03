<template>
  <Dialog
    modal
    v-model:visible="visibleWindow"
    :style="'width: 95%; height: 90%;'"
    :draggable="false"
    @update:visible="emits('update:visibleWindow')"
  >
    <template #header>
      <div class="title 2xl:text-[32px] xl:text-[28px]">
        Связать размеченную область с планировкой
      </div>
    </template>
    <template #default>
      <div class="items grid grid-cols-5 gap-7.5">
        <div
          class="itemPlan hover:!bg-grey-200"
          v-for="index in 20"
          :key="`itemPlan` + index"
          @click="
            emits('update:selectPlan', 'dhgjkk12'),
              emits('update:visibleWindow')
          "
        >
          <div class="itemPlan__title">Тип планировки</div>
          <div class="itemPlan__place">1 подъезд 1 этаж 2к</div>
          <div class="itemPlan__image">
            <img
              :src="require('@/shared/assets/images/layoutsRoom/layout1.png')"
              alt=""
            />
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  visibleWindow: boolean;
}>();
const { visibleWindow } = toRefs(props);
const emits = defineEmits<{
  (e: "update:selectPlan", id: string): void;
  (e: "update:visibleWindow"): void;
}>();
</script>

<style scoped lang="scss">
.itemPlan {
  border-radius: 6px;
  border: 1px solid #dedede;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  cursor: pointer;

  &__title {
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
  }

  &__place {
    color: #4caf50;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 30px;
  }
}
</style>
