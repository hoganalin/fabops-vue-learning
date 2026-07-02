# FabOps Vue 面試展示稿

## 60 秒專案介紹

這是一個使用 Vue 3 製作的智慧工廠前端系統，情境設定在新竹製造業的產線管理。

這個專案涵蓋產線健康狀態、工廠警報、Lot 派工、Hold、Release、Complete、API loading/error/retry，以及可以透過網址分享的 Lot 篩選狀態。

我做這個專案的目的，不只是練 Vue 語法，而是把 Vue 放進一個接近真實產線的使用情境中，學會怎麼處理狀態、資料流、表單操作、路由同步和測試。

## 使用到的 Vue 技術

- 使用 Vue 3 Composition API 組織畫面邏輯
- 使用 `<script setup>` 簡化元件寫法
- 使用 TypeScript 定義產線資料型別
- 使用 Pinia 管理全站共用的工廠狀態
- 使用 props 和 emits 做父子元件溝通
- 使用 computed 計算衍生資料，例如篩選後的 Lot
- 使用 watch 把篩選條件同步到 URL query
- 使用 Vue Router 管理 Dashboard、Lots、Handoff 頁面
- 使用 composable 抽出可重用的 Lot 篩選邏輯
- 使用 `v-model` 處理派工表單輸入
- 使用 Vitest 測試 Lot 篩選邏輯

## Demo 流程

1. 先打開 Dashboard，說明這是產線管理首頁。
2. 說明 snapshot 狀態代表前端正在取得工廠資料。
3. 點擊 Simulate API Error，展示 API 錯誤狀態。
4. 點擊 Retry，展示錯誤後重新取得資料。
5. 進入 Lots 頁面，說明 Lot 是產線中的一批生產批次。
6. 使用 search、status、priority 篩選 Lot。
7. 選取一筆 Lot，說明右側詳細資料面板。
8. 對 pending Lot 執行 Dispatch，代表把 Lot 派到指定設備。
9. 對 Lot 執行 Hold、Release 或 Complete，說明這些是產線事件。
10. 展示 Recent Lot Actions，說明操作紀錄可以用於交接班。
11. 複製目前網址，說明 URL query 可以保存篩選條件，方便分享給其他工程師。
12. 最後執行 `npm run test` 和 `npm run build`，證明專案有測試且可以正式打包。

## 產線中的意義

在真實產線中，工程師和操作員需要快速知道目前哪些產線正常、哪些 Lot 需要處理、哪些警報已經被確認，以及哪些批次被派到哪台設備。

這個專案把這些流程轉成前端畫面：

- Lot 代表一批正在生產流程中的產品。
- Dispatch 代表把 Lot 派到某台設備進行加工。
- Hold 代表因為異常或疑慮，先暫停這批 Lot。
- Release 代表問題確認後，允許 Lot 繼續往下走。
- Complete 代表 Lot 完成目前這一道製程。
- Recent Lot Actions 代表操作紀錄，可以幫助交接班或追蹤責任。
- URL query 代表目前篩選狀態可以被保存和分享。

## 面試可以這樣說

我從 React 的學習背景出發，用這個專案練習 Vue 的資料流和元件設計。

這個專案不是靜態頁面，使用者操作會改變 Pinia store 裡的狀態，computed 會重新計算畫面資料，watch 會把篩選條件同步到網址，Vitest 則用來驗證核心篩選邏輯。

如果面試官問我 Vue 和 React 的差異，我會說：React 常用 `useState` 和 props 控制資料流，而 Vue 會透過 `ref`、`computed`、`watch` 和 template 自動追蹤響應式資料。這個專案讓我實際練到這些差異，而不是只背語法。
