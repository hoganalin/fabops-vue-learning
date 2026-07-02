<script setup lang="ts">
import { computed } from "vue";
import StatusPill from "./StatusPill.vue";
import type { ProductionLine } from "../types/factory";

const props = defineProps<{
  line: ProductionLine;
}>();
const emit = defineEmits<{ focus: [lineId: string] }>();

const statusLabel = computed(() => {
  if (props.line.status === "normal") {
    return "Normal";
  }

  if (props.line.status === "watch") {
    return "Watch";
  }

  return "Down";
});

const statusTone = computed(() => {
  if (props.line.status === "normal") {
    return "good";
  }
  if (props.line.status === "watch") {
    return "warn";
  }
  return "critical";
});
</script>

<template>
  <article class="line-card">
    <h3>{{ line.name }}</h3>
    <p>{{ line.area }} - {{ line.owner }}</p>
    <StatusPill :label="statusLabel" :tone="statusTone" />

    <div class="line-metrics">
      <span>OEE: {{ line.oee }}%</span>
      <span>Output: {{ line.outputPerHour }} / hr</span>
      <span>Yield: {{ line.yieldRate }}%</span>
      <span>WIP: {{ line.wip }}</span>
    </div>
    <button
      class="secondary-button"
      type="button"
      @click="emit('focus', line.id)"
    >
      Focus
    </button>
  </article>
</template>
