<template>
  <div
    class="fileUpload"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="(e) => drop(e)"
  >
    <input
      class="hidden"
      type="file"
      id="fileInput"
      name="file"
      ref="fileInput"
      @change="(e) => onChange()"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    <div class="filePreview" v-if="file">
      <div class="file">
        <button class="file__delete" @click="deleteFile()">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.05745 4.99999L9.28245 1.78249C9.42368 1.64126 9.50302 1.44971 9.50302 1.24999C9.50302 1.05026 9.42368 0.858714 9.28245 0.717487C9.14123 0.576259 8.94968 0.496918 8.74995 0.496918C8.55023 0.496918 8.35868 0.576259 8.21745 0.717487L4.99995 3.94249L1.78245 0.717487C1.64123 0.576259 1.44968 0.496918 1.24995 0.496918C1.05023 0.496918 0.858682 0.576259 0.717454 0.717487C0.576226 0.858714 0.496885 1.05026 0.496885 1.24999C0.496885 1.44971 0.576226 1.64126 0.717454 1.78249L3.94245 4.99999L0.717454 8.21749C0.647158 8.28721 0.591362 8.37016 0.553286 8.46155C0.515209 8.55295 0.495605 8.65098 0.495605 8.74999C0.495605 8.849 0.515209 8.94703 0.553286 9.03842C0.591362 9.12981 0.647158 9.21276 0.717454 9.28249C0.787176 9.35278 0.870127 9.40858 0.961522 9.44666C1.05292 9.48473 1.15095 9.50434 1.24995 9.50434C1.34896 9.50434 1.44699 9.48473 1.53839 9.44666C1.62978 9.40858 1.71273 9.35278 1.78245 9.28249L4.99995 6.05749L8.21745 9.28249C8.28718 9.35278 8.37013 9.40858 8.46152 9.44666C8.55292 9.48473 8.65095 9.50434 8.74995 9.50434C8.84896 9.50434 8.94699 9.48473 9.03839 9.44666C9.12978 9.40858 9.21273 9.35278 9.28245 9.28249C9.35275 9.21276 9.40855 9.12981 9.44662 9.03842C9.4847 8.94703 9.5043 8.849 9.5043 8.74999C9.5043 8.65098 9.4847 8.55295 9.44662 8.46155C9.40855 8.37016 9.35275 8.28721 9.28245 8.21749L6.05745 4.99999Z"
              fill="#666666"
            />
          </svg>
        </button>
        <div class="file__icon"></div>
        <div class="file__name">{{ file ? file.name : "" }}</div>
      </div>
    </div>
    <label for="fileInput" class="label" v-else>
      <div v-if="isDragging">Отпустите, чтобы удалить файлы.</div>
      <div
        v-else
        class="flex flex-col justify-center items-center text-grey-900 gap-2 text-sm"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4973 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7957 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
            fill="#4CAF50"
          />
        </svg>

        <strong class="text-black text-base"
          >Нажмите на эту область или перенесите в нее файл.</strong
        >
        Допустимые расширения файла: .xls, .xlsx, .csv, .xml
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits<{
  (e: "updateModel", value: File | null): void;
}>();

const isDragging = ref<boolean>(false);
const file = ref<File | null>();
const fileInput = ref<HTMLInputElement>();
const onChange = () => {
  if (fileInput.value) {
    if (fileInput.value.files) {
      emits("updateModel", fileInput.value.files[0]);
      file.value = fileInput.value.files[0];
    }
  }
};

const dragover = (e: Event) => {
  e.preventDefault();
  isDragging.value = true;
};
const dragleave = () => {
  isDragging.value = false;
};
const drop = (e: DragEvent) => {
  e.preventDefault();
  if (fileInput.value && e.dataTransfer) {
    fileInput.value.files = e.dataTransfer.files;
    onChange();
    isDragging.value = false;
  }
};
const deleteFile = () => {
  file.value = null;
  emits("updateModel", null);
};
</script>

<style scoped lang="scss">
.fileUpload {
  border-radius: 3px;
  border: 1px dashed #dedede;
  background: var(--linear, linear-gradient(180deg, #fefefe 0%, #f6f6f6 100%));
  padding: 30px;
  & * {
    cursor: pointer;
  }

  .filePreview {
    .file {
      position: relative;
      width: 140px;
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid;
      @apply border-grey-900;

      &__delete {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      &__name {
        margin-top: auto;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
