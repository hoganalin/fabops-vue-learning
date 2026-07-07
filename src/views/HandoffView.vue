<script setup lang="ts">
import { useFactoryStore } from "../stores/factory";
import { ref } from "vue";
import type { ShiftName, HandoffRisk } from "../types/factory";
import LotEventList from "../components/LotEventList.vue";

const factoryStore = useFactoryStore();
const lineId = ref("");
const shift = ref<ShiftName>("day");
const shiftLead = ref("");
const summary = ref("");
const risk = ref<HandoffRisk>("low");
const formError = ref("");
const handleSubmitHandoff = () => {
  formError.value = "";
  if (!lineId.value || !shiftLead.value.trim() || !summary.value.trim()) {
    formError.value = "Please fill in all required fields.";
    return;
  }
  factoryStore.submitHandoff({
    lineId: lineId.value,
    shift: shift.value,
    shiftLead: shiftLead.value,
    summary: summary.value,
    risk: risk.value,
  });
  shiftLead.value = "";
  summary.value = "";
};
</script>
<template>
  <section class="page-view">
    <section class="lot-event-panel" aria-label="hold lots">
      <div class="section-heading-row">
        <h3>Hold Lots</h3>
        <span>{{ factoryStore.holdLots.length }}</span>
      </div>
      <p v-if="factoryStore.holdLots.length === 0" class="empty-state">
        No hold lots.
      </p>
      <ul v-else class="lot-event-list">
        <li
          v-for="lot in factoryStore.holdLots"
          :key="lot.id"
          class="lot-event-item"
        >
          <strong>{{ lot.id }}</strong>
          <p>{{ lot.holdReason ?? "No reason provided" }}</p>
        </li>
      </ul>
    </section>

    <LotEventList :events="factoryStore.recentLotActionEvents" />
    <section class="lot-event-panel" aria-label="active alerts">
      <div class="section-heading-row">
        <h3>Active Alerts</h3>
        <span>{{ factoryStore.activeAlerts.length }}</span>
      </div>
      <p v-if="factoryStore.activeAlerts.length === 0" class="empty-state">
        No active alerts.
      </p>
      <ul v-else class="lot-event-list">
        <li
          v-for="alert in factoryStore.activeAlerts"
          :key="alert.id"
          class="lot-event-item"
        >
          <strong>{{ alert.title }}</strong>
          <p>{{ alert.severity }}</p>
        </li>
      </ul>
    </section>
    <section class="dispatch-form" aria-label="handoff form">
      <label class="filter-field">
        <span>Line ID:</span>
        <select v-model="lineId">
          <option value="" disabled>Select a line</option>
          <option
            v-for="line in factoryStore.lines"
            :key="line.id"
            :value="line.id"
          >
            {{ line.name }}
          </option>
        </select>
      </label>
      <label class="filter-field">
        <span>Shift:</span>
        <select v-model="shift">
          <option value="day">Day</option>
          <option value="swing">Swing</option>
          <option value="night">Night</option>
        </select>
      </label>
      <label class="filter-field">
        <span>Shift Lead:</span>
        <input
          v-model="shiftLead"
          type="text"
          placeholder="Enter shift lead name"
        />
      </label>
      <label class="filter-field">
        <span>Summary:</span>
        <textarea v-model="summary" placeholder="Enter summary"></textarea>
      </label>
      <label class="filter-field">
        <span>Risk:</span>
        <select v-model="risk">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <p v-if="formError" class="form-error">{{ formError }}</p>
      <button
        type="button"
        class="secondary-button"
        @click="handleSubmitHandoff"
      >
        Submit Handoff
      </button>
    </section>
    <section class="lot-event-panel" aria-label="handoff requests">
      <div class="section-heading-row">
        <h3>Handoff</h3>
        <span>{{ factoryStore.handoffs.length }}</span>
      </div>
      <p v-if="factoryStore.handoffs.length === 0" class="empty-state">
        No handoff requests yet.
      </p>
      <ul v-else class="lot-event-list">
        <li
          v-for="handoff in factoryStore.handoffs"
          :key="handoff.id"
          class="lot-event-item"
        >
          <strong>{{ handoff.shift }} - {{ handoff.shiftLead }}</strong>
          <p>{{ handoff.summary }}</p>
          <p>Risk: {{ handoff.risk }}</p>
          <p>Alerts: {{ handoff.openAlertCount }}</p>
          <p>Hold: {{ handoff.holdLotCount }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>
