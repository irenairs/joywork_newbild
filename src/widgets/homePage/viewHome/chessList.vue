<template>
  <DataTable
    :value="DataTableValue"
    paginator
    :rows="1"
    :rowsPerPageOptions="[10, 20, 30, 40]"
    :pt="styleDataTabel"
    showGridlines
    table-style="min-width: 2000px"
    class="chessList"
    @row-click="(e) => rowClick()"
  >
    <Column
      field="formatFile"
      header="Формат"
      :pt="styleColumn"
      style="min-width: max-content"
    >
      <template #body="slotProps">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="112"
          height="40"
          viewBox="0 0 112 40"
          fill="none"
          v-if="slotProps.data.formatFile === 'pdf'"
        >
          <path
            d="M75.8383 10H36.1617C34.4155 10 33 11.4019 33 13.1313V26.8687C33 28.5981 34.4155 30 36.1617 30H75.8383C77.5845 30 79 28.5981 79 26.8687V13.1313C79 11.4019 77.5845 10 75.8383 10Z"
            fill="#FF3838"
          />
          <path
            d="M46.9899 15.1344H43.2766C43.053 15.1344 42.8386 15.2232 42.6805 15.3813C42.5224 15.5394 42.4336 15.7538 42.4336 15.9773V24.3126C42.4336 24.5362 42.5224 24.7506 42.6805 24.9087C42.8386 25.0668 43.053 25.1556 43.2766 25.1556C43.5001 25.1556 43.7145 25.0668 43.8726 24.9087C44.0307 24.7506 44.1195 24.5362 44.1195 24.3126V21.6142H46.9851C47.4158 21.6225 47.8438 21.5448 48.2442 21.3857C48.6445 21.2266 49.0091 20.9892 49.3166 20.6876C49.6241 20.3859 49.8684 20.0259 50.0351 19.6287C50.2019 19.2315 50.2878 18.8051 50.2878 18.3743C50.2878 17.9435 50.2019 17.517 50.0351 17.1199C49.8684 16.7227 49.6241 16.3627 49.3166 16.061C49.0091 15.7594 48.6445 15.522 48.2442 15.3629C47.8438 15.2038 47.4158 15.1261 46.9851 15.1344H46.9899ZM46.9899 19.9271H44.1243V16.8227H46.9899C47.4015 16.8227 47.7963 16.9862 48.0874 17.2773C48.3785 17.5684 48.5421 17.9632 48.5421 18.3749C48.5421 18.7866 48.3785 19.1814 48.0874 19.4725C47.7963 19.7635 47.4015 19.9271 46.9899 19.9271Z"
            fill="#F1F2F6"
          />
          <path
            d="M55.7717 15.1348H53.01C52.7864 15.1348 52.572 15.2236 52.4139 15.3817C52.2558 15.5397 52.167 15.7542 52.167 15.9777V24.313C52.167 24.5366 52.2558 24.751 52.4139 24.9091C52.572 25.0671 52.7864 25.156 53.01 25.156H55.7669C56.8796 25.1547 57.9463 24.7121 58.7331 23.9253C59.5199 23.1385 59.9625 22.0718 59.9638 20.9591V19.3317C59.9625 18.2198 59.5206 17.1537 58.7348 16.3671C57.9491 15.5804 56.8835 15.1373 55.7717 15.1348ZM58.279 20.9591C58.2775 21.6236 58.0128 22.2604 57.5429 22.7303C57.073 23.2002 56.4362 23.4649 55.7717 23.4665H53.8613V16.8219H55.7717C56.4362 16.8235 57.073 17.0881 57.5429 17.558C58.0128 18.0279 58.2775 18.6647 58.279 19.3293V20.9591Z"
            fill="#F1F2F6"
          />
          <path
            d="M63.5973 16.8219V19.3018H68.864C69.0822 19.31 69.2888 19.4025 69.4403 19.5598C69.5917 19.7171 69.6764 19.927 69.6764 20.1454C69.6764 20.3637 69.5917 20.5736 69.4403 20.7309C69.2888 20.8882 69.0822 20.9807 68.864 20.9889H63.5973V24.313C63.5891 24.5312 63.4966 24.7378 63.3393 24.8893C63.182 25.0408 62.9721 25.1254 62.7537 25.1254C62.5353 25.1254 62.3254 25.0408 62.1681 24.8893C62.0108 24.7378 61.9184 24.5312 61.9102 24.313V15.9777C61.9105 15.7541 61.9996 15.5396 62.1578 15.3816C62.3161 15.2235 62.5306 15.1348 62.7543 15.1348H68.864C69.0822 15.143 69.2888 15.2354 69.4403 15.3927C69.5917 15.55 69.6764 15.7599 69.6764 15.9783C69.6764 16.1967 69.5917 16.4066 69.4403 16.5639C69.2888 16.7212 69.0822 16.8137 68.864 16.8219H63.5973Z"
            fill="#F1F2F6"
          />
        </svg>
      </template>
    </Column>
    <Column
      field="countRoom"
      header="Кол-во комнат"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="titleComplex"
      header="Название ЖК"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="titleHome"
      header="Название дома"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="numberApartament"
      header="Номер помещения"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="sqareApartament"
      header="Площадь, м2"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="entrance"
      header="Подъезд"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="fullPrice"
      header="Полная цена"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="status"
      header="Статус"
      :pt="styleColumn"
      style="min-width: max-content"
    >
      <template #body="slotProps">
        <div class="flex flex-row items-center gap-x-1.5">
          <div
            class="icon w-2.5 h-2.5 rounded"
            :class="[
              slotProps.data.status === 'free' ? 'bg-green' : 'bg-grey-900',
            ]"
          ></div>
          <div class="text text-sm text-grey-900">
            {{ slotProps.data.status === "free" ? "Свободна" : "Недоступна" }}
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="typeApartament"
      header="Тип помещения"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="floor"
      header="Этаж"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="eutoplane"
      header="Европланировка"
      :pt="styleColumn"
      style="min-width: max-content"
    >
      <template #body="slotProps">
        {{ slotProps.data.eutoplane ? "Да" : "Нет" }}
      </template></Column
    >
    <Column
      field="floor"
      header="Спецпредложения"
      :pt="styleColumn"
      style="min-width: max-content"
    ></Column>
    <Column
      field="studio"
      header="Студия"
      :pt="styleColumn"
      style="min-width: max-content"
    >
      <template #body="slotProps">
        {{ slotProps.data.eutoplane ? "Да" : "Нет" }}
      </template></Column
    >
    <Column
      field="freePlane"
      header="Свободная планировка"
      :pt="styleColumn"
      style="min-width: max-content"
    >
      <template #body="slotProps">
        {{ slotProps.data.freePlane ? "Да" : "Нет" }}
      </template></Column
    >
  </DataTable>
</template>

<script setup lang="ts">
import DataTable, { DataTablePassThroughOptions } from "primevue/datatable";
import Column, { ColumnPassThroughOptions } from "primevue/column";
import { ref } from "vue";
import { PTOptions } from "primevue/ts-helpers";

const emits = defineEmits<{
  (e: "update:is-open-window"): void;
}>();

const isOpenWindow = ref<boolean>(false);
const DataTableValue = ref([
  {
    formatFile: "pdf",
    countRoom: "2",
    titleComplex: "ЖК Демо",
    titleHome: "Демо дом",
    numberApartament: 1,
    sqareApartament: "40,8",
    entrance: 25,
    fullPrice: "25 000 000 руб.",
    status: "free",
    typeApartament: "Квартира",
    floor: 10,
    eutoplane: false,
    offers: "",
    studio: false,
    freePlane: false,
  },
  {
    formatFile: "pdf",
    countRoom: "2",
    titleComplex: "ЖК Демо",
    titleHome: "Демо дом",
    numberApartament: 1,
    sqareApartament: "40,8",
    entrance: 25,
    fullPrice: "25 000 000 руб.",
    status: "free",
    typeApartament: "Квартира",
    floor: 10,
    eutoplane: false,
    offers: "",
    studio: false,
    freePlane: false,
  },
]);

const styleDataTabel = ref<PTOptions<DataTablePassThroughOptions>>({
  paginator: {
    class: ["pani"],
  },
  footer: {
    class: ["text-sm"],
  },
});
const styleColumn = ref<PTOptions<ColumnPassThroughOptions>>({
  headerCell: {
    class: ["!bg-[#F3F3F3]"],
  },
  headerContent: {
    class: ["font-light text-center text-sm flex justify-center"],
  },
  bodyCell: {
    class: ["text-sm text-grey-900 !text-center !py-2.5 !w-max"],
  },
  bodyCellContent: {
    class: ["text-sm"],
  },
});

const rowClick = () => {
  isOpenWindow.value = !isOpenWindow.value;
  emits("update:is-open-window");
};
</script>

<style lang="scss">
.chessList {
  .p-paginator-bottom {
    border: none !important;
  }
  .p-paginator {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 10px;
    padding: 0;
    padding-top: 50px;

    .p-dropdown {
      height: 37px;
    }
  }
  .p-paginator-first,
  .p-paginator-prev,
  .p-paginator-next,
  .p-paginator-last {
    width: 37px;
    height: 37px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: 1px solid #dedede;
    margin: 0;
    min-width: 0;

    svg {
      width: 16px;
      height: 16px;
    }
  }
  .p-paginator-prev {
    margin-right: 10px;
  }
  .p-paginator-next {
    margin-left: 10px;
  }
  .p-paginator-pages {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .p-paginator-page {
      height: auto;
      min-height: 37px;
      min-width: 37px;
      padding: 10px;
      border-radius: 3px;
      border: 1px solid #dedede;
      box-shadow: none !important;
      &.p-highlight {
        background: #4caf50;
        color: #ffffff;
      }
    }
  }
}
</style>
