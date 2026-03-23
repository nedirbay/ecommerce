<script setup lang="ts">
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Check,
  Van,
  Timer,
  RefreshLeft,
  CircleCheck,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useProductDetailViewModel } from './viewmodel'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const router = useRouter()
const {
  product,
  selectedImage,
  quantity,
  loading,
  error,
  discountedPrice,
  stockStatus,
  inCart,
  addToCart,
} = useProductDetailViewModel()

function handleAddToCart() {
  addToCart()
}
</script>

<template>
  <div class="product-detail-page">
    <div class="container py-8">
      <!-- Breadcrumb / Back -->
      <el-button link :icon="ArrowLeft" class="mb-6" @click="router.back()">
        Back to Results
      </el-button>

      <LoadingSpinner v-if="loading" size="large" text="Loading product details..." />

      <el-alert v-else-if="error" :title="error" type="error" :closable="false" />

      <div v-else-if="product" class="product-layout">
        <!-- ── Left: Gallery ── -->
        <div class="product-gallery">
          <div class="main-image-wrapper">
            <img :src="product.images[selectedImage]" :alt="product.title" class="main-image" />
            <div v-if="product.discountPercentage > 0" class="discount-badge">
              -{{ Math.round(product.discountPercentage) }}%
            </div>
          </div>
          <div class="thumbnail-list">
            <div
              v-for="(img, i) in product.images"
              :key="i"
              class="thumbnail-item"
              :class="{ active: selectedImage === i }"
              @click="selectedImage = i"
            >
              <img :src="img" :alt="`${product.title} ${i}`" />
            </div>
          </div>
        </div>

        <!-- ── Right: Info ── -->
        <div class="product-info">
          <div class="info-header">
            <span class="category-tag">{{ product.category }}</span>
            <h1 class="product-title">{{ product.title }}</h1>
            <div class="rating-row">
              <div class="stars">
                <el-icon v-for="i in 5" :key="i" :class="{ filled: i <= Math.round(product.rating) }">
                  <Star />
                </el-icon>
              </div>
              <span class="rating-text">{{ product.rating }} Rating</span>
              <span v-if="product.reviews?.length" class="review-count">
                | {{ product.reviews.length }} Reviews
              </span>
            </div>
          </div>

          <!-- Price & Stock -->
          <div class="price-section">
            <div class="price-row">
              <span class="price-current">${{ discountedPrice.toFixed(2) }}</span>
              <span v-if="product.discountPercentage > 0" class="price-original">
                ${{ product.price.toFixed(2) }}
              </span>
            </div>
            <el-tag :type="stockStatus?.type" size="small" class="stock-tag">
              {{ stockStatus?.label }}
            </el-tag>
          </div>

          <p class="description">{{ product.description }}</p>

          <!-- Add to Cart Section -->
          <div class="purchase-section">
            <div class="quantity-col">
              <label>Quantity</label>
              <el-input-number
                v-model="quantity"
                :min="1"
                :max="product.stock"
                size="large"
                class="w-full"
              />
            </div>
            <el-button
              type="primary"
              size="large"
              class="add-btn flex-1"
              :icon="inCart ? Check : ShoppingCart"
              @click="handleAddToCart"
            >
              {{ inCart ? 'Added to Cart' : 'Add to Cart' }}
            </el-button>
          </div>

          <!-- Features/Guarantees -->
          <div class="features-grid">
            <div class="feature">
              <el-icon><Van /></el-icon>
              <div>
                <span class="feature-title">Shipping</span>
                <span class="feature-desc">{{ product.shippingInformation }}</span>
              </div>
            </div>
            <div class="feature">
              <el-icon><CircleCheck /></el-icon>
              <div>
                <span class="feature-title">Warranty</span>
                <span class="feature-desc">{{ product.warrantyInformation }}</span>
              </div>
            </div>
            <div class="feature">
              <el-icon><RefreshLeft /></el-icon>
              <div>
                <span class="feature-title">Return Policy</span>
                <span class="feature-desc">{{ product.returnPolicy }}</span>
              </div>
            </div>
            <div class="feature">
              <el-icon><Timer /></el-icon>
              <div>
                <span class="feature-title">Availability</span>
                <span class="feature-desc">{{ product.availabilityStatus }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <section v-if="product?.reviews?.length" class="reviews-section">
        <h2 class="section-title">Customer Reviews</h2>
        <div class="reviews-grid">
          <div v-for="(review, i) in (product.reviews || [])" :key="i" class="review-card">
            <div class="review-header">
              <div class="review-stars">
                <el-icon v-for="s in 5" :key="s" :class="{ filled: s <= review.rating }">
                  <Star />
                </el-icon>
              </div>
              <span class="review-date">{{ new Date(review.date).toLocaleDateString() }}</span>
            </div>
            <p class="review-comment">"{{ review.comment }}"</p>
            <p class="reviewer-name">— {{ review.reviewerName }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  background: var(--bg-main);
  min-height: 100vh;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: var(--bg-surface);
  padding: 40px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}

/* Gallery */
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-image-wrapper {
  aspect-ratio: 1;
  background: var(--bg-muted);
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.discount-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #ef4444;
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-weight: 800;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-sm);
}

.thumbnail-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.thumbnail-item {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg-muted);
  transition: border-color var(--transition);
}

.thumbnail-item.active {
  border-color: var(--primary);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.category-tag {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--primary);
  margin-bottom: 8px;
  display: block;
}

.product-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.stars {
  display: flex;
  color: var(--border-strong);
}

.stars .filled {
  color: var(--accent);
}

.rating-text {
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.review-count {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.price-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.price-current {
  font-size: var(--font-size-4xl);
  font-weight: 900;
  color: var(--text-primary);
}

.price-original {
  font-size: var(--font-size-xl);
  color: var(--text-muted);
  text-decoration: line-through;
}

.description {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: var(--font-size-base);
}

.purchase-section {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.quantity-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quantity-col label {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--text-muted);
}

.add-btn {
  font-weight: 700 !important;
  letter-spacing: 0.5px;
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.feature {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.feature .el-icon {
  font-size: 24px;
  color: var(--primary);
  background: var(--primary-light);
  padding: 10px;
  border-radius: var(--radius-sm);
}

.feature-title {
  display: block;
  font-weight: 700;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.feature-desc {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

/* Reviews */
.reviews-section {
  margin-top: 60px;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  margin-bottom: 32px;
  text-align: center;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.review-card {
  background: var(--bg-surface);
  padding: 24px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.review-stars {
  color: var(--border-strong);
}

.review-stars .filled {
  color: var(--accent);
}

.review-date {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.review-comment {
  font-style: italic;
  margin-bottom: 16px;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.reviewer-name {
  font-weight: 700;
  font-size: var(--font-size-xs);
  color: var(--text-primary);
}

@media (max-width: 1024px) {
  .product-layout { grid-template-columns: 1fr; padding: 24px; }
  .reviews-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .reviews-grid { grid-template-columns: 1fr; }
}
</style>
