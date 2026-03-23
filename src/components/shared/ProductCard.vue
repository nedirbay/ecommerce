<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCartFull, Star } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/useCartStore'
import type { Product } from '@/types'

const props = defineProps<{ product: Product }>()
const router = useRouter()
const cartStore = useCartStore()

const discountedPrice = computed(() =>
  props.product.price * (1 - props.product.discountPercentage / 100),
)

const inCart = computed(() => cartStore.isInCart(props.product.id))

function addToCart() {
  cartStore.addItem({
    id: props.product.id,
    title: props.product.title,
    price: props.product.price,
    discountPercentage: props.product.discountPercentage,
    thumbnail: props.product.thumbnail,
    stock: props.product.stock,
  })
}

function goToDetail() {
  router.push(`/products/${props.product.id}`)
}
</script>

<template>
  <div class="product-card" @click="goToDetail">
    <!-- Image -->
    <div class="card-image-wrapper">
      <img :src="product.thumbnail" :alt="product.title" class="card-image" loading="lazy" />

      <!-- Badges -->
      <div class="card-badges">
        <span v-if="product.discountPercentage >= 10" class="badge badge-sale">
          -{{ Math.round(product.discountPercentage) }}%
        </span>
        <span v-if="product.stock < 5" class="badge badge-low">Low Stock</span>
      </div>

      <!-- Quick Add -->
      <button
        class="quick-add-btn"
        :class="{ 'in-cart': inCart }"
        @click.stop="addToCart"
      >
        <el-icon><ShoppingCartFull /></el-icon>
        <span>{{ inCart ? 'Added' : 'Add to Cart' }}</span>
      </button>
    </div>

    <!-- Body -->
    <div class="card-body">
      <span class="card-category">{{ product.category }}</span>
      <h3 class="card-title">{{ product.title }}</h3>

      <!-- Rating -->
      <div class="card-rating">
        <el-icon class="star-icon"><Star /></el-icon>
        <span class="rating-value">{{ product.rating.toFixed(1) }}</span>
        <span class="rating-label">({{ product.stock }} in stock)</span>
      </div>

      <!-- Price -->
      <div class="card-price">
        <span class="price-current">${{ discountedPrice.toFixed(2) }}</span>
        <span v-if="product.discountPercentage > 0" class="price-original">
          ${{ product.price.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

/* ── Image ── */
.card-image-wrapper {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--bg-muted);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .card-image {
  transform: scale(1.06);
}

/* ── Badges ── */
.card-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.badge-sale {
  background: #ef4444;
  color: white;
}

.badge-low {
  background: var(--accent);
  color: white;
}

/* ── Quick Add Button ── */
.quick-add-btn {
  position: absolute;
  bottom: -48px;
  left: 0;
  right: 0;
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: bottom var(--transition), background var(--transition);
}

.quick-add-btn.in-cart {
  background: var(--success);
}

.product-card:hover .quick-add-btn {
  bottom: 0;
}

/* ── Body ── */
.card-body {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.card-category {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--primary);
}

.card-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-icon {
  color: var(--accent);
  font-size: 14px;
}

.rating-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.rating-label {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.card-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
}

.price-current {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary);
}

.price-original {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  text-decoration: line-through;
}
</style>
