<script setup lang="ts">
import { Timer, Star, Check, ArrowRight } from '@element-plus/icons-vue'
import { useDealsViewModel } from './viewmodel'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import { useCartStore } from '@/stores/useCartStore'
import { ElMessage } from 'element-plus'

const { state, calculateSavings, getSavingsPercentage } = useDealsViewModel()
const cartStore = useCartStore()

function handleAddComboToCart(combo: any) {
  // Add all items in the combo to the cart
  combo.items.forEach((item: any) => {
    cartStore.addItem({
      id: item.id,
      title: item.title,
      price: combo.dealPrice / combo.items.length, // Simplified price split
      discountPercentage: 0,
      thumbnail: item.thumbnail,
      stock: item.stock
    })
  })
  ElMessage.success(`${combo.title} added to your tray!`)
}
</script>

<template>
  <div class="deals-page">
    <div class="container py-12">
      <!-- Loading State -->
      <LoadingSpinner v-if="state.loading" text="Baking the best deals for you..." size="large" />

      <!-- Error State -->
      <el-alert v-else-if="state.error" :title="state.error" type="error" :closable="false" show-icon />

      <template v-else>
        <!-- ── Specials Hero ── -->
        <div class="specials-hero mb-16">
          <div 
            v-for="special in state.specials" 
            :key="special.id" 
            class="special-banner"
            :style="{ background: special.gradient }"
          >
            <div class="special-content">
              <span class="special-badge">{{ special.category }}</span>
              <h2 class="special-title">{{ special.title }}</h2>
              <p class="special-subtitle">{{ special.subtitle }}</p>
              <div class="special-discount">{{ special.discountText }}</div>
              <el-button type="primary" size="large" class="special-btn">
                Visit Now <el-icon class="ml-2"><ArrowRight /></el-icon>
              </el-button>
            </div>
            <div class="special-image">
              <img :src="special.image" :alt="special.title" />
            </div>
          </div>
        </div>

        <!-- ── Combo Offers Header ── -->
        <div class="section-header text-center mb-12">
          <h2 class="section-title">Combo Perfection 🍰☕</h2>
          <p class="section-desc">Handcrafted pairings created for ultimate flavor and savings.</p>
        </div>

        <!-- ── Combo Grid ── -->
        <div class="combos-grid">
          <div v-for="combo in state.combos" :key="combo.id" class="combo-card">
            <div class="combo-image">
              <img :src="combo.image" :alt="combo.title" />
              <div v-if="combo.tag" class="combo-tag">{{ combo.tag }}</div>
            </div>
            <div class="combo-info">
              <h3 class="combo-title">{{ combo.title }}</h3>
              <p class="combo-desc">{{ combo.description }}</p>
              
              <div class="combo-includes">
                <span class="includes-label">Includes:</span>
                <div class="includes-tags">
                  <el-tag v-for="item in combo.items" :key="item.id" size="small" effect="plain" class="mr-2 mb-2">
                    {{ item.title }}
                  </el-tag>
                </div>
              </div>

              <div class="combo-footer">
                <div class="combo-price">
                  <span class="price-deal">${{ combo.dealPrice.toFixed(2) }}</span>
                  <span class="price-old">${{ combo.originalPrice.toFixed(2) }}</span>
                  <span class="price-save">Save {{ getSavingsPercentage(combo.originalPrice, combo.dealPrice) }}%</span>
                </div>
                <el-button 
                  type="primary" 
                  class="combo-add-btn" 
                  @click="handleAddComboToCart(combo)"
                  :icon="Check"
                >
                  Order Combo
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Happy Hour Banner ── -->
        <div class="happy-hour-banner mt-24">
          <div class="hh-content">
            <div class="hh-icon"><el-icon><Timer /></el-icon></div>
            <div class="hh-text">
              <h3>Happy Hour is Every Day!</h3>
              <p>Visit us after 8 PM and get 50% off on all items in the display cabinet.</p>
            </div>
            <el-button size="large" class="hh-btn">Find a Store</el-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.deals-page {
  background: var(--bg-main);
  min-height: 100vh;
}

/* ── Specials Banners ── */
.specials-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.special-banner {
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  color: white;
  min-height: 320px;
  position: relative;
}

.special-content {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
}

.special-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 700;
  text-transform: uppercase;
  width: fit-content;
  margin-bottom: 20px;
}

.special-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  margin-bottom: 12px;
  line-height: 1.2;
}

.special-subtitle {
  font-size: var(--font-size-base);
  opacity: 0.9;
  margin-bottom: 24px;
  max-width: 300px;
}

.special-discount {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 24px;
  letter-spacing: -1px;
}

.special-image {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.special-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
}

/* ── Section Header ── */
.section-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.section-desc {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
}

/* ── Combos Grid ── */
.combos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.combo-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: transform var(--transition), box-shadow var(--transition);
  display: flex;
  flex-direction: column;
}

.combo-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.combo-image {
  height: 240px;
  position: relative;
}

.combo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.combo-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--accent);
  color: var(--text-primary);
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-weight: 800;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  box-shadow: var(--shadow-sm);
}

.combo-info {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.combo-title {
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.combo-desc {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin-bottom: 20px;
}

.combo-includes {
  margin-bottom: 24px;
}

.includes-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.combo-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.combo-price {
  display: flex;
  flex-direction: column;
}

.price-deal {
  font-size: var(--font-size-2xl);
  font-weight: 900;
  color: var(--primary);
}

.price-old {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  text-decoration: line-through;
}

.price-save {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--success);
}

/* ── Happy Hour ── */
.happy-hour-banner {
  background: var(--bg-dark);
  color: white;
  padding: 60px;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

.happy-hour-banner::after {
  content: '50%';
  position: absolute;
  right: -20px;
  bottom: -40px;
  font-size: 20rem;
  font-weight: 900;
  opacity: 0.05;
}

.hh-content {
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 1;
}

.hh-icon {
  font-size: 64px;
  color: var(--accent);
}

.hh-text h3 {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  margin-bottom: 8px;
  color: white;
}

.hh-text p {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  color: white;
}

.hh-btn {
  background-color: var(--accent) !important;
  color: var(--text-primary) !important;
  border: none !important;
  font-weight: 800 !important;
}

.hh-btn:hover {
  background-color: var(--accent-hover) !important;
  transform: scale(1.05);
}

@media (max-width: 992px) {
  .specials-hero { grid-template-columns: 1fr; }
  .hh-content { flex-direction: column; text-align: center; }
}

@media (max-width: 560px) {
  .special-banner { flex-direction: column; }
  .special-image { height: 200px; }
  .special-image img { clip-path: none; }
  .combo-footer { flex-direction: column; align-items: stretch; gap: 16px; }
}
</style>
