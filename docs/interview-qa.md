# FabOps Vue 面試問答題庫

## 1. 你為什麼做這個專案？

我想用一個接近真實工作的情境來學 Vue，而不是只做待辦清單或靜態頁面。

這個專案模擬新竹製造業的智慧工廠前端系統，包含產線狀態、工廠警報、Lot 派工、Hold、Release、Complete、API loading/error/retry、URL 篩選同步和測試。

這讓我可以練到 Vue 在真實專案裡常見的資料流和狀態管理。

## 2. 這個專案的核心資料流是什麼？

資料先從 `factoryApi.ts` 模擬 API 回來，進到 Pinia store。

頁面和元件會從 store 讀資料，使用者操作像是 dispatch、hold、release、complete，會呼叫 store action 更新狀態。

狀態更新後，Vue 的 computed 和 template 會自動反映到畫面。

可以簡單說成：

```txt
API → Pinia store → View → Component → User action → Store update → UI update
```

## 3. 為什麼要用 Pinia？

因為這個專案有很多跨頁面、跨元件會用到的狀態，例如：

- production lines
- factory alerts
- lots
- lot action events
- snapshot loading/error state

如果只用 component 自己的 `ref` 管理，資料會散在不同元件裡，很難追蹤。

Pinia 可以把全站共用狀態集中管理，讓資料來源更清楚，也比較接近真實前端專案。

## 4. computed 在這個專案裡做什麼？

`computed` 用來計算「由現有狀態推導出來的資料」。

例如 Lot 頁面的 `filteredLots`，它不是後端直接給的一份資料，而是根據：

- 原始 lots
- search
- statusFilter
- priorityFilter

即時計算出畫面應該顯示哪些 Lot。

在產線中，這代表操作員改變篩選條件後，畫面會自動顯示符合條件的 Lot。

## 5. watch 在這個專案裡做什麼？

`watch` 用來觀察某些狀態變化，然後執行副作用。

在這個專案裡，Lot 篩選條件改變時，`watch` 會把 search、status、priority 同步到 URL query。

這樣使用者可以複製網址給其他工程師，對方打開後會看到同樣的篩選狀態。

這在交接班、異常追蹤、跨團隊溝通時很實用。

## 6. 為什麼要把 Lot 篩選抽成 composable？

因為 Lot 篩選是商業邏輯，不應該全部塞在 `LotsView.vue` 裡。

抽成 `useLotFilters.ts` 後有三個好處：

- 畫面比較乾淨
- 邏輯可以被重用
- 邏輯可以被 Vitest 測試

這也代表我不是只把功能寫出來，而是有思考維護性。

## 7. props 和 emits 在這個專案裡解決什麼問題？

`props` 是父元件把資料傳給子元件。

`emits` 是子元件把使用者操作通知父元件。

例如 Lot 清單元件可以透過 props 接收 lots，當使用者選取某筆 Lot 時，再透過 emit 通知父層目前選到哪一筆。

這樣可以讓子元件專心負責畫面，父元件負責狀態管理。

## 8. Dispatch 在產線中代表什麼？

Dispatch 代表把某一批 Lot 派到指定設備加工。

例如一批 Lot 目前是 pending，代表還在等待處理。

當工程師或系統把它 dispatch 到某台設備後，這批 Lot 就會進入 running 狀態，並記錄被派到哪台 equipment。

在真實產線中，這可能會連到 MES 派工系統或設備排程系統。

## 9. Hold、Release、Complete 分別代表什麼？

Hold 代表這批 Lot 有疑慮，需要先暫停，例如設備異常、品質疑慮、Recipe 錯誤或量測結果異常。

Release 代表問題確認後，允許這批 Lot 繼續往下走。

Complete 代表這批 Lot 完成目前這一道製程。

這些操作都會產生 action event，方便後續追蹤和交接班。

## 10. 為什麼要做 Recent Lot Actions？

因為在產線中，狀態改變本身還不夠，還需要知道是誰在什麼時間做了什麼操作。

Recent Lot Actions 可以呈現最近的 dispatch、hold、release、complete 事件。

這對交接班、異常追蹤、責任釐清都很重要。

## 11. 為什麼要做 API loading/error/retry？

真實系統不可能永遠成功拿到資料。

API 可能會慢、失敗或暫時不可用。

所以前端需要清楚處理：

- loading：資料正在取得
- error：取得失敗
- retry：允許使用者重新嘗試

這能讓畫面在後端不穩時仍然可用，而不是直接壞掉。

## 12. 為什麼要把篩選條件放到 URL query？

因為篩選狀態如果只存在畫面裡，重新整理或分享網址後就會消失。

把 search、status、priority 放到 URL query 後，狀態就可以被保存和分享。

例如：

```txt
/lots?priority=rocket&search=PM40
```

這代表目前正在看 priority 是 rocket，且搜尋 PM40 的 Lot。

## 13. 你寫測試測了什麼？

我用 Vitest 測試 `useLotFilters.ts`。

目前測試三個情境：

- search keyword 是否能正確篩選 Lot
- status 是否能正確篩選 Lot
- priority 是否能正確篩選 Lot

這些是 Lot 頁面的核心商業邏輯，所以適合先寫測試保護。

## 14. Vue 和 React 對你來說最大的差異是什麼？

React 常用 `useState`、props 和重新 render 的概念來管理畫面。

Vue 則是透過 `ref`、`computed`、`watch` 和 template 自動追蹤響應式資料。

我覺得 Vue 在表單、computed derived state、template 綁定上很直覺，尤其適合這種資料狀態很多的後台系統。

## 15. 如果這個專案要接真實後端，你會怎麼做？

我會先把 `factoryApi.ts` 裡的 mock data 換成真正的 API request。

然後保留目前 Pinia store、views、components 的資料流。

這樣畫面層不用大改，只要讓 API 層回傳符合 `types/factory.ts` 定義的資料即可。

如果資料格式和真實 API 不一樣，我會在 API layer 做轉換，避免畫面直接依賴後端原始格式。

## 16. 你會怎麼繼續改善這個專案？

我會優先補三個方向：

- 增加更多測試，例如 store actions 和 dispatch form validation
- 加入真實 API 或 mock service worker，讓資料流更接近正式專案
- 增加權限角色，例如 operator、engineer、shift lead，不同角色可以做不同操作

這些改善會讓專案更接近真實產線系統。
