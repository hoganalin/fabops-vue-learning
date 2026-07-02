<script setup lang="ts">
import StatusPill from "./StatusPill.vue";
import type {
  LotPriority,
  LotStatus,
  ProductionLot,
  ProductionLine,
} from "../types/factory";

defineProps<{
  lots: ProductionLot[];
  lines: ProductionLine[];
}>();
const emit = defineEmits<{
  select: [lot: ProductionLot];
}>();

function statusTone(status: LotStatus) {
  if (status === "completed") {
    return "good";
  }
  if (status === "hold") {
    return "critical";
  }
  if (status === "running") {
    return "warn";
  }
  return "neutral";
}

function priorityTone(priority: LotPriority) {
  if (priority === "rocket" || priority === "superhot") {
    return "critical";
  }

  if (priority === "hot") return "warn";

  return "neutral";
}

function lineName(lines: ProductionLine[], lineId: string) {
  return lines.find((line) => line.id === lineId)?.name ?? "unknown line";
}
</script>

<template>
  <div class="lot-table-shell">
    <table v-if="lots.length > 0" class="lot-table">
      <thead>
        <tr>
          <th scope="col">Lot</th>
          <th scope="col">Product / Line</th>
          <th scope="col">Current Step</th>
          <th scope="col">Equipment</th>
          <th scope="col">Wafers</th>
          <th scope="col">Status</th>
          <th scope="col">Priority</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="lot in lots" :key="lot.id">
          <td>
            <button class="lot-link" type="button" @click="emit('select', lot)">
              {{ lot.id }}
            </button>
          </td>

          <td class="lot-product">
            <strong>{{ lot.product }}</strong>
            <small>{{ lineName(lines, lot.lineId) }}</small>
          </td>

          <td>{{ lot.currentStep }}</td>
          <td>{{ lot.equipmentId ?? "Unassigned" }}</td>
          <td>{{ lot.waferCount }}</td>

          <td>
            <StatusPill :label="lot.status" :tone="statusTone(lot.status)" />
          </td>

          <td>
            <StatusPill
              :label="lot.priority"
              :tone="priorityTone(lot.priority)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <section v-else class="overview-panel">
      <h2>No matching lots</h2>
      <p class="page-description">
        Change the filters to view other production lots.
      </p>
    </section>
  </div>
</template>
