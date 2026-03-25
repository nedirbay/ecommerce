<template>
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
</template>

<style scoped>
.stats-bar { background: var(--bg-surface); border-bottom: 1px solid var(--border); padding: 24px 0; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.stat-value { font-size: 1.625rem; font-weight: 800; color: var(--primary); letter-spacing: -0.5px; }
.stat-label { font-size: var(--font-size-sm); color: var(--text-muted); font-weight: 500; }

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
