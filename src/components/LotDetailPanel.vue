<script setup lang="ts">
import type { ProductionLot } from "../types/factory";

import { formatDateTime } from "../utils/format";

defineProps<{
  lot: ProductionLot;
}>();
</script>
<template>
  <div>
    <p class="eyebrow">Selected Lot</p>
    <h2>{{ lot.id }}</h2>
  </div>

  <div class="lot-detail-grid">
    <div class="lot-detail-item">
      <span>Product</span>
      <strong>{{ lot.product }}</strong>
    </div>

    <div class="lot-detail-item">
      <span>Current Step</span>
      <strong>{{ lot.currentStep }}</strong>
    </div>

    <div class="lot-detail-item">
      <span>Equipment</span>
      <strong>{{ lot.equipmentId ?? "Unassigned" }}</strong>
    </div>

    <div class="lot-detail-item">
      <span>Wafer Count</span>
      <strong>{{ lot.waferCount }}</strong>
    </div>

    <div class="lot-detail-item">
      <span>Status</span>
      <strong>{{ lot.status }}</strong>
    </div>

    <div class="lot-detail-item">
      <span>Priority</span>
      <strong>{{ lot.priority }}</strong>
    </div>

    <div class="lot-detail-item">
      <span>Due At</span>
      <strong>{{ formatDateTime(lot.dueAt) }}</strong>
    </div>
  </div>
  <p v-if="lot.holdReason" class="lot-hold-message">
    Hold reason: {{ lot.holdReason }}
  </p>
</template>
