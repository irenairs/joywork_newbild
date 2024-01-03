<template>
  <DefaultLayout>
    <div class="homePage relative bg-white flex justify-start items-start">
      <RouterView v-slot="{ Component, route }">
        <transition
          :name="route.meta.animateName ? (route.meta.animateName as string) : 'slide'"
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/shared/layouts/defaultLayout.vue";
</script>

<style lang="scss">
.homePage {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.slide-enter-active,
.slide-leave-active {
  transition: left 1s ease, opacity 1s ease;
}

.slide-enter-from {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  opacity: 0;
}
.slide-enter-to {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0%;
  opacity: 1;
}

.slide-leave-from {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0%;
  opacity: 1;
}
.slide-leave-to {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  opacity: 0;
}
</style>
