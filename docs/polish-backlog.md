# UI/UX 打磨待辦清單

> 2026-07-11 起專案已導入根目錄 `DESIGN.md`（Linear 深色系統）。
> 之後所有 UI 修改一律遵循該文件的 token,顏色不得寫死 hex。

上線後回頭處理的項目，按投報率排序。

## Snapshot 工具列（AppShell）

- [ ] `Simulate API Error` 視覺降級：改成次要樣式（ghost/text button）或加 `(demo)` 標籤——它是展示錯誤處理的 demo 開關，不該長得像正式功能
- [ ] `Retry` 文案語意：成功狀態下顯示 `Refresh`，錯誤狀態才顯示 `Retry`（用三元切換）
- [ ] 按鈕主次分明：常用操作用實心 primary，demo 開關用線框 secondary

## 元件拆分（LotsView 續拆）

- [ ] `LotDispatchForm.vue`：派工表單抽出，練 emits（子層通知父層送出）
- [ ] `LotActionPanel.vue`：Hold/Release/Complete 按鈕組抽出
- [ ] Work Orders 頁的狀態 `<span :class="['status', order.status]">` 目前沒有對應 CSS，改用現成的 `StatusPill` 元件上色

## 視覺與體驗

- [ ] Loading skeleton：Dashboard 載入時用骨架屏取代純文字 "Loading factory data..."
- [ ] RWD 全頁檢查：手機寬度下 LotTable 橫向捲動、sidebar 收合
- [ ] 操作回饋：Hold/Release/Dispatch 成功後的 toast 或短暫高亮

## 一致性小修

- [ ] WorkOrdersView 模板統一用解構後的 `workOrders.length`（目前混用 `factoryStore.workOrders.length`）
- [ ] HandoffView 歷史區顯示產線名稱而非 lineId（用 lines 查表）
