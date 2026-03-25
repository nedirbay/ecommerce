<script setup lang="ts">
import ProductCard from '@/components/shared/ProductCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import type { Product } from '@/types'

defineProps<{
  products: Product[]
  loading: boolean
  error: string | null
  total: number
  page: number
  pageSize: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'change-page', page: number): void
  (e: 'clear-filters'): void
}>()
</script>

<template>
  <div class="products-grid-container">
    <LoadingSpinner v-if="loading" text="Searching for products..." size="large" />

    <el-alert v-else-if="error" :title="error" type="error" :closable="false" />

    <EmptyState
      v-else-if="!products.length"
      icon="🔍"
      title="No matching products"
      description="We couldn't find any products that match your current filter selection. Try adjusting your filters or search term."
    >
      <el-button type="primary" @click="emit('clear-filters')">
        Clear All Filters
      </el-button>
    </EmptyState>

    <template v-else>
      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="fade-in"
        />
      </div>

      <!-- Pagination -->
      <div class="pagination-wrapper">
        <el-pagination
          :current-page="page"
          :page-count="totalPages"
          :total="total"
          :page-size="pageSize"
          layout="prev, pager, next, total"
          background
          @current-change="emit('change-page', $event)"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.products-grid-container { min-height: 400px; display: flex; flex-direction: column; }

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  padding: 48px 0;
  margin-top: auto;
}

.fade-in { animation: fadeIn 0.5s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
</style>
