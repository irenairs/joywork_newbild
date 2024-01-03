<template>
  <teleport to="body">
    <PopupWindow
      :floors-dropdown="floorsDropdown"
      :sectionsDropdown="sectionsDropdown"
      @delete="deletePolygon()"
      @save="floorsCanvas.saveOverlay($event)"
    />
    <div
      class="modal"
      :class="visible ? 'open' : ''"
      id="facade-mapping-layer"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="head flex justify-between items-end">
              <div class="modal__title">Разметка фасадов</div>
              <Button
                text
                class="modal__close !px-0 !py-0"
                @click="emits('update:visible')"
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
              </Button>
            </div>
            <div class="fields">
              <div class="field titleFacade 2xl:w-[300px] xl:w-[250px]">
                <label>Название фасада <span class="text-red">*</span></label>
                <InputText v-model="activeFacade.title" class="w-full" />
                <small>Например: “Вид с улицы Лермонтова”</small>
              </div>

              <div class="field publishFacade">
                <label>Название фасада <span class="text-red">*</span></label>
                <Dropdown
                  v-model="activeFacade.isPublish"
                  :options="isPublishOptions"
                  option-label="name"
                  option-value="value"
                />
              </div>
              <div
                class="field colorHover w-max 2xl:max-w-none xl:max-w-[300px]"
              >
                <label
                  >Цвет выделения этажа при наведении
                  <span class="text-red">*</span></label
                >
                <SelectButton
                  v-model="changeColor"
                  :options="colors"
                  option-value="value"
                  :pt="styleSelectButtons"
                >
                  <template #option="slotProps">
                    <div
                      class="2xl:min-w-[24px] xl:min-w-[20px] 2xl:w-[24px] xl:w-[20px] 2xl:h-[24px] xl:h-[20px] rounded-full flex justify-center items-center"
                      :style="`background-color: ${slotProps.option.value}`"
                    >
                      <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        :class="[
                          'w-[60%]',
                          slotProps.option.value === changeColor
                            ? 'visible'
                            : 'hidden',
                        ]"
                      >
                        <path
                          d="M19.2522 1.63495C18.255 0.617777 16.6389 0.617777 15.6417 1.63495L6.61526 10.8414L4.35833 8.53951C3.36116 7.52233 1.74505 7.52233 0.74788 8.53951C-0.249293 9.55668 -0.249293 11.2053 0.74788 12.2219L4.80971 16.3649C5.80688 17.3821 7.42299 17.3821 8.42016 16.3649L19.2521 5.31792C20.2494 4.30075 20.2494 2.65212 19.2522 1.63495Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </template>
                </SelectButton>
              </div>
              <div class="field opacity">
                <label
                  >Прозрачность разметки <span class="text-red">*</span></label
                >
                <Slider
                  v-model="changeOpacity"
                  :pt="styleSlider"
                  :min="0.1"
                  :max="1"
                  :step="0.1"
                />
              </div>
              <Button
                severity="success"
                class="ml-auto cursor-pointer"
                @click="emits('saveFacade')"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2"
                >
                  <path
                    d="M13.5325 4.9675L9.0325 0.4675C8.96339 0.400037 8.8819 0.346557 8.7925 0.31C8.69951 0.272213 8.60036 0.251874 8.5 0.25H2.5C1.90326 0.25 1.33097 0.487053 0.90901 0.90901C0.487053 1.33097 0.25 1.90326 0.25 2.5V11.5C0.25 12.0967 0.487053 12.669 0.90901 13.091C1.33097 13.5129 1.90326 13.75 2.5 13.75H11.5C12.0967 13.75 12.669 13.5129 13.091 13.091C13.5129 12.669 13.75 12.0967 13.75 11.5V5.5C13.7506 5.4013 13.7317 5.30345 13.6943 5.21207C13.657 5.12069 13.602 5.03758 13.5325 4.9675ZM4.75 1.75H7.75V3.25H4.75V1.75ZM9.25 12.25H4.75V10C4.75 9.80109 4.82902 9.61032 4.96967 9.46967C5.11032 9.32902 5.30109 9.25 5.5 9.25H8.5C8.69891 9.25 8.88968 9.32902 9.03033 9.46967C9.17098 9.61032 9.25 9.80109 9.25 10V12.25ZM12.25 11.5C12.25 11.6989 12.171 11.8897 12.0303 12.0303C11.8897 12.171 11.6989 12.25 11.5 12.25H10.75V10C10.75 9.40326 10.5129 8.83097 10.091 8.40901C9.66903 7.98705 9.09674 7.75 8.5 7.75H5.5C4.90326 7.75 4.33097 7.98705 3.90901 8.40901C3.48705 8.83097 3.25 9.40326 3.25 10V12.25H2.5C2.30109 12.25 2.11032 12.171 1.96967 12.0303C1.82902 11.8897 1.75 11.6989 1.75 11.5V2.5C1.75 2.30109 1.82902 2.11032 1.96967 1.96967C2.11032 1.82902 2.30109 1.75 2.5 1.75H3.25V4C3.25 4.19891 3.32902 4.38968 3.46967 4.53033C3.61032 4.67098 3.80109 4.75 4 4.75H8.5C8.69891 4.75 8.88968 4.67098 9.03033 4.53033C9.17098 4.38968 9.25 4.19891 9.25 4V2.8075L12.25 5.8075V11.5Z"
                    fill="white"
                  />
                </svg>
                Сохранить
              </Button>
            </div>
          </div>
          <div class="modal-body">
            <div class="facade-map">
              <div
                id="map"
                class="map ol-map"
                :data-image-src="props.activeFacade?.image"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";
import useCanvas from "@/features/useEditFacades";
import SelectButton, {
  SelectButtonPassThroughOptions,
} from "primevue/selectbutton";
import { PTOptions } from "primevue/ts-helpers";
import Slider, { SliderPassThroughOptions } from "primevue/slider";
import { Area, IFacade } from "@/app/types/facades";
import PopupWindow from "./popupWindow.vue";
import { TOlMap } from "@/app/types/facadeCanvas";

const props = defineProps<{
  activeFacade: IFacade;
  visible: boolean;
}>();

const emits = defineEmits<{
  (e: "update:visible"): void;
  (e: "saveFacade"): void;
}>();

const { activeFacade, visible } = toRefs(props);
const colors = ref([
  { value: "#FF0A0A" },
  { value: "#FF0B80" },
  { value: "#E338FF" },
  { value: "#8438FF" },
  { value: "#4838FF" },
  { value: "#38CFFF" },
  { value: "#38FFCF" },
  { value: "#38FF7C" },
  { value: "#D7FF38" },
  { value: "#FFDF38" },
  { value: "#FFC738" },
  { value: "#FF8C38" },
  { value: "#FF5038" },
  { value: "#FF3838" },
]);
const isPublishOptions = ref([
  {
    name: "Да",
    value: true,
  },
  {
    name: "Нет",
    value: false,
  },
]);
const styleSelectButtons = ref<PTOptions<SelectButtonPassThroughOptions>>({
  root: {
    class: [
      "flex gap-2.5 2xl:py-2.5 xl:py-0 2xl:flex-nowrap xl:flex-wrap justify-start items-center",
    ],
  },
  button: ({ context }) => {
    return {
      class: [
        "w-max h-max !py-0 !px-0 !border-0 !shadow-none",
        context.active ? "!bg-transparent !shadow-none" : "",
      ],
    };
  },
});
const styleSlider = ref<PTOptions<SliderPassThroughOptions>>({
  root: {
    class: ["bg-grey-700 w-full"],
  },
  range: {
    class: ["!bg-grey-700 rounded"],
  },
  handle: {
    class: ["!bg-blue !border-0 focus:!shadow-none"],
  },
});
const floorsDropdown = ref([
  {
    id: "skdnf1",
    number: 1,
  },
  {
    id: "skdnf2",
    number: 2,
  },
  {
    id: "skdnf3",
    number: 3,
  },
  {
    id: "skdnf4",
    number: 4,
  },
  {
    id: "skdnf5",
    number: 5,
  },
  {
    id: "skdnf6",
    number: 6,
  },
  {
    id: "skdnf7",
    number: 7,
  },
]);
const sectionsDropdown = ref([
  {
    id: "skdnf1",
    number: 1,
    name: "Секция 1",
  },
  {
    id: "skdnf2",
    number: 2,
    name: "Секция 2",
  },
  {
    id: "skdnf3",
    number: 3,
    name: "Секция 3",
  },
  {
    id: "skdnf4",
    number: 4,
    name: "Секция 4",
  },
]);
const modal = ref();
const changeColor = ref("#FF0A0A");
const changeOpacity = ref(0.5);
const mapClass = ref<TOlMap>();
let areas = ref<Area[]>();
const floorsCanvas = useCanvas(
  typeof activeFacade.value.image === "string"
    ? activeFacade.value.image
    : activeFacade.value.image.src,
  changeColor.value,
  changeOpacity.value
);

watch(changeColor, (newV) => {
  mapClass.value.setColor(newV, changeOpacity.value);
});
watch(changeOpacity, (newV) => {
  mapClass.value.setColor(changeColor.value, newV);
});

const deletePolygon = () => {
  mapClass.value;
};

watch(floorsCanvas.floorPoints, (newV) => {
  console.log(newV);
});

onMounted(() => {
  floorsCanvas.start(modal.value);

  mapClass.value = floorsCanvas.olMap.value;
  areas = floorsCanvas.floorPoints;
});
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s all ease-in-out;

  &.open {
    opacity: 1;
    visibility: visible;
    transition: 0.5s all ease-in-out;
  }

  &-dialog {
    width: 95%;
    height: 90%;
    background-color: white;
  }

  &-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &-header {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #9e9e9e;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 50px;
    padding-bottom: 38px;

    .head {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: end;
      margin-bottom: 30px;

      .modal__title {
        font-size: 32px;
        line-height: 120%;
      }

      .modal__close {
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }

    .fields {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: start;
      column-gap: 100px;
      padding-right: 50px;

      .field {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        label {
          margin-bottom: 10px;
        }
        small {
          margin-top: 15px;
          font-size: 14px;
          color: #757575;
        }
      }
    }

    @media screen and (max-width: 1600px) {
      padding: 30px;
      padding-bottom: 28px;

      .head {
        margin-bottom: 21px;

        .modal__title {
          font-size: 28px;
        }

        .modal__close {
          width: 20px;
          height: 20px;
        }
      }

      .fields {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: start;
        column-gap: 40px;

        .field {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          label {
            margin-bottom: 10px;
          }
          small {
            margin-top: 15px;
            font-size: 14px;
            color: #757575;
          }
        }
      }
    }
  }

  &-body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .map {
      width: 100%;
      height: 100%;
    }
    .facade-map {
      width: 100%;
      height: 100%;
    }
    .ol-map {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      &__pane {
        height: 100%;
      }

      &__zoom {
        position: relative;
        max-width: 250px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-bottom: 20px;

        &-slider {
          padding: 0;
          position: relative;
          width: 124px;
          height: 4px;
          background: #9e9e9e !important;
          z-index: 2;
          transform: rotate(180deg);
          button {
            position: absolute;
            top: -9px;
            left: 0;
            width: 20px;
            height: 20px;
            -webkit-border-radius: 11px !important;
            border-radius: 11px !important;
            background: #519ef3;
            -webkit-transition: background 0.2s ease;
            transition: background 0.2s ease;
          }
        }
        &-label {
          position: absolute;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          color: #000;
          font-size: 18px;
          text-align: center;
        }
        &-btns {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: rotate(180deg) translateY(50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          button {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            background-color: rgba(76, 175, 80, 1);
            color: white;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 2px;
          }
        }
      }

      @media screen and (max-width: 1600px) {
        &__zoom {
          position: relative;
          max-width: 230px;
          height: 80px;
          margin-bottom: 20px;
          &-label {
            position: absolute;
            top: 70px;
            font-size: 16px;
          }
          &-btns {
            button {
              width: 30px;
              height: 30px;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
