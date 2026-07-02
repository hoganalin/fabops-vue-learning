import { computed, type Ref } from "vue";
import type { LotPriority, LotStatus, ProductionLot } from "../types/factory";

export function useLotFilters(
  lots: Ref<ProductionLot[]>,
  search: Ref<string>,
  statusFilter: Ref<LotStatus | "all">,
  priorityFilter: Ref<LotPriority | "all">,
) {
  const filteredLots = computed(() => {
    const keyword = search.value.trim().toLowerCase();
    return lots.value.filter((lot) => {
      const searchableValues = [
        lot.id,
        lot.product,
        lot.currentStep,
        lot.equipmentId ?? "",
        lot.holdReason ?? "",
      ];

      const matchesSearch =
        keyword === "" ||
        searchableValues.some((value) => value.toLowerCase().includes(keyword));

      const matchesStatus =
        statusFilter.value === "all" || lot.status === statusFilter.value;

      const matchesPriority =
        priorityFilter.value === "all" || lot.priority === priorityFilter.value;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  });
  return { filteredLots };
}
