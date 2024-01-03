<template>
  <div
    class="editPlanFloors w-full h-full flex justify-center items-center relative"
    ref="canvasContainer"
  >
    <ConnectionWithLayout
      :visibleWindow="visibleWindowChangePlan"
      @update:visibleWindow="visibleWindowChangePlan = false"
    />
    <div
      :class="['contextMenu', contextMenuOptions.isVisible ? 'open' : '']"
      :style="`left: ${contextMenuOptions.x}px; top: ${contextMenuOptions.y}px`"
    >
      <div
        class="contextMenu__item cursor-pointer"
        v-for="item in itemsContextMenu"
        :key="`item` + item.label"
        @click="item.command($event)"
      >
        <div class="item__icon" v-html="item.icon"></div>
        <div :class="['item__text', item.class]">{{ item.label }}</div>
      </div>
      <ConfirmPopup group="deletePlan" :pt="confirmpopupStyle"></ConfirmPopup>
    </div>
    <Button
      severity="success"
      class="!absolute 2xl:!top-[50px] xl:!top-[30px] 2xl:!left-[50px] xl:!left-[30px]"
      @click="fullScreen()"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2.5"
      >
        <path
          d="M10.2359 8.4375C10.2359 8.6625 10.0859 8.8125 9.86094 8.8125H8.73594V9.9375C8.73594 10.1625 8.58594 10.3125 8.36094 10.3125C8.13594 10.3125 7.98594 10.1625 7.98594 9.9375V8.8125H6.86094C6.63594 8.8125 6.48594 8.6625 6.48594 8.4375C6.48594 8.2125 6.63594 8.0625 6.86094 8.0625H7.98594V6.9375C7.98594 6.7125 8.13594 6.5625 8.36094 6.5625C8.58594 6.5625 8.73594 6.7125 8.73594 6.9375V8.0625H9.86094C10.0859 8.0625 10.2359 8.2125 10.2359 8.4375ZM14.1734 14.0625C14.0984 14.175 13.9859 14.2125 13.8734 14.2125C13.7984 14.2125 13.7234 14.175 13.6484 14.1375L11.0984 12.15C10.3484 12.7125 9.37344 13.05 8.36094 13.05C5.81094 13.05 3.71094 10.9875 3.71094 8.4C3.71094 5.8125 5.77344 3.75 8.36094 3.75C10.9484 3.75 13.0109 5.8125 13.0109 8.4C13.0109 9.6375 12.5234 10.8 11.6984 11.625L14.1359 13.5C14.2859 13.65 14.3234 13.9125 14.1734 14.0625ZM8.36094 12.3C10.4984 12.3 12.2609 10.575 12.2609 8.4C12.2609 6.225 10.4984 4.5375 8.36094 4.5375C6.22344 4.5375 4.46094 6.2625 4.46094 8.4375C4.46094 10.6125 6.22344 12.3 8.36094 12.3Z"
          fill="white"
        />
      </svg>
      Развернуть конструктор
    </Button>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import ConfirmPopup from "primevue/confirmpopup";
import useCanvas from "./useCanvas";
import { onMounted, ref, toRefs, watch } from "vue";
import { PTOptions } from "primevue/ts-helpers";
import { ConfirmPopupPassThroughOptions } from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";
import ConnectionWithLayout from "./connectionWithLayout.vue";

const props = defineProps<{
  image: File | null;
}>();
const visibleWindowChangePlan = ref<boolean>(false);
const { image } = toRefs(props);
const confirm = useConfirm();
const canvas = ref<HTMLCanvasElement | null>(null);
const canvasContainer = ref<HTMLElement | null>(null);
const itemsContextMenu = ref([
  {
    label: "Связать с планировкой",
    icon: `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_946_14)">
<path d="M10.9813 7.51593C10.7681 7.30145 10.5317 7.11132 10.2765 6.94903C9.60047 6.51616 8.81459 6.28614 8.01187 6.28614C6.89772 6.28407 5.82884 6.72674 5.0424 7.51593L1.22709 11.3342C0.441976 12.1209 0.000703868 13.1866 8.69406e-07 14.298C-0.00147543 16.6172 1.87736 18.4985 4.19655 18.4999C5.30898 18.5038 6.37687 18.0632 7.16303 17.2762L10.3125 14.1267C10.3697 14.07 10.4016 13.9926 10.4012 13.912C10.4002 13.7464 10.2652 13.6129 10.0995 13.6138H9.97952C9.32152 13.6161 8.66938 13.4898 8.05988 13.2419C7.94758 13.1957 7.81851 13.2217 7.73295 13.3079L5.46835 15.5755C4.76514 16.2787 3.62501 16.2787 2.9218 15.5755C2.21859 14.8722 2.21859 13.7321 2.9218 13.0289L6.75213 9.20162C7.45478 8.49985 8.59304 8.49985 9.29568 9.20162C9.76922 9.64728 10.5079 9.64728 10.9814 9.20162C11.1851 8.99771 11.3086 8.72727 11.3293 8.43974C11.3512 8.09615 11.2245 7.75966 10.9813 7.51593Z" fill="#666666"/>
<path d="M16.7679 1.72999C15.1279 0.0900024 12.4689 0.0900024 10.8289 1.72999L7.68247 4.87342C7.59607 4.96024 7.57115 5.09082 7.61948 5.20337C7.66725 5.31624 7.77889 5.38868 7.90142 5.38632H8.01239C8.66962 5.38513 9.32071 5.51248 9.92904 5.76127C10.0413 5.80749 10.1704 5.78141 10.256 5.69529L12.5146 3.43969C13.2178 2.73648 14.3579 2.73648 15.0611 3.43969C15.7643 4.1429 15.7643 5.28302 15.0611 5.98623L12.2476 8.79671L12.2236 8.82371L11.2398 9.80154C10.5371 10.5033 9.39888 10.5033 8.69623 9.80154C8.22269 9.35588 7.48405 9.35588 7.01055 9.80154C6.80552 10.007 6.68189 10.2798 6.6626 10.5694C6.64066 10.913 6.76738 11.2495 7.01055 11.4932C7.35772 11.8419 7.76391 12.1262 8.21032 12.3331C8.27331 12.3631 8.3363 12.3871 8.39928 12.4141C8.46227 12.4411 8.52825 12.462 8.59124 12.486C8.65423 12.5101 8.7202 12.531 8.78319 12.549L8.96017 12.597C9.08014 12.627 9.20014 12.651 9.32309 12.672C9.47122 12.694 9.62039 12.708 9.77003 12.714H9.97998H9.99797L10.1779 12.693C10.2439 12.69 10.3129 12.675 10.3909 12.675H10.4929L10.6998 12.645L10.7958 12.627L10.9698 12.591H11.0028C11.7396 12.406 12.4124 12.0245 12.9494 11.4872L16.7677 7.66893C18.4078 6.02894 18.4078 3.36998 16.7679 1.72999Z" fill="#666666"/>
</g>
<defs>
<clipPath id="clip0_946_14">
<rect width="18" height="18" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
`,
    command: () => {
      visibleWindowChangePlan.value = true;
    },
  },
  {
    label: "Удалить область",
    icon: `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 14C7.69891 14 7.88968 13.921 8.03033 13.7803C8.17098 13.6397 8.25 13.4489 8.25 13.25V8.75C8.25 8.55109 8.17098 8.36032 8.03033 8.21967C7.88968 8.07902 7.69891 8 7.5 8C7.30109 8 7.11032 8.07902 6.96967 8.21967C6.82902 8.36032 6.75 8.55109 6.75 8.75V13.25C6.75 13.4489 6.82902 13.6397 6.96967 13.7803C7.11032 13.921 7.30109 14 7.5 14ZM15 5H12V4.25C12 3.65326 11.7629 3.08097 11.341 2.65901C10.919 2.23705 10.3467 2 9.75 2H8.25C7.65326 2 7.08097 2.23705 6.65901 2.65901C6.23705 3.08097 6 3.65326 6 4.25V5H3C2.80109 5 2.61032 5.07902 2.46967 5.21967C2.32902 5.36032 2.25 5.55109 2.25 5.75C2.25 5.94891 2.32902 6.13968 2.46967 6.28033C2.61032 6.42098 2.80109 6.5 3 6.5H3.75V14.75C3.75 15.3467 3.98705 15.919 4.40901 16.341C4.83097 16.7629 5.40326 17 6 17H12C12.5967 17 13.169 16.7629 13.591 16.341C14.0129 15.919 14.25 15.3467 14.25 14.75V6.5H15C15.1989 6.5 15.3897 6.42098 15.5303 6.28033C15.671 6.13968 15.75 5.94891 15.75 5.75C15.75 5.55109 15.671 5.36032 15.5303 5.21967C15.3897 5.07902 15.1989 5 15 5ZM7.5 4.25C7.5 4.05109 7.57902 3.86032 7.71967 3.71967C7.86032 3.57902 8.05109 3.5 8.25 3.5H9.75C9.94891 3.5 10.1397 3.57902 10.2803 3.71967C10.421 3.86032 10.5 4.05109 10.5 4.25V5H7.5V4.25ZM12.75 14.75C12.75 14.9489 12.671 15.1397 12.5303 15.2803C12.3897 15.421 12.1989 15.5 12 15.5H6C5.80109 15.5 5.61032 15.421 5.46967 15.2803C5.32902 15.1397 5.25 14.9489 5.25 14.75V6.5H12.75V14.75ZM10.5 14C10.6989 14 10.8897 13.921 11.0303 13.7803C11.171 13.6397 11.25 13.4489 11.25 13.25V8.75C11.25 8.55109 11.171 8.36032 11.0303 8.21967C10.8897 8.07902 10.6989 8 10.5 8C10.3011 8 10.1103 8.07902 9.96967 8.21967C9.82902 8.36032 9.75 8.55109 9.75 8.75V13.25C9.75 13.4489 9.82902 13.6397 9.96967 13.7803C10.1103 13.921 10.3011 14 10.5 14Z" fill="#FF3838"/>
</svg>
`,
    class: "text-red",
    command: (e: Event) => {
      showTemplate(e);
    },
  },
]);
const confirmpopupStyle = ref<PTOptions<ConfirmPopupPassThroughOptions>>({
  root: {
    class: ["!p-3.5"],
  },
  content: {
    class: ["!p-0 !mb-2.5"],
  },
  message: {
    class: ["!m-0 !text-base !font-normal"],
  },
  footer: {
    class: ["!flex !flex-row-reverse !justify-center !gap-x-3 !p-0"],
  },
  rejectButton: {
    class: ["!px-3 !font-normal !m-0"],
  },
  acceptButton: {
    class: ["!px-3 !font-normal"],
  },
});
const showTemplate = (event: Event) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: "deletePlan",
    message: "Удалить область?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    acceptClass: "!bg-red !shadow-none",
    rejectClass: "!bg-green !shadow-none",
    accept: () => {
      deleteFigure(idFigureOnContextMenu.value);
      contextMenuOptions.value = {
        isVisible: false,
        x: 0,
        y: 0,
      };
    },
    reject: () => {
      contextMenuOptions.value = {
        isVisible: false,
        x: 0,
        y: 0,
      };
      return;
    },
  });
};

const {
  figures,
  idFigureOnContextMenu,
  contextMenuOptions,
  uploadImage,
  clickHandler,
  contextmenuHandler,
  mousemoveHandler,
  deleteFigure,
} = useCanvas();

watch(figures, (newV) => {
  console.log(newV);
});

watch(image, (newV) => {
  if (canvas.value && newV) uploadImage(newV, canvas.value);
});

watch(visibleWindowChangePlan, (newV) => {
  if (!newV)
    contextMenuOptions.value = {
      isVisible: false,
      x: 0,
      y: 0,
    };
});

const fullScreen = () => {
  if (canvasContainer.value?.requestFullscreen) {
    if (!document.fullscreenElement) {
      canvasContainer.value.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
};

onMounted(() => {
  canvas.value?.addEventListener("click", (e) => clickHandler(e));
  canvas.value?.addEventListener("contextmenu", (e) => contextmenuHandler(e));
  canvas.value?.addEventListener("mousemove", (e) => mousemoveHandler(e));
});
</script>

<style scoped lang="scss">
.editPlanFloors {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .contextMenu {
    position: absolute;
    border-radius: 6px;
    border: 1px solid #bdbdbd;
    background: #ffffff;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
    padding: 10px 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 10px;
    z-index: 20;
    opacity: 0;
    visibility: hidden;
    display: none;

    &.open {
      opacity: 1;
      visibility: visible;
      display: flex;
    }

    &__item {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 30px;
      color: #757575;

      .item__icon {
        width: 18px;
        height: 18px;
        margin-right: 10px;

        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
