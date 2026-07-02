<script setup lang="ts">
import { useFactoryStore } from "../stores/factory";
import AlertList from "../components/AlertList.vue";
import LineCard from "../components/LineCard.vue";
import KpiCard from "../components/KpiCard.vue";

const factoryStore = useFactoryStore();

function handleLineFocus(lineId: string) {
  factoryStore.focusLine(lineId);
}
</script>

<template>
  <section v-if="factoryStore.isLoading" class="overview-panel">
    <h2>Loading factory data...</h2>
    <p class="page-description">Fetching latest production line snapshot.</p>
  </section>

  <section v-else-if="factoryStore.error" class="overview-panel">
    <h2>Unable to load factory data</h2>
    <p class="page-description">{{ factoryStore.error }}</p>
  </section>

  <template v-else>
    <section class="overview-panel">
      <h2>Today Overview</h2>

      <p class="page-description">
        Production lines: {{ factoryStore.lines.length }}
      </p>

      <p class="page-description">
        Selected Line: {{ factoryStore.selectedLine?.name ?? "None" }}
      </p>

      <div class="metric-row">
        <KpiCard
          label="Average OEE"
          :value="factoryStore.lines[0]?.oee ?? '-'"
          meta="Primary line efficiency"
        />

        <KpiCard
          label="Output / hr"
          :value="factoryStore.lines[0]?.outputPerHour ?? '-'"
          meta="Units per hour"
        />

        <KpiCard
          label="Second Line Status"
          :value="factoryStore.lines[1]?.status ?? '-'"
          meta="SMT line health"
        />
      </div>
    </section>
    <AlertList
      :alerts="factoryStore.activeAlerts"
      :lines="factoryStore.lines"
      @acknowledge="factoryStore.acknowledgeAlert"
    />
    <section class="line-section">
      <h2>Production Lines</h2>

      <div class="line-grid">
        <LineCard
          v-for="line in factoryStore.lines"
          :key="line.id"
          :line="line"
          @focus="handleLineFocus"
        />
      </div>
    </section>
  </template>
</template>
