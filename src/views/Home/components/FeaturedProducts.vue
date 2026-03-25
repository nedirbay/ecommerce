<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import ProductCard from '@/components/shared/ProductCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import type { Product } from '@/types'

defineProps<{
  products: Product[]
  loading: boolean
}>()
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Featured Products</h2>
        <RouterLink to="/products" class="see-all">
          View All <el-icon><ArrowRight /></el-icon>
        </RouterLink>
      </div>

      <LoadingSpinner v-if="loading" text="Loading products..." />

      <div v-else class="products-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section { padding: 56px 0; }
.section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.section-title { font-size: var(--font-size-2xl); font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; }
.see-all { display: flex; align-items: center; gap: 4px; font-size: var(--font-size-sm); font-weight: 600; color: var(--primary); transition: gap var(--transition); text-decoration: none; }
.see-all:hover { gap: 8px; }
.products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
