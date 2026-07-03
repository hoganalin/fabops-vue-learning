<script setup lang="ts">
import { useFactoryStore } from "../stores/factory";
import { ref, computed } from "vue";
import type { WorkOrderStatus } from "../types/factory";

const factoryStore = useFactoryStore();
const statusFilter = ref<WorkOrderStatus | "all">("all");
const filteredWorkOrders = computed(() => {
  if (statusFilter.value === "all") {
    return factoryStore.workOrders;
  } else {
    return factoryStore.workOrders.filter(
      (order) => order.status === statusFilter.value,
    );
  }
});
</script>

<template>
  <section class="page-view">
    <h2>Work Orders</h2>
    <p class="page-description">
      Total:{{ factoryStore.workOrders.length }} / Filtered:{{
        filteredWorkOrders.length
      }}
    </p>
    <section class="lot-filters" aria-label="work order filters">
      <label class="filter-field">
        status:
        <select v-model="statusFilter">
          <option value="all">All statuses</option>
          <option value="queued">Queued</option>
          <option value="running">Running</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </label>
    </section>
    <p v-if="filteredWorkOrders.length === 0" class="empty-state">
      No work orders found for the selected filter.
    </p>
    <ul v-else class="lot-event-list">
      <li
        v-for="order in filteredWorkOrders"
        :key="order.id"
        class="lot-event-item"
      >
        <strong>{{ order.id }} - {{ order.product }}</strong>
        <p>{{ order.step }} · {{ order.owner }}</p>
        <p>
          <span :class="['status', order.status]">{{ order.status }}</span>
        </p>
        <p>{{ order.completedQty }} / {{ order.plannedQty }}</p>
      </li>
    </ul>
  </section>
</template>
