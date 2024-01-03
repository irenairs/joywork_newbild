<template>
  <div id="popup" class="popup">
    <div class="popup__head">
      <div class="popup__title">Связать область</div>
      <a href="#" id="popup-closer" class="popup__close">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.69766 8.00005L14.8492 2.84849C15.318 2.37974 15.318 1.62036 14.8492 1.15161C14.3805 0.682861 13.6211 0.682861 13.1523 1.15161L8.00078 6.30317L2.84922 1.15161C2.38047 0.682861 1.62109 0.682861 1.15234 1.15161C0.683594 1.62036 0.683594 2.37974 1.15234 2.84849L6.30391 8.00005L1.15234 13.1516C0.683594 13.6204 0.683594 14.3797 1.15234 14.8485C1.38672 15.0829 1.69375 15.2 2.00078 15.2C2.30781 15.2 2.61484 15.0829 2.84922 14.8485L8.00078 9.69692L13.1523 14.8485C13.3867 15.0829 13.6937 15.2 14.0008 15.2C14.3078 15.2 14.6148 15.0829 14.8492 14.8485C15.318 14.3797 15.318 13.6204 14.8492 13.1516L9.69766 8.00005Z"
            fill="#757575"
          />
        </svg>
      </a>
    </div>
    <div class="popup__body">
      <div class="popup__floor">
        <label for="">Этаж</label>
        <Dropdown
          v-model="data.floor"
          :options="props.floorsDropdown"
          option-label="number"
          option-value="id"
        ></Dropdown>
      </div>
      <div class="popup__section">
        <label for="">Подъезд</label>
        <Dropdown
          v-model="data.section"
          :options="props.sectionsDropdown"
          option-label="name"
          option-value="id"
        ></Dropdown>
      </div>
      <div class="popup__btns">
        <Button severity="success" @click="emits('save', data)">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5325 4.9675L9.0325 0.4675C8.96339 0.400037 8.8819 0.346557 8.7925 0.31C8.69951 0.272213 8.60036 0.251874 8.5 0.25H2.5C1.90326 0.25 1.33097 0.487053 0.90901 0.90901C0.487053 1.33097 0.25 1.90326 0.25 2.5V11.5C0.25 12.0967 0.487053 12.669 0.90901 13.091C1.33097 13.5129 1.90326 13.75 2.5 13.75H11.5C12.0967 13.75 12.669 13.5129 13.091 13.091C13.5129 12.669 13.75 12.0967 13.75 11.5V5.5C13.7506 5.4013 13.7317 5.30345 13.6943 5.21207C13.657 5.12069 13.602 5.03758 13.5325 4.9675ZM4.75 1.75H7.75V3.25H4.75V1.75ZM9.25 12.25H4.75V10C4.75 9.80109 4.82902 9.61032 4.96967 9.46967C5.11032 9.32902 5.30109 9.25 5.5 9.25H8.5C8.69891 9.25 8.88968 9.32902 9.03033 9.46967C9.17098 9.61032 9.25 9.80109 9.25 10V12.25ZM12.25 11.5C12.25 11.6989 12.171 11.8897 12.0303 12.0303C11.8897 12.171 11.6989 12.25 11.5 12.25H10.75V10C10.75 9.40326 10.5129 8.83097 10.091 8.40901C9.66903 7.98705 9.09674 7.75 8.5 7.75H5.5C4.90326 7.75 4.33097 7.98705 3.90901 8.40901C3.48705 8.83097 3.25 9.40326 3.25 10V12.25H2.5C2.30109 12.25 2.11032 12.171 1.96967 12.0303C1.82902 11.8897 1.75 11.6989 1.75 11.5V2.5C1.75 2.30109 1.82902 2.11032 1.96967 1.96967C2.11032 1.82902 2.30109 1.75 2.5 1.75H3.25V4C3.25 4.19891 3.32902 4.38968 3.46967 4.53033C3.61032 4.67098 3.80109 4.75 4 4.75H8.5C8.69891 4.75 8.88968 4.67098 9.03033 4.53033C9.17098 4.38968 9.25 4.19891 9.25 4V2.8075L12.25 5.8075V11.5Z"
              fill="white"
            />
          </svg>
          Сохранить
        </Button>
        <Button severity="danger" id="delete">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 13.5C7.69891 13.5 7.88968 13.421 8.03033 13.2803C8.17098 13.1397 8.25 12.9489 8.25 12.75V8.25C8.25 8.05109 8.17098 7.86032 8.03033 7.71967C7.88968 7.57902 7.69891 7.5 7.5 7.5C7.30109 7.5 7.11032 7.57902 6.96967 7.71967C6.82902 7.86032 6.75 8.05109 6.75 8.25V12.75C6.75 12.9489 6.82902 13.1397 6.96967 13.2803C7.11032 13.421 7.30109 13.5 7.5 13.5ZM15 4.5H12V3.75C12 3.15326 11.7629 2.58097 11.341 2.15901C10.919 1.73705 10.3467 1.5 9.75 1.5H8.25C7.65326 1.5 7.08097 1.73705 6.65901 2.15901C6.23705 2.58097 6 3.15326 6 3.75V4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25C2.25 5.44891 2.32902 5.63968 2.46967 5.78033C2.61032 5.92098 2.80109 6 3 6H3.75V14.25C3.75 14.8467 3.98705 15.419 4.40901 15.841C4.83097 16.2629 5.40326 16.5 6 16.5H12C12.5967 16.5 13.169 16.2629 13.591 15.841C14.0129 15.419 14.25 14.8467 14.25 14.25V6H15C15.1989 6 15.3897 5.92098 15.5303 5.78033C15.671 5.63968 15.75 5.44891 15.75 5.25C15.75 5.05109 15.671 4.86032 15.5303 4.71967C15.3897 4.57902 15.1989 4.5 15 4.5ZM7.5 3.75C7.5 3.55109 7.57902 3.36032 7.71967 3.21967C7.86032 3.07902 8.05109 3 8.25 3H9.75C9.94891 3 10.1397 3.07902 10.2803 3.21967C10.421 3.36032 10.5 3.55109 10.5 3.75V4.5H7.5V3.75ZM12.75 14.25C12.75 14.4489 12.671 14.6397 12.5303 14.7803C12.3897 14.921 12.1989 15 12 15H6C5.80109 15 5.61032 14.921 5.46967 14.7803C5.32902 14.6397 5.25 14.4489 5.25 14.25V6H12.75V14.25ZM10.5 13.5C10.6989 13.5 10.8897 13.421 11.0303 13.2803C11.171 13.1397 11.25 12.9489 11.25 12.75V8.25C11.25 8.05109 11.171 7.86032 11.0303 7.71967C10.8897 7.57902 10.6989 7.5 10.5 7.5C10.3011 7.5 10.1103 7.57902 9.96967 7.71967C9.82902 7.86032 9.75 8.05109 9.75 8.25V12.75C9.75 12.9489 9.82902 13.1397 9.96967 13.2803C10.1103 13.421 10.3011 13.5 10.5 13.5Z"
              fill="white"
            />
          </svg>
          Удалить
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DropdownPassThroughOptions } from "primevue/dropdown";
import { PTOptions } from "primevue/ts-helpers";
import { ref } from "vue";

type SaveData = {
  floor: string;
  section: string;
};

const props = defineProps<{
  floorsDropdown: any[];
  sectionsDropdown: any[];
}>();
const emits = defineEmits<{
  (e: "save", value: SaveData): void;
}>();
const data = ref<SaveData>({
  floor: props.floorsDropdown[0].id,
  section: props.sectionsDropdown[0].id,
});
const dropdownStyle = ref<PTOptions<DropdownPassThroughOptions>>({
  root: {},
});
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  background: #fff;
  box-shadow: 0 6px 27px rgba(0, 0, 0, 0.25);
  transform: translate(-50%, -50%);
  width: max-content;
  border-radius: 4px;

  &__head {
    width: 100%;
    height: auto;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bdbdbd;
  }

  &__title {
    font-size: 20px;
  }

  &__close {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__body {
    padding: 30px;
    padding-top: 17px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__floor,
  &__section {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 140px;
  }

  &__floor {
    margin-bottom: 30px;
  }

  &__section {
    margin-bottom: 20px;
  }

  &__btns {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 22px;
  }
}
</style>
