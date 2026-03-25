<template>
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
</template>

<style scoped>
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

@media (max-width: 768px) {
  .promo-content { flex-direction: column; text-align: center; }
  .promo-input { width: 100%; max-width: 300px; }
}
</style>
