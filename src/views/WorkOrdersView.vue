<script setup lang="ts">
import { useFactoryStore } from "../stores/factory";
import { storeToRefs } from "pinia";
import { useStatusFilter } from "../composables/useStatusFilter";
import { ref } from "vue";
import type { WorkOrderStatus } from "../types/factory";

const factoryStore = useFactoryStore();
const { workOrders } = storeToRefs(factoryStore);
const statusFilter = ref<WorkOrderStatus | "all">("all");

const { filteredItems: filteredWorkOrders } = useStatusFilter(
  workOrders,
  statusFilter,
);
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
