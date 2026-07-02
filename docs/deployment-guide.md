# FabOps Vue 部署指南

## 這章要學什麼

第 28 章的目標是讓這個 Vue 專案可以被正式展示。

目前你可以在本機看到：

```txt
http://127.0.0.1:5174/
```

但面試官不會在你的電腦上操作，所以真正展示作品時，最好部署成公開網址。

## Vue 專案部署前要知道的事

這個專案是 Vite + Vue。

部署前會先跑：

```bash
npm run build
```

這個指令會產生：

```txt
dist/
```

`dist` 裡面的檔案就是正式上線會用到的靜態網站。

## 建議部署平台

可以選其中一個：

- Vercel
- Netlify
- GitHub Pages

如果只是面試作品，我最建議 Vercel 或 Netlify，因為它們對 Vite 專案支援很好，設定也簡單。

## Vercel 設定

如果使用 Vercel，設定通常是：

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Netlify 設定

如果使用 Netlify，設定通常是：

```txt
Build command: npm run build
Publish directory: dist
```

## 部署前檢查

部署前一定要確認：

```bash
npm run test
npm run build
```

兩個都通過後，再部署。

## 為什麼不是只跑 npm run dev？

`npm run dev` 是開發模式，適合你邊寫邊看。

`npm run build` 是正式打包，會檢查 TypeScript、Vue template、import 路徑和正式輸出。

面試展示應該用 build 後的版本，因為這代表專案真的能被部署。

## 如果部署後重新整理 /lots 變 404

這是 SPA routing 常見問題。

Vue Router 在前端處理 `/lots`、`/handoff` 這些路由。

如果部署平台沒有把所有路徑導回 `index.html`，重新整理頁面時可能會出現 404。

Vercel 和 Netlify 通常可以透過 rewrite 設定解決。

這個專案目前用的是 Vite + Vue Router，正式部署時需要確認 SPA fallback。

## 這個專案已經補好的部署設定

因為這個專案使用 `createWebHistory()`，所以我補了兩個設定：

- `vercel.json`：給 Vercel 使用，讓所有路徑都回到首頁。
- `public/_redirects`：給 Netlify 使用，build 後會被複製到 `dist/_redirects`。

這兩個設定的目的都是處理同一件事：

```txt
使用者直接打開 /lots 或重新整理 /handoff 時，不會變成 404。
```

## 面試說法

我知道 Vue/Vite 專案在部署前需要跑 `npm run build`，產生 `dist` 靜態檔案。部署平台只需要執行 build command，然後把 `dist` 當作 output directory。

如果使用 Vue Router 的 history mode，部署時還需要注意 SPA fallback，避免使用者重新整理 `/lots` 或 `/handoff` 時出現 404。
