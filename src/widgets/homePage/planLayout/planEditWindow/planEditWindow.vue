<template>
  <div class="planEditWindow" :class="isOpenPlanEditWindow ? 'open' : ''">
    <div class="planEditWindow__wrapper">
      <div class="planEditWindow__head">
        <div class="planEditWindow__title">
          Редактирование планировки помещения
        </div>
        <button
          class="planEditWindow__close"
          @click="emits('update:isOpenPlanEditWindow')"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8281 12L23.4141 3.41406C24.1953 2.63281 24.1953 1.36719 23.4141 0.585938C22.6328 -0.195312 21.3672 -0.195312 20.5859 0.585938L12 9.17188L3.41406 0.585938C2.63281 -0.195312 1.36719 -0.195312 0.585938 0.585938C-0.195312 1.36719 -0.195312 2.63281 0.585938 3.41406L9.17188 12L0.585938 20.5859C-0.195312 21.3672 -0.195312 22.6328 0.585938 23.4141C0.976562 23.8047 1.48828 24 2 24C2.51172 24 3.02344 23.8047 3.41406 23.4141L12 14.8281L20.5859 23.4141C20.9766 23.8047 21.4883 24 22 24C22.5117 24 23.0234 23.8047 23.4141 23.4141C24.1953 22.6328 24.1953 21.3672 23.4141 20.5859L14.8281 12Z"
              fill="#757575"
            />
          </svg>
        </button>
      </div>
      <div class="planEditWindow__content mb-5">
        <div class="planEditWindow__codePlan">
          <label for="codePlan" class="mb-2">Код планировки</label>
          <InputText id="codePlan" v-model="codePlan" class="w-full" />
        </div>
        <TabView class="w-full">
          <TabPanel header="Изображения">
            <PlanEditWindowImage />
          </TabPanel>
          <TabPanel header="3D-планировка">
            <PlanEditWindow3D />
          </TabPanel>
          <TabPanel header="Стороны света">
            <PlanEditWindowSideWorld
              @update:degrees="dataForm.degrees = $event"
            />
          </TabPanel>
        </TabView>
      </div>
      <div
        class="planEditWindow__footer pt-5 border-t border-t-grey-400 w-full flex flex-row justify-between"
      >
        <Button severity="success" @click="saveData()">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5325 6.9675L11.0325 2.4675C10.9634 2.40004 10.8819 2.34656 10.7925 2.31C10.6995 2.27221 10.6004 2.25187 10.5 2.25H4.5C3.90326 2.25 3.33097 2.48705 2.90901 2.90901C2.48705 3.33097 2.25 3.90326 2.25 4.5V13.5C2.25 14.0967 2.48705 14.669 2.90901 15.091C3.33097 15.5129 3.90326 15.75 4.5 15.75H13.5C14.0967 15.75 14.669 15.5129 15.091 15.091C15.5129 14.669 15.75 14.0967 15.75 13.5V7.5C15.7506 7.4013 15.7317 7.30345 15.6943 7.21207C15.657 7.12069 15.602 7.03758 15.5325 6.9675ZM6.75 3.75H9.75V5.25H6.75V3.75ZM11.25 14.25H6.75V12C6.75 11.8011 6.82902 11.6103 6.96967 11.4697C7.11032 11.329 7.30109 11.25 7.5 11.25H10.5C10.6989 11.25 10.8897 11.329 11.0303 11.4697C11.171 11.6103 11.25 11.8011 11.25 12V14.25ZM14.25 13.5C14.25 13.6989 14.171 13.8897 14.0303 14.0303C13.8897 14.171 13.6989 14.25 13.5 14.25H12.75V12C12.75 11.4033 12.5129 10.831 12.091 10.409C11.669 9.98705 11.0967 9.75 10.5 9.75H7.5C6.90326 9.75 6.33097 9.98705 5.90901 10.409C5.48705 10.831 5.25 11.4033 5.25 12V14.25H4.5C4.30109 14.25 4.11032 14.171 3.96967 14.0303C3.82902 13.8897 3.75 13.6989 3.75 13.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H5.25V6C5.25 6.19891 5.32902 6.38968 5.46967 6.53033C5.61032 6.67098 5.80109 6.75 6 6.75H10.5C10.6989 6.75 10.8897 6.67098 11.0303 6.53033C11.171 6.38968 11.25 6.19891 11.25 6V4.8075L14.25 7.8075V13.5Z"
              fill="white"
            />
          </svg>
          Сохранить
        </Button>
        <Button
          severity="secondary"
          @click="emits('update:isOpenPlanEditWindow')"
          >Отмена</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { ref } from "vue";
import PlanEditWindowImage from "./planEditWindow-image.vue";
import PlanEditWindow3D from "./planEditWindow-3d.vue";
import PlanEditWindowSideWorld from "./planEditWindow-sideWorld.vue";

defineProps<{
  isOpenPlanEditWindow: boolean;
}>();
const emits = defineEmits<{
  (e: "update:isOpenPlanEditWindow"): void;
}>();
const codePlan = ref<string>("");
const dataForm = ref({
  degrees: 0,
});
const saveData = () => {
  emits("update:isOpenPlanEditWindow");
};
</script>

<style scoped lang="scss">
.planEditWindow {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  padding: 30px 0;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s all ease-in-out;

  &.open {
    opacity: 1;
    visibility: visible;
    transition: 0.5s all ease-in-out;
  }

  &__wrapper {
    min-width: 900px;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #ffffff;
    padding: 50px;
  }

  &__head {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
  }

  &__close {
    width: 30px;
    height: 30px;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__codePlan {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 1600px) {
    &__wrapper {
      min-width: 700px;
      padding: 30px;
    }

    &__close {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
