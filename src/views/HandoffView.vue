<script setup lang="ts">
import { useFactoryStore } from "../stores/factory";

const factoryStore = useFactoryStore();

// TODO(handoff form): 表單欄位，寫 template 時取消註解
// import { ref } from "vue";
// import type { ShiftName, HandoffRisk } from "../types/factory";
// const lineId = ref("");
// const shift = ref<ShiftName>("day");
// const shiftLead = ref("");
// const summary = ref("");
// const risk = ref<HandoffRisk>("low");
// const formError = ref("");
</script>
<template>
  <section class="page-view">
    <section class="lot-event-panel" aria-label="active alerts">
      <div class="section-heading-row">
        <h3>Active Alerts</h3>
        <span>{{ factoryStore.activeAlerts.length }}</span>
      </div>
      <p v-if="factoryStore.activeAlerts.length===0" class="empty-state">No active alerts.
      </p>
      <ul v-else class="lot-event-list">
        <li v-for="alert in factoryStore.activeAlerts" :key="alert.id" class="lot-event-item">
          <strong>{{ alert.title }}</strong>
          <p>{{ alert.severity }}</p>
        </li>
      </ul>
    </section> 
    <div class="section-heading-row">
          <h3>Handoff</h3>
          <span>{{ factoryStore.handoffs.length }}</span>
        </div>
        <p
          v-if="factoryStore.handoffs.length === 0"
          class="empty-state"
        >
          No handoff requests yet.
        </p>
  </section>
</template>

