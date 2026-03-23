<script setup lang="ts">
import { Delete, Minus, Plus, ShoppingCart, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useCartViewModel } from './viewmodel'
import EmptyState from '@/components/shared/EmptyState.vue'

const router = useRouter()
const {
  items,
  isEmpty,
  summary,
  shippingProgress,
  amountToFreeShipping,
  updateQuantity,
  removeItem,
} = useCartViewModel()
</script>

<template>
  <div class="cart-page">
    <div class="container py-12">
      <h1 class="page-title mb-8">Shopping Cart</h1>

      <div v-if="isEmpty" class="empty-wrap">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet. Let's find some amazing products!"
        >
          <el-button type="primary" size="large" @click="router.push('/products')">
            Start Shopping
          </el-button>
        </EmptyState>
      </div>

      <div v-else class="cart-layout">
        <!-- ── Left: Items ── -->
        <div class="cart-items">
          <!-- Free Shipping Progress -->
          <div class="shipping-nudge" v-if="amountToFreeShipping > 0">
            <div class="nudge-text">
              Add <span class="highlight">${{ amountToFreeShipping.toFixed(2) }}</span> more to get <strong>Free Shipping!</strong>
            </div>
            <el-progress :percentage="shippingProgress" :show-text="false" stroke-width="8" />
          </div>
          <div v-else class="shipping-nudge success">
            🎉 You qualify for <strong>Free Shipping!</strong>
            <el-progress :percentage="100" status="success" :show-text="false" stroke-width="8" />
          </div>

          <div class="items-list">
            <div v-for="item in items" :key="item.id" class="cart-item">
              <div class="item-img" @click="router.push(`/products/${item.id}`)">
                <img :src="item.thumbnail" :alt="item.title" />
              </div>
              <div class="item-details">
                <div class="item-header">
                  <h3 class="item-title" @click="router.push(`/products/${item.id}`)">{{ item.title }}</h3>
                  <el-button
                    type="danger"
                    link
                    :icon="Delete"
                    class="remove-btn"
                    @click="removeItem(item.id)"
                  />
                </div>
                <div class="item-price">
                  <span class="curr-price">${{ (item.price * (1 - item.discountPercentage / 100)).toFixed(2) }}</span>
                  <span v-if="item.discountPercentage > 0" class="orig-price">${{ item.price.toFixed(2) }}</span>
                </div>

                <div class="item-footer">
                  <div class="quantity-ctrl">
                    <button class="qty-btn" @click="updateQuantity(item.id, item.quantity - 1)">
                      <el-icon><Minus /></el-icon>
                    </button>
                    <span class="qty-val">{{ item.quantity }}</span>
                    <button class="qty-btn" @click="updateQuantity(item.id, item.quantity + 1)">
                      <el-icon><Plus /></el-icon>
                    </button>
                  </div>
                  <div class="item-total">
                    ${{ (item.price * (1 - item.discountPercentage / 100) * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Right: Summary ── -->
        <aside class="cart-summary">
          <div class="summary-card">
            <h2 class="summary-title">Order Summary</h2>
            <div class="summary-rows">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>${{ summary.subtotal.toFixed(2) }}</span>
              </div>
              <div v-if="summary.discountSavings > 0" class="summary-row discount">
                <span>Discount Savings</span>
                <span>-${{ summary.discountSavings.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span>{{ summary.shipping === 0 ? 'FREE' : `$${summary.shipping.toFixed(2)}` }}</span>
              </div>
              <div class="summary-row">
                <span>Tax (8%)</span>
                <span>${{ summary.tax.toFixed(2) }}</span>
              </div>
              <div class="summary-divider" />
              <div class="summary-row total">
                <span>Total</span>
                <span>${{ summary.total.toFixed(2) }}</span>
              </div>
            </div>

            <el-button
              type="primary"
              size="large"
              class="checkout-btn w-full"
              @click="router.push('/checkout')"
            >
              Checkout Now
              <el-icon class="ml-2"><ArrowRight /></el-icon>
            </el-button>

            <div class="summary-footer">
              <p>🔒 Secure checkout</p>
              <p>💳 Multiple payment methods accepted</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  background: var(--bg-main);
  min-height: 100vh;
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--text-primary);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

/* Shipping Nudge */
.shipping-nudge {
  background: var(--bg-surface);
  padding: 20px;
  border-radius: var(--radius-md);
  margin-bottom: 24px;
  border: 1px solid var(--border);
}

.nudge-text {
  font-size: var(--font-size-sm);
  margin-bottom: 12px;
}

.highlight {
  color: var(--primary);
  font-weight: 700;
}

/* Item List */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  gap: 20px;
  border: 1px solid var(--border);
  transition: transform var(--transition);
}

.cart-item:hover {
  transform: translateX(4px);
  border-color: var(--primary-border);
}

.item-img {
  width: 100px;
  height: 100px;
  background: var(--bg-muted);
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
}

.item-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.item-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  cursor: pointer;
  color: var(--text-primary);
}

.item-title:hover { color: var(--primary); }

.item-price {
  margin-top: 4px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.curr-price { font-weight: 700; color: var(--text-primary); }
.orig-price { font-size: var(--font-size-xs); color: var(--text-muted); text-decoration: line-through; }

.item-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-ctrl {
  display: flex;
  align-items: center;
  background: var(--bg-muted);
  border-radius: var(--radius-sm);
  padding: 4px;
}

.qty-btn {
  background: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-primary);
  box-shadow: var(--shadow-xs);
}

.qty-btn:hover { color: var(--primary); }

.qty-val {
  padding: 0 12px;
  font-weight: 700;
  font-size: var(--font-size-sm);
}

.item-total {
  font-weight: 800;
  color: var(--primary);
}

/* Summary */
.summary-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border);
  position: sticky;
  top: 100px;
  box-shadow: var(--shadow-md);
}

.summary-title {
  font-size: var(--font-size-lg);
  font-weight: 800;
  margin-bottom: 24px;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.summary-row.discount { color: var(--success); font-weight: 600; }

.summary-divider {
  height: 1px;
  background: var(--border);
  margin: 12px 0;
}

.summary-row.total {
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--text-primary);
}

.checkout-btn {
  font-weight: 700 !important;
  height: 54px !important;
}

.summary-footer {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  text-align: center;
}

@media (max-width: 900px) {
  .cart-layout { grid-template-columns: 1fr; }
}
</style>
