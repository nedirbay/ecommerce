<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Location, Edit, Delete, User, Phone } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

interface Address {
  id: number
  label: string
  receiverName: string
  phone: string
  fullAddress: string
  isDefault: boolean
}

const addresses = ref<Address[]>([
  { id: 1, label: 'Home', receiverName: 'John Doe', phone: '+1 234 567 890', fullAddress: '123 Main St, Apt 4B, New York, NY 10001', isDefault: true },
  { id: 2, label: 'Office', receiverName: 'John Doe', phone: '+1 234 567 890', fullAddress: '456 Business Ave, Suite 200, Brooklyn, NY 11201', isDefault: false },
])

const addressDialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add')
const addressForm = ref<Address>({
  id: 0,
  label: '',
  receiverName: '',
  phone: '',
  fullAddress: '',
  isDefault: false
})

function openAddressDialog(address: Address | null = null) {
  if (address) {
    dialogType.value = 'edit'
    addressForm.value = { ...address }
  } else {
    dialogType.value = 'add'
    addressForm.value = { id: Date.now(), label: '', receiverName: '', phone: '', fullAddress: '', isDefault: false }
  }
  addressDialogVisible.value = true
}

function saveAddress() {
  if (!addressForm.value.label || !addressForm.value.receiverName || !addressForm.value.fullAddress) {
    ElMessage.warning('Please fill in all required fields.')
    return
  }

  if (dialogType.value === 'add') {
    addresses.value.push({ ...addressForm.value })
    ElMessage.success('Address added successfully!')
  } else {
    const index = addresses.value.findIndex(a => a.id === addressForm.value.id)
    if (index !== -1) {
      addresses.value[index] = { ...addressForm.value }
      ElMessage.success('Address updated successfully!')
    }
  }
  addressDialogVisible.value = false
}

function deleteAddress(address: Address) {
  ElMessageBox.confirm(
    `Are you sure you want to delete the "${address.label}" address?`,
    'Warning',
    { confirmButtonText: 'Delete', cancelButtonText: 'Cancel', type: 'warning' }
  ).then(() => {
    addresses.value = addresses.value.filter(a => a.id !== address.id)
    ElMessage.success('Address deleted.')
  })
}

function setDefault(address: Address) {
  addresses.value.forEach(a => a.isDefault = false)
  address.isDefault = true
  ElMessage.success(`${address.label} set as default address.`)
}
</script>

<template>
  <div class="profile-card" style="margin: 10px;">
    <div class="card-header flex justify-between items-center mb-6">
      <h3 class="card-title">My Addresses</h3>
      <el-button type="primary" :icon="Plus" @click="openAddressDialog()">Add New Address</el-button>
    </div>

    <div v-if="addresses.length > 0" class="address-grid">
      <div v-for="address in addresses" :key="address.id" class="address-card" :class="{ 'is-default': address.isDefault }">
        <div class="address-header flex justify-between items-start mb-4">
          <div class="label-badge">
            <el-tag :type="address.isDefault ? 'success' : 'info'" effect="dark" size="small">
              {{ address.label.toUpperCase() }}
            </el-tag>
            <span v-if="address.isDefault" class="default-text ml-2">Default</span>
          </div>
          <div class="actions">
            <el-button link :icon="Edit" @click="openAddressDialog(address)" />
            <el-button link :icon="Delete" type="danger" @click="deleteAddress(address)" />
          </div>
        </div>

        <div class="address-body mb-4">
          <p class="receiver flex items-center gap-2 mb-2 font-bold">
            <el-icon><User /></el-icon> {{ address.receiverName }}
          </p>
          <p class="phone flex items-center gap-2 mb-2 text-sm text-muted">
            <el-icon><Phone /></el-icon> {{ address.phone }}
          </p>
          <p class="full-address flex items-start gap-2 text-sm">
            <el-icon class="mt-1"><Location /></el-icon> {{ address.fullAddress }}
          </p>
        </div>

        <div v-if="!address.isDefault" class="address-footer border-t pt-4">
          <el-button link type="primary" size="small" @click="setDefault(address)">Set as Default</el-button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <el-empty description="You haven't saved any addresses yet." />
      <el-button type="primary" @click="openAddressDialog()">Add New Address</el-button>
    </div>

    <!-- Address Dialog -->
    <el-dialog
      v-model="addressDialogVisible"
      :title="dialogType === 'add' ? 'Add New Address' : 'Edit Address'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="addressForm" label-position="top">
        <div class="flex gap-4">
          <el-form-item label="Address Label (e.g. Home, Office)" class="flex-1">
            <el-input v-model="addressForm.label" placeholder="Home" />
          </el-form-item>
          <el-form-item label="Default" class="w-24">
            <el-switch v-model="addressForm.isDefault" />
          </el-form-item>
        </div>
        <el-form-item label="Receiver Name">
          <el-input v-model="addressForm.receiverName" placeholder="Full name" />
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input v-model="addressForm.phone" placeholder="+1 234 567 890" />
        </el-form-item>
        <el-form-item label="Full Address">
          <el-input v-model="addressForm.fullAddress" type="textarea" :rows="3" placeholder="Street name, building, apartment, city, state, zip code" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addressDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveAddress">Save Address</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.profile-card { background: var(--bg-surface); border-radius: var(--radius-lg); padding: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.card-title { font-size: var(--font-size-lg); font-weight: 800; }
.empty-state { text-align: center; padding: 40px 0; }

.address-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.address-card { border: 1px solid var(--border); border-radius: var(--radius-md); padding: 20px; transition: all var(--transition); background: var(--bg-surface); }
.address-card:hover { border-color: var(--primary); box-shadow: var(--shadow-sm); }
.address-card.is-default { border-color: var(--primary); background: var(--primary-light-alpha, rgba(64, 158, 255, 0.05)); }

.default-text { font-size: 11px; font-weight: 700; color: var(--success); text-transform: uppercase; }
.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.875rem; }
.receiver { color: var(--text-primary); }

@media (max-width: 640px) {
  .address-grid { grid-template-columns: 1fr; }
}
</style>
