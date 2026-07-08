# FabOps Console

**Live Demo：https://fabops-vue-learning.vercel.app**

FabOps Console 是一個用 Vue 3 打造的智慧工廠產線管理系統，情境設定在新竹製造業的產線現場。

系統涵蓋產線狀態監控、工廠警報、Lot 管理、派工、Hold/Release/Complete 產線事件、API loading/error/retry 處理，以及可透過網址分享的篩選狀態，完整呈現真實產線前端的資料流。

## 專案亮點

- Dashboard 顯示產線健康狀態與工廠 snapshot
- Factory alerts 支援警報確認
- Lots 頁面支援搜尋、狀態篩選、優先等級篩選
- Lot detail panel 顯示批次詳細資料
- Dispatch workflow 可把 Lot 派到指定設備
- Hold、Release、Complete 模擬產線事件
- Shift Handoff 交接班報告：表單 + 現場狀態快照 + 歷史紀錄
- Work Orders 工單列表與狀態篩選（泛型 filter composable）
- Recent Lot Actions 保留操作紀錄，方便交接班
- 模擬 API loading、error、retry 狀態
- Lot 篩選條件同步到 URL query，方便分享狀態
- Vitest 測試：篩選 composable 與 Pinia store 商業邏輯（9 tests）

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

## 技術架構

```txt
src/
├── api/          模擬 MES API（延遲、錯誤注入、snapshot）
├── stores/       Pinia store：產線、警報、Lot、工單、交接班（含測試）
├── composables/  可重用邏輯：useLotFilters、泛型 useStatusFilter（含測試）
├── components/   展示型元件（props in / emits out，不直接存取 store）
├── views/        頁面層：Dashboard、Lots、Work Orders、Handoff
├── router/       Vue Router（lazy-loaded routes）
├── utils/        純函式工具（日期格式化）
└── types/        TypeScript 型別定義
```

資料流：`API → Pinia store → View → Component → User action → Store update → UI update`

- 元件只透過 props/emits 溝通，跨頁狀態集中在 Pinia store。
- Lot 狀態轉換（hold/release/complete/dispatch）收斂在單一 transition helper，行為由測試保護。
- 篩選邏輯抽成泛型 composable（`useStatusFilter<T extends { status: string }>`），Lots 與 Work Orders 共用。
- 篩選條件透過 watch 同步到 URL query，重新整理與分享連結都能還原狀態。
- 以 Vercel 持續部署，push 到 master 即自動上線。

## 更多文件

- [專案架構說明](docs/project-architecture.md)
- [部署指南](docs/deployment-guide.md)
