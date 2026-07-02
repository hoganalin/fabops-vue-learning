# FabOps Vue Learning

FabOps Vue Learning 是一個用 Vue 3 製作的智慧工廠前端練習專案，情境設定在新竹製造業的產線管理。

這個專案不是單純做靜態畫面，而是透過產線狀態、工廠警報、Lot 管理、派工、Hold/Release/Complete、API loading/error/retry、URL 篩選同步和測試，練習 Vue 在真實工作場景中的資料流。

## 專案亮點

- Dashboard 顯示產線健康狀態與工廠 snapshot
- Factory alerts 支援警報確認
- Lots 頁面支援搜尋、狀態篩選、優先等級篩選
- Lot detail panel 顯示批次詳細資料
- Dispatch workflow 可把 Lot 派到指定設備
- Hold、Release、Complete 模擬產線事件
- Recent Lot Actions 保留操作紀錄，方便交接班
- 模擬 API loading、error、retry 狀態
- Lot 篩選條件同步到 URL query，方便分享狀態
- 使用 Vitest 測試 Lot 篩選邏輯

## 使用到的 Vue 技術

- Vue 3 Composition API
- `<script setup>`
- TypeScript types 和 interfaces
- Props 和 emits
- Pinia store
- Computed values
- Watchers
- Vue Router
- URL query state
- Composables
- `v-model` 表單處理
- API loading/error/retry
- Vitest unit tests

## 產線中的意義

在真實工廠裡，操作員和工程師需要快速掌握產線狀態、處理警報、派工 Lot 到設備，以及保留操作紀錄供交接班使用。

這個專案把這些流程轉成前端功能：

- Lot 代表一批正在製程中移動的產品。
- Dispatch 代表把 Lot 派到某台設備加工。
- Hold 代表因為異常或疑慮，先暫停這批 Lot。
- Release 代表問題確認後，允許 Lot 繼續往下走。
- Complete 代表 Lot 完成目前這一道製程。
- URL filters 可以讓工程師分享同一個篩選視角。

## 如何啟動

```bash
npm install
npm run dev
```

本地端網址：

```txt
http://127.0.0.1:5174/
```

## 如何驗證

```bash
npm run test
npm run build
```

預期結果：

- `npm run test` 通過 `useLotFilters` 測試。
- `npm run build` 通過 Vue 型別檢查與正式打包。

## 面試 Demo 流程

1. 打開 Dashboard，介紹工廠 snapshot。
2. 點擊 Simulate API Error，再點擊 Retry。
3. 進入 Lots 頁面。
4. 使用 rocket priority 或 hold status 篩選 Lot。
5. 選取 Lot，說明右側詳細資料。
6. Dispatch 一筆 pending Lot 到設備。
7. 對 Lot 執行 Hold、Release 或 Complete。
8. 展示 Recent Lot Actions。
9. 複製篩選後的 URL，說明 shareable state。
10. 執行 `npm run test` 和 `npm run build`。

## 面試說法

我用這個專案從 React 背景學習 Vue。與其只練語法，我選擇一個接近新竹製造業的產線情境，練習 Vue 如何處理狀態、衍生資料、元件溝通、路由同步、表單流程、API 狀態和可測試的商業邏輯。

這個 UI 不是靜態展示。使用者操作會更新 Vue state，computed 會重新計算 Lot 清單，watch 會把篩選條件同步到 URL，Vitest 則驗證核心篩選邏輯。
