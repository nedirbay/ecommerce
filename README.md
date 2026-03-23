# TMPASTAHOUSE 🍰

A premium e-commerce platform for an artisanal cake restaurant and pastry shop, built with **Vue 3**, **Tailwind CSS v4**, and **Element Plus**.

## ✨ Overview

**TMPASTAHOUSE** is a high-end digital storefront designed for a luxury bakery experience. It features a curated selection of gourmet cakes, pastries, and desserts, presented with a sophisticated "Rose & Chocolate" aesthetic.

The project is built using a **Clean Architecture** pattern, ensuring high maintainability, testability, and a clear separation of concerns across all features.

## 🚀 Technology Stack

- **Frontend:** [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Element Plus](https://element-plus.org/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🏗️ Architecture

The application follows a strict **Clean Architecture** (Layered) approach for every page module:

1.  **Entity:** Defines the domain-specific data structures and types.
2.  **Repository:** Handles raw data fetching and persistence logic (fully integrated with thematic mock data).
3.  **Service:** Implements business logic, data transformations, and validation.
4.  **ViewModel:** Manages the reactive state and acts as a bridge between the Service and the View.
5.  **View:** Pure UI components using Vue templates and styled with Tailwind/Element Plus.

## 🌟 Key Features

- 🏚️ **Home Page:** Hero slider with specialty deals, categories, and featured pastries.
- 🥐 **Product Discovery:** Advanced filtering, category navigation, and search.
- 🍰 **Gourmet Details:** Rich product information, high-quality galleries, and stock management.
- 🛒 **Smart Shopping Cart:** Quantity controls and real-time total calculation.
- 💳 **Secure Checkout:** Multi-step order placement simulation with form validation.
- 🔐 **Authentication:** Full Login/Register flow with protected routes (Demo: `emilys` / `emilyspass`).
- 👤 **User Profile:** Personal dashboard for account details and order history.

## 📁 Project Structure

```text
src/
├── assets/             # Global styles, logo, and static assets
├── components/         # Shared and Layout components (Header, Footer, Shared)
├── router/             # Vue Router configuration and guards
├── services/           # Global singletons (API, Mock Data)
├── stores/             # Pinia state stores (Cart, Auth)
├── types/              # Global TypeScript interfaces
└── views/              # Page-specific modules (Home, Products, Detail, etc.)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Install dependencies
npm install
```

### Development
```bash
# Run the development server
npm run dev
```

### Production Build
```bash
# Build for production
npm run build

# Run type checking
npm run type-check
```

---

*Crafted by the TMPASTAHOUSE team.*
