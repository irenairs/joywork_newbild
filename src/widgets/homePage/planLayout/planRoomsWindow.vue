<template>
  <div class="planRoomsWindow" :class="[isOpenEditPlanWindow ? 'open' : '']">
    <div class="planRoomsWindow__wrapper">
      <div class="planRoomsWindow__title">
        Укажите помещения, для которых необходимо применить планировку
      </div>
      <div class="planRoomsWindow__table">
        <div class="table__numberRows">
          <div class="row" v-for="value in 4" :key="`row${value}`">
            <div class="cell">{{ value }}</div>
          </div>
        </div>
        <div
          class="table__content"
          ref="cellContainer"
          @mousedown="mouseDownHandlerContainer($event)"
        >
          <div class="overlay">
            <Button severity="info" @click="addCells()">Добавить</Button>
            <Button severity="secondary" outlined @click="removeCandidate()"
              >Удалить</Button
            >
          </div>
          <div class="selectionBox"></div>
          <div
            class="section"
            v-for="(section, index) in sections"
            :key="`section${index}`"
          >
            <div
              class="row"
              v-for="floorIndex in 4"
              :key="`floor${floorIndex}`"
            >
              <div
                class="cell cursor-pointer"
                v-for="(appartament, index) in section.floors[floorIndex - 1]"
                :key="`apartament${index}`"
                :data-apartament="JSON.stringify(appartament)"
                :class="isSelected(appartament.id) ? 'changed' : ''"
                @mousedown="handleCellClick($event)"
              >
                {{ appartament.rooms }}
                <div class="overlay">
                  <div class="overlay__content">
                    <div class="overlay__countRooms">1к</div>
                    <div class="overlay__number">№98</div>
                    <div class="overlay__square">83,6 м2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table__numberRows">
          <div class="row" v-for="value in 4" :key="`row${value}`">
            <div class="cell">{{ value }}</div>
          </div>
        </div>
      </div>
      <div class="planRoomsWindow__btns">
        <Button
          severity="success"
          class="mr-7.5"
          @click="emits('update:isOpenEditPlanWindow')"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2"
          >
            <path
              d="M15.5325 6.9675L11.0325 2.4675C10.9634 2.40004 10.8819 2.34656 10.7925 2.31C10.6995 2.27221 10.6004 2.25187 10.5 2.25H4.5C3.90326 2.25 3.33097 2.48705 2.90901 2.90901C2.48705 3.33097 2.25 3.90326 2.25 4.5V13.5C2.25 14.0967 2.48705 14.669 2.90901 15.091C3.33097 15.5129 3.90326 15.75 4.5 15.75H13.5C14.0967 15.75 14.669 15.5129 15.091 15.091C15.5129 14.669 15.75 14.0967 15.75 13.5V7.5C15.7506 7.4013 15.7317 7.30345 15.6943 7.21207C15.657 7.12069 15.602 7.03758 15.5325 6.9675ZM6.75 3.75H9.75V5.25H6.75V3.75ZM11.25 14.25H6.75V12C6.75 11.8011 6.82902 11.6103 6.96967 11.4697C7.11032 11.329 7.30109 11.25 7.5 11.25H10.5C10.6989 11.25 10.8897 11.329 11.0303 11.4697C11.171 11.6103 11.25 11.8011 11.25 12V14.25ZM14.25 13.5C14.25 13.6989 14.171 13.8897 14.0303 14.0303C13.8897 14.171 13.6989 14.25 13.5 14.25H12.75V12C12.75 11.4033 12.5129 10.831 12.091 10.409C11.669 9.98705 11.0967 9.75 10.5 9.75H7.5C6.90326 9.75 6.33097 9.98705 5.90901 10.409C5.48705 10.831 5.25 11.4033 5.25 12V14.25H4.5C4.30109 14.25 4.11032 14.171 3.96967 14.0303C3.82902 13.8897 3.75 13.6989 3.75 13.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H5.25V6C5.25 6.19891 5.32902 6.38968 5.46967 6.53033C5.61032 6.67098 5.80109 6.75 6 6.75H10.5C10.6989 6.75 10.8897 6.67098 11.0303 6.53033C11.171 6.38968 11.25 6.19891 11.25 6V4.8075L14.25 7.8075V13.5Z"
              fill="white"
            />
          </svg>
          Сохранить
        </Button>
        <Button severity="secondary" @click="cancelSelected()">Отменить</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  isOpenEditPlanWindow: boolean;
}>();
const emits = defineEmits<{
  (e: "update:isOpenEditPlanWindow"): void;
}>();

const sections = ref([
  {
    floors: [
      [
        {
          id: 1,
          rooms: 1,
          squere: "83,6 м2",
          number: "№98",
        },
        {
          id: 2,
          rooms: 2,
          squere: "83,6 м2",
          number: "№90",
        },
        {
          id: 3,
          rooms: 2,
          squere: "83,6 м2",
          number: "№91",
        },
        {
          id: 4,
          rooms: 3,
          squere: "83,6 м2",
          number: "№92",
        },
      ],
      [
        {
          id: 5,
          rooms: 1,
          squere: "83,6 м2",
          number: "№93",
          free: false,
        },
        {
          id: 6,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№94",
        },
        {
          id: 7,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№80",
        },
        {
          id: 8,
          rooms: 3,
          free: true,
          squere: "83,6 м2",
          number: "№81",
        },
      ],
      [
        {
          id: 9,
          rooms: 1,
          squere: "83,6 м2",
          number: "№88",
          free: false,
        },
        {
          id: 10,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№89",
        },
        {
          id: 11,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№82",
        },
        {
          id: 12,
          rooms: 3,
          free: true,
          squere: "83,6 м2",
          number: "№83",
        },
      ],
      [
        {
          id: 13,
          rooms: 1,
          squere: "83,6 м2",
          number: "№84",
          free: false,
        },
        {
          id: 14,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№85",
        },
        {
          id: 15,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№86",
        },
        {
          id: 16,
          rooms: 3,
          free: true,
          squere: "83,6 м2",
          number: "№70",
        },
      ],
      [
        {
          id: 17,
          rooms: 1,
          squere: "83,6 м2",
          number: "№71",
          free: false,
        },
        {
          id: 18,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№72",
        },
        {
          id: 19,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№73",
        },
        {
          id: 20,
          rooms: 3,
          free: true,
          squere: "83,6 м2",
          number: "№74",
        },
      ],
      [
        {
          id: 21,
          rooms: 1,
          squere: "83,6 м2",
          number: "№75",
          free: false,
        },
        {
          id: 22,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№76",
        },
        {
          id: 23,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№77",
        },
        {
          id: 24,
          rooms: 3,
          free: true,
          squere: "83,6 м2",
          number: "№78",
        },
      ],
      [
        {
          id: 25,
          rooms: 1,
          squere: "83,6 м2",
          number: "№79",
          free: false,
        },
        {
          id: 26,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№60",
        },
        {
          id: 27,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№61",
        },
        {
          id: 28,
          rooms: 3,
          free: true,
          squere: "83,6 м2",
          number: "№62",
        },
      ],
      [
        {
          id: 29,
          rooms: 1,
          squere: "83,6 м2",
          number: "№63",
          free: false,
        },
        {
          id: 30,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№64",
        },
        {
          id: 31,
          rooms: 2,
          free: true,
          squere: "83,6 м2",
          number: "№65",
        },
        { id: 32, rooms: 3, free: true, squere: "83,6 м2", number: "№66" },
      ],
    ],
  },
]);
const selectedCells = ref([]);
const cellContainer = ref<HTMLElement>();

const selectedCandidate = ref([]);
const isSelecting = ref<boolean>(false);
const startX = ref<number>(0);
const startY = ref<number>(0);
const currentX = ref<number>(0);
const currentY = ref<number>(0);

const mouseDownHandlerContainer = (e: MouseEvent) => {
  isSelecting.value = true;
  startX.value = e.clientX;
  startY.value = e.clientY;
  clearSelection();
  closeOverlay();
  const selectionBox: HTMLElement =
    cellContainer.value.querySelector(".selectionBox");
  if (selectionBox) {
    selectionBox.style.display = "block";
    selectionBox.style.left = `${startX.value}px`;
    selectionBox.style.top = `${startY.value}px`;
  }

  function handleMouseMove(event: MouseEvent) {
    currentX.value = event.clientX;
    currentY.value = event.clientY;

    const selectionBox: HTMLElement =
      cellContainer.value.querySelector(".selectionBox");
    if (selectionBox) {
      selectionBox.style.width = `${Math.abs(startX.value - currentX.value)}px`;
      selectionBox.style.height = `${Math.abs(
        startY.value - currentY.value
      )}px`;
    }

    const minX = Math.min(startX.value, currentX.value);
    const minY = Math.min(startY.value, currentY.value);
    const maxX = Math.max(startX.value, currentX.value);
    const maxY = Math.max(startY.value, currentY.value);

    clearSelection();

    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
      const rect = cell.getBoundingClientRect();
      const cellXmax = rect.left + rect.width / 2;
      const cellYmax = rect.top + rect.height / 2;

      if (
        minY <= cellYmax &&
        minX <= cellXmax &&
        maxX >= cellXmax &&
        maxY >= cellYmax
      ) {
        cell.classList.add("selected");
        selectedCandidate.value.push(
          JSON.parse(cell.getAttribute("data-apartament"))
        );
      }
    });
  }

  const handleMouseUp = (e: MouseEvent) => {
    isSelecting.value = false;
    const selectionBox: HTMLElement =
      cellContainer.value.querySelector(".selectionBox");
    if (selectionBox) {
      selectionBox.style.display = "none";
    }
    if (!isSelecting.value && selectedCandidate.value.length > 2) {
      openOverlay(e);
    }
    if (selectedCandidate.value.length === 1) {
      if (!isSelected(selectedCandidate.value[0].id)) {
        selectedCells.value = [
          ...selectedCells.value,
          ...selectedCandidate.value,
        ];
        selectedCandidate.value = [];
      } else {
        const index = selectedCells.value.findIndex(
          (el) => el.id === selectedCandidate.value[0].id
        );
        selectedCells.value.splice(index, 1);
      }
    }
    cellContainer.value.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  cellContainer.value.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

function openOverlay(e: MouseEvent) {
  const overlay: HTMLElement = cellContainer.value.querySelector(".overlay");
  overlay.style.left = `${e.x}px`;
  overlay.style.top = `${e.y}px`;
  overlay.style.display = "flex";
}

function handleCellClick(event) {
  const cell: HTMLElement = event.target;
  if (!event.ctrlKey) {
    clearSelection();
  }

  if (cell.classList.contains("selected")) {
    const index = selectedCandidate.value.indexOf(cell);
    if (index !== -1) {
      selectedCandidate.value.splice(index, 1);
    }
    cell.classList.remove("selected");
  } else {
    selectedCandidate.value.push(
      JSON.parse(cell.getAttribute("data-apartament"))
    );
    cell.classList.add("selected");
  }
}

function clearSelection() {
  selectedCandidate.value = [];
}

function closeOverlay() {
  const overlay: HTMLElement = cellContainer.value.querySelector(".overlay");
  overlay.style.left = `${0}px`;
  overlay.style.top = `${0}px`;
  overlay.style.display = "none";
}

function addCells() {
  selectedCells.value = [...selectedCells.value, ...selectedCandidate.value];
  selectedCandidate.value = [];
  closeOverlay();
}
function removeCandidate() {
  selectedCandidate.value = [];
  closeOverlay();
}

function cancelSelected() {
  selectedCells.value = [];
  emits("update:isOpenEditPlanWindow");
}

function isSelected(id: number): boolean {
  const index = selectedCells.value.findIndex((el) => el.id === id);
  return index === -1 ? false : true;
}
</script>

<style lang="scss">
.p-confirm-popup {
  &:before {
    border-bottom-color: #4caf50;
  }
  &:after {
    border-bottom-color: #4caf50;
  }
  &.p-confirm-popup-flipped {
    &:before {
      border-top-color: #4caf50;
    }
    &:after {
      border-top-color: #4caf50;
    }
  }
}
.planRoomsWindow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s all ease-in-out;

  &.open {
    opacity: 1;
    visibility: visible;
    transition: 0.5s all ease-in-out;
  }

  &__wrapper {
    min-width: 900px;
    width: auto;
    height: auto;
    padding: 50px;
    background-color: white;
    border-radius: 4px;
  }

  &__title {
    font-size: 20px;
    margin-bottom: 50px;
  }

  &__table {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    column-gap: 30px;

    .table__numberRows {
      width: auto;
      height: auto;
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: center;
      row-gap: 10px;
      padding-top: 10px;

      .row {
        font-size: 14px;
        @apply text-grey-900;

        .cell {
          padding: 4px 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .table__content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      column-gap: 42px;
      padding: 10px;

      .selectionBox {
        position: absolute;
        background-color: rgba(52, 152, 219, 0.5);
        border: 1px dashed #3498db;
        z-index: 999;
        pointer-events: none;
        display: none;
      }

      .overlay {
        position: absolute;
        width: auto;
        height: auto;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid;
        @apply border-green;
        z-index: 2;
        background-color: #ffffff;
        display: none;
        justify-content: flex-start;
        align-items: center;
        column-gap: 10px;
      }

      .section {
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        align-items: flex-start;
        row-gap: 10px;

        .row {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          column-gap: 10px;

          .cell {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            background-color: #a9e7ab;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 14px;
            user-select: none;

            &:hover {
              .overlay {
                opacity: 1;
                visibility: visible;
                transition: 0.3s all ease-in-out;
              }
            }

            &.selected {
              @apply bg-green;
            }

            .overlay {
              position: absolute;
              left: -10px;
              top: calc(100% + 6px);
              width: max-content;
              height: max-content;
              border-radius: 6px;
              border: 1px solid #4caf50;
              background: #ffffff;
              padding: 10px;
              opacity: 0;
              visibility: hidden;
              transition: 0.3s all ease-in-out;
              z-index: 20;

              &::before {
                content: "";
                position: absolute; /* Абсолютное позиционирование */
                left: 18px;
                top: -16px; /* Положение треугольника */
                border: 8px solid transparent; /* Прозрачные границы */
                border-bottom: 8px solid #4caf50; /* Добавляем треугольник */
              }

              &__content {
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: 24px 1fr;
                grid-gap: 10px 4px;
              }

              &__countRooms {
                width: 24px;
                height: 24px;
                border-radius: 50px;
                background: #4caf50;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              &__square {
                color: #333;
                font-size: 14px;
                grid-row: 1;
                grid-column: 2;
                align-self: center;
              }
              &__number {
                color: #757575;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  &__btns {
    margin-top: 50px;
  }

  @media screen and (max-width: 1600px) {
    &__wrapper {
      min-width: 700px;
      padding: 30px;
    }
    &__title {
      font-size: 16px;
      margin-bottom: 30px;
    }
    &__btns {
      margin-top: 30px;
    }
  }
}
</style>
