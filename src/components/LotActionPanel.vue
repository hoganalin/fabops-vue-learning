<script setup lang="ts">
import { ref, computed } from "vue";
import type { ProductionLot } from "../types/factory";
const emit = defineEmits<{
  hold: [reason: string, owner: string];
  release: [];
  complete: [];
}>();
const props = defineProps<{ lot: ProductionLot }>();
const holdReason = ref("");
const holdOwner = ref("Shift lead");
const canHold = computed(() => {
  return props.lot !== null && props.lot.status !== "hold";
});
const canRelease = computed(() => {
  return props.lot !== null && props.lot.status === "hold";
});
const canComplete = computed(() => {
  return props.lot !== null && props.lot.status === "running";
});
function handleHold() {
  emit("hold", holdReason.value, holdOwner.value);
  holdReason.value = "";
}
function handleRelease() {
  emit("release");
}
function handleComplete() {
  emit("complete");
}
</script>
<template>
  <section class="lot-action-panel" aria-label="lot actions">
    <label class="filter-field"
      >hold reason
      <input
        type="text"
        v-model="holdReason"
        placeholder="Reason for holding this lot"
      />
    </label>
    <label class="filter-field">
      owner
      <input type="text" v-model="holdOwner" placeholder="Owner of this lot" />
    </label>
    <button
      class="secondary-button"
      type="button"
      @click="handleHold"
      :disabled="!canHold"
    >
      Hold Lot
    </button>

    <button
      class="secondary-button"
      type="button"
      @click="handleRelease"
      :disabled="!canRelease"
    >
      Release Lot
    </button>
    <button
      type="button"
      @click="handleComplete"
      :disabled="!canComplete"
      class="secondary-button"
    >
      Complete Lot
    </button>
  </section>
</template>
