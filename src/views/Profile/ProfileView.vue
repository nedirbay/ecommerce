<script setup lang="ts">
import { ref } from 'vue'
import {
  User,
  Setting,
  ShoppingBag,
  Location,
  Key,
} from '@element-plus/icons-vue'
import { useProfileViewModel } from './viewmodel'

// Components
import Dashboard from './components/Dashboard.vue'
import MyOrders from './components/MyOrders.vue'
import Addresses from './components/Addresses.vue'
import Security from './components/Security.vue'
import Settings from './components/Settings.vue'

const { form, loading, editMode, orderHistory, user, saveProfile } = useProfileViewModel()

const currentSection = ref('dashboard')

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: User },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'addresses', label: 'Addresses', icon: Location },
  { id: 'security', label: 'Security', icon: Key },
  { id: 'settings', label: 'Settings', icon: Setting },
]
</script>

<template>
  <div class="profile-page">
    <div class="container py-12">
      <div class="profile-layout">
        <!-- ── Sidebar ── -->
        <aside class="profile-sidebar" style="margin: 10px;">
          <div class="user-card text-center mb-6">
            <el-avatar :size="96" :src="user?.image" class="mb-4 profile-avatar" />
            <h2 class="user-name">{{ user?.firstName }} {{ user?.lastName }}</h2>
            <p class="user-email">@{{ user?.username }}</p>
          </div>

          <nav class="side-nav">
            <button
              v-for="item in navigation"
              :key="item.id"
              class="nav-btn"
              :class="{ active: currentSection === item.id }"
              @click="currentSection = item.id"
            >
              <el-icon><component :is="item.icon" /></el-icon>
              {{ item.label }}
            </button>
          </nav>
        </aside>

        <!-- ── Main Content ── -->
        <main class="profile-content">
          <Dashboard
            v-if="currentSection === 'dashboard'"
            :user="user"
            :order-history="orderHistory"
            v-model:edit-mode="editMode"
            :loading="loading"
            :form="form"
            @save="saveProfile"
          />

          <MyOrders
            v-else-if="currentSection === 'orders'"
            :order-history="orderHistory"
          />

          <Addresses v-else-if="currentSection === 'addresses'" />
          <Security v-else-if="currentSection === 'security'" />
          <Settings v-else-if="currentSection === 'settings'" />
        </main>
      </div>
    </div>
  </div>
</template>


<style scoped>
.profile-page { background: var(--bg-main); min-height: 100vh; }

.profile-layout { display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start; }

/* Sidebar */
.profile-sidebar { background: var(--bg-surface); border-radius: var(--radius-lg); padding: 32px 24px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.profile-avatar { border: 4px solid var(--primary-light); box-shadow: var(--shadow-sm); }
.user-name { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); }
.user-email { font-size: 0.8rem; color: var(--text-muted); }

.side-nav { display: flex; flex-direction: column; gap: 4px; margin-top: 32px; }
.nav-btn { display: flex; align-items: center; gap: 12px; border: none; background: none; padding: 12px 16px; border-radius: var(--radius-md); text-align: left; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all var(--transition); }
.nav-btn:hover { background: var(--bg-muted); color: var(--text-primary); }
.nav-btn.active { background: var(--primary); color: white; }

/* Content */
@media (max-width: 1024px) {
  .profile-layout { grid-template-columns: 1fr; }
}
</style>
