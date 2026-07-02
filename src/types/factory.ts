export type LineStatus = "normal" | "watch" | "down";
export type AlertSeverity = "info" | "warning" | "critical";
export type WorkOrderStatus = "queued" | "running" | "blocked" | "done";
export type Priority = "low" | "medium" | "high";
export type LotStatus = "pending" | "running" | "hold" | "completed";
export type LotPriority = "normal" | "hot" | "superhot" | "rocket";
export type LotActionType = "dispatch" | "hold" | "release" | "complete";
export type HandoffRisk = "low" | "medium" | "high";

export interface ProductionLine {
  id: string;
  name: string;
  area: string;
  status: LineStatus;
  oee: number;
  outputPerHour: number;
  targetPerHour: number;
  yieldRate: number;
  wip: number;
  owner: string;
}

export interface FactoryAlert {
  id: string;
  lineId: string;
  title: string;
  detail: string;
  severity: AlertSeverity;
  createdAt: string;
  acknowledged: boolean;
}

export interface WorkOrder {
  id: string;
  lineId: string;
  product: string;
  step: string;
  owner: string;
  plannedQty: number;
  completedQty: number;
  dueAt: string;
  status: WorkOrderStatus;
  priority: Priority;
  risk: string;
  updatedAt: string;
}

export interface HandoffNote {
  id: string;
  lineId: string;
  shiftLead: string;
  summary: string;
  risk: HandoffRisk;
  createdAt: string;
}

export interface ProductionLot {
  id: string;
  product: string;
  currentStep: string;
  lineId: string;
  equipmentId: string | null;
  waferCount: number;
  status: LotStatus;
  priority: LotPriority;
  holdReason: string | null;
  dueAt: string;
  updatedAt: string;
}
export interface LotHoldRequest {
  lotId: string;
  reason: string;
  owner: string;
}
export interface LotActionEvent {
  id: string;
  lotId: string;
  type: LotActionType;
  fromStatus: LotStatus;
  toStatus: LotStatus;
  reason: string | null;
  owner: string;
  createdAt: string;
}
export interface LotDispatchRequest {
  lotId: string;
  equipmentId: string;
  owner: string;
}
