<template>
  <DefaultLayout>
    <WindowEditFacades
      v-if="activeFacade"
      :active-facade="activeFacade"
      :visible="visibleEditWindow"
      @update:visible="(visibleEditWindow = false), (activeFacade = null)"
      @save-facade="saveFacade()"
    />
    <div class="editFacades bg-white p-7.5 h-full">
      <div class="title text-[32px] mb-7.5">
        <span class="text-grey-900">Фасады:</span> Тестовый ЖК Невский —
        Тестовый дом
      </div>
      <Message :closable="false">
        <template #messageicon>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-[18px] h-auto mr-2.5"
          >
            <path
              d="M9.00161 8.25C8.8027 8.25 8.61193 8.32902 8.47128 8.46967C8.33063 8.61032 8.25161 8.80109 8.25161 9V11.25C8.25161 11.4489 8.33063 11.6397 8.47128 11.7803C8.61193 11.921 8.8027 12 9.00161 12C9.20052 12 9.39129 11.921 9.53194 11.7803C9.67259 11.6397 9.75161 11.4489 9.75161 11.25V9C9.75161 8.80109 9.67259 8.61032 9.53194 8.46967C9.39129 8.32902 9.20052 8.25 9.00161 8.25ZM9.00161 6C8.85327 6 8.70827 6.04399 8.58493 6.1264C8.46159 6.20881 8.36546 6.32594 8.3087 6.46299C8.25193 6.60003 8.23708 6.75083 8.26602 6.89632C8.29496 7.0418 8.36639 7.17544 8.47128 7.28033C8.57617 7.38522 8.70981 7.45665 8.85529 7.48559C9.00078 7.51453 9.15158 7.49968 9.28862 7.44291C9.42567 7.38614 9.5428 7.29001 9.62521 7.16668C9.70762 7.04334 9.75161 6.89834 9.75161 6.75C9.75161 6.55109 9.67259 6.36032 9.53194 6.21967C9.39129 6.07902 9.20052 6 9.00161 6ZM9.00161 1.5C8.01669 1.5 7.04142 1.69399 6.13148 2.0709C5.22154 2.44781 4.39475 3.00026 3.69831 3.6967C2.29178 5.10322 1.50161 7.01088 1.50161 9C1.49505 10.7319 2.0947 12.4114 3.19661 13.7475L1.69661 15.2475C1.59254 15.353 1.52204 15.4869 1.49401 15.6324C1.46598 15.7779 1.48167 15.9284 1.53911 16.065C1.6014 16.1999 1.70239 16.3133 1.82924 16.3908C1.9561 16.4682 2.10311 16.5063 2.25161 16.5H9.00161C10.9907 16.5 12.8984 15.7098 14.3049 14.3033C15.7114 12.8968 16.5016 10.9891 16.5016 9C16.5016 7.01088 15.7114 5.10322 14.3049 3.6967C12.8984 2.29018 10.9907 1.5 9.00161 1.5ZM9.00161 15H4.05911L4.75661 14.3025C4.82747 14.233 4.88385 14.1502 4.92247 14.0588C4.9611 13.9674 4.9812 13.8692 4.98161 13.77C4.97879 13.5722 4.89792 13.3835 4.75661 13.245C3.77455 12.264 3.16299 10.9729 3.02613 9.59159C2.88926 8.21029 3.23557 6.82425 4.00603 5.66964C4.77649 4.51503 5.92345 3.66327 7.25149 3.25948C8.57954 2.85569 10.0065 2.92485 11.2893 3.45519C12.572 3.98552 13.6312 4.94421 14.2864 6.16792C14.9416 7.39163 15.1523 8.80466 14.8825 10.1663C14.6126 11.5279 13.8791 12.7538 12.8068 13.6352C11.7344 14.5166 10.3897 14.9989 9.00161 15Z"
              fill="#3A8EFA"
            />
          </svg>
        </template>
        <template #default>
          <p class="2xl:text-base 2xl:!leading-8 xl:text-sm xl:!leading-7">
            Оптимальный размер изображения 2200х1000 пикселей, минимальный —
            1100х900 пикселей. <br />
            Для отображения изображения без замыливания по краям рекомендуемый
            размер — 2600х1000 пикселей. <br />
            Максимальный размер файла 5 МБ. <br />Допустимые форматы - png, jpeg
          </p>
        </template>
      </Message>
      <div class="uploadFacade">
        <label
          for="uploadFacade"
          class="w-max flex justify-start items-center bg-green px-3 py-2 rounded text-white mt-5 mb-[50px] cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-3"
          >
            <path
              d="M16.791 11.517C16.7406 11.4354 16.6702 11.368 16.5864 11.3213C16.5027 11.2746 16.4084 11.25 16.3125 11.25H15.1875V5.0625C15.1871 4.76425 15.0684 4.47834 14.8576 4.26745C14.6467 4.05656 14.3607 3.9379 14.0625 3.9375H8.67043L7.14769 2.41481C7.09548 2.36256 7.03348 2.32111 6.96525 2.29283C6.89701 2.26455 6.82387 2.24999 6.75 2.25H2.25C1.95175 2.2504 1.66584 2.36906 1.45495 2.57995C1.24406 2.79084 1.1254 3.07675 1.125 3.375V15.1875H1.12748C1.12678 15.2614 1.14077 15.3346 1.16864 15.403C1.19651 15.4714 1.23769 15.5336 1.2898 15.5859C1.34191 15.6383 1.40391 15.6797 1.47218 15.7079C1.54045 15.7361 1.61364 15.7504 1.6875 15.75H14.625C14.7295 15.75 14.8319 15.7209 14.9207 15.666C15.0096 15.6111 15.0814 15.5325 15.1282 15.4391L16.8157 12.0641C16.8586 11.9784 16.8789 11.8831 16.8746 11.7873C16.8703 11.6915 16.8415 11.5985 16.791 11.517ZM14.2773 14.625H2.59774L3.72274 12.375H15.4023L14.2773 14.625Z"
              fill="white"
            />
          </svg>
          Загрузить фасад
        </label>
        <input
          type="file"
          name=""
          id="uploadFacade"
          class="hidden"
          @change="uploadFacade($event as InputEvent)"
        />
      </div>

      <div class="facadesList">
        <div
          v-for="facade in facades.sort(sortItems)"
          :key="facade.id"
          class="facadeItem"
          :draggable="true"
          @dragstart="(e) => dragStartHandler(e, facade)"
          @dragover.prevent="(e) => dragOverHandler(e)"
          @dragend="(e) => dragEndHandler(e)"
          @drop.prevent="(e) => dropHandler(e, facade)"
        >
          <div class="iconDrop">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_931_1222)">
                <path
                  d="M23.7454 11.3976L20.3168 7.96903C20.1473 7.79936 19.9463 7.71459 19.7141 7.71459C19.482 7.71459 19.2812 7.79936 19.1115 7.96903C18.942 8.13879 18.8571 8.33971 18.8571 8.57181V10.2862H13.7142V5.14331H15.4286C15.6608 5.14331 15.8617 5.05845 16.0313 4.88887C16.2008 4.7192 16.2856 4.51848 16.2856 4.28623C16.2856 4.05394 16.2008 3.85302 16.0313 3.6834L12.6026 0.254802C12.4332 0.0851782 12.2323 0.000366211 12 0.000366211C11.7677 0.000366211 11.5669 0.0852251 11.3972 0.254802L7.96871 3.6834C7.79899 3.85316 7.71428 4.05408 7.71428 4.28623C7.71428 4.51824 7.79904 4.71916 7.96871 4.88887C8.13848 5.05845 8.3392 5.14331 8.5715 5.14331H10.2858V10.2863H5.14294V8.57186C5.14294 8.33957 5.05809 8.1387 4.88841 7.96908C4.71865 7.79941 4.51774 7.71464 4.28563 7.71464C4.05357 7.71464 3.85266 7.79941 3.68299 7.96908L0.254436 11.3976C0.0848588 11.5673 0 11.7681 0 12.0002C0 12.2324 0.0848588 12.4333 0.254436 12.6029L3.68299 16.0313C3.85266 16.2008 4.05343 16.2861 4.28563 16.2861C4.51793 16.2861 4.71879 16.2009 4.88841 16.0313C5.05809 15.862 5.14294 15.6608 5.14294 15.4287V13.7142H10.2858V18.8571H8.57164C8.33934 18.8571 8.13843 18.9421 7.96881 19.1116C7.79913 19.2812 7.71437 19.4821 7.71437 19.7142C7.71437 19.9464 7.79913 20.1473 7.96881 20.3172L11.3974 23.7455C11.5672 23.915 11.768 23.9999 12.0002 23.9999C12.2323 23.9999 12.4334 23.915 12.6028 23.7455L16.0313 20.3172C16.2011 20.1474 16.2859 19.9464 16.2859 19.7142C16.2859 19.4821 16.2011 19.2813 16.0313 19.1116C15.8618 18.9421 15.6608 18.8571 15.4286 18.8571H13.7145V13.7143H18.8573V15.429C18.8573 15.6611 18.9421 15.8621 19.1115 16.0317C19.2814 16.2011 19.4824 16.2863 19.7145 16.2863C19.9464 16.2863 20.1473 16.2012 20.3172 16.0317L23.7456 12.603C23.9153 12.4333 24 12.2324 24 12.0002C24 11.7681 23.9153 11.5673 23.7454 11.3976Z"
                  fill="#3A8EFA"
                />
              </g>
              <defs>
                <clipPath id="clip0_931_1222">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="facadeItem__content">
            <div class="facadeItem__title">{{ facade.title }}</div>
            <div class="facadeItem__imageWrapper">
              <div class="imageHover">
                <Button
                  severity="success"
                  @click="
                    visibleEditWindow = true;
                    activeFacade = facade;
                  "
                  >Начать разметку</Button
                >
              </div>
              <img
                :src="require('@/shared/assets/images/facades/facade1.png')"
                alt=""
              />
            </div>
            <div class="facadeItem__footer">
              <div class="isPublish">
                <InputSwitch id="isPublish" v-model="facade.isPublish" />
                <label for="isPublish">Опубликован</label>
              </div>
              <Button
                severity="danger"
                class="isDelete"
                @click="showTemplate($event, facade.id)"
              >
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
              </Button>
              <ConfirmPopup
                group="deletePlan"
                :pt="confirmpopupStyle"
              ></ConfirmPopup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";
import { ConfirmDialogPassThroughOptions } from "primevue/confirmdialog";
import { IFacade } from "@/app/types/facades";
import DefaultLayout from "@/shared/layouts/defaultLayout.vue";
import WindowEditFacades from "@/widgets/editFacades/windowEditFacades.vue";
import { ref } from "vue";
import { PTOptions } from "primevue/ts-helpers";

const facades = ref<IFacade[]>([
  {
    id: "eynfhhj1",
    title: "",
    order: 1,
    isPublish: false,
    image:
      "https://pb17884.profitbase.ru/media/cache/resolve/blurred_facade/uploads/facade/17884/64f986e9e4280.png",
    floors: {
      countFloors: 20,
      items: [
        {
          id: "floors1",
          points: [{ x: 0, y: 0 }],
          numberFloor: 10,
          section: 1,
        },
      ],
    },
  },
  {
    id: "eynfhhj2",
    title: "",
    order: 2,
    isPublish: false,
    image:
      "https://pb17884.profitbase.ru/media/cache/resolve/blurred_facade/uploads/facade/17884/64f986e9e4280.png",
    floors: {
      countFloors: 20,
      items: [
        {
          id: "floors1",
          points: [{ x: 0, y: 0 }],
          numberFloor: 10,
          section: 1,
        },
      ],
    },
  },
]);
const confirm = useConfirm();
const activeFacade = ref<IFacade>();
const visibleEditWindow = ref<boolean>(false);
const currentItem = ref<IFacade>();
const confirmpopupStyle = ref<PTOptions<ConfirmDialogPassThroughOptions>>({
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

const showTemplate = (event: MouseEvent, id: string) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: "deletePlan",
    message: "Удалить фасад?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    acceptClass: "!bg-red !shadow-none",
    rejectClass: "!bg-green !shadow-none",
    accept: () => {
      deleteItem(id);
    },
    reject: () => {
      return;
    },
  });
};

const dragStartHandler = (e: DragEvent, item: IFacade) => {
  currentItem.value = item;
};

const dragOverHandler = (e: DragEvent) => {
  const block = e
    .composedPath()
    .find((el: HTMLElement) =>
      el.classList.contains("facadeItem")
    ) as HTMLElement;
  if (!block) return;
  (block.querySelector(".facadeItem__content") as HTMLElement).style.opacity =
    "0";
  block.style.backgroundColor = "#FFFBE3";
  block.style.border = "2px dashed #DEDEDE";
};

const dragEndHandler = (e: DragEvent) => {
  const block = e
    .composedPath()
    .find((el: HTMLElement) =>
      el.classList.contains("facadeItem")
    ) as HTMLElement;
  if (!block) return;
  (block.querySelector(".facadeItem__content") as HTMLElement).style.opacity =
    "1";
  block.style.backgroundColor = "#ffffff";
  block.style.border = "1px solid #DEDEDE";
};

const dropHandler = (e: DragEvent, item: IFacade) => {
  e.preventDefault();
  facades.value = facades.value.map((facade: IFacade) => {
    console.log(facade);
    if (facade.id === item.id) {
      console.log({ ...facade, order: currentItem.value.order });
      return { ...facade, order: currentItem.value.order };
    }
    if (facade.id === currentItem.value.id) {
      console.log({ ...facade, order: currentItem.value.order });
      return { ...facade, order: item.order };
    }
    return facade;
  });
  const block = e
    .composedPath()
    .find((el: HTMLElement) =>
      el.classList.contains("facadeItem")
    ) as HTMLElement;
  if (!block) return;
  (block.querySelector(".facadeItem__content") as HTMLElement).style.opacity =
    "1";
  block.style.backgroundColor = "#ffffff";
  block.style.border = "1px solid #DEDEDE";
};

const sortItems = (a: IFacade, b: IFacade) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
};

const deleteItem = (id: string) => {
  const index: number = facades.value.findIndex((el) => el.id === id);
  facades.value.splice(index, 1);
};

const saveFacade = () => {
  visibleEditWindow.value = false;
};

const uploadFacade = (e: InputEvent) => {
  const file = (e.target as HTMLInputElement).files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const image = new Image();
    image.onload = () => {
      facades.value.push({
        id: Math.random().toString(16).slice(2),
        title: "",
        order: facades.value.length + 1,
        isPublish: false,
        image: image,
        floors: {
          countFloors: 20,
          items: [
            {
              id: "floors1",
              points: [{ x: 0, y: 0 }],
              numberFloor: 10,
              section: 1,
            },
          ],
        },
      });
    };
    image.src = e.target.result as string;
  };
  reader.readAsDataURL(file);
};
</script>

<style scoped lang="scss">
.editFacades {
  overflow-y: scroll;
}
.facadesList {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 438px);
  grid-gap: 30px;

  .facadeItem {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #dddddd;
    border-radius: 6px;
    border: 1px solid #bdbdbd;

    &__content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      transition: 0.5s opacity ease-in-out;
    }

    .iconDrop {
      position: absolute;
      top: -8px;
      right: -8px;
      z-index: 3;
      width: 18px;
      height: 18px;
      cursor: grab;
      svg {
        width: 100%;
        height: 100%;
      }
    }

    &:hover {
      .facadeItem__imageWrapper {
        .imageHover {
          &::before {
            opacity: 1;
            visibility: visible;
            transition: 0.5s all ease-in-out;
          }

          button {
            opacity: 1;
            visibility: visible;
            transition: 0.5s all ease-in-out;
          }
        }
      }
    }

    &__title {
      position: absolute;
      top: 28px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 3;
    }

    &__imageWrapper {
      position: relative;
      width: 100%;
      height: 100%;
      flex-grow: 1;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .imageHover {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background-image: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.7) 15%,
          rgba(255, 255, 255, 0) 57.08%
        );
        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          content: "";
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.7) 100%,
            rgba(255, 255, 255, 0) 57.08%
          );
          opacity: 0;
          visibility: hidden;
          transition: 0.5s all ease-in-out;
        }

        button {
          opacity: 0;
          visibility: hidden;
          transition: 0.5s all ease-in-out;
        }
      }
    }

    &__footer {
      width: 100%;
      height: auto;
      padding: 20px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .isPublish {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 10px;
      }
    }
  }
}
</style>
