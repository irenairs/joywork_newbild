<template>
  <div class="planFloors">
    <Dialog
      v-model:visible="isVisibleDeleteAll"
      modal
      :draggable="false"
      header="Вы уверены, что хотите удалить планировки?"
      :pt="dialogStyle"
      contentClass="!p-0 hidden"
    >
      <template #footer>
        <div
          class="btns w-full flex justify-between border-t border-t-grey-400 pt-5"
        >
          <Button severity="danger">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2.5"
            >
              <path
                d="M7.5 13.5C7.69891 13.5 7.88968 13.421 8.03033 13.2803C8.17098 13.1397 8.25 12.9489 8.25 12.75V8.25C8.25 8.05109 8.17098 7.86032 8.03033 7.71967C7.88968 7.57902 7.69891 7.5 7.5 7.5C7.30109 7.5 7.11032 7.57902 6.96967 7.71967C6.82902 7.86032 6.75 8.05109 6.75 8.25V12.75C6.75 12.9489 6.82902 13.1397 6.96967 13.2803C7.11032 13.421 7.30109 13.5 7.5 13.5ZM15 4.5H12V3.75C12 3.15326 11.7629 2.58097 11.341 2.15901C10.919 1.73705 10.3467 1.5 9.75 1.5H8.25C7.65326 1.5 7.08097 1.73705 6.65901 2.15901C6.23705 2.58097 6 3.15326 6 3.75V4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25C2.25 5.44891 2.32902 5.63968 2.46967 5.78033C2.61032 5.92098 2.80109 6 3 6H3.75V14.25C3.75 14.8467 3.98705 15.419 4.40901 15.841C4.83097 16.2629 5.40326 16.5 6 16.5H12C12.5967 16.5 13.169 16.2629 13.591 15.841C14.0129 15.419 14.25 14.8467 14.25 14.25V6H15C15.1989 6 15.3897 5.92098 15.5303 5.78033C15.671 5.63968 15.75 5.44891 15.75 5.25C15.75 5.05109 15.671 4.86032 15.5303 4.71967C15.3897 4.57902 15.1989 4.5 15 4.5ZM7.5 3.75C7.5 3.55109 7.57902 3.36032 7.71967 3.21967C7.86032 3.07902 8.05109 3 8.25 3H9.75C9.94891 3 10.1397 3.07902 10.2803 3.21967C10.421 3.36032 10.5 3.55109 10.5 3.75V4.5H7.5V3.75ZM12.75 14.25C12.75 14.4489 12.671 14.6397 12.5303 14.7803C12.3897 14.921 12.1989 15 12 15H6C5.80109 15 5.61032 14.921 5.46967 14.7803C5.32902 14.6397 5.25 14.4489 5.25 14.25V6H12.75V14.25ZM10.5 13.5C10.6989 13.5 10.8897 13.421 11.0303 13.2803C11.171 13.1397 11.25 12.9489 11.25 12.75V8.25C11.25 8.05109 11.171 7.86032 11.0303 7.71967C10.8897 7.57902 10.6989 7.5 10.5 7.5C10.3011 7.5 10.1103 7.57902 9.96967 7.71967C9.82902 7.86032 9.75 8.05109 9.75 8.25V12.75C9.75 12.9489 9.82902 13.1397 9.96967 13.2803C10.1103 13.421 10.3011 13.5 10.5 13.5Z"
                fill="white"
              />
            </svg>
            Удалить
          </Button>
          <Button
            severity="secondary"
            class="!mr-0"
            @click="isVisibleDeleteAll = false"
            >Отменить</Button
          >
        </div>
      </template>
    </Dialog>
    <Dialog
      v-model:visible="isVisibleOffSide"
      @update:visible="isVisibleOffSide = false"
      modal
      :draggable="false"
      header="Успешно отключено"
      :pt="dialogStyle"
      contentClass="!p-0 !pt-5"
    >
      <template #default>
        Отображение сторон света успешно отключено для выбранных планировок
      </template>
      <template #footer>
        <div class="btns w-full flex justify-between mt-5">
          <Button severity="info" @click="isVisibleOffSide = false">
            Ок
          </Button>
        </div>
      </template>
    </Dialog>
    <Dialog
      v-model:visible="isVisibleUploadPlan"
      @update:visible="isVisibleUploadPlan = false"
      modal
      :draggable="false"
      header="Загрузка планировок Planoplan"
      :pt="dialogStyle"
    >
      <template #default>
        <p class="text mb-5 text-sm">
          Введите списком URL планировок. Каждая планировка должна начинаться с
          новой строки. Для загрузки планировок из Planoplan обязательно
          опубликуйте у каждой планировки в Planoplan вид "План" или "Вид
          сверху".
        </p>
        <Textarea v-model="urls" class="w-full" rows="5" autoResize />
      </template>
      <template #footer>
        <div class="btns w-full flex justify-between">
          <Button severity="success">
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
          <Button severity="secondary" @click="isVisibleUploadPlan = false">
            Отклонить
          </Button>
        </div>
      </template>
    </Dialog>
    <EditSideWindow
      :visibleEditSideWindow="isVisibleEditSideWindow"
      @update:isVisibleEditSideWindow="isVisibleEditSideWindow = false"
    />
    <Message severity="info" :closable="false">
      <template #messageicon>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-4"
        >
          <path
            d="M8.99966 8.25C8.80074 8.25 8.60998 8.32902 8.46933 8.46967C8.32867 8.61032 8.24966 8.80109 8.24966 9V11.25C8.24966 11.4489 8.32867 11.6397 8.46933 11.7803C8.60998 11.921 8.80074 12 8.99966 12C9.19857 12 9.38933 11.921 9.52999 11.7803C9.67064 11.6397 9.74965 11.4489 9.74965 11.25V9C9.74965 8.80109 9.67064 8.61032 9.52999 8.46967C9.38933 8.32902 9.19857 8.25 8.99966 8.25ZM8.99966 6C8.85132 6 8.70631 6.04399 8.58298 6.1264C8.45964 6.20881 8.36351 6.32594 8.30675 6.46299C8.24998 6.60003 8.23513 6.75083 8.26407 6.89632C8.293 7.0418 8.36444 7.17544 8.46933 7.28033C8.57421 7.38522 8.70785 7.45665 8.85334 7.48559C8.99882 7.51453 9.14962 7.49968 9.28667 7.44291C9.42371 7.38614 9.54085 7.29001 9.62326 7.16668C9.70567 7.04334 9.74965 6.89834 9.74965 6.75C9.74965 6.55109 9.67064 6.36032 9.52999 6.21967C9.38933 6.07902 9.19857 6 8.99966 6ZM8.99966 1.5C8.01474 1.5 7.03947 1.69399 6.12953 2.0709C5.21959 2.44781 4.39279 3.00026 3.69635 3.6967C2.28983 5.10322 1.49966 7.01088 1.49966 9C1.4931 10.7319 2.09275 12.4114 3.19466 13.7475L1.69466 15.2475C1.59059 15.353 1.52009 15.4869 1.49206 15.6324C1.46403 15.7779 1.47972 15.9284 1.53716 16.065C1.59945 16.1999 1.70043 16.3133 1.82729 16.3908C1.95415 16.4682 2.10116 16.5063 2.24966 16.5H8.99966C10.9888 16.5 12.8964 15.7098 14.303 14.3033C15.7095 12.8968 16.4997 10.9891 16.4997 9C16.4997 7.01088 15.7095 5.10322 14.303 3.6967C12.8964 2.29018 10.9888 1.5 8.99966 1.5ZM8.99966 15H4.05716L4.75466 14.3025C4.82552 14.233 4.8819 14.1502 4.92052 14.0588C4.95914 13.9674 4.97924 13.8692 4.97966 13.77C4.97684 13.5722 4.89597 13.3835 4.75466 13.245C3.77259 12.264 3.16104 10.9729 3.02417 9.59159C2.88731 8.21029 3.23361 6.82425 4.00408 5.66964C4.77454 4.51503 5.9215 3.66327 7.24954 3.25948C8.57758 2.85569 10.0045 2.92485 11.2873 3.45519C12.5701 3.98552 13.6293 4.94421 14.2845 6.16792C14.9397 7.39163 15.1503 8.80466 14.8805 10.1663C14.6107 11.5279 13.8771 12.7538 12.8048 13.6352C11.7325 14.5166 10.3877 14.9989 8.99966 15Z"
            fill="#3A8EFA"
          />
        </svg>
      </template>
      <template #default
        >Рекомендуемый размер изображения 1000*1000 пикселей. Без пустых или
        белых полей в формате jpeg, jpg, png. Вес одного изображения не должен
        превышать 5 Мб. <br />
        Необходимо загрузить отдельными файлами планировки для каждой секции,
        даже если планировки типовые.Подробнее читайте в инструкции.</template
      >
    </Message>
    <div class="planRooms__btns flex items-center gap-x-7.5 my-7.5">
      <Button severity="success">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1.5"
        >
          <path
            d="M16.791 11.517C16.7406 11.4354 16.6702 11.368 16.5864 11.3213C16.5027 11.2746 16.4084 11.25 16.3125 11.25H15.1875V5.0625C15.1871 4.76425 15.0684 4.47834 14.8576 4.26745C14.6467 4.05656 14.3607 3.9379 14.0625 3.9375H8.67043L7.14769 2.41481C7.09548 2.36256 7.03348 2.32111 6.96525 2.29283C6.89701 2.26455 6.82387 2.24999 6.75 2.25H2.25C1.95175 2.2504 1.66584 2.36906 1.45495 2.57995C1.24406 2.79084 1.1254 3.07675 1.125 3.375V15.1875H1.12748C1.12678 15.2614 1.14077 15.3346 1.16864 15.403C1.19651 15.4714 1.23769 15.5336 1.2898 15.5859C1.34191 15.6383 1.40391 15.6797 1.47218 15.7079C1.54045 15.7361 1.61364 15.7504 1.6875 15.75H14.625C14.7295 15.75 14.8319 15.7209 14.9207 15.666C15.0096 15.6111 15.0814 15.5325 15.1282 15.4391L16.8157 12.0641C16.8586 11.9784 16.8789 11.8831 16.8746 11.7873C16.8703 11.6915 16.8415 11.5985 16.791 11.517ZM14.2773 14.625H2.59774L3.72274 12.375H15.4023L14.2773 14.625Z"
            fill="white"
          />
        </svg>
        Выбрать планировки этажей
      </Button>
      <Button
        type="button"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        iconPos="right"
        outlined
        :pt="btnActionStyle"
        class="ml-auto"
        severity="info"
      >
        <template #default>
          Действия
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ml-1.5"
          >
            <path
              d="M12.2501 4.59364C12.2501 4.70564 12.2072 4.81764 12.1219 4.90295L7.30942 9.71545C7.13836 9.88652 6.86186 9.88652 6.6908 9.71545L1.8783 4.90295C1.70723 4.73189 1.70723 4.45539 1.8783 4.28433C2.04936 4.11327 2.32586 4.11327 2.49692 4.28433L7.00011 8.78752L11.5033 4.28433C11.6744 4.11327 11.9509 4.11327 12.1219 4.28433C12.2072 4.36964 12.2501 4.48164 12.2501 4.59364Z"
              fill="#3A8EFA"
            />
          </svg>
        </template>
      </Button>
      <Menu
        ref="menu"
        id="overlay_menu"
        :model="menuActionsItems"
        :popup="true"
        :pt="menuStyle"
      />
    </div>
    <PlanFloorTable />
  </div>
</template>

<script setup lang="ts">
import Menu, { MenuPassThroughOptions } from "primevue/menu";
import Dialog, { DialogPassThroughOptions } from "primevue/dialog";
import Button, { ButtonPassThroughOptions } from "primevue/button";
import PlanFloorTable from "@/widgets/homePage/planFloors/planFloorTable.vue";
import { ref } from "vue";
import { PTOptions } from "primevue/ts-helpers";
import EditSideWindow from "./editSideWindow.vue";

const isVisibleDeleteAll = ref<boolean>(false);
const isVisibleOffSide = ref<boolean>(false);
const isVisibleUploadPlan = ref<boolean>(false);
const isVisibleEditSideWindow = ref<boolean>(false);
const urls = ref<string>("");
const dialogStyle = ref<PTOptions<DialogPassThroughOptions>>({
  root: {
    class: ["p-[50px] bg-white w-[800px]"],
  },
  content: {
    class: ["!border-t !border-grey-400"],
  },
  header: {
    class: ["!p-0 !pb-7.5"],
  },
  headerTitle: {
    class: ["!font-normal"],
  },
  footer: {
    class: ["!p-0"],
  },
});
const btnActionStyle = ref<PTOptions<ButtonPassThroughOptions>>({
  root: {
    class: ["!bg-white !border !border-blue !w-max !py-2 !px-3 !text-blue"],
  },
});
const menuStyle = ref<PTOptions<MenuPassThroughOptions>>({
  root: {
    class: ["!bg-white !p-0 !py-2.5 !w-max"],
  },
  menuitem: {
    class: ["!p-0 !w-full"],
  },
  action: {
    class: ["!py-2.5 !px-7.5 !w-max !w-max"],
  },
  label: ({ context }) => {
    return {
      class: [context.item.style ? context.item.style : ""],
    };
  },
});
const menu = ref();
const menuActionsItems = ref([
  {
    label: "Редактировать стороны света",
    command: () => {
      isVisibleEditSideWindow.value = true;
    },
  },
  {
    label: "Отключить отображение сторон света",
    command: () => {
      isVisibleOffSide.value = true;
    },
  },
  {
    label: "Удалить планировки",
    style: "!text-red",
    command: () => {
      isVisibleDeleteAll.value = true;
    },
  },
]);
const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>

<style scoped></style>
