<template>
  <div class="planEditWindowSideWorld">
    <div class="planEditWindowSideWorld__checkboxWrapper">
      <InputSwitch v-model="isViewSideWorld" />
      <label for="">Отображать стороны света</label>
    </div>
    <div class="planEditWindowSideWorld__content mt-10" v-if="isViewSideWorld">
      <div class="planEditWindowSideWorld__compass">
        <ChangeSideWorld @update:degrees="degrees = $event" />
      </div>
      <div class="planEditWindowSideWorld__imagePlan">
        <img
          :src="require('@/shared/assets/images/layoutsRoom/layout1.png')"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChangeSideWorld from "@/entities/changeSideWorld.vue";
import { ref, watch } from "vue";

const emits = defineEmits<{
  (e: "update:degrees", value: number): void;
}>();
const isViewSideWorld = ref<boolean>(false);
const degrees = ref<number>(0);

watch(degrees, (newV) => {
  emits("update:degrees", newV);
});
</script>

<style scoped lang="scss">
.planEditWindowSideWorld {
  &__checkboxWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    label {
      margin-left: 20px;
    }
  }
  &__content {
    max-width: 700px;
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 50px;
  }
}
</style>
