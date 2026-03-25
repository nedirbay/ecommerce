<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import ProductCard from '@/components/shared/ProductCard.vue'
import type { Product } from '@/types'

defineProps<{
  products: Product[]
  loading: boolean
}>()
</script>

<template>
  <section v-if="!loading && products.length" class="section deals-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">🔥 Hot Deals</h2>
        <RouterLink to="/products?sort=discountPercentage" class="see-all">
          All Deals <el-icon><ArrowRight /></el-icon>
        </RouterLink>
      </div>
      <div class="products-grid deals-grid">
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
.deals-section { background: linear-gradient(180deg, var(--bg-muted) 0%, var(--bg-main) 100%); }

@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
