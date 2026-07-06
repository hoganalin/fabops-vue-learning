import { describe, expect, it } from "vitest";
import { ref } from "vue";
import { useStatusFilter } from "./useStatusFilter";

const items = ref([
  { id: 1, status: "queued" },
  { id: 2, status: "running" },
  { id: 3, status: "queued" },
]);
describe("useStatusFilter", () => {
  it("return all items when filter is 'all'", () => {
    const statusFilter = ref("all");
    const { filteredItems } = useStatusFilter(items, statusFilter);
    expect(filteredItems.value).toHaveLength(3);
  });
  it("filters items by status", () => {
    const statusFilter = ref("queued");
    const { filteredItems } = useStatusFilter(items, statusFilter);
    expect(filteredItems.value).toHaveLength(2);
    expect(filteredItems.value.map((item) => item.id)).toEqual([1, 3]);
  });
  it("returns empty array when no items match the filter", () => {
    const statusFilter = ref("blocked");
    const { filteredItems } = useStatusFilter(items, statusFilter);
    expect(filteredItems.value).toHaveLength(0);
  });
});
