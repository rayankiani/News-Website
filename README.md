# RAK News — Truth · Speed · Integrity

RAK News is a modern, dark-themed news website UI built with **HTML, CSS, and vanilla JavaScript**. It delivers an editorial-style experience with smooth scrolling, animated sections, and interactive components across the site.

> **Note:** This repository contains the frontend UI (no backend). All content shown on pages is sample/demo content.

---

## ✨ Features

- **Responsive layout** with a clean magazine-style grid
- **Category navigation** (World, Politics, Business, Tech, Culture, etc.)
- **Breaking news ticker** with marquee animation
- **Masthead + sticky navigation** for an always-accessible menu
- **Home page hero** with parallax-like scroll animation
- **Animated section reveals** using **GSAP** (+ optional **SplitText**)
- **Scroll-triggered card animations** for cards, opinion blocks, team cards, and videos
- **Reading progress bar** at the top of the page
- **Back to top** button that appears after scrolling
- **FAQ accordion** (expand/collapse)
- **Forms** wired to a friendly “Thank you” UI (no network request; default submit prevented)
- **Category page “Load more”** demo that appends new cards dynamically

---

## 🧰 Tech Stack

- **Frontend:**
  - HTML
  - CSS
  - Vanilla JavaScript
- **Animations / UX libraries (CDN):**
  - **Lenis** (smooth scrolling)
  - **GSAP** (animations)
  - **ScrollTrigger** (scroll-based triggers)
  - **SplitText** (word-based reveal — used when available)

---

## 📁 Project Structure (Key Files)

- `index.html` — Home page (ticker, hero, latest cards, trending, opinion, watch, footer)
- `about.html` — About/mission, values, editorial team, stats, FAQ, contact form
- `main.js` — All frontend interactions + animations
- `style.css` — Complete site styling (themes, layout, responsiveness)
- Additional pages:
  - `world.html`, `politics.html`, `business.html`, `tech.html`, `culture.html`, `opinion.html`, `category.html`, `article.html`

---

## ▶️ How to Run

Because this is a static frontend project, you can run it by simply opening the HTML files in your browser.

### Option A: Open directly
1. Double-click `index.html`
2. Use the navigation links to explore other pages

### Option B: Use a local static server (recommended)
1. Start any static server in the project folder (example: VS Code Live Server)
2. Open `index.html`

---

## 🧩 JavaScript Behaviors (main.js)

`main.js` controls:

- Lenis smooth scrolling (if available)
- GSAP/ScrollTrigger setup
- Progress bar updates while scrolling
- Back-to-top visibility + smooth scrolling
- Mobile hamburger menu toggle
- Live date rendering in the masthead
- Homepage load animation timeline
- Hero scroll parallax effect
- SplitText-based heading reveal animations (falls back gracefully)
- ScrollTrigger batch reveals for cards
- Trending sidebar animation
- About-page stats counter animation
- FAQ accordion interactions
- Article page share bar fade in on scroll
- Card generation for category “Load more”
- Preventing real form submissions (UI confirmation message instead)

---

## 📌 Customization Ideas

You can extend this UI by adding:

- Real article data (API / JSON)
- Search functionality (currently UI only)
- Dynamic rendering per category
- A backend for newsletter/contact submissions
- Image assets instead of placeholder gradients/unsplash backgrounds

---

## 🤝 Credits

Design is inspired by modern editorial websites. Animations use GSAP ecosystem via CDN.

---

## 📄 License

Add your preferred license (e.g., MIT/Apache-2.0).
