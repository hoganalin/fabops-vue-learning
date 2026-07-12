<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const chartEl = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!chartEl.value) return;
  const chart = echarts.init(chartEl.value);
  chart.setOption({
    xAxis: { type: "category", data: ["A", "B", "C"] },
    yAxis: { type: "value" },
    series: [{ type: "line", data: [1, 3, 2] }],
  });
});
</script>
<template>
  <div ref="chartEl" style="width: 100%; height: 320px"></div>
</template>
