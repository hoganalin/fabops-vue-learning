import { createRouter, createWebHistory } from "vue-router";
const DashboardView = () => import("../views/DashboardView.vue");
const HandoffView = () => import("../views/HandoffView.vue");
const LotsView = () => import("../views/LotsView.vue");
const WorkOrdersView = () => import("../views/WorkOrdersView.vue");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DashboardView,
    },
    {
      path: "/handoff",
      component: HandoffView,
    },
    {
      path: "/lots",
      component: LotsView,
    },
    {
      path: "/work-orders",
      component: WorkOrdersView,
    },
  ],
});
