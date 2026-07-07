<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import LotTable from "../components/LotTable.vue";
import { useFactoryStore } from "../stores/factory";
import { useLotFilters } from "../composables/useLotFilters";
import type { ProductionLot, LotPriority, LotStatus } from "../types/factory";
import LotDetailPanel from "../components/LotDetailPanel.vue";
import LotEventList from "../components/LotEventList.vue";
const factoryStore = useFactoryStore();
const router = useRouter();
const route = useRoute();
const lotStatusOptions = [
  "all",
  "pending",
  "running",
  "hold",
  "completed",
] as const;
const lotPriorityOptions = [
  "all",
  "normal",
  "hot",
  "superhot",
  "rocket",
] as const;

function readQueryText(value: unknown) {
  return typeof value === "string" ? value : "";
}
function readQueryStatus(value: unknown): LotStatus | "all" {
  return typeof value === "string" &&
    lotStatusOptions.includes(value as LotStatus | "all")
    ? (value as LotStatus | "all")
    : "all";
}
function readQueryPriority(value: unknown): LotPriority | "all" {
  return typeof value === "string" &&
    lotPriorityOptions.includes(value as LotPriority | "all")
    ? (value as LotPriority | "all")
    : "all";
}

const { lots } = storeToRefs(factoryStore);
const selectedLot = ref<ProductionLot | null>(null);
const search = ref(readQueryText(route.query.search));
const statusFilter = ref<LotStatus | "all">(
  readQueryStatus(route.query.status),
);
const priorityFilter = ref<LotPriority | "all">(
  readQueryPriority(route.query.priority),
);
const { filteredLots } = useLotFilters(
  lots,
  search,
  statusFilter,
  priorityFilter,
);
const holdReason = ref("");
const holdOwner = ref("Shift lead");
const dispatchEquipmentId = ref("");
const dispatchOwner = ref("Shift lead");
const dispatchError = ref("");

const canHoldSelectedLot = computed(() => {
  return selectedLot.value !== null && selectedLot.value.status !== "hold";
});
const canReleaseSelectedLot = computed(() => {
  return selectedLot.value !== null && selectedLot.value.status === "hold";
});
const canCompleteSelectedLot = computed(() => {
  return selectedLot.value !== null && selectedLot.value.status === "running";
});
const canDispatchSelectedLot = computed(() => {
  return selectedLot.value !== null && selectedLot.value.status === "pending";
});

function handleCompleteLot() {
  if (!selectedLot.value || !canCompleteSelectedLot.value) {
    return;
  }
  const lotId = selectedLot.value.id;
  factoryStore.completeLot(lotId);
  selectedLot.value = factoryStore.lots.find((lot) => lot.id === lotId) ?? null;
}
function handleDispatchLot() {
  dispatchError.value = "";
  if (!selectedLot.value) {
    dispatchError.value = "Select a lot to dispatch.";
    return;
  }
  if (!canDispatchSelectedLot.value) {
    dispatchError.value = "Only pending lots can be dispatched.";
    return;
  }
  const equipmentId = dispatchEquipmentId.value.trim();
  const owner = dispatchOwner.value.trim() || "Shift lead";
  if (!equipmentId) {
    dispatchError.value = "Equipment is required.";
    return;
  }
  const lotId = selectedLot.value.id;
  factoryStore.dispatchLot({
    lotId,
    equipmentId,
    owner,
  });
  selectedLot.value = factoryStore.lots.find((lot) => lot.id === lotId) ?? null;
  dispatchEquipmentId.value = "";
}

watch(
  [search, statusFilter, priorityFilter],
  ([nextSearch, nextStatus, nextPriority]) => {
    void router.replace({
      query: {
        ...route.query,
        search: nextSearch.trim() || undefined,
        status: nextStatus === "all" ? undefined : nextStatus,
        priority: nextPriority === "all" ? undefined : nextPriority,
      },
    });
  },
);

watch(
  filteredLots,
  (lots) => {
    const selectedLotStillVisible = lots.some(
      (lot) => lot.id === selectedLot.value?.id,
    );

    if (!selectedLotStillVisible) {
      selectedLot.value = lots[0] ?? null;
    }
  },
  { immediate: true },
);

function clearFilters() {
  search.value = "";
  statusFilter.value = "all";
  priorityFilter.value = "all";
}

function handleLotSelect(lot: ProductionLot) {
  selectedLot.value = lot;
}
function handleHoldLot() {
  if (!selectedLot.value || !canHoldSelectedLot.value) {
    return;
  }
  const lotId = selectedLot.value.id;
  factoryStore.holdLot({
    lotId,
    reason: holdReason.value,
    owner: holdOwner.value,
  });
  selectedLot.value = factoryStore.lots.find((lot) => lot.id === lotId) ?? null;
  holdReason.value = "";
}
function handleReleaseLot() {
  if (!selectedLot.value || !canReleaseSelectedLot.value) {
    return;
  }
  const lotId = selectedLot.value.id;
  factoryStore.releaseLot(lotId);
  selectedLot.value = factoryStore.lots.find((lot) => lot.id === lotId) ?? null;
}
</script>

<template>
  <section class="page-view lots-page">
    <h2>Lot Dispatch</h2>
    <p class="page-description">Total Lots : {{ factoryStore.lots.length }}</p>

    <p class="page-description">WIP Lots: {{ factoryStore.wipLots.length }}</p>

    <p class="page-description">
      Hold Lots: {{ factoryStore.holdLots.length }}
    </p>

    <section class="lot-filters" aria-label="lot-filters">
      <label class="filter-field">
        search
        <input
          v-model="search"
          type="search"
          placeholder="Lot, Product, Step, Equipment"
        />
      </label>

      <label class="filter-field">
        status
        <select v-model="statusFilter">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="hold">Hold</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label class="filter-field">
        Priority
        <select v-model="priorityFilter">
          <option value="all">All priorities</option>
          <option value="normal">Normal</option>
          <option value="hot">Hot</option>
          <option value="superhot">Superhot</option>
          <option value="rocket">Rocket</option>
        </select>
      </label>

      <button class="secondary-button" type="button" @click="clearFilters">
        Clear Filters
      </button>
    </section>

    <p class="page-description">Matching Lots: {{ filteredLots.length }}</p>

    <LotTable
      :lots="filteredLots"
      :lines="factoryStore.lines"
      @select="handleLotSelect"
    />

    <aside v-if="selectedLot" class="lot-detail-panel">
      <LotDetailPanel :lot="selectedLot" />
      <section class="dispatch-form" aria-label="dispatch form">
        <label class="filter-field">
          dispatch equipment
          <input
            v-model="dispatchEquipmentId"
            type="text"
            placeholder="Equipment to dispatch to"
          />
        </label>
        <label class="filter-field">
          dispatch owner
          <input
            v-model="dispatchOwner"
            type="text"
            placeholder="Owner to dispatch to"
          />
        </label>
        <button
          class="secondary-button"
          type="button"
          :disabled="!canDispatchSelectedLot"
          @click="handleDispatchLot"
        >
          Dispatch Lot
        </button>
        <p v-if="dispatchError" class="form-error">
          {{ dispatchError }}
        </p>
      </section>
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
          <input
            type="text"
            v-model="holdOwner"
            placeholder="Owner of this lot"
          />
        </label>
        <button
          class="secondary-button"
          type="button"
          @click="handleHoldLot"
          :disabled="!canHoldSelectedLot"
        >
          Hold Lot
        </button>

        <button
          class="secondary-button"
          type="button"
          @click="handleReleaseLot"
          :disabled="!canReleaseSelectedLot"
        >
          Release Lot
        </button>
        <button
          type="button"
          @click="handleCompleteLot"
          :disabled="!canCompleteSelectedLot"
          class="secondary-button"
        >
          Complete Lot
        </button>
      </section>
      <LotEventList :events="factoryStore.recentLotActionEvents" />
    </aside>
  </section>
</template>
