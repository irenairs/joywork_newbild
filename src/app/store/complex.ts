import { defineStore } from "pinia";
import { ref } from "vue";

enum TypesGrid {
  LIST = "list",
  TILE = "tile",
  TABLE = "table",
}

export const useComplexStore = defineStore("object", () => {
  const activeType = ref<string>("list");

  const types = ref<Record<TypesGrid, string>>({
    [TypesGrid.LIST]: "Список",
    [TypesGrid.TILE]: "Плитка",
    [TypesGrid.TABLE]: "Таблица",
  });

  const changeActiveType = (type: string) => {
    activeType.value = type;
  };

  return {
    activeType,
    types,
    changeActiveType,
  };
});
