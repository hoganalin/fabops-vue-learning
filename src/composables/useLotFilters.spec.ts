import { describe, expect, it } from "vitest";
import { ref } from "vue";
import { useLotFilters } from "./useLotFilters";
import type { LotPriority, LotStatus, ProductionLot } from "../types/factory";

const lots: ProductionLot[] = [
  {
    id: "LOT-HX90-01",
    product: "HX-90 Sensor",
    currentStep: "Coat track",
    lineId: "line-litho-a",
    equipmentId: null,
    waferCount: 25,
    status: "pending",
    priority: "normal",
    holdReason: null,
    dueAt: "2026-06-22T20:00:00+08:00",
    updatedAt: "2026-06-22T08:00:00+08:00",
  },
  {
    id: "LOT-PM40-01",
    product: "PM-40 Power Device",
    currentStep: "Exposure",
    lineId: "line-litho-a",
    equipmentId: "LITHO-01",
    waferCount: 25,
    status: "running",
    priority: "rocket",
    holdReason: null,
    dueAt: "2026-06-22T18:00:00+08:00",
    updatedAt: "2026-06-22T09:00:00+08:00",
  },
];

function setupFilters() {
  const lotSource = ref(lots);
  const search = ref("");
  const statusFilter = ref<LotStatus | "all">("all");
  const priorityFilter = ref<LotPriority | "all">("all");

  return {
    search,
    statusFilter,
    priorityFilter,
    ...useLotFilters(lotSource, search, statusFilter, priorityFilter),
  };
}

describe("useLotFilters", () => {
  it("filters lots by search keyword", () => {
    const { search, filteredLots } = setupFilters();

    search.value = "PM40";

    expect(filteredLots.value.map((lot) => lot.id)).toEqual(["LOT-PM40-01"]);
  });

  it("filters lots by status", () => {
    const { statusFilter, filteredLots } = setupFilters();

    statusFilter.value = "pending";

    expect(filteredLots.value.map((lot) => lot.id)).toEqual(["LOT-HX90-01"]);
  });

  it("filters lots by priority", () => {
    const { priorityFilter, filteredLots } = setupFilters();

    priorityFilter.value = "rocket";

    expect(filteredLots.value.map((lot) => lot.id)).toEqual(["LOT-PM40-01"]);
  });
});
