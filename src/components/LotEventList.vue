<script setup lang="ts">
import type { LotActionEvent } from "../types/factory";
defineProps<{ events: LotActionEvent[] }>();
function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(dateString));
}
</script>
<template>
  <section class="lot-event-panel" aria-label="recent lot actions">
    <div class="section-heading-row">
      <h3>Recent Lot Actions</h3>
      <span>{{ events.length }}</span>
    </div>
    <p v-if="events.length === 0" class="empty-state">No lot actions yet.</p>
    <ul v-else class="lot-event-list">
      <li v-for="event in events" :key="event.id" class="lot-event-item">
        <div>
          <strong>{{ event.type }}</strong>
          <span>{{ event.lotId }}</span>
        </div>
        <p>{{ event.fromStatus }} -> {{ event.toStatus }}</p>
        <p v-if="event.reason" class="lot-event-reason">
          {{ event.reason }}
        </p>
        <small>
          {{ event.owner }} - {{ formatDateTime(event.createdAt) }}
        </small>
      </li>
    </ul>
  </section>
</template>
