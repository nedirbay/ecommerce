<script setup lang="ts">
import { ref } from 'vue'
import { Bell, User, Lock, Delete, Operation } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const settings = ref({
  notifications: {
    emails: true,
    newsletter: false,
    orderUpdates: true,
    sms: false
  },
  preferences: {
    language: 'en',
    currency: 'USD',
    theme: 'light'
  },
  privacy: {
    publicProfile: false,
    showHistory: true
  }
})

const loading = ref(false)

function saveSettings() {
  loading.value = true
  // Simulating an API call
  setTimeout(() => {
    loading.value = false
    ElMessage.success('Settings saved successfully!')
  }, 800)
}

function deleteAccount() {
  ElMessageBox.confirm(
    'Are you sure you want to permanently delete your account? This action cannot be undone.',
    'CRITICAL WARNING',
    {
      confirmButtonText: 'Delete Forever',
      cancelButtonText: 'Cancel',
      type: 'error',
      confirmButtonClass: 'el-button--danger'
    }
  ).then(() => {
    ElMessage.error('Account deletion simulation initiated.')
  })
}
</script>

<template>
  <div class="profile-card" style="margin: 10px;">
    <h3 class="card-title mb-6">Account Settings</h3>

    <el-form label-position="top">
      <!-- Notifications Section -->
      <section class="settings-section mb-10">
        <h4 class="section-heading mb-4 flex items-center gap-2">
          <el-icon><Bell /></el-icon> Notifications
        </h4>
        <div class="settings-list border-t pt-4">
          <div class="setting-item flex justify-between items-center mb-4">
            <div>
              <p class="font-bold">Email Notifications</p>
              <p class="text-muted text-xs">Receive updates about your orders and activity</p>
            </div>
            <el-switch v-model="settings.notifications.emails" />
          </div>
          <div class="setting-item flex justify-between items-center mb-4">
            <div>
              <p class="font-bold">Order Updates</p>
              <p class="text-muted text-xs">Get real-time tracking for your purchases</p>
            </div>
            <el-switch v-model="settings.notifications.orderUpdates" />
          </div>
          <div class="setting-item flex justify-between items-center mb-4">
            <div>
              <p class="font-bold">Newsletter</p>
              <p class="text-muted text-xs">Stay informed about new products and deals</p>
            </div>
            <el-switch v-model="settings.notifications.newsletter" />
          </div>
        </div>
      </section>

      <!-- Preferences Section -->
      <section class="settings-section mb-10">
        <h4 class="section-heading mb-4 flex items-center gap-2">
          <el-icon><Operation /></el-icon> Preferences
        </h4>
        <div class="settings-list border-t pt-4">
          <div class="grid grid-cols-2 gap-6">
            <el-form-item label="Language">
              <el-select v-model="settings.preferences.language" class="w-full">
                <el-option label="English" value="en" />
                <el-option label="Turkmen" value="tk" />
                <el-option label="Russian" value="ru" />
              </el-select>
            </el-form-item>
            <el-form-item label="Currency">
              <el-select v-model="settings.preferences.currency" class="w-full">
                <el-option label="USD ($)" value="USD" />
                <el-option label="TMT" value="TMT" />
                <el-option label="EUR (€)" value="EUR" />
              </el-select>
            </el-form-item>
          </div>
        </div>
      </section>

      <!-- Privacy Section -->
      <section class="settings-section mb-10">
        <h4 class="section-heading mb-4 flex items-center gap-2">
          <el-icon><Lock /></el-icon> Privacy & Security
        </h4>
        <div class="settings-list border-t pt-4">
          <div class="setting-item flex justify-between items-center mb-4">
            <div>
              <p class="font-bold">Public Profile</p>
              <p class="text-muted text-xs">Make your profile visible to other users</p>
            </div>
            <el-switch v-model="settings.privacy.publicProfile" />
          </div>
          <div class="setting-item flex justify-between items-center mb-4">
            <div>
              <p class="font-bold">Show Purchase History</p>
              <p class="text-muted text-xs">Allow others to see what you've bought</p>
            </div>
            <el-switch v-model="settings.privacy.showHistory" />
          </div>
        </div>
      </section>

      <el-divider />

      <div class="flex justify-between items-center mt-8">
        <div class="danger-zone">
          <el-button type="danger" plain @click="deleteAccount">Delete Account</el-button>
        </div>
        <el-button type="primary" size="large" :loading="loading" @click="saveSettings">Save Settings</el-button>
      </div>
    </el-form>
  </div>
</template>


<style scoped>
.profile-card { background: var(--bg-surface); border-radius: var(--radius-lg); padding: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.card-title { font-size: var(--font-size-lg); font-weight: 800; }

.section-heading { font-size: 14px; font-weight: 700; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 0.5px; }
.text-muted { color: var(--text-muted); }
.text-xs { font-size: 11px; }
.font-bold { font-weight: 700; color: var(--text-primary); }

.settings-list { border-color: var(--border-light, #f0f0f0); }
.setting-item { padding: 8px 0; }

.el-divider { margin: 32px 0; }
.w-full { width: 100%; }

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
