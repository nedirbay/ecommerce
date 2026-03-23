<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ShoppingCartFull, User, Menu, Close } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/useCartStore'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Deals', to: '/products?sort=discountPercentage' },
]

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { q: searchQuery.value.trim() } })
    searchQuery.value = ''
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="app-header">
    <!-- Top Bar -->
    <div class="header-top-bar">
      <div class="container">
        <span class="text-xs text-white/70">🚚 Free shipping on orders over $50</span>
        <span class="text-xs text-white/70">📞 Support: +1 (800) 123-4567</span>
      </div>
    </div>

    <!-- Main Header -->
    <div class="header-main">
      <div class="container header-main__inner">
        <!-- Logo -->
        <RouterLink to="/" class="logo">
          <img src="@/assets/logo.png" alt="TMPASTAHOUSE Logo" class="logo-img" />
          <span class="logo-text">TMPASTAHOUSE</span>
        </RouterLink>

        <!-- Search -->
        <div class="header-search">
          <el-input
            v-model="searchQuery"
            placeholder="Search products, brands, categories..."
            size="large"
            class="search-input"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
            <template #append>
              <el-button @click="handleSearch">Search</el-button>
            </template>
          </el-input>
        </div>

        <!-- Actions -->
        <div class="header-actions">
          <!-- Cart -->
          <RouterLink to="/cart" class="action-btn">
            <el-badge :value="cartStore.totalItems || undefined" type="danger">
              <div class="icon-btn">
                <el-icon size="22"><ShoppingCartFull /></el-icon>
              </div>
            </el-badge>
            <span class="action-label">Cart</span>
          </RouterLink>

          <!-- Auth -->
          <template v-if="authStore.isLoggedIn">
            <el-dropdown trigger="click" placement="bottom-end">
              <div class="action-btn">
                <el-avatar :size="36" :src="authStore.user?.image" class="user-avatar" />
                <span class="action-label">{{ authStore.user?.firstName }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <RouterLink to="/profile" class="dropdown-link">My Profile</RouterLink>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <RouterLink to="/checkout" class="dropdown-link">My Orders</RouterLink>
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <span class="text-red-500">Logout</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>

          <template v-else>
            <RouterLink to="/auth" class="action-btn">
              <div class="icon-btn">
                <el-icon size="22"><User /></el-icon>
              </div>
              <span class="action-label">Sign In</span>
            </RouterLink>
          </template>

          <!-- Mobile menu toggle -->
          <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
            <el-icon size="24"><Menu v-if="!mobileMenuOpen" /><Close v-else /></el-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <nav class="header-nav" :class="{ 'mobile-open': mobileMenuOpen }">
      <div class="container">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </nav>
  </header>

  <!-- Spacer to prevent content from going under sticky header -->
  <div class="header-spacer" />
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-md);
}

/* ── Top Promo Bar ── */
.header-top-bar {
  background: var(--primary);
  padding: 6px 0;
}

.header-top-bar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ── Main Header ── */
.header-main {
  background: var(--bg-surface);
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.header-main__inner {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* ── Logo ── */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px var(--primary-shadow));
}

.logo-text {
  font-size: 1.375rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

/* ── Search ── */
.header-search {
  flex: 1;
  max-width: 560px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: var(--radius-sm) 0 0 var(--radius-sm) !important;
  box-shadow: 0 0 0 1px var(--border);
}

.search-input :deep(.el-input__wrapper:focus-within) {
  box-shadow: 0 0 0 2px var(--primary-border);
}

/* ── Actions ── */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color var(--transition);
  text-decoration: none;
}

.action-btn:hover {
  color: var(--primary);
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--bg-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition);
}

.action-btn:hover .icon-btn {
  background: var(--primary-light);
  color: var(--primary);
}

.action-label {
  font-size: 0.7rem;
  font-weight: 500;
}

.user-avatar {
  cursor: pointer;
  border: 2px solid var(--border);
}

.dropdown-link {
  display: block;
  width: 100%;
  color: var(--text-primary);
}

/* ── Nav ── */
.header-nav {
  background: #1e1b4b;
  padding: 0;
  transition: height var(--transition-slow);
}

.header-nav .container {
  display: flex;
  gap: 4px;
  align-items: center;
}

.nav-link {
  color: rgba(255, 255, 255, 0.75);
  padding: 10px 16px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  border-radius: 0;
  transition: color var(--transition), background var(--transition);
  text-decoration: none;
  border-bottom: 2px solid transparent;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: white;
  border-bottom-color: var(--accent);
  background: rgba(255, 255, 255, 0.08);
}

/* ── Mobile ── */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  padding: 6px;
}

.header-spacer {
  height: 0;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }

  .header-search {
    display: none;
  }

  .action-label {
    display: none;
  }

  .header-nav {
    max-height: 0;
    overflow: hidden;
  }

  .header-nav.mobile-open {
    max-height: 300px;
  }

  .header-nav .container {
    flex-direction: column;
    align-items: stretch;
    padding-top: 4px;
    padding-bottom: 8px;
  }
}
</style>
