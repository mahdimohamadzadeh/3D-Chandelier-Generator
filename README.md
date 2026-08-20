<div align="center">
  <h1>✦ Luster 3D Studio</h1>
  <p><strong>Next-Generation Custom 3D Chandelier Configurator & Atelier Catalog</strong></p>

  <p>
    <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue.js"></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
    <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-0.160-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge" alt="License"></a>
  </p>
</div>

---

## 🌟 Overview

**Luster 3D** is an open-source, WebGL-powered interactive 3D chandelier generator and custom lighting studio. Designed for interior designers, architects, and luxury homeowners, Luster 3D enables users to craft bespoke lighting fixtures step-by-step in real-time right in their browser.

Whether building a multi-tiered crystal chandelier from scratch or browsing handcrafted heritage fixtures in the Atelier Catalog, Luster 3D provides immediate 3D visualization, interactive camera manipulation, and real-time assembly cost calculation.

---

## ✨ Key Features

- 🎨 **Real-Time 3D Configurator**: Powered by **Three.js**, render high-fidelity 3D meshes with dynamic lighting, material reflections, and real-time assembly composition.
- 🧩 **Modular Layered Builder**: Build chandeliers piece-by-piece using categorized parts:
  - **Base Collars**: Central anchor geometry for multi-tier support.
  - **Custom Arms & Tiers**: Choose single or multi-piece arm arrangements.
  - **Crystals & Accent Finishes**: Add Bohemian crystals, glass drops, or candle sockets.
- 💡 **Interactive 3D Navigation**: Rotate 360°, scroll to zoom, and pan around your fixture to inspect details from any angle.
- 📐 **Instructional Guidance Modal**: Integrated visual step-by-step onboarding guide for first-time configurator users.
- 🛍️ **Heritage Atelier Catalog & Cart**: Browse curated vintage fixtures (French Empire, Murano Glass, Bohemian Crystal) with an integrated shopping cart and order breakdown.
- ⚡ **Optimized Loading System**: Custom streaming progress overlay for downloading GLB 3D assets with percentage indicators.
- ✒️ **Global Poppins Typography**: Modern aesthetic built with Poppins Google Font and Tailwind CSS.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`) |
| **Build Tool & Bundler** | [Vite 5](https://vitejs.dev/) |
| **3D Engine** | [Three.js](https://threejs.org/) |
| **State Management** | [Pinia](https://pinia.vuejs.org/) |
| **Routing** | [Vue Router 4](https://router.vuejs.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) |
| **Typography** | [Poppins (Google Fonts)](https://fonts.google.com/specimen/Poppins) |
| **Utilities** | [@vueuse/core](https://vueuse.org/), Axios, SweetAlert2 |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |

---

## 📁 Project Structure

```text
luster-3D-en/
├── public/                # Static assets & 3D model GLB files
├── src/
│   ├── assets/            # CSS styles (style.css, base.css)
│   ├── components/        # Reusable Vue components
│   │   ├── Hero.vue            # Configurator main stage & hero splash
│   │   ├── InstructionModal.vue# 3D Builder step-by-step onboarding guide
│   │   ├── NavBar.vue          # Top header navigation & cart badge
│   │   ├── Modal.vue           # 3D Part selector modal
│   │   ├── accordionCategories.vue # Configurator category accordion
│   │   ├── order.vue           # Price calculation & breakdown
│   │   └── product.vue         # Catalog product card
│   ├── composables/       # Vue composables
│   ├── data/              # Product & category mock datasets
│   ├── router/            # Vue Router route configuration
│   ├── stores/            # Pinia state management stores
│   │   ├── loading.ts          # App & GLB loading state
│   │   ├── models3D.ts        # Three.js scene & part models
│   │   └── products.ts        # Atelier catalog products
│   ├── views/             # Page views (Shop, Cart, Blog, test3D)
│   ├── App.vue            # Root component with GLB streaming overlay
│   └── main.ts            # Vue app instantiation
├── index.html             # HTML template & Poppins font import
├── tailwind.config.js     # Tailwind CSS & Poppins theme config
└── package.json           # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or `npm` / `yarn`)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/luster-3D-en.git
   cd luster-3D-en
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Start Development Server**
   ```bash
   pnpm dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Type Check & Build for Production**
   ```bash
   pnpm typecheck
   pnpm build
   ```

5. **Preview Production Build**
   ```bash
   pnpm preview
   ```

---

## 🕹️ How to Use the 3D Configurator

1. **Launch Studio**: Click **Start 3D Configurator** on the home page.
2. **Review Onboarding**: The **3D Studio Guide** modal will appear with interactive instructions.
3. **Select Base Collar**: Choose a base collar from the **3D Parts Menu** on the left panel to anchor your scene.
4. **Assemble Accessories**: Add tiers, arms, crystal pendants, and light bulbs.
5. **Inspect in 3D**:
   - **Rotate**: Click and drag left/right/up/down.
   - **Zoom**: Scroll wheel or pinch.
   - **Pan**: Right-click and drag.
6. **Checkout**: Click **View Assembly Breakdown** to review itemized pricing and complete your order.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <p>Crafted with ♥ by the Luster 3D Atelier Team</p>
</div>
