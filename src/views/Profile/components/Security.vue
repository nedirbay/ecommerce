<template>
  <div class="profile-card" style="margin: 10px;">
    <h3 class="card-title mb-6">Security Settings</h3>
    <el-form label-position="top" style="max-width: 400px;">
      <el-form-item label="Current Password">
        <el-input type="password" show-password />
      </el-form-item>
      <el-form-item label="New Password">
        <el-input type="password" show-password />
      </el-form-item>
      <el-form-item label="Confirm New Password">
        <el-input type="password" show-password />
      </el-form-item>
      <el-button type="primary">Update Password</el-button>
    </el-form>
  </div>
</template>

<style scoped>
.profile-card { background: var(--bg-surface); border-radius: var(--radius-lg); padding: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.card-title { font-size: var(--font-size-lg); font-weight: 800; }
</style>
