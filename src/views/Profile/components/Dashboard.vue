<script setup lang="ts">
import { EditPen, ShoppingCart, Wallet, Calendar } from '@element-plus/icons-vue'

const props = defineProps<{
  user: any
  orderHistory: any[]
  editMode: boolean
  loading: boolean
  form: any
}>()

const emit = defineEmits(['update:editMode', 'save'])
</script>

<template>
  <div class="dashboard-content">
    <!-- Stats -->
    <div class="stats-row mb-8" style="margin: 10px;">
      <div class="stat-card" style="margin: 5px;">
        <el-icon><ShoppingCart /></el-icon>
        <div><span class="val">12</span><span>Total Orders</span></div>
      </div>
      <div class="stat-card" style="margin: 5px;">
        <el-icon><Wallet /></el-icon>
        <div><span class="val">$1,240</span><span>Spent Overall</span></div>
      </div>
      <div class="stat-card" style="margin: 5px;">
        <el-icon><Calendar /></el-icon>
        <div><span class="val">2024</span><span>Joined In</span></div>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="profile-card mb-8" style="margin: 10px;">
      <div class="card-header border-b pb-4 mb-6 flex justify-between items-center">
        <h3 class="card-title">Personal Information</h3>
        <el-button
          :type="editMode ? 'default' : 'primary'"
          link
          :icon="EditPen"
          @click="$emit('update:editMode', !editMode)"
        >
          {{ editMode ? 'Cancel' : 'Edit Profile' }}
        </el-button>
      </div>

      <el-form v-if="editMode" :model="form" label-position="top" style="margin: 5px;">
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
          <el-button type="primary" size="large" :loading="loading" @click="$emit('save')">
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
  </div>
</template>

<style scoped>
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.stat-card { background: var(--bg-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border); display: flex; align-items: center; gap: 16px; margin: 3px; }
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

@media (max-width: 1024px) {
  .stats-row { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .stats-row { grid-template-columns: 1fr; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>
