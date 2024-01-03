import { onMounted, ref } from "vue";

export default function useSideWorld(wrapper: HTMLElement, point: HTMLElement) {
  const coordPoint = ref<DOMRect>();
  const x1 = ref<number>(0);
  const y1 = ref<number>(0);
  const r = ref<number>(0);

  const mousemoveHandler = (e: MouseEvent) => {
    const x2 = e.pageX,
      y2 = e.pageY;
    const y =
      (r.value * (y2 - y1.value)) /
        Math.sqrt(
          (x2 - x1.value) * (x2 - x1.value) + (y2 - y1.value) * (y2 - y1.value)
        ) +
      y1.value;
    const x = ((y - y1.value) * (x2 - x1.value)) / (y2 - y1.value) + x1.value;
    console.log({ r });
    console.log({ y2, x2 });
    point.style.top = y - y1.value + 1 + "px";
    point.style.left = x - x1.value + "px";
  };

  onMounted(() => {
    coordPoint.value = wrapper.getBoundingClientRect();
    x1.value = coordPoint.value.x;
    y1.value = coordPoint.value.y;
    r.value = Number(wrapper.clientWidth) / 2;
  });

  return { mousemoveHandler };
}
