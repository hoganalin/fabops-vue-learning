<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    tone?: "good" | "warn" | "critical" | "neutral";
  }>(),
  {
    tone: "neutral",
  },
);
</script>

<template>
  <span :class="['status-pill', `status-${props.tone}`]">
    {{ props.label }}
  </span>
</template>
