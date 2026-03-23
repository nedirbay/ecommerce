<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Location,
  CreditCard,
  Check,
  ArrowRight,
  ArrowLeft,
  SuccessFilled,
} from '@element-plus/icons-vue'
import { useCheckoutViewModel } from './viewmodel'

const router = useRouter()
const { step, form, orderSummary, loading, placeOrder } = useCheckoutViewModel()
</script>

<template>
  <div class="checkout-page">
    <div class="container py-12">
      <!-- Checkout Header -->
      <div class="checkout-header mb-10">
        <h1 class="page-title">Checkout</h1>
        <div class="steps-progress">
          <div class="step-item" :class="{ active: step === 1, done: step > 1 }">
            <div class="step-circle"><el-icon><User /></el-icon></div>
            <span>Shipping</span>
          </div>
          <div class="step-line" />
          <div class="step-item" :class="{ active: step === 2, done: step > 2 }">
            <div class="step-circle"><el-icon><CreditCard /></el-icon></div>
            <span>Payment</span>
          </div>
          <div class="step-line" />
          <div class="step-item" :class="{ active: step === 3 }">
            <div class="step-circle"><el-icon><Check /></el-icon></div>
            <span>Complete</span>
          </div>
        </div>
      </div>

      <div class="checkout-layout">
        <!-- ── Left: Forms ── -->
        <div class="checkout-main">
          <!-- Step 1: Shipping -->
          <div v-show="step === 1" class="checkout-card">
            <h2 class="card-title mb-6">Shipping Address</h2>
            <el-form :model="form" label-position="top" class="shipping-form">
              <div class="form-row">
                <el-form-item label="First Name" class="flex-1">
                  <el-input v-model="form.firstName" placeholder="John" size="large" />
                </el-form-item>
                <el-form-item label="Last Name" class="flex-1">
                  <el-input v-model="form.lastName" placeholder="Doe" size="large" />
                </el-form-item>
              </div>
              <el-form-item label="Email Address">
                <el-input v-model="form.email" placeholder="john@example.com" size="large" />
              </el-form-item>
              <el-form-item label="Phone Number">
                <el-input v-model="form.phone" placeholder="+1 (555) 000-0000" size="large" />
              </el-form-item>
              <el-form-item label="Street Address">
                <el-input v-model="form.address" placeholder="123 Main St" size="large" />
              </el-form-item>
              <div class="form-row">
                <el-form-item label="City" class="flex-1">
                  <el-input v-model="form.city" placeholder="New York" size="large" />
                </el-form-item>
                <el-form-item label="Postal Code" class="flex-1">
                  <el-input v-model="form.postalCode" placeholder="10001" size="large" />
                </el-form-item>
              </div>
              <el-form-item label="Country">
                <el-select v-model="form.country" placeholder="Select Country" size="large" class="w-full">
                  <el-option label="United States" value="US" />
                  <el-option label="Canada" value="CA" />
                  <el-option label="United Kingdom" value="UK" />
                </el-select>
              </el-form-item>

              <div class="mt-8 flex justify-end">
                <el-button type="primary" size="large" @click="step = 2">
                  Continue to Payment <el-icon class="ml-2"><ArrowRight /></el-icon>
                </el-button>
              </div>
            </el-form>
          </div>

          <!-- Step 2: Payment -->
          <div v-show="step === 2" class="checkout-card">
            <h2 class="card-title mb-6">Payment Method</h2>
            <div class="payment-methods">
              <div
                class="pay-method"
                :class="{ active: form.paymentMethod === 'card' }"
                @click="form.paymentMethod = 'card'"
              >
                <el-radio v-model="form.paymentMethod" label="card">Credit / Debit Card</el-radio>
                <div class="cards-icons">💳 🏦</div>
              </div>
              <div
                class="pay-method"
                :class="{ active: form.paymentMethod === 'paypal' }"
                @click="form.paymentMethod = 'paypal'"
              >
                <el-radio v-model="form.paymentMethod" label="paypal">PayPal</el-radio>
                <div class="cards-icons">🅿️</div>
              </div>
              <div
                class="pay-method"
                :class="{ active: form.paymentMethod === 'cash' }"
                @click="form.paymentMethod = 'cash'"
              >
                <el-radio v-model="form.paymentMethod" label="cash">Cash on Delivery</el-radio>
              </div>
            </div>

            <div class="mt-8 flex justify-between">
              <el-button link size="large" :icon="ArrowLeft" @click="step = 1">Back to Shipping</el-button>
              <el-button type="primary" size="large" :loading="loading" @click="placeOrder">
                Place Order ${{ orderSummary.total.toFixed(2) }}
              </el-button>
            </div>
          </div>

          <!-- Step 3: Success -->
          <div v-show="step === 3" class="success-card text-center">
            <el-icon class="success-icon mb-4"><SuccessFilled /></el-icon>
            <h2 class="success-title">Thank you for your order!</h2>
            <p class="success-text mb-8">
              Your order #ORD-{{ Math.floor(Math.random() * 1000000) }} has been placed successfully.
              We'll send you a confirmation email with details shortly.
            </p>
            <el-button type="primary" size="large" @click="router.push('/')">
              Return to Home
            </el-button>
          </div>
        </div>

        <!-- ── Right: Summary ── -->
        <aside v-if="step < 3" class="checkout-side">
          <div class="summary-card">
            <h3 class="side-title mb-4">Items ({{ orderSummary.items.length }})</h3>
            <div class="mini-items">
              <div v-for="item in orderSummary.items.slice(0, 3)" :key="item.id" class="mini-item">
                <img :src="item.thumbnail" :alt="item.title" />
                <div class="mini-info">
                  <span class="mini-title">{{ item.title }}</span>
                  <span class="mini-qty">Qty: {{ item.quantity }}</span>
                </div>
                <span class="mini-price">
                  ${{ (item.price * (1 - item.discountPercentage / 100) * item.quantity).toFixed(2) }}
                </span>
              </div>
              <div v-if="orderSummary.items.length > 3" class="text-center text-xs text-muted">
                + {{ orderSummary.items.length - 3 }} more items
              </div>
            </div>

            <div class="divider my-4" />

            <div class="summary-rows">
              <div class="s-row"><span>Subtotal</span><span>${{ orderSummary.subtotal.toFixed(2) }}</span></div>
              <div v-if="orderSummary.discountSavings > 0" class="s-row savings">
                <span>Savings</span><span>-${{ orderSummary.discountSavings.toFixed(2) }}</span>
              </div>
              <div class="s-row">
                <span>Shipping</span>
                <span>{{ orderSummary.shipping === 0 ? 'FREE' : `$${orderSummary.shipping.toFixed(2)}` }}</span>
              </div>
              <div class="s-row"><span>Tax</span><span>${{ orderSummary.tax.toFixed(2) }}</span></div>
              <div class="s-row total">
                <span>Total</span><span>${{ orderSummary.total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  background: var(--bg-main);
  min-height: 100vh;
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Steps */
.steps-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--bg-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border);
}

.step-item.active { color: var(--primary); }
.step-item.active .step-circle { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }

.step-item.done { color: var(--success); }
.step-item.done .step-circle { border-color: var(--success); color: white; background: var(--success); }

.step-line {
  width: 40px;
  height: 2px;
  background: var(--border);
}

/* Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

.checkout-card, .success-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: 40px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: 800;
}

.form-row {
  display: flex;
  gap: 16px;
}

/* Payment Methods */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pay-method {
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all var(--transition);
}

.pay-method:hover { border-color: var(--primary-border); background: var(--bg-muted); }
.pay-method.active { border-color: var(--primary); background: var(--primary-light); }

.cards-icons { font-size: 24px; }

/* Summary Side */
.summary-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border);
  position: sticky;
  top: 100px;
}

.side-title { font-weight: 800; text-transform: uppercase; font-size: var(--font-size-xs); color: var(--text-muted); }

.mini-items { display: flex; flex-direction: column; gap: 12px; }
.mini-item { display: flex; gap: 12px; align-items: center; }
.mini-item img { width: 44px; height: 44px; border-radius: 4px; border: 1px solid var(--border); object-fit: cover; }
.mini-info { flex: 1; display: flex; flex-direction: column; max-width: 140px; }
.mini-title { font-size: 11px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mini-qty { font-size: 10px; color: var(--text-muted); }
.mini-price { font-size: 12px; font-weight: 700; color: var(--text-primary); }

.summary-rows { display: flex; flex-direction: column; gap: 8px; }
.s-row { display: flex; justify-content: space-between; font-size: var(--font-size-sm); }
.s-row.savings { color: var(--success); font-weight: 600; }
.s-row.total { font-size: var(--font-size-lg); font-weight: 800; color: var(--primary); margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--border); }

/* Success */
.success-icon { font-size: 80px; color: var(--success); }
.success-title { font-size: 2rem; font-weight: 800; }
.success-text { color: var(--text-secondary); max-width: 480px; margin: 0 auto; }

@media (max-width: 900px) {
  .checkout-layout { grid-template-columns: 1fr; }
  .checkout-header { flex-direction: column; align-items: flex-start; gap: 20px; }
}

@media (max-width: 480px) {
  .form-row { flex-direction: column; gap: 0; }
}
</style>
