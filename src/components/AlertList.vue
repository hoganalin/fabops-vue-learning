<script setup lang="ts">
import StatusPill from "./StatusPill.vue";
import type {
  AlertSeverity,
  FactoryAlert,
  ProductionLine,
} from "../types/factory";

defineProps<{ alerts: FactoryAlert[]; lines: ProductionLine[] }>();
const emit = defineEmits<{
  acknowledge: [alertId: string];
}>();
function severityTone(severity: AlertSeverity) {
  if (severity === "critical") {
    return "critical";
  }
  if (severity === "warning") {
    return "warn";
  }
  return "neutral";
}
function lineName(lines: ProductionLine[], lineId: string) {
  return lines.find((line) => line.id === lineId)?.name ?? "unknown line";
}
</script>
<template>
  <section class="alert-list">
    <article v-for="alert in alerts" :key="alert.id" class="alert-row">
      <div class="alert-main">
        <StatusPill
          :label="alert.severity"
          :tone="severityTone(alert.severity)"
        />

        <strong>{{ alert.title }}</strong>
        <p>{{ alert.detail }}</p>
        <small>{{ lineName(lines, alert.lineId) }}</small>
      </div>

      <button
        class="secondary-button"
        type="button"
        @click="emit('acknowledge', alert.id)"
      >
        Ack
      </button>
    </article>

    <section v-if="alerts.length === 0" class="overview-panel">
      <h2>No active alerts</h2>
      <p class="page-description">All lines are inside operating limits.</p>
    </section>
  </section>
</template>
