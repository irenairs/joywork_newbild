import { computed, ref, watch } from "vue";

export interface room {
  id: number;
}

export interface floor {
  id: number;
  title: string;
  rooms: room[];
}

export interface entrance {
  id: number;
  title: string;
  floors: floor[];
}

export default function useEntranceHooks() {
  const entranceList = ref<entrance[]>([
    {
      id: 1,
      title: `Подъезд 1`,
      floors: [],
    },
  ]);

  const addNewEntrance = () => {
    entranceList.value.push({
      id: entranceList.value.length + 1,
      title: `Подъезд ${entranceList.value.length + 1}`,
      floors: [],
    });
  };

  const sortedEntranceList = computed(() => {
    return entranceList.value.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      } else {
        return -1;
      }
    });
  });

  const updateTitle = (index: number, title: string) => {
    const entrance = entranceList.value.find((el) => el.id === index);
    if (entrance) {
      entrance.title = title;
    }
  };

  watch(entranceList, (newV) => {
    console.log(newV);
  });

  return {
    entranceList,
    addNewEntrance,
    sortedEntranceList,
    updateTitle,
  };
}
