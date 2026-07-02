# FabOps Vue 專案架構

## 資料流

```txt
factoryApi.ts
  ↓
Pinia store
  ↓
Vue Router views
  ↓
Components
  ↓
User actions
  ↓
Pinia store updates
  ↓
computed/template updates UI
```

## 核心資料來源

`src/api/factoryApi.ts` 模擬後端 API。

在真實產線中，這些資料可能會來自 MES、ERP、設備資料庫、警報系統或資料中台。

## 狀態管理

`src/stores/factory.ts` 使用 Pinia 管理全站共用狀態，例如：

- production lines
- factory alerts
- lots
- lot action events
- snapshot loading/error state

## 頁面分工

- `DashboardView.vue`：看產線健康狀態與 API snapshot
- `LotsView.vue`：管理 Lot 搜尋、篩選、派工與狀態操作
- `HandoffView.vue`：呈現交接班資訊

## 元件分工

- `LotTable.vue`：顯示 Lot 清單
- `LotDetailPanel.vue`：顯示單筆 Lot 詳細資料
- `LotDispatchForm.vue`：處理 Lot 派工表單
- `AlertList.vue`：顯示工廠警報
- `StatusPill.vue`：統一狀態標籤樣式

## Composable

`useLotFilters.ts` 把 Lot 篩選邏輯抽出來，讓畫面和商業邏輯分開。

這樣的好處是：

- LotsView 不會塞太多篩選細節
- 篩選邏輯可以被測試
- 未來其他頁面也可以重用

## 測試

`useLotFilters.spec.ts` 使用 Vitest 測試 Lot 篩選邏輯。

目前測試包含：

- 依照搜尋文字篩選 Lot
- 依照 Lot status 篩選
- 依照 Lot priority 篩選

## 面試說法

這個專案的資料流是從 API 進到 Pinia store，再由 view 和 component 讀取狀態。使用者操作像是 dispatch、hold、release、complete，會呼叫 store action 更新資料，接著 Vue 的 computed 和 template 會自動反映最新畫面。

我把 Lot 篩選邏輯抽成 composable，並用 Vitest 測試，這代表我不是只會做畫面，也會把核心商業邏輯整理成可維護、可驗證的程式碼。
