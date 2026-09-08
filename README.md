# 變形機甲學園 — 手機安裝版（PWA）

這個資料夾就是完整的遊戲。沒有伺服器、沒有帳號、沒有付費項目。

**已經上線的網址：https://pupulan.github.io/mecha-academy/**
手機直接打開就能玩，也可以照下面「在手機上安裝」的步驟加到主畫面。
這個資料夾是同一份原始檔，給你自己改內容或搬到別的空間用。

## 先在電腦試玩
直接用瀏覽器打開 `index.html` 就能玩（離線安裝功能要放上網之後才會啟用）。

## 放上網（三選一，都免費）

### A. GitHub Pages（推薦，網址永久）
1. 到 github.com 建一個新的 repository（例如 `mecha-academy`），設為 Public。
2. 把這個資料夾裡的所有檔案上傳（網頁上 Add file → Upload files 也可以）。
3. Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main` / `(root)` → Save。
4. 一兩分鐘後網址會是 `https://<你的帳號>.github.io/mecha-academy/`。

### B. Netlify Drop
1. 打開 https://app.netlify.com/drop（要免費註冊）。
2. 把整個資料夾拖進去，馬上得到一個 `xxx.netlify.app` 網址。

### C. Cloudflare Pages
1. https://pages.cloudflare.com → Create → Upload assets。
2. 上傳資料夾，得到 `xxx.pages.dev` 網址。

## 在手機上「安裝」
- **iPhone / iPad（Safari）**：打開網址 → 下方「分享」按鈕 → 「加入主畫面」。之後從主畫面開啟就是全螢幕 App，離線也能玩。
- **Android（Chrome）**：打開網址 → 右上角「⋮」→ 「安裝應用程式」或「加到主畫面」。

## 想要真正的 APK 安裝檔（Android）
1. 先完成上面的「放上網」。
2. 打開 https://www.pwabuilder.com ，貼上你的網址 → Package for stores → Android。
3. 下載 zip，裡面有 `.apk`（可直接傳到手機安裝，需允許「未知來源」）以及上架 Google Play 用的 `.aab`。

iPhone 沒有免費的安裝檔路徑：要上架 App Store 必須有 Apple 開發者帳號（每年 99 美元）。用 Safari「加入主畫面」是 iPhone 上免費且效果相同的做法。

## 更新遊戲
改完 `index.html` 之後，把 `sw.js` 第一行的 `VERSION` 改成新的字串（例如 `v2.0.1`），再重新上傳，手機端下次打開就會拿到新版本。

## 目前內容規模
- 靜態題庫 425 題：國語、自然常識、地理歷史，各分 3–4 歲／5–6 歲／7–9 歲／10–12 歲四級。
- 數學是程式即時出題，數字每次都不同，等於出不完。
- 五台可收藏的機甲，每台在「收藏庫」裡都可以自由變形來回。

## 注意
- 朗讀用的是手機內建的中文語音。iPhone 第一次進入題目要先按一下題目旁的 🔊 才會出聲。
- 進度存在該手機的瀏覽器裡，不會跨裝置同步。
- 遊戲裡的機甲是原創繪製，不是玩具上的變形金剛角色形象；若要公開發行或商用請維持這一點。
