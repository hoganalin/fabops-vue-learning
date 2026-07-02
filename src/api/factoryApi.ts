import {
  factoryAlerts,
  productionLines,
  productionLots,
} from "../data/factory";

import type {
  FactoryAlert,
  ProductionLine,
  ProductionLot,
} from "../types/factory";

export interface FactorySnapshot {
  lines: ProductionLine[];
  alerts: FactoryAlert[];
  lots: ProductionLot[];
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const wait = (ms = 450): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

let shouldFailNextSnapshot = false;

export function failNextFactorySnapshot() {
  shouldFailNextSnapshot = true;
}

export async function getFactorySnapshot(): Promise<FactorySnapshot> {
  await wait();

  if (shouldFailNextSnapshot) {
    shouldFailNextSnapshot = false;
    throw new Error("MES snapshot API is temporarily unavailable.");
  }

  return clone({
    lines: productionLines,
    alerts: factoryAlerts,
    lots: productionLots,
  });
}
