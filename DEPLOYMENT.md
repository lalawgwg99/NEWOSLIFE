# LifeOS Audit - 部署指南

## 📦 專案資訊
- **版本**: 7.0
- **框架**: React + Vite + Tailwind CSS
- **AI 模型**: NVIDIA LLaMA 3.1 405B
- **部署平台**: Cloudflare Pages (推薦)

---

## 🚀 快速部署到 Cloudflare Pages

### 步驟 1: Build 專案
```bash
npm run build
```
成功後會在 `dist/` 資料夾產生可部署檔案。

### 步驟 2: 設定 Cloudflare Pages
1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Pages** → **Create a project**
3. 連結你的 GitHub Repository 或直接上傳 `dist/` 資料夾

### 步驟 3: Build 設定
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`

### 步驟 4: 環境變數
在 Cloudflare Pages 設定中新增：
```
VITE_NVIDIA_API_KEY=你的_NVIDIA_API_金鑰
```

### 步驟 5: 自訂網域（可選）
- 在 **Custom domains** 新增你的網域
- 更新 `index.html` 中的 `canonical` 與 OG 網址

---

## ✅ SEO 檢查清單

部署後請確認：
- [ ] `/robots.txt` 可訪問
- [ ] `/sitemap.xml` 可訪問
- [ ] `/og-image.png` 正確顯示
- [ ] 社群分享預覽正常（使用 [Open Graph Debugger](https://www.opengraph.xyz/)）
- [ ] Google Search Console 提交 Sitemap

---

## 🔧 本地開發
```bash
npm run dev   # 啟動開發伺服器 (http://localhost:5173)
npm run build # 建立生產版本
npm run preview # 預覽生產版本
```

---

## 📝 更新 Canonical URL
部署後記得更新 `index.html` 中的以下網址：
```html
<link rel="canonical" href="https://你的網域.com/" />
<meta property="og:url" content="https://你的網域.com/" />
<meta property="og:image" content="https://你的網域.com/og-image.png" />
<!-- 以及 Twitter Card 和 sitemap.xml 中的網址 -->
```

---

## 🎯 效能優化建議
1. Cloudflare Pages 自動提供 CDN 加速
2. 圖片已壓縮並優化（OG Image, Favicon）
3. Vite 自動處理 Code Splitting
4. Tailwind CSS 自動 PurgeCSS

---

## 📊 監控與分析（推薦）
- **Google Analytics 4**: 追蹤用戶行為
- **Google Search Console**: 監控搜尋表現
- **Cloudflare Analytics**: 內建流量分析

---

**部署完成後，你的 LifeOS Audit 就可以正式上線了！** 🎉
