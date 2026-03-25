<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingBag, Calendar, Wallet } from '@element-plus/icons-vue'

const props = defineProps<{
  orderHistory: any[]
}>()

const detailDialogVisible = ref(false)
const selectedOrder = ref<any>(null)

function getStatusType(status: string) {
  switch (status) {
    case 'delivered': return 'success'
    case 'shipped': return 'primary'
    case 'processing': return 'warning'
    case 'cancelled': return 'danger'
    default: return 'info'
  }
}

function showOrderDetail(order: any) {
  selectedOrder.value = order
  detailDialogVisible.value = true
}

// Mock items for the detail view
const mockItems = [
  { name: 'Classic Leather Jacket', price: 89.99, quantity: 1, image: 'https://cdn.dummyjson.com/products/images/mens-shirts/Classic%20Leather%20Jacket/thumbnail.jpg' },
  { name: 'Denim Jeans Blue', price: 34.99, quantity: 1, image: 'https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20Slim%20Fit%20Jeans/thumbnail.jpg' },
]
</script>

<template>
  <div class="profile-card" style="margin: 10px;">
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
        <template #default="scope">
          <el-button link type="primary" @click="showOrderDetail(scope.row)">View Detail</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Order Detail Dialog -->
    <el-dialog
      v-model="detailDialogVisible"
      title="Order Details"
      width="600px"
      destroy-on-close
      class="order-detail-dialog"
    >
      <div v-if="selectedOrder" class="order-info-grid mb-6">
        <div class="info-cell">
          <el-icon><ShoppingBag /></el-icon>
          <div>
            <span class="label">Order ID</span>
            <strong>#{{ selectedOrder.id }}</strong>
          </div>
        </div>
        <div class="info-cell">
          <el-icon><Calendar /></el-icon>
          <div>
            <span class="label">Order Date</span>
            <strong>{{ selectedOrder.date }}</strong>
          </div>
        </div>
        <div class="info-cell">
          <el-tag :type="getStatusType(selectedOrder.status)" effect="dark">
            {{ selectedOrder.status.toUpperCase() }}
          </el-tag>
        </div>
      </div>

      <div class="order-items-list border-t pt-4">
        <h4 class="font-bold mb-4">Ordered Items</h4>
        <div v-for="(item, idx) in mockItems" :key="idx" class="order-item flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <el-image :src="item.image" fit="cover" class="item-thumb" />
            <div>
              <p class="font-bold">{{ item.name }}</p>
              <span class="text-sm text-muted">Qty: {{ item.quantity }}</span>
            </div>
          </div>
          <strong class="text-primary">${{ item.price.toFixed(2) }}</strong>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer border-t pt-4 flex justify-between items-center">
          <div>
            <span class="text-muted mr-2">Total Amount:</span>
            <strong class="total-price text-xl text-primary">${{ selectedOrder.total.toFixed(2) }}</strong>
          </div>
          <el-button @click="detailDialogVisible = false">Close</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.profile-card { background: var(--bg-surface); border-radius: var(--radius-lg); padding: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.card-title { font-size: var(--font-size-lg); font-weight: 800; }

.modern-table :deep(.el-table__header) th { background-color: var(--bg-muted); font-weight: 800; text-transform: uppercase; font-size: 11px; color: var(--text-secondary); }

/* Dialog Styles */
.order-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; background: var(--bg-muted); padding: 16px; border-radius: var(--radius-md); }
.info-cell { display: flex; align-items: center; gap: 12px; }
.info-cell .el-icon { font-size: 20px; color: var(--primary); }
.info-cell .label { display: block; font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; }

.item-thumb { width: 50px; height: 50px; border-radius: var(--radius-sm); border: 1px solid var(--border); }
.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.85rem; }
.text-xl { font-size: 1.25rem; }
</style>
