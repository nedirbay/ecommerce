<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock, Message, Check } from '@element-plus/icons-vue'
import { useAuthViewModel } from './viewmodel'

const { activeTab, loading, loginForm, registerForm, handleLogin, handleRegister } = useAuthViewModel()
</script>

<template>
  <div class="auth-page">
    <div class="container auth-container">
      <div class="auth-box">
        <!-- Logo/Header -->
        <div class="auth-header text-center">
          <div class="auth-logo">🍰</div>
          <h1 class="auth-welcome">TMPASTAHOUSE</h1>
          <p class="auth-desc">Order your favorite cakes! Please enter your details.</p>
        </div>

        <!-- Tabs -->
        <div class="auth-tabs">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'login' }"
            @click="activeTab = 'login'"
          >
            Login
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'register' }"
            @click="activeTab = 'register'"
          >
            Register
          </button>
        </div>

        <div class="auth-forms mt-6">
          <!-- Login Form -->
          <transition name="fade-slide" mode="out-in">
            <div v-if="activeTab === 'login'" key="login" class="form-wrap">
              <el-form :model="loginForm" label-position="top">
                <el-form-item label="Username">
                  <el-input
                    v-model="loginForm.username"
                    :prefix-icon="User"
                    placeholder="e.g. emilys"
                    size="large"
                  />
                </el-form-item>
                <el-form-item label="Password">
                  <el-input
                    v-model="loginForm.password"
                    :prefix-icon="Lock"
                    type="password"
                    show-password
                    placeholder="e.g. emilyspass"
                    size="large"
                  />
                </el-form-item>

                <div class="flex items-center justify-between mb-6">
                  <el-checkbox label="Remember me" />
                  <el-button link type="primary">Forgot password?</el-button>
                </div>

                <el-button
                  type="primary"
                  size="large"
                  class="w-full submit-btn"
                  :loading="loading"
                  @click="handleLogin"
                >
                  Sign In
                </el-button>
              </el-form>

              <div class="demo-info">
                <strong>Demo:</strong> emilys / emilyspass
              </div>
            </div>

            <!-- Register Form -->
            <div v-else key="register" class="form-wrap">
              <el-form :model="registerForm" label-position="top">
                <div class="form-row">
                  <el-form-item label="First Name" class="flex-1">
                    <el-input v-model="registerForm.firstName" placeholder="Jane" size="large" />
                  </el-form-item>
                  <el-form-item label="Last Name" class="flex-1">
                    <el-input v-model="registerForm.lastName" placeholder="Doe" size="large" />
                  </el-form-item>
                </div>
                <el-form-item label="Email Address">
                  <el-input v-model="registerForm.email" :prefix-icon="Message" placeholder="jane@example.com" size="large" />
                </el-form-item>
                <el-form-item label="Username">
                  <el-input v-model="registerForm.username" :prefix-icon="User" placeholder="Choose a username" size="large" />
                </el-form-item>
                <el-form-item label="Password">
                  <el-input
                    v-model="registerForm.password"
                    :prefix-icon="Lock"
                    type="password"
                    show-password
                    placeholder="Create a password"
                    size="large"
                  />
                </el-form-item>
                <el-form-item label="Confirm Password">
                  <el-input
                    v-model="registerForm.confirmPassword"
                    :prefix-icon="Check"
                    type="password"
                    show-password
                    placeholder="Repeat password"
                    size="large"
                  />
                </el-form-item>

                <el-button
                  type="primary"
                  size="large"
                  class="w-full submit-btn mt-4"
                  :loading="loading"
                  @click="handleRegister"
                >
                  Create Account
                </el-button>
              </el-form>
            </div>
          </transition>
        </div>

        <!-- Social Auth -->
        <div class="social-auth divider text-center mt-8">
          <span>Or continue with</span>
          <div class="social-btns">
            <button class="social-btn">G</button>
            <button class="social-btn">f</button>
            <button class="social-btn">𝕏</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  background: linear-gradient(135deg, var(--bg-main) 0%, var(--primary-light) 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.auth-box {
  background: var(--bg-surface);
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  border-radius: var(--radius-xl);
  padding: 48px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
}

.auth-logo {
  width: 56px;
  height: 56px;
  background: var(--primary);
  color: white;
  font-size: 28px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: var(--shadow-primary);
}

.auth-welcome { font-size: 2rem; font-weight: 800; letter-spacing: -1px; }
.auth-desc { color: var(--text-muted); font-size: var(--font-size-sm); }

/* Tabs */
.auth-tabs {
  display: flex;
  background: var(--bg-muted);
  padding: 4px;
  border-radius: var(--radius-md);
  margin-top: 32px;
}

.tab-btn {
  flex: 1;
  border: none;
  background: none;
  padding: 12px;
  font-weight: 700;
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}

.tab-btn.active { background: white; color: var(--text-primary); box-shadow: var(--shadow-xs); }

/* Forms */
.form-row { display: flex; gap: 16px; }

.submit-btn { font-weight: 700 !important; height: 50px !important; }

.demo-info {
  margin-top: 24px;
  background: var(--primary-light);
  color: var(--primary);
  padding: 12px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  text-align: center;
  border: 1px dashed var(--primary-border);
}

/* Social */
.divider { position: relative; }
.divider::before { content: ''; position: absolute; top: 12px; left: 0; right: 0; height: 1px; background: var(--border); z-index: 0; }
.divider span { background: var(--bg-surface); padding: 0 16px; position: relative; z-index: 1; font-size: 12px; color: var(--text-muted); }

.social-btns { display: flex; justify-content: center; gap: 12px; margin-top: 20px; }
.social-btn {
  width: 48px;
  height: 48px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  cursor: pointer;
  transition: all var(--transition);
}
.social-btn:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }

/* Transitions */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-20px); }

@media (max-width: 480px) {
  .auth-box { padding: 32px 24px; }
  .form-row { flex-direction: column; gap: 0; }
}
</style>
