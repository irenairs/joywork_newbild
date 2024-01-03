<template>
  <Teleport to="body">
    <div id="popup" class="popup">
      <div class="popup__body">
        <div class="popup__title">{{ numberFloor }} этаж</div>
        <div class="popup__text">
          Свободно <span class="text-green">60</span> квартир от
          <span class="text-green">3 000 000 руб.</span>
        </div>
        <div class="popup__listPartament">
          <div class="partament">
            <div class="icon">1к</div>
            <div class="text">20</div>
          </div>
          <div class="partament">
            <div class="icon">2к</div>
            <div class="text">20</div>
          </div>
          <div class="partament">
            <div class="icon">3к</div>
            <div class="text">20</div>
          </div>
          <div class="partament">
            <div class="icon">4к</div>
            <div class="text">20</div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  numberFloor: number;
  floorData: [];
}>();
</script>

<style scoped lang="scss">
.popup {
  position: absolute;
  background: #fff;
  box-shadow: 0 6px 27px rgba(0, 0, 0, 0.25);
  transform: translate(-50%, -50%);
  width: max-content;
  border-radius: 4px;
  border: 1px solid #3e9842;
  padding: 10px 18px 15px 24px;

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
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
  }
  &__text {
    font-size: 12px;
    margin-bottom: 13px;
    span {
      font-weight: 500;
    }
  }
  &__listPartament {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 35px;
    .partament {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon {
        width: 24px;
        height: 24px;
        border-radius: 100%;
        background-color: #4caf50;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #ffffff;
        margin-right: 10px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
}
</style>
