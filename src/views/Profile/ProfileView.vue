<script setup lang="ts">
import { ref } from 'vue'
import {
  User,
  EditPen,
  Setting,
  ShoppingBag,
  Location,
  Key,
  Calendar,
  Wallet,
} from '@element-plus/icons-vue'
import { useProfileViewModel } from './viewmodel'

const { form, loading, editMode, orderHistory, user, saveProfile } = useProfileViewModel()

function getStatusType(status: string) {
  switch (status) {
    case 'delivered': return 'success'
    case 'shipped': return 'primary'
    case 'processing': return 'warning'
    case 'cancelled': return 'danger'
    default: return 'info'
  }
}
</script>

<template>
  <div class="profile-page">
    <div class="container py-12">
      <div class="profile-layout">
        <!-- ── Sidebar ── -->
        <aside class="profile-sidebar">
          <div class="user-card text-center mb-6">
            <el-avatar :size="96" :src="user?.image" class="mb-4 profile-avatar" />
            <h2 class="user-name">{{ user?.firstName }} {{ user?.lastName }}</h2>
            <p class="user-email">@{{ user?.username }}</p>
          </div>

          <nav class="side-nav">
            <button class="nav-btn active"><el-icon><User /></el-icon> Dashboard</button>
            <button class="nav-btn"><el-icon><ShoppingBag /></el-icon> My Orders</button>
            <button class="nav-btn"><el-icon><Location /></el-icon> Addresses</button>
            <button class="nav-btn"><el-icon><Key /></el-icon> Security</button>
            <button class="nav-btn"><el-icon><Setting /></el-icon> Settings</button>
          </nav>
        </aside>

        <!-- ── Main Content ── -->
        <main class="profile-content">
          <!-- Stats -->
          <div class="stats-row mb-8">
            <div class="stat-card">
              <el-icon><ShoppingCart /></el-icon>
              <div><span class="val">12</span><span class="lab">Total Orders</span></div>
            </div>
            <div class="stat-card">
              <el-icon><Wallet /></el-icon>
              <div><span class="val">$1,240</span><span class="lab">Spent Overall</span></div>
            </div>
            <div class="stat-card">
              <el-icon><Calendar /></el-icon>
              <div><span class="val">2024</span><span class="lab">Joined In</span></div>
            </div>
          </div>

          <!-- Profile Details -->
          <div class="profile-card mb-8">
            <div class="card-header border-b pb-4 mb-6 flex justify-between items-center">
              <h3 class="card-title">Personal Information</h3>
              <el-button
                :type="editMode ? 'default' : 'primary'"
                link
                :icon="EditPen"
                @click="editMode = !editMode"
              >
                {{ editMode ? 'Cancel' : 'Edit Profile' }}
              </el-button>
            </div>

            <el-form v-if="editMode" :model="form" label-position="top">
              <div class="form-row">
                <el-form-item label="First Name" class="flex-1">
                  <el-input v-model="form.firstName" size="large" />
                </el-form-item>
                <el-form-item label="Last Name" class="flex-1">
                  <el-input v-model="form.lastName" size="large" />
                </el-form-item>
              </div>
              <el-form-item label="Email Address">
                <el-input v-model="form.email" size="large" />
              </el-form-item>
              <el-form-item label="Phone Number">
                <el-input v-model="form.phone" size="large" />
              </el-form-item>
              <div class="flex justify-end">
                <el-button type="primary" size="large" :loading="loading" @click="saveProfile">
                  Save Changes
                </el-button>
              </div>
            </el-form>

            <div v-else class="info-grid">
              <div class="info-item"><span>Full Name</span><strong>{{ user?.firstName }} {{ user?.lastName }}</strong></div>
              <div class="info-item"><span>Email</span><strong>{{ user?.email }}</strong></div>
              <div class="info-item"><span>Username</span><strong>{{ user?.username }}</strong></div>
              <div class="info-item"><span>Phone</span><strong>{{ user?.phone || 'Not set' }}</strong></div>
            </div>
          </div>

          <!-- Order History -->
          <div class="profile-card">
            <h3 class="card-title mb-6">Recent Orders</h3>
            <el-table :data="orderHistory" stripe style="width: 100%" class="modern-table">
              <el-table-column prop="id" label="Order ID" width="100">
                <template #default="scope">#{{ scope.row.id }}</template>
              </el-table-column>
              <el-table-column prop="date" label="Date" width="120" />
              <el-table-column prop="itemCount" label="Items" width="80" />
              <el-table-column label="Total">
                <template #default="scope"><strong>${{ scope.row.total.toFixed(2) }}</strong></template>
              </el-table-column>
              <el-table-column label="Status">
                <template #default="scope">
                  <el-tag :type="getStatusType(scope.row.status)" effect="light">
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template #default>
                  <el-button link type="primary">View Detail</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.stat-card { background: var(--bg-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border); display: flex; align-items: center; gap: 16px; }
.stat-card .el-icon { font-size: 24px; color: var(--primary); background: var(--primary-light); padding: 12px; border-radius: var(--radius-full); }
.stat-card .val { display: block; font-size: 1.25rem; font-weight: 800; color: var(--text-primary); line-height: 1.2; }
.stat-card .lab { font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; }

.profile-card { background: var(--bg-surface); border-radius: var(--radius-lg); padding: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.card-title { font-size: var(--font-size-lg); font-weight: 800; }

.form-row { display: flex; gap: 16px; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-item span { font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--text-muted); }
.info-item strong { color: var(--text-primary); }

.modern-table :deep(.el-table__header) th { background-color: var(--bg-muted); font-weight: 800; text-transform: uppercase; font-size: 11px; color: var(--text-secondary); }

@media (max-width: 1024px) {
  .profile-layout { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .stats-row { grid-template-columns: 1fr; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>
