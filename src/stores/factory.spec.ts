import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useFactoryStore } from "./factory";
import type { ProductionLot } from "../types/factory";

function makeLot(overrides: Partial<ProductionLot> = {}): ProductionLot {
  return {
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
    ...overrides,
  };
}
describe("useFactoryStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("releases a lot and creates a lot action event", () => {
    const factoryStore = useFactoryStore();
    const lot = makeLot({ id: "LOT-TEST-01", status: "hold" });
    factoryStore.lots = [lot];
    factoryStore.releaseLot(lot.id);
    expect(factoryStore.lots[0].status).toBe("pending");
    expect(factoryStore.lots[0].holdReason).toBeNull();
    expect(factoryStore.lotActionEvents.length).toBe(1);
    const event = factoryStore.lotActionEvents[0];
    expect(event.type).toBe("release");
    expect(event.fromStatus).toBe("hold");
    expect(event.toStatus).toBe("pending");
  });
  it("hold a lot from pending status", () => {
    const factoryStore = useFactoryStore();
    const lot = makeLot({ id: "LOT-TEST-02", status: "pending" });
    factoryStore.lots = [lot];
    factoryStore.holdLot({
      lotId: lot.id,
      reason: "Test hold reason",
      owner: "Test owner",
    });
    expect(factoryStore.lots[0].status).toBe("hold");
    expect(factoryStore.lots[0].holdReason).toBe("Test hold reason");
    expect(factoryStore.lotActionEvents.length).toBe(1);
    const event = factoryStore.lotActionEvents[0];
    expect(event.type).toBe("hold");
    expect(event.fromStatus).toBe("pending");
    expect(event.toStatus).toBe("hold");
  });
  it("hold a lot with no reason from running status", () => {
    const factoryStore = useFactoryStore();
    const lot = makeLot({ id: "LOT-TEST-03", status: "running" });
    factoryStore.lots = [lot];
    factoryStore.holdLot({ lotId: lot.id, reason: "", owner: "Test owner" });
    expect(factoryStore.lots[0].status).toBe("hold");
    expect(factoryStore.lots[0].holdReason).toBe("Manual engineering hold");
    expect(factoryStore.lotActionEvents.length).toBe(1);
    const event = factoryStore.lotActionEvents[0];
    expect(event.type).toBe("hold");
    expect(event.fromStatus).toBe("running");
    expect(event.toStatus).toBe("hold");
  });
});
