import { failNextFactorySnapshot, getFactorySnapshot } from "../api/factoryApi";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type {
  FactoryAlert,
  ProductionLine,
  ProductionLot,
  LotHoldRequest,
  LotActionEvent,
  LotDispatchRequest,
  ShiftHandoff,
  HandoffRequest,
  WorkOrder,
  LotActionType,
  LotStatus,
  HourlyOutputPoint,
} from "../types/factory";

export const useFactoryStore = defineStore("factory", () => {
  const lines = ref<ProductionLine[]>([]);
  const alerts = ref<FactoryAlert[]>([]);
  const lots = ref<ProductionLot[]>([]);
  const workOrders = ref<WorkOrder[]>([]);
  const lotActionEvents = ref<LotActionEvent[]>([]);
  const selectedLineId = ref("");
  const isLoading = ref(false);
  const error = ref("");
  const handoffs = ref<ShiftHandoff[]>([]);

  const selectedLine = computed(() => {
    return (
      lines.value.find((line) => line.id === selectedLineId.value) ?? undefined
    );
  });
  const activeAlerts = computed(() =>
    alerts.value.filter((alert) => !alert.acknowledged),
  );
  const wipLots = computed(() =>
    lots.value.filter((lot) => lot.status !== "completed"),
  );
  const holdLots = computed(() =>
    lots.value.filter((lot) => lot.status === "hold"),
  );
  const recentLotActionEvents = computed(() => {
    return lotActionEvents.value.slice(0, 5);
  });
  const hourlyOutput = ref<HourlyOutputPoint[]>([]);

  function addLotActionEvent(event: LotActionEvent) {
    lotActionEvents.value = [event, ...lotActionEvents.value];
  }
  function holdLot(request: LotHoldRequest) {
    const reason = request.reason.trim() || "Manual engineering hold";
    applyLotTransition(
      request.lotId,
      "hold",
      "hold",
      { holdReason: reason },
      reason,
      request.owner,
    );
  }
  function releaseLot(lotId: string) {
    applyLotTransition(
      lotId,
      "release",
      "pending",
      { holdReason: null },
      null,
      "Shift lead",
    );
  }
  function completeLot(lotId: string) {
    applyLotTransition(
      lotId,
      "complete",
      "completed",
      { holdReason: null },
      null,
      "Shift lead",
    );
  }

  function applyLotTransition(
    lotId: string,
    type: LotActionType,
    toStatus: LotStatus,
    changes: Partial<ProductionLot>,
    reason: string | null,
    owner: string,
  ) {
    const timestamp = new Date().toISOString();
    const targetLot = lots.value.find((lot) => lot.id === lotId);
    if (!targetLot) {
      return;
    }
    addLotActionEvent({
      id: `event-${timestamp}-${lotId}`,
      lotId,
      type: type,
      fromStatus: targetLot.status,
      toStatus: toStatus,
      reason: reason,
      owner: owner,
      createdAt: timestamp,
    });
    lots.value = lots.value.map((lot) =>
      lot.id === lotId
        ? {
            ...lot,
            status: toStatus,
            ...changes,
            updatedAt: timestamp,
          }
        : lot,
    );
  }

  function dispatchLot(request: LotDispatchRequest) {
    applyLotTransition(
      request.lotId,
      "dispatch",
      "running",
      { equipmentId: request.equipmentId },
      `Dispatched to ${request.equipmentId}`,
      request.owner,
    );
  }
  function focusLine(lineId: string) {
    selectedLineId.value = lineId;
  }

  function acknowledgeAlert(alertId: string) {
    alerts.value = alerts.value.map((alert) =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert,
    );
  }

  async function fetchSnapshot() {
    isLoading.value = true;
    error.value = "";
    try {
      const snapshot = await getFactorySnapshot();
      lines.value = snapshot.lines;
      alerts.value = snapshot.alerts;
      lots.value = snapshot.lots;
      workOrders.value = snapshot.workOrders;
      selectedLineId.value = snapshot.lines[0]?.id ?? "";
      hourlyOutput.value = snapshot.hourlyOutput;
    } catch (cause) {
      error.value =
        cause instanceof Error ? cause.message : "Unable to load factory data";
    } finally {
      isLoading.value = false;
    }
  }
  function simulateNextSnapshotFailure() {
    failNextFactorySnapshot();
    void fetchSnapshot();
  }
  function submitHandoff(request: HandoffRequest) {
    const timestamp = new Date().toISOString();
    const newHandoff: ShiftHandoff = {
      id: `handoff-${timestamp}`,
      ...request,
      createdAt: timestamp,
      openAlertCount: activeAlerts.value.length,
      holdLotCount: holdLots.value.length,
    };
    handoffs.value = [newHandoff, ...handoffs.value];
  }
  return {
    lines,
    selectedLineId,
    isLoading,
    error,
    lots,
    selectedLine,
    alerts,
    activeAlerts,
    wipLots,
    holdLots,
    lotActionEvents,
    recentLotActionEvents,
    dispatchLot,
    fetchSnapshot,
    focusLine,
    acknowledgeAlert,
    holdLot,
    releaseLot,
    completeLot,
    addLotActionEvent,
    simulateNextSnapshotFailure,
    handoffs,
    submitHandoff,
    workOrders,
    hourlyOutput,
  };
});
