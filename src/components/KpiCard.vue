<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  meta: string;
}>();
</script>
<template>
  <article class="metric">
    <span class="metric-label">{{ label }}</span>
    <strong>{{ value }}</strong>
    <span v-if="meta" class="metric-meta">{{ meta }}</span>
  </article>
</template>
