<template>
  <div class="header__nav">
    <RouterLink to="/" class="nav__link" exactActiveClass="nav__link--active">
      Мои объекты
      <div class="count">12</div>
    </RouterLink>
    <RouterLink
      to="/import"
      class="nav__link"
      exactActiveClass="nav__link--active"
      >Импорт</RouterLink
    >
    <button class="nav__link header__addObject" @click="emits('changeOpen')">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6445 1.21814H10.3555V20.784H11.6445V1.21814Z"
          fill="#4CAF50"
        />
        <path
          d="M20.784 10.3555H1.21814V11.6445H20.784V10.3555Z"
          fill="#4CAF50"
        />
      </svg>
      Новый комплекс
    </button>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: "changeOpen"): void;
}>();
</script>

<style scoped lang="scss">
.header__nav {
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 50px;
  .nav__link {
    position: relative;
    width: auto;
    height: 100%;
    @apply font-normal;
    font-size: 16px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
      margin-right: 6px;
    }
    .count {
      position: absolute;
      right: -32px;
      top: 50%;
      transform: translateY(-50%);
      @apply bg-green;
      padding: 6px;
      border-radius: 30px;
      @apply text-white;
      font-size: 12px;
      line-height: 100%;
      font-style: normal;
      font-weight: 700;
    }
    &.header__addObject {
      svg {
        position: absolute;
        left: -28px;
      }
    }
  }
  a.nav__link {
    &.nav__link--active {
      border-bottom: 3px solid;
      @apply border-green;
      &::before {
        height: 0;
      }
    }
    &::before {
      position: absolute;
      width: 100%;
      height: 1px;
      @apply bg-black-800;
      content: "";
      bottom: 18px;
    }
  }
}
</style>
