<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useFactoryStore } from "../stores/factory";

const appName = "FabOps Vue";
const subtitle = "Hsinchu Smart Factory Console";
const navItems = [
  {
    label: "Ops",
    to: "/",
  },
  {
    label: "Lots",
    to: "/lots",
  },
  {
    label: "Handoff",
    to: "/handoff",
  },
];
const factoryStore = useFactoryStore();

onMounted(() => {
  void factoryStore.fetchSnapshot();
});
function handleRetrySnapshot() {
  void factoryStore.fetchSnapshot();
}
function handleSimulateNextSnapshotFailure() {
  factoryStore.simulateNextSnapshotFailure();
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <p class="brand-title">{{ appName }}</p>
      <p class="brand-subtitle">{{ subtitle }}</p>
      <nav class="nav-list" aria-label="Main navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          class="nav-link"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <main class="workspace">
      <header class="page-header">
        <p class="eyebrow">Chapter 16</p>
        <h1>FabOps Learning Console</h1>
        <p class="page-description">
          Practice Vue with line health, alerts, lots, and shift handoff.
        </p>
        <div class="snapshot-toolbar" aria-label="Factory snapshot status">
          <p
            class="snapshot-status"
            :class="{ 'snapshot-status-error': factoryStore.error }"
          >
            <template v-if="factoryStore.isLoading">Loading snapshot...</template>
            <template v-else-if="factoryStore.error">{{
              factoryStore.error
            }}</template>
            <template v-else>
              Snapshot ready: {{ factoryStore.lines.length }} lines /
              {{ factoryStore.lots.length }} lots
            </template>
          </p>
          <div class="snapshot-actions">
            <button
              class="secondary-button"
              type="button"
              :disabled="factoryStore.isLoading"
              @click="handleRetrySnapshot"
            >
              Retry
            </button>
            <button
              class="secondary-button"
              type="button"
              :disabled="factoryStore.isLoading"
              @click="handleSimulateNextSnapshotFailure"
            >
              Simulate API Error
            </button>
          </div>
        </div>
      </header>

      <RouterView />
    </main>
  </div>
</template>
