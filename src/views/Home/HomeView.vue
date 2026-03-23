<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { useHomeViewModel } from './viewmodel'
import ProductCard from '@/components/shared/ProductCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const { featuredProducts, categories, deals, heroSlides, loading } = useHomeViewModel()
const router = useRouter()
const currentSlide = ref(0)

const categoryEmojis: Record<string, string> = {
  beauty: '💄', fragrances: '🌸', furniture: '🛋️', groceries: '🛒',
  'home-decoration': '🏠', 'kitchen-accessories': '🍳', laptops: '💻',
  'mens-shirts': '👔', 'mens-shoes': '👟', 'mens-watches': '⌚',
  'mobile-accessories': '📱', motorcycle: '🏍️', 'skin-care': '🧴',
  smartphones: '📲', 'sports-accessories': '⚽', sunglasses: '🕶️',
  tablets: '📟', tops: '👕', vehicle: '🚗', 'womens-bags': '👜',
  'womens-dresses': '👗', 'womens-jewellery': '💍', 'womens-shoes': '👠',
  'womens-watches': '⌚',
}
</script>

<template>
  <div class="home-page">
    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="hero" v-if="heroSlides && heroSlides.length > 0 && heroSlides[currentSlide]">
      <div
        class="hero-slide"
        :style="{ background: heroSlides[currentSlide]?.gradient }"
      >
        <div class="container hero-content">
          <div class="hero-text">
            <span class="hero-tag">🔥 Limited Time Offer</span>
            <h1 class="hero-title">{{ heroSlides[currentSlide]?.title }}</h1>
            <p class="hero-subtitle">{{ heroSlides[currentSlide]?.subtitle }}</p>
            <div class="hero-actions">
              <el-button
                type="primary"
                size="large"
                class="hero-cta"
                @click="router.push(heroSlides[currentSlide]!.to)"
              >
                {{ heroSlides[currentSlide]?.cta }}
                <el-icon><ArrowRight /></el-icon>
              </el-button>
              <el-button size="large" class="hero-secondary" @click="router.push('/products')">
                Browse All
              </el-button>
            </div>
          </div>
          <div class="hero-emoji">{{ heroSlides[currentSlide]?.emoji }}</div>
        </div>

        <!-- Slide dots -->
        <div class="hero-dots">
          <button
            v-for="(_, i) in heroSlides"
            :key="i"
            class="dot"
            :class="{ active: currentSlide === i }"
            @click="currentSlide = i"
          />
        </div>
      </div>
    </section>

    <!-- ── Stats Bar ─────────────────────────────────────────────── -->
    <section class="stats-bar">
      <div class="container stats-grid">
        <div class="stat">
          <span class="stat-value">50K+</span>
          <span class="stat-label">Products</span>
        </div>
        <div class="stat">
          <span class="stat-value">1M+</span>
          <span class="stat-label">Happy Customers</span>
        </div>
        <div class="stat">
          <span class="stat-value">150+</span>
          <span class="stat-label">Top Brands</span>
        </div>
        <div class="stat">
          <span class="stat-value">4.8★</span>
          <span class="stat-label">Average Rating</span>
        </div>
      </div>
    </section>

    <!-- ── Categories ─────────────────────────────────────────────── -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Shop by Category</h2>
          <RouterLink to="/products" class="see-all">See All <el-icon><ArrowRight /></el-icon></RouterLink>
        </div>
        <div class="categories-grid">
          <RouterLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="category-chip"
          >
            <span class="cat-emoji">{{ categoryEmojis[cat.slug] ?? '🏷️' }}</span>
            <span class="cat-name">{{ cat.name }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Featured Products ──────────────────────────────────────── -->
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
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- ── Deals Section ──────────────────────────────────────────── -->
    <section v-if="!loading && deals.length" class="section deals-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">🔥 Hot Deals</h2>
          <RouterLink to="/products?sort=discountPercentage" class="see-all">
            All Deals <el-icon><ArrowRight /></el-icon>
          </RouterLink>
        </div>
        <div class="products-grid deals-grid">
          <ProductCard v-for="product in deals" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- ── Banner ─────────────────────────────────────────────────── -->
    <section class="promo-banner">
      <div class="container">
        <div class="promo-content">
          <div>
            <h2 class="promo-title">Get 20% Off Your First Order</h2>
            <p class="promo-text">Sign up to our newsletter and never miss a deal.</p>
          </div>
          <div class="promo-form">
            <el-input placeholder="Enter your email" size="large" class="promo-input" />
            <el-button type="primary" size="large">Subscribe</el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
}

/* ── Hero ── */
.hero {
  position: relative;
}

.hero-slide {
  min-height: 480px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 50%, rgba(255,255,255,0.05) 0%, transparent 70%);
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px var(--container-padding);
  width: 100%;
}

.hero-text {
  max-width: 560px;
  z-index: 1;
}

.hero-tag {
  display: inline-block;
  background: rgba(255,255,255,0.15);
  color: white;
  padding: 4px 14px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  margin-bottom: 16px;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.hero-subtitle {
  color: rgba(255,255,255,0.75);
  font-size: var(--font-size-lg);
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-cta {
  background: white !important;
  border-color: white !important;
  color: var(--primary) !important;
  font-weight: 700;
  padding: 0 28px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important;
}

.hero-secondary {
  background: rgba(255,255,255,0.12) !important;
  border-color: rgba(255,255,255,0.3) !important;
  color: white !important;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

.hero-emoji {
  font-size: 9rem;
  line-height: 1;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,0.3));
  animation: float 4s ease-in-out infinite;
  z-index: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}

.hero-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: rgba(255,255,255,0.4);
  border: none;
  cursor: pointer;
  transition: all var(--transition);
}

.dot.active {
  background: white;
  width: 24px;
}

/* ── Stats ── */
.stats-bar {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  padding: 24px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 1.625rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: -0.5px;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  font-weight: 500;
}

/* ── Sections ── */
.section {
  padding: 56px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.see-all {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--primary);
  transition: gap var(--transition);
  text-decoration: none;
}

.see-all:hover {
  gap: 8px;
}

/* ── Categories ── */
.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition);
  text-decoration: none;
}

.category-chip:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.cat-emoji {
  font-size: 1.2rem;
}

/* ── Products Grid ── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.deals-grid {
  grid-template-columns: repeat(4, 1fr);
}

/* ── Deals ── */
.deals-section {
  background: linear-gradient(180deg, var(--bg-muted) 0%, var(--bg-main) 100%);
  padding: 56px 0;
}

/* ── Promo Banner ── */
.promo-banner {
  background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
  padding: 56px 0;
  margin-top: 48px;
}

.promo-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.promo-title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}

.promo-text {
  color: rgba(255,255,255,0.7);
  font-size: var(--font-size-base);
}

.promo-form {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.promo-input {
  width: 300px;
}

.promo-input :deep(.el-input__wrapper) {
  background: rgba(255,255,255,0.15) !important;
  border: 1px solid rgba(255,255,255,0.3) !important;
  box-shadow: none !important;
}

.promo-input :deep(.el-input__inner) {
  color: white !important;
}

.promo-input :deep(.el-input__inner::placeholder) {
  color: rgba(255,255,255,0.5) !important;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-emoji { display: none; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .promo-content { flex-direction: column; text-align: center; }
  .promo-input { width: 200px; }
}

@media (max-width: 480px) {
  .products-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
}
</style>
