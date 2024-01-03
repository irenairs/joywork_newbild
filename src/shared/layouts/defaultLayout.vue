<template>
  <Teleport to="body">
    <FormAddComplex
      :isOpen="formAddComplexOpen"
      @closeModel="formAddComplexOpen = !formAddComplexOpen"
    />
  </Teleport>
  <div class="defaultLayout">
    <header class="header">
      <div class="header__top">
        <div class="header__title">Жилые комплексы</div>
      </div>
      <div class="header__bottom">
        <header-nav @changeOpen="formAddComplexOpen = !formAddComplexOpen" />
        <header-type-grid />
      </div>
    </header>
    <div class="navbar">
      <div class="nav__logo">
        <img src="" alt="" />
      </div>
      <button class="nav__btnAdd"></button>
      <nav class="nav">
        <ul class="nav__list">
          <li class="list__item">
            <RouterLink to="/"></RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <main class="w-full">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderNav from "@/widgets/header/header-nav.vue";
import HeaderTypeGrid from "@/widgets/header/header-type-grid.vue";
import FormAddComplex from "@/widgets/forms/formAddComplex.vue";
import { ref } from "vue";

const formAddComplexOpen = ref<boolean>(false);
</script>

<style lang="scss">
.defaultLayout {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 110px 1fr;
  grid-template-rows: 139px 1fr;
  // grid-row-gap: 30px;
  background-color: #f3f3f3;
  .header {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    grid-column: 2;
    grid-row: 1;

    &__top {
      width: 100%;
      height: 74px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 35px;
    }
    &__title {
      font-size: 32px;
    }
    &__bottom {
      width: 100%;
      height: 64px;
      border-top: 1px solid #f3f3f3;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 35px;
    }
  }

  .navbar {
    width: 100%;
    height: 100%;
    padding: 18px 0;
    background-color: #212121;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    grid-row: span 2;
    grid-column: 1;

    &__logo {
      width: 74px;
      height: 74px;
      background-color: #fbe6d3;
      margin-bottom: 20px;
    }
  }

  main {
    position: relative;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
