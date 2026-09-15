# 🌴 VICE CITY: Build Your Criminal Empire

> **An interactive Vice City-inspired character creation, empire building, and wanted poster platform powered by `@unlayer/react-image-editor`.**

Built for the **Unlayer "Build with React Image Editor" OSS Challenge** (`#BuiltWithImageEditor`).

---

## 🎮 Project Vision & User Journey

Rather than embedding an isolated image editor widget, **Vice City: Build Your Criminal Empire** weaves `@unlayer/react-image-editor` directly into a multi-step narrative journey:

```
LANDING → CHARACTER CREATOR → REACT IMAGE EDITOR → IDENTITY & ROLE → REPUTATION & STATS → EMPIRE & TERRITORY → CRIMINAL PROFILE CARD & WANTED POSTER → DOWNLOAD & SHARE
```

---

## ✨ Key Features

### 1. 🏝️ Cinematic Synthwave Landing
- Dark Vice City aesthetic, animated sun grid, retro neon glow typography, and toggleable Web Audio API sound synthesizer effects.

### 2. 👤 Character Creator & Deep Image Editor
- Upload custom photos or select Vice City character presets.
- **Deep `@unlayer/react-image-editor` Integration**: Perform cropping, drawing, sticker additions, text overlays, frames, and filters directly on your player portrait.
- **Style Filter Presets**: 🌴 Vice City Sunset, 🌃 Midnight Syndicate, 🔥 Neon Heist, 🏎️ Street Outlaw, 💎 Luxury Mogul.

### 3. 🪪 Identity, Alias & Specialization
- Customize Real Name, Underground Alias (e.g. `"The Ghost"`), Criminal Role (Street Racer, Hustler, Syndicate Mogul, Cyber Ghost, Outlaw Biker), Crew affiliation, and Personal Motto.

### 4. ⭐ Dynamic Reputation & Stat System
- Interactive scenario decision choices (Bank Heists, Drag Races, Nightclub Buyouts) that dynamically compute:
  - **Street Reputation** (0-100)
  - **Money & Cash Flow** (0-100)
  - **Syndicate Influence** (0-100)
  - **VCPD Risk Level** (0-100)

### 5. 🏙️ Build Your Vice Empire
- **Interactive Territory Map**: Claim Downtown Vice, Ocean Beach, Port Gellhorn, Star Island Marina, or Little Haiti Outskirts.
- **Headquarters Property**: Malibu Neon Club, Chop Shop Garage, Waterfront Villa, Marina Slip, or Cyber Vault.
- **Getaway Vehicle**: Exotic GT Supercar, Superbike, Speedboat, or Classic Muscle.

### 6. 🎨 Dual Generated Visual Cards
- **Card 1: Official Vice City Criminal Empire Profile Card** (displaying passport ID, edited avatar, stats, territory, motto, and watermark).
- **Card 2: VCPD Most Wanted Poster** (with customizable bounty reward $, star rating 1-5, and a **2nd standalone `@unlayer/react-image-editor` pass** for poster mugshots).

### 7. 📱 High-Res Download & Social Sharing
- Export cards cleanly as **PNG or JPEG** images via `html-to-image`.
- Confetti celebration burst.
- One-click Twitter/X sharing pre-filled with `#BuiltWithImageEditor`.

---

## 🚀 Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Core Library**: `@unlayer/react-image-editor`
- **Styling**: Tailwind CSS, Custom Neon Glow Utilities, Glassmorphism CSS
- **Icons**: Lucide React
- **Export & Effects**: `html-to-image`, `canvas-confetti`, Web Audio API sound synthesizer
- **Deployment**: Vercel / Netlify / GitHub Pages

---

## 🛠️ Quick Start & Local Setup

### 1. Clone the repository:
```bash
git clone https://github.com/surjeetkumar8006/gta-vi-identity-studio.git
cd gta-vi-identity-studio
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start development server:
```bash
npm run dev
```

### 4. Build for production:
```bash
npm run build
```

---

## 🏆 Unlayer Challenge Submission

- **Repository**: [https://github.com/surjeetkumar8006/gta-vi-identity-studio](https://github.com/surjeetkumar8006/gta-vi-identity-studio)
- **Hashtag**: `#BuiltWithImageEditor`
- **Official Editor Docs**: [https://github.com/unlayer/react-image-editor](https://github.com/unlayer/react-image-editor)
