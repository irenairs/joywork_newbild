<template>
  <teleport to="body">
    <PlanRoomsWindow
      :isOpenEditPlanWindow="isOpenEditPlanWindow"
      @update:isOpenEditPlanWindow="
        isOpenEditPlanWindow = !isOpenEditPlanWindow
      "
    />
    <PlanEditWindow
      :isOpenPlanEditWindow="isOpenPlanEditWindow"
      @update:isOpenPlanEditWindow="
        isOpenPlanEditWindow = !isOpenPlanEditWindow
      "
    ></PlanEditWindow>
  </teleport>

  <DataTable
    v-model:selection="selectedPlanings"
    :value="planings"
    dataKey="id"
    tableStyle="min-width: 50rem"
    class="planRooms__table"
    :show-gridlines="true"
    :pt="tableStyle"
  >
    <Column
      selectionMode="multiple"
      headerStyle="width: 3rem"
      :pt="columnStyle"
    ></Column>
    <Column
      header="Планировка"
      style="width: 15%"
      headerStyle="text-align: center"
      :pt="columnStyle"
    >
      <template #body="slotProps">
        <div class="w-full flex justify-center">
          <img
            :src="require(`@/shared/assets/images/layoutsRoom/layout1.png`)"
            alt=""
            v-if="slotProps.data.plan"
            @mouseenter="hoverImageHandler($event)"
            @mouseleave="unhoverImageHandler($event)"
          />
        </div>
        <OverlayPanel ref="op" :pt="overlayPanelStyle">
          <img
            :src="require(`@/shared/assets/images/layoutsRoom/layout1.png`)"
            alt="Bamboo Watch"
          />
        </OverlayPanel>
      </template>
    </Column>
    <Column header="Наименование" style="width: 10%" :pt="columnStyle">
      <template #body="slotProps">
        <div v-html="slotProps.data.name" class="text-center"></div>
      </template>
    </Column>
    <Column
      header="Помещения, сооветсвующие планировке"
      style="width: 40%"
      :pt="columnStyle"
    >
      <template #body="slotProps">
        <div class="flex flex-col justify-center items-center">
          <div
            v-html="slotProps.data.numberRooms"
            class="text-center text-grey-900 px-7.5"
          ></div>
          <Button
            to="/"
            class="text-green underline underline-offset-2 2xl:mt-5 xl:3"
            link
            @click="isOpenEditPlanWindow = !isOpenEditPlanWindow"
            >Отметить на шахматке</Button
          >
        </div>
      </template>
    </Column>
    <Column
      field="quantity"
      header="Стороны света"
      style="width: 15%"
      :pt="columnStyle"
    >
      <template #body>
        <div class="w-full flex justify-center">
          <img :src="require('@/shared/assets/images/said.png')" alt="" />
        </div>
      </template>
    </Column>
    <Column header="Действия" style="width: 20%" :pt="columnStyle">
      <template #body="slotProps">
        <Button
          severity="success"
          class="mr-2.5 mb-2.5 xl:w-full flex justify-center"
          @click="isOpenPlanEditWindow = true"
        >
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1.5"
          >
            <path
              d="M16.25 8.99995C16.0511 8.99995 15.8603 9.07897 15.7197 9.21962C15.579 9.36028 15.5 9.55104 15.5 9.74995V14.25C15.5 14.4489 15.421 14.6396 15.2803 14.7803C15.1397 14.9209 14.9489 15 14.75 15H4.25C4.05109 15 3.86032 14.9209 3.71967 14.7803C3.57902 14.6396 3.5 14.4489 3.5 14.25V3.74995C3.5 3.55104 3.57902 3.36028 3.71967 3.21962C3.86032 3.07897 4.05109 2.99995 4.25 2.99995H8.75C8.94891 2.99995 9.13968 2.92094 9.28033 2.78028C9.42098 2.63963 9.5 2.44887 9.5 2.24995C9.5 2.05104 9.42098 1.86028 9.28033 1.71962C9.13968 1.57897 8.94891 1.49995 8.75 1.49995H4.25C3.65326 1.49995 3.08097 1.73701 2.65901 2.15896C2.23705 2.58092 2 3.15322 2 3.74995V14.25C2 14.8467 2.23705 15.419 2.65901 15.8409C3.08097 16.2629 3.65326 16.5 4.25 16.5H14.75C15.3467 16.5 15.919 16.2629 16.341 15.8409C16.7629 15.419 17 14.8467 17 14.25V9.74995C17 9.55104 16.921 9.36028 16.7803 9.21962C16.6397 9.07897 16.4489 8.99995 16.25 8.99995ZM5 9.56995V12.75C5 12.9489 5.07902 13.1396 5.21967 13.2803C5.36032 13.4209 5.55109 13.5 5.75 13.5H8.93C9.0287 13.5005 9.12655 13.4816 9.21793 13.4443C9.30931 13.407 9.39242 13.352 9.4625 13.2825L14.6525 8.08495L16.7825 5.99995C16.8528 5.93023 16.9086 5.84728 16.9467 5.75589C16.9847 5.66449 17.0043 5.56646 17.0043 5.46745C17.0043 5.36845 16.9847 5.27042 16.9467 5.17902C16.9086 5.08763 16.8528 5.00468 16.7825 4.93495L13.6025 1.71745C13.5328 1.64716 13.4498 1.59136 13.3584 1.55329C13.267 1.51521 13.169 1.49561 13.07 1.49561C12.971 1.49561 12.873 1.51521 12.7816 1.55329C12.6902 1.59136 12.6072 1.64716 12.5375 1.71745L10.4225 3.83995L5.2175 9.03745C5.14799 9.10753 5.09299 9.19065 5.05567 9.28202C5.01835 9.3734 4.99943 9.47125 5 9.56995ZM13.07 3.30745L15.1925 5.42995L14.1275 6.49495L12.005 4.37245L13.07 3.30745ZM6.5 9.87745L10.9475 5.42995L13.07 7.55245L8.6225 12H6.5V9.87745Z"
              fill="white"
            />
          </svg>

          Редактировать
        </Button>
        <Button
          severity="danger"
          class="xl:w-full flex justify-center"
          @click="showTemplate($event, slotProps.index)"
        >
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1.5"
          >
            <path
              d="M8 13.5C8.19891 13.5 8.38968 13.421 8.53033 13.2803C8.67098 13.1397 8.75 12.9489 8.75 12.75V8.25C8.75 8.05109 8.67098 7.86032 8.53033 7.71967C8.38968 7.57902 8.19891 7.5 8 7.5C7.80109 7.5 7.61032 7.57902 7.46967 7.71967C7.32902 7.86032 7.25 8.05109 7.25 8.25V12.75C7.25 12.9489 7.32902 13.1397 7.46967 13.2803C7.61032 13.421 7.80109 13.5 8 13.5ZM15.5 4.5H12.5V3.75C12.5 3.15326 12.2629 2.58097 11.841 2.15901C11.419 1.73705 10.8467 1.5 10.25 1.5H8.75C8.15326 1.5 7.58097 1.73705 7.15901 2.15901C6.73705 2.58097 6.5 3.15326 6.5 3.75V4.5H3.5C3.30109 4.5 3.11032 4.57902 2.96967 4.71967C2.82902 4.86032 2.75 5.05109 2.75 5.25C2.75 5.44891 2.82902 5.63968 2.96967 5.78033C3.11032 5.92098 3.30109 6 3.5 6H4.25V14.25C4.25 14.8467 4.48705 15.419 4.90901 15.841C5.33097 16.2629 5.90326 16.5 6.5 16.5H12.5C13.0967 16.5 13.669 16.2629 14.091 15.841C14.5129 15.419 14.75 14.8467 14.75 14.25V6H15.5C15.6989 6 15.8897 5.92098 16.0303 5.78033C16.171 5.63968 16.25 5.44891 16.25 5.25C16.25 5.05109 16.171 4.86032 16.0303 4.71967C15.8897 4.57902 15.6989 4.5 15.5 4.5ZM8 3.75C8 3.55109 8.07902 3.36032 8.21967 3.21967C8.36032 3.07902 8.55109 3 8.75 3H10.25C10.4489 3 10.6397 3.07902 10.7803 3.21967C10.921 3.36032 11 3.55109 11 3.75V4.5H8V3.75ZM13.25 14.25C13.25 14.4489 13.171 14.6397 13.0303 14.7803C12.8897 14.921 12.6989 15 12.5 15H6.5C6.30109 15 6.11032 14.921 5.96967 14.7803C5.82902 14.6397 5.75 14.4489 5.75 14.25V6H13.25V14.25ZM11 13.5C11.1989 13.5 11.3897 13.421 11.5303 13.2803C11.671 13.1397 11.75 12.9489 11.75 12.75V8.25C11.75 8.05109 11.671 7.86032 11.5303 7.71967C11.3897 7.57902 11.1989 7.5 11 7.5C10.8011 7.5 10.6103 7.57902 10.4697 7.71967C10.329 7.86032 10.25 8.05109 10.25 8.25V12.75C10.25 12.9489 10.329 13.1397 10.4697 13.2803C10.6103 13.421 10.8011 13.5 11 13.5Z"
              fill="white"
            />
          </svg>

          Удалить
        </Button>
        <ConfirmPopup group="deletePlan" :pt="confirmpopupStyle"></ConfirmPopup>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import PlanRoomsWindow from "@/widgets/homePage/planLayout/planRoomsWindow.vue";
import PlanEditWindow from "@/widgets/homePage/planLayout/planEditWindow/planEditWindow.vue";
import OverlayPanel, {
  OverlayPanelPassThroughOptions,
} from "primevue/overlaypanel";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";
import { ColumnPassThroughOptions } from "primevue/column";
import { DataTablePassThroughOptions } from "primevue/datatable";
import { PTOptions } from "primevue/ts-helpers";
import { ref } from "vue";
import { ConfirmDialogPassThroughOptions } from "primevue/confirmdialog";

const confirm = useConfirm();
const isOpenEditPlanWindow = ref(false);
const isOpenPlanEditWindow = ref(false);

const tableStyle = ref<PTOptions<DataTablePassThroughOptions>>({
  bodyRow: ({ context }) => {
    console.log(context);
    return {
      class: ["!outline-0 !border-0", context.selected ? "!bg-white" : ""],
    };
  },
});
const columnStyle = ref<PTOptions<ColumnPassThroughOptions>>({
  headerCell: {
    class: [
      "!bg-white !border-t-0 !border-grey-900 first:!border-l-0 last:!border-r-0 !py-2.5 2xl:!px-[50px] xl:!px-[30px]",
    ],
  },
  bodyCell: {
    class: ["!border-grey-900 first:!border-l-0 last:!border-r-0"],
  },
  headerContent: {
    class: ["!flex !justify-center"],
  },
  headerTitle: {
    class: ["!text-grey-900 !font-normal 2xl:!text-base xl:!text-sm"],
  },
  headerCheckbox: ({ context }) => {
    console.log(context);
    return {
      class: [
        "!shadow-none !rounded-[2px] 2xl:!w-[22px] 2xl:!h-[22px] xl:!w-[18px] xl:!h-[18px]",
        context.checked ? "!bg-green !border-0" : "!border-grey-900",
      ],
    };
  },
  headerCheckboxWrapper: {
    class: [
      "!w-full 2xl:!w-[22px] 2xl:!h-[22px] xl:!h-[18px] !flex !justify-center",
    ],
  },
  checkboxWrapper: {
    class: ["!w-full 2xl:!h-[22px] xl:!h-[18px] !flex !justify-center"],
  },
  checkbox: ({ context }) => {
    console.log(context);
    return {
      class: [
        "!shadow-none !rounded-[2px] 2xl:!w-[22px] 2xl:!h-[22px] xl:!w-[18px] xl:!h-[18px]",
        context.checked ? "!bg-green !border-0" : "!border-grey-900",
      ],
    };
  },
});
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
const overlayPanelStyle = ref<PTOptions<OverlayPanelPassThroughOptions>>({
  root: () => {
    return {
      class: ["!border !border-solid !border-green "],
    };
  },
});
const planings = ref([
  {
    plan: "@/shared/assets/images/layoutsRoom/layout1.png",
    name: "1 этаж<br>1 подъезд<br>97 квартира",
    numberRooms:
      "№263 №267 №271 №275 №279 №283 №287 №291 №295 №299 №303 №307 №311 №315 №319 №323 №327 №331 №335 №339",
    sideWorld: "",
  },
]);
const selectedPlanings = ref([]);
const showTemplate = (event: MouseEvent, index: number) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: "deletePlan",
    message: "Удалить планировку?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    acceptClass: "!bg-red !shadow-none",
    rejectClass: "!bg-green !shadow-none",
    accept: () => {
      planings.value.splice(index, 1);
    },
    reject: () => {
      return;
    },
  });
};
const op = ref();
const hoverImageHandler = (event: MouseEvent) => {
  op.value.show(event);
};
const unhoverImageHandler = (event: MouseEvent) => {
  op.value.hide(event);
};
</script>

<style lang="scss">
.planRooms__table {
  .p-highlight {
    color: black !important;
  }
}

.p-overlaypanel {
  &:before {
    border-bottom-color: #4caf50;
  }
  &:after {
    border-bottom-color: #4caf50;
  }
  &.p-overlaypanel-flipped {
    &:before {
      border-top-color: #4caf50;
    }
    &:after {
      border-top-color: #4caf50;
    }
  }
}
</style>
