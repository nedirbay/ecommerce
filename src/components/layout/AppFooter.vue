<script setup lang="ts">
const footerLinks = {
  Shop: [
    { label: 'New Arrivals', to: '/products?sort=createdAt' },
    { label: 'Best Sellers', to: '/products?sort=rating' },
    { label: 'Sale', to: '/products?sort=discountPercentage' },
    { label: 'All Products', to: '/products' },
  ],
  Support: [
    { label: 'Help Center', to: '#' },
    { label: 'Returns', to: '#' },
    { label: 'Order Status', to: '#' },
    { label: 'Contact Us', to: '#' },
  ],
  Company: [
    { label: 'About Us', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
  ],
}
</script>

<template>
  <footer class="app-footer">
    <!-- Main Content -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <RouterLink to="/" class="footer-logo">
              <img src="@/assets/logo.png" alt="TMPASTAHOUSE Logo" class="footer-logo-img" />
              <span class="footer-logo-text">TMPASTAHOUSE</span>
            </RouterLink>
            <p class="footer-desc">
              Crafting memories one slice at a time. The finest artisanal cakes and pastries for your special moments.
            </p>
            <div class="social-links">
              <a href="#" class="social-btn" aria-label="Facebook">f</a>
              <a href="#" class="social-btn" aria-label="Twitter">𝕏</a>
              <a href="#" class="social-btn" aria-label="Instagram">📷</a>
            </div>
          </div>

          <!-- Links -->
          <div v-for="(links, title) in footerLinks" :key="title" class="footer-col">
            <h4 class="footer-col-title">{{ title }}</h4>
            <ul class="footer-link-list">
              <li v-for="link in links" :key="link.label">
                <RouterLink :to="link.to" class="footer-link">{{ link.label }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="trust-badges">
          <div class="badge">🔒 Secure Payment</div>
          <div class="badge">🚚 Free Shipping $50+</div>
          <div class="badge">↩️ Easy Returns</div>
          <div class="badge">⭐ 50K+ Reviews</div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="container">
        <span>© {{ new Date().getFullYear() }} TMPASTAHOUSE. All rights reserved.</span>
        <div class="payment-icons">
          <span class="payment-icon">VISA</span>
          <span class="payment-icon">MC</span>
          <span class="payment-icon">PayPal</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: #0f172a;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 80px;
}

.footer-main {
  padding: 60px 0 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  text-decoration: none;
}

.footer-logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: brightness(0) invert(1); /* Make it white in the dark footer */
}

.footer-logo-text {
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
}

.footer-desc {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 10px;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  transition: background var(--transition);
  text-decoration: none;
}

.social-btn:hover {
  background: var(--primary);
}

.footer-col-title {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 16px;
}

.footer-link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.5);
  transition: color var(--transition);
  text-decoration: none;
}

.footer-link:hover {
  color: white;
}

/* Trust Badges */
.trust-badges {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: 40px;
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: var(--radius-full);
}

/* Bottom Bar */
.footer-bottom {
  padding: 16px 0;
}

.footer-bottom .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.4);
}

.payment-icons {
  display: flex;
  gap: 8px;
}

.payment-icon {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom .container {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
