<div align="center">
  <a href="https://developer.ericgitangu.com">
    <img src="https://developer.ericgitangu.com/_next/image?url=%2Ffavicon.png&w=96&q=75" style="border-radius: 50%" alt="deveric.io logo"/>
    <h1 align="center">Eric Gitangu — deveric</h1>
  </a>
</div>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-00C16E?logo=redis&logoColor=white)](https://upstash.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Contentlayer](https://img.shields.io/badge/Contentlayer-MDX-8B5CF6)](https://www.contentlayer.dev)
[![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-black?logo=vercel)](https://vercel.com/analytics)
[![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8)](https://developer.ericgitangu.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

My personal website, built with [Next.js 13](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Upstash Redis](https://upstash.com?ref=deveric.io), [Contentlayer](https://www.contentlayer.dev/) and deployed to [Vercel](https://vercel.com/).

---

## Features

- ⚡️ Next.js 13 App Router
- 🎨 Tailwind CSS for styling
- 📈 Upstash Redis for view counting
- 📝 MDX for content management via Contentlayer
- 🎭 Framer Motion animations
- 📊 Vercel Analytics integration
- 🌓 Dark mode optimized
- 📱 Responsive design
- 🔍 SEO optimized with meta tags
- 🔗 Social media integration
- 📄 Blog support
- 🖼️ Project showcase
- 📊 Page view counter
- 🎨 Custom animations
- 🔒 TypeScript support
- 📃 Resume request support
- 🕺 Fun zone with an interactive snake game with stats and Redis leaderboard
- 💡 Development tips fetched async & randomly, with auto-update
- 🪪 Virtual business card — QR code, vCard/VCF download, WhatsApp link
- 🎓 Certifications carousel — 79 certs, 9 authorities, 10 domains
- 📲 PWA — installable on iOS and Android

---

## Technical highlights

### Projects — Contentlayer + Redis view counting

MDX project files processed by Contentlayer at build time into typed `Project` objects. Each project page increments a view counter in Upstash Redis (`INCR`) server-side on load. Content is static; only the counter is dynamic.

### Certifications — 79 certs, 9 authorities, 10 domains

`app/certifications/data.ts` (803 lines): 79 certifications from Meta (20), LinkedIn Learning (39), Coursera (12), Duke University, DeepLearning.AI, HackerRank, Udemy, SoloLearn, HackerX. Domains: Backend, Frontend, Mobile, Data Science, Blockchain, Security, DevOps, Languages, AI/ML, Fundamentals. Rendered in a client-side filtered `CertificationCarousel` — no server round-trip for domain switching.

### Virtual business card — vCard/ICS + QR code

`BusinessCardPanel.tsx` (373 lines): VCF served at `/eric-gitangu.vcf` (importable by iOS Contacts, Android, Outlook, macOS Contacts). QR code generated client-side via `qrcode.react` pointing to the VCF URL. WhatsApp deep-link QR. Fixed left-edge tab on desktop, floating bottom-left pill on mobile.

### Snake game — canvas, swipe, haptic feedback, Redis leaderboard

`SnakeGame.tsx` (383 lines): canvas rendering with a 20px grid, responsive sizing (300–400px), keyboard arrows + `react-swipeable` for mobile, speed curve 200ms → 50ms floor, Vibration API haptics via `useHaptics`, `ZADD` to Upstash Redis sorted set `snake:leaderboard` on game over, top-10 leaderboard rendered alongside the game.

### Fun zone

Snake game + `TipFetcher` (random dev tip from edge route handler, auto-refreshes every 30s) + `Particles` (canvas particle system, zero library dependencies).

### PWA

`PWAInstallPrompt` hooks the `beforeinstallprompt` browser event for a custom install prompt. `manifest.json` generated at build. Installable on iOS (Add to Home Screen) and Android.

### SEO and structured data

`app/lib/structured-data.ts`: Schema.org JSON-LD for `Person`, `WebSite`, `ProfilePage`, `BreadcrumbList`, `ItemList`, `AboutPage`. Per-page `generateMetadata` for og/twitter tags — no third-party SEO library.

---

## Tech Stack

- **Framework:** Next.js 13 App Router
- **Styling:** Tailwind CSS
- **Content:** MDX + Contentlayer
- **Database:** Upstash Redis
- **Analytics:** Vercel Analytics
- **Deployment:** Vercel
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **QR code:** qrcode.react
- **Mobile input:** react-swipeable
- **Markdown:** Rehype + Remark plugins
- **Code Formatting:** Rome
- **Font:** Inter (Google Fonts) + CalSans

---

## My spiel

I'm a seasoned software engineering leader with over 11 years of experience. I specialize in architecting scalable systems, driving technical strategy, and building high-performing engineering teams.

### Professional Expertise

- 🎯 Technical Leadership & Strategy
- 🛡️ AI/ML Security Solutions
- 🏗️ Scalable System Architecture
- 👥 Team Building & Mentorship
- 🚀 Product Development Lifecycle

### Technical Proficiency

- **Languages:** Python, Java, Golang, React, C++, JavaScript, Solidity, TypeScript, Rust
- **Cloud & Infrastructure:** AWS, Google Cloud, Azure
- **Data & Analytics:** Big Data, Google BigQuery
- **Blockchain:** Smart Contracts, DApps
- **DevOps:** Kubernetes, CI/CD, Docker

### Notable Achievements

- 🎓 Microsoft Scholarship Recipient (2012–2013)
- 🏆 Google Scholarship Recipient (2011–2012)
- 📚 Dean's List — University of Massachusetts Lowell

---

## Connect

- 📧 [Email](mailto:developer.ericgitangu@gmail.com)
- 🔗 [LinkedIn](https://www.linkedin.com/in/ericgitangu)
- 🌐 [Portfolio](https://developer.ericgitangu.com)
- 📝 [Blog](https://blog.ericgitangu.com)

---

## Local development

```bash
pnpm install
pnpm dev
```

Requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in `.env.local`.
