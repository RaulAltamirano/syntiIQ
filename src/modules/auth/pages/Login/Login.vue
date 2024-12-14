<template>
  <div :class="['auth-container', {'dark': isDark}]">
    <div class="auth-card" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }">
      <div class="theme-toggle" @click="toggleTheme">
        <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </div>
      
      <div class="auth-header">
        <h2 class="auth-title">{{ isLogin ? 'Welcome back' : 'Create account' }}</h2>
        <p class="auth-subtitle">{{ isLogin ? 'Sign in to continue' : 'Get started for free' }}</p>
      </div>

      <div class="social-auth">
        <button @click="handleGoogleAuth" class="social-btn google">
          <i class="fab fa-google"></i>
          Google
        </button>
        <button @click="handleGithubAuth" class="social-btn github">
          <i class="fab fa-github"></i>
          GitHub
        </button>
      </div>

      <div class="divider">or</div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="input-group" v-if="!isLogin">
          <input 
            v-model="name"
            type="text"
            required
            placeholder="Full name"
          >
        </div>

        <div class="input-group">
          <input 
            v-model="email"
            type="email"
            required
            placeholder="Email address"
          >
        </div>

        <div class="input-group">
          <div class="password-input">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Password"
            >
            <i 
              :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              @click="showPassword = !showPassword"
              class="password-toggle"
            ></i>
          </div>
          <span class="password-strength" v-if="!isLogin">
            Strength: {{ passwordStrength }}
          </span>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe">
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-password" v-if="isLogin">Forgot password?</a>
        </div>

        <button 
          type="submit"
          class="submit-btn"
          :disabled="loading"
        >
          <span v-if="!loading">{{ isLogin ? 'Sign in' : 'Sign up' }}</span>
          <i v-else class="fas fa-spinner fa-spin"></i>
        </button>
      </form>

      <p class="auth-switch">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <a href="#" @click.prevent="toggleAuthMode">
          {{ isLogin ? 'Sign up' : 'Sign in' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useThemeStore } from '../../../shared/composables/useTheme';
import { storeToRefs } from 'pinia';
import { useMotion } from '@vueuse/motion';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const name = ref('');
const showPassword = ref(false);
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const loading = ref(false);
const rememberMe = ref(false);

const passwordStrength = computed(() => {
  const pwd = password.value;
  if (!pwd) return 'None';
  if (pwd.length < 8) return 'Weak';
  if (pwd.length < 12) return 'Medium';
  return 'Strong';
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(isLogin.value ? 'Signing in...' : 'Signing up...', {
      email: email.value,
      password: password.value,
      ...(isLogin.value ? { rememberMe: rememberMe.value } : { name: name.value })
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
};

const handleGoogleAuth = () => console.log('Google auth...');
const handleGithubAuth = () => console.log('GitHub auth...');

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
  email.value = '';
  password.value = '';
  name.value = '';
  rememberMe.value = false;
};


</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  background-image: 
    repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #f5f7fa 10px
    ),
    repeating-linear-gradient(
      #c3cfe255,
      #c3cfe255
    );
  padding: 1rem;
}

.auth-container.dark {
  background: #2d3436;
  background-image: 
    repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #2d3436 10px
    ),
    repeating-linear-gradient(
      rgba(255, 255, 255, 0.03),
      rgba(255, 255, 255, 0.03)
    );
}
.auth-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  position: relative;
}

.dark .auth-card {
  background-color: #1f2937;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.auth-header {
  text-align: center;
  margin-bottom: 1.25rem;
}

.auth-title {
  color: #1a1a1a;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.auth-subtitle {
  color: #666;
  font-size: 0.875rem;
}

.dark .auth-title { color: white; }
.dark .auth-subtitle { color: #9ca3af; }

.social-auth {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.dark .social-btn {
  background-color: #374151;
  border-color: #4b5563;
  color: white;
}

.social-btn:hover {
  background-color: #f9fafb;
}

.dark .social-btn:hover {
  background-color: #4b5563;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  color: #9ca3af;
  font-size: 0.875rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e5e7eb;
}

.dark .divider::before,
.dark .divider::after {
  border-color: #4b5563;
}

.divider {
  padding: 0 0.75rem;
}

.input-group {
  margin-bottom: 1rem;
}

.password-input {
  position: relative;
}

input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.dark input {
  background-color: #374151;
  border-color: #4b5563;
  color: white;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #9ca3af;
  font-size: 0.875rem;
}

.password-strength {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.75rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #374151;
  cursor: pointer;
}

.dark .remember-me {
  color: #e5e7eb;
}

.forgot-password {
  color: #3b82f6;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 0.625rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background-color: #2563eb;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-switch {
  text-align: center;
  margin-top: 1rem;
  color: #374151;
  font-size: 0.875rem;
}

.dark .auth-switch {
  color: #e5e7eb;
}

.auth-switch a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.25rem;
}

.theme-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  padding: 0.375rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  color: #374151;
  font-size: 0.875rem;
}

.dark .theme-toggle {
  color: #e5e7eb;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.25rem;
  }
  
  .social-auth {
    grid-template-columns: 1fr;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .forgot-password {
    margin-left: 1.75rem;
  }
}

@media (max-width: 360px) {
  .auth-card {
    padding: 1rem;
  }
  
  .auth-title {
    font-size: 1.25rem;
  }
  
  input, .submit-btn {
    padding: 0.5rem;
  }
}
</style>