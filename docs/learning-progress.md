# 學習進度交接（換電腦接續用）

最後更新：2026-07-12

## 新電腦環境建置

```bash
# 1. 裝 nvm(若無):curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
#    (裝完重開終端機;若提示找不到 profile,建立 ~/.zshrc 後重跑)
nvm install        # 讀 .nvmrc 自動裝 Node 24
npm install
npm run dev        # http://localhost:5173
npm run test       # 應為 9 passed
npm run build      # 應全綠
```

Git 身分記得設定(`git config --global user.name/user.email`,email 用 GitHub 綁定信箱)。
部署:Vercel CLI(`npx vercel login` 後 `npx vercel --prod`),正式站 https://fabops-vue-learning.vercel.app

## 已完成章節

1. 去除練習感(產品化文案) 2. Shift Handoff 頁 3. Work Orders + Prettier + 泛型 useStatusFilter
4. 測試(9 個)+ store 重構(applyLotTransition) 5. 元件拆分(DetailPanel/EventList/ActionPanel)+ utils
6. Vercel 部署 + README + 履歷 bullet 7B. StatusPill 上色/工具列降級/emits 實戰
8-1. hourlyOutput 資料管道 ✅
另:已導入根目錄 DESIGN.md(Linear 深色系統),全站 token 化,顏色不得寫死 hex。

## 進行中：第 8 章圖表(ECharts 六階梯教學)

計畫:每階一個概念、邊做邊學(階梯內容見 git log 或問 AI)。

- [x] 階梯 1:Hello Chart —— OutputTrendChart.vue 用寫死資料(A/B/C)畫出第一條線,已掛上 Dashboard
- [ ] 階梯 2:加 `points` prop,X 軸換成真實 8 個時間(filter+map hour)
- [ ] 階梯 3:series data 換成真實 output
- [ ] 階梯 4:加 `lines` prop,flatMap 畫兩條線,LINE_COLORS 用 #5e6ad2/#c56d2b(見 DESIGN.md)
- [ ] 階梯 5:每線加 target 虛線 + legend + tooltip(trigger:"axis")
- [ ] 階梯 6:抽 buildOption() + watch(props.points) 重畫 + onUnmounted dispose

## 圖表之後的待辦(投報率排序)

1. GitHub Actions CI(test+build workflow + README badge,約一小時)
2. 即時資料模擬(setInterval 更新 snapshot,Dashboard 變活的)
3. docs/polish-backlog.md 其餘項目
4. 模擬面試練習(docs/interview-qa.md 16 題)
