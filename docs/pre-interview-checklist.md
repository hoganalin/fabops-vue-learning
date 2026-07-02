# FabOps Vue 面試前 10 分鐘快速複習清單

## 1. 一句話介紹專案

這是一個用 Vue 3 和 TypeScript 製作的智慧工廠前端系統，情境設定在新竹製造業的產線管理，功能包含產線狀態、Lot 管理、派工、Hold/Release/Complete、API loading/error/retry、URL 篩選同步和測試。

## 2. 這個專案最重要的價值

這不是靜態頁面，而是一個有完整資料流的 Vue 專案。

使用者操作會改變 Pinia store，computed 會重新計算畫面資料，watch 會同步 URL query，Vitest 會驗證核心篩選邏輯。

## 3. Demo 順序

1. 打開 Dashboard，說明這是產線管理首頁。
2. 展示 snapshot 狀態。
3. 點擊 Simulate API Error。
4. 點擊 Retry。
5. 進入 Lots 頁面。
6. 使用 search、status、priority 篩選 Lot。
7. 選取一筆 Lot，看詳細資料。
8. Dispatch 一筆 pending Lot。
9. 對 Lot 執行 Hold、Release 或 Complete。
10. 展示 Recent Lot Actions。
11. 複製 URL，說明篩選條件可以分享。
12. 執行 `npm run test` 和 `npm run build`。

## 4. Vue 技術重點

- `ref`：保存會變動的狀態，例如搜尋文字、目前選到的 Lot。
- `computed`：根據現有狀態算出衍生資料，例如 `filteredLots`。
- `watch`：觀察狀態變化並做副作用，例如同步 URL query。
- `props`：父元件把資料傳給子元件。
- `emits`：子元件把使用者操作通知父元件。
- Pinia：集中管理跨頁面、跨元件共用的工廠狀態。
- Vue Router：管理頁面與 URL。
- composable：把可重用邏輯抽出，例如 `useLotFilters`。
- Vitest：測試核心商業邏輯。

## 5. 專案資料流

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
Store actions
  ↓
computed/template updates UI
```

## 6. 產線名詞

- Lot：一批正在製程中移動的產品。
- Dispatch：把 Lot 派到指定設備加工。
- Hold：因為異常或疑慮，先暫停 Lot。
- Release：問題確認後，允許 Lot 繼續往下走。
- Complete：Lot 完成目前這一道製程。
- Recent Lot Actions：操作紀錄，可用於交接班和追蹤責任。

## 7. 如果面試官問為什麼用 Pinia

可以回答：

因為這個專案有很多跨頁面共用狀態，例如 lines、alerts、lots、lot action events 和 API snapshot 狀態。Pinia 可以讓資料集中管理，避免狀態散落在不同元件中，也讓使用者操作後的資料更新流程更清楚。

## 8. 如果面試官問為什麼用 computed

可以回答：

`filteredLots` 是根據 lots、search、statusFilter、priorityFilter 推導出來的資料，不應該手動存一份新的陣列。用 computed 可以讓 Vue 自動追蹤依賴，只要搜尋或篩選條件改變，畫面就會自動更新。

## 9. 如果面試官問為什麼用 watch

可以回答：

我用 watch 觀察 Lot 篩選條件，當 search、status 或 priority 改變時，把它們同步到 URL query。這樣篩選狀態可以被保存和分享，符合產線交接班或工程師協作的情境。

## 10. 如果面試官問為什麼要寫測試

可以回答：

Lot 篩選是這個系統的核心商業邏輯。如果篩選錯了，操作員可能會看到錯的 Lot，甚至對錯的批次做派工或 Hold。因此我把篩選邏輯抽成 `useLotFilters`，並用 Vitest 測試 search、status、priority 三種情境。

## 11. Vue 和 React 差異回答

可以回答：

我原本從 React 學起，React 常用 `useState`、props 和重新 render 的概念管理畫面。Vue 則透過 `ref`、`computed`、`watch` 和 template 自動追蹤響應式資料。這個專案讓我實際練到 Vue 的直覺資料流，而不是只背語法。

## 12. 最後收尾說法

可以回答：

這個專案讓我從 React 背景轉到 Vue，並且透過真實產線情境練習狀態管理、表單流程、API 狀態、路由同步、元件溝通和測試。我現在不只知道 Vue 語法，也能說明 Vue 在一個前端系統裡如何組織資料流。
