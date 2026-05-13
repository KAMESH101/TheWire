# 📰 TheWire — Internship-Ready News App

> Live, independent, global news — built with React and powered by the GNews API.

![TheWire](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Ready-C0392B?style=flat-square)
![GNews](https://img.shields.io/badge/API-GNews.io-orange?style=flat-square)

---

## 🚀 Live Features

| Feature | Description |
|---------|-------------|
| 🌗 **Dark / Light Mode** | System-aware theme toggle, persisted to localStorage |
| 🪟 **Article Modal** | Full-screen preview with scroll lock and focus trap |
| 📝 **Auto Summarizer** | Extractive summarization — pure JS, no API needed |
| 📊 **Readability Stats** | Flesch-Kincaid score, read time, word count per article |
| 🔥 **Trending Topics** | Live word-frequency bar extracted from current headlines |
| 📖 **Reading History** | localStorage-persisted history with ✓ Read badges |
| ♾️ **Load More** | Paginated fetch — appends without replacing existing articles |
| 🔗 **Share Button** | Native share sheet on mobile, clipboard copy on desktop |
| ⌨️ **Keyboard Shortcuts** | Full shortcut set for power users (press `?` to see them) |
| 📱 **PWA** | Installable app with offline service worker caching |

---

## 🗂 Project Structure

```
src/
├── services/
│   └── newsApi.js            ← GNews API calls + mock fallback
├── context/
│   └── NewsContext.js        ← Global state (articles, bookmarks, category)
├── hooks/
│   ├── useDebounce.js        ← 500ms debounce for search
│   ├── useReadingHistory.js  ← Reading history (localStorage, max 20)
│   └── useShare.js           ← Native share + clipboard fallback
├── utils/
│   ├── helpers.js            ← timeAgo(), PLACEHOLDER_IMG
│   ├── summarizer.js         ← Extractive summarization algorithm
│   ├── readability.js        ← Flesch-Kincaid + read time
│   └── trending.js           ← Word frequency extractor
├── components/
│   ├── layout/
│   │   ├── Navbar.js         ← Sticky header, theme toggle, nav buttons
│   │   └── CategoryTabs.js   ← 7-category tab switcher
│   ├── cards/
│   │   ├── HeroCard.js       ← Featured full-width article
│   │   └── ArticleCard.js    ← Grid article card
│   └── ui/
│       ├── ArticleModal.js   ← Full article preview modal
│       ├── ArticleSummary.js ← Inline summarizer component
│       ├── TrendingBar.js    ← Clickable trending topic pills
│       ├── SkeletonCard.js   ← Shimmer loading states
│       ├── ErrorBanner.js    ← Error display with retry
│       ├── EmptyState.js     ← Empty results UI
│       ├── Toast.js          ← Share confirmation toast
│       ├── InstallBanner.js  ← PWA install prompt
│       └── ShortcutsModal.js ← Keyboard shortcuts reference
├── pages/
│   ├── HomePage.js           ← Hero + grid + trending + pagination
│   ├── BookmarksPage.js      ← Saved articles
│   └── HistoryPage.js        ← Reading history
├── App.js                    ← Root layout, keyboard shortcuts, all state
├── index.js                  ← React entry + service worker registration
└── index.css                 ← Design tokens, dark/light themes, animations
public/
├── index.html                ← PWA meta + manifest link
├── manifest.json             ← PWA manifest
└── sw.js                     ← Service worker (cache-first strategy)
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `S` or `/` | Focus search input |
| `B` | Toggle Bookmarks page |
| `H` | Toggle History page |
| `Escape` | Close modal / clear search |
| `1` – `7` | Switch category tab by number |
| `?` | Open shortcuts panel |

---

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/KAMESH101/TheWire.git
cd TheWire
```

### 2. Get a free API key
Sign up at **https://gnews.io** — free tier gives **100 requests/day**.

### 3. Set your API key
Create a `.env` file in the project root:
```env
REACT_APP_GNEWS_API_KEY=your_key_here
```

### 4. Install & run
```bash
npm install
npm start
```

App opens at **http://localhost:3000**

---

## 🎨 Design System

| Token | Dark | Light |
|-------|------|-------|
| `--bg` | `#080808` | `#F8F5F0` |
| `--surface` | `#111111` | `#FFFFFF` |
| `--border` | `#1e1e1e` | `#E0D9D0` |
| `--text-primary` | `#F0EBE1` | `#1A1A1A` |
| `--text-muted` | `#888880` | `#666660` |
| `--accent` | `#C0392B` | `#C0392B` |
| `--font-display` | Playfair Display | |
| `--font-sans` | Source Sans 3 | |

---

## 🧠 Algorithm Details

### Extractive Summarizer (`src/utils/summarizer.js`)
Scores each sentence by:
- **Word frequency** — common words across all sentences rank higher
- **Position** — first sentence gets a 2× position bonus
- **Title overlap** — sentences sharing keywords with the headline score higher

Top 2 sentences are selected and returned in original order.

### Readability Meter (`src/utils/readability.js`)
Implements the **Flesch Reading Ease** formula:
```
score = 206.835 − (1.015 × words/sentences) − (84.6 × syllables/words)
```
- **≥ 70** → Easy  |  **50–70** → Medium  |  **< 50** → Hard

### Trending Topics (`src/utils/trending.js`)
Tokenizes all article titles, filters 40+ stop words, counts frequency, returns top 8 words as clickable search pills.

---

## 📱 PWA

TheWire is a fully installable Progressive Web App:
- **Manifest** — configured for standalone display with accent red theme color
- **Service Worker** — cache-first for app shell, network-first for page assets
- **Install Banner** — appears automatically when the browser fires `beforeinstallprompt`
- **Offline** — cached articles remain accessible without network

---

## 🔑 API

All API logic is isolated in `src/services/newsApi.js`. To switch providers (e.g. NewsData.io, NewsAPI.org), only that file needs to change.

```env
REACT_APP_GNEWS_API_KEY=your_key_here
```

> **Note:** The app gracefully falls back to 6 mock articles if the API key is missing or the request fails.

---

## 📦 Tech Stack

- **React 18** — functional components, hooks only
- **Context API** — global state (no Redux)
- **Vanilla CSS** — design tokens via CSS custom properties
- **GNews API** — 100 free req/day
- **localStorage** — bookmarks, reading history, theme preference
- **PWA** — manifest + service worker

---

## 🪪 License

MIT — free to use, modify, and distribute.
