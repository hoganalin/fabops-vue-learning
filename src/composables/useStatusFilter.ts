import { computed, type Ref } from "vue";

export function useStatusFilter<T extends { status: string }>(
  items: Ref<T[]>,
  status: Ref<string>,
) {
  const filteredItems = computed(() => {
    if (status.value === "all") {
      return items.value;
    }
    return items.value.filter((item) => item.status === status.value);
  });
  return { filteredItems };
}
