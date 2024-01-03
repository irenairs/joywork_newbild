<template>
  <div class="modalWindow" ref="modalWindowEl">
    <div class="modalWindow__wrapper">
      <div class="modalWindow__title">{{ props.title }}</div>
      <button class="modalWindow__close" @click="emits('closeModel')">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.93511 18C0.698006 18 0.460901 17.9099 0.280756 17.7284C-0.0808901 17.3667 -0.0808901 16.7804 0.280756 16.4187L16.4283 0.271235C16.7899 -0.0904116 17.3762 -0.0904116 17.7379 0.271235C18.0995 0.632881 18.0995 1.2192 17.7379 1.58107L1.59059 17.7284C1.40909 17.9087 1.17199 18 0.93511 18Z"
            fill="#757579"
          />
          <path
            d="M17.0838 18C16.8466 18 16.6098 17.9099 16.4294 17.7284L0.280756 1.58107C-0.0808901 1.2192 -0.0808901 0.632881 0.280756 0.271235C0.642403 -0.0904116 1.22872 -0.0904116 1.59059 0.271235L17.7379 16.4187C18.0995 16.7804 18.0995 17.3667 17.7379 17.7284C17.5564 17.9087 17.3195 18 17.0838 18Z"
            fill="#757579"
          />
        </svg>
      </button>
      <slot />
      <slot name="formBtns" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits<{
  (e: "closeModel"): void;
}>();
const props = defineProps<{
  title: string;
}>();
const modalWindowEl = ref<HTMLElement>();

document.addEventListener("click", (e: Event) => {
  if (e.target === modalWindowEl.value) {
    emits("closeModel");
  }
});
</script>

<style scoped lang="scss">
.modalWindow {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s all ease-in-out;

  &.open {
    opacity: 1;
    visibility: visible;
    transition: 0.3s all ease-in-out;
  }

  &__wrapper {
    position: relative;
    width: 760px;
    height: 80vh;
    @apply bg-white;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;
  }

  &__title {
    font-size: 28px;
    line-height: 100%;
  }

  &__close {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 20px;
    height: 20px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
