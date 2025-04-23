<script lang="ts" src="./Login.ts" />

<template>
  <div
    v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100, duration: 500, ease: 'easeOut' } } }"
    class="flex items-center justify-center  bg-gray-100 dark:bg-gray-900"
  >
    <!-- Contenedor principal -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full transition-all duration-300 ease-in-out"
    >
      <!-- Encabezado -->
      <div class="auth-header text-center mb-6">
        <h2
          class="auth-title text-gray-800 dark:text-white text-2xl font-semibold"
        >
          Welcome back
        </h2>
        <p
          class="auth-subtitle text-gray-600 dark:text-gray-400 text-sm"
        >
          Sign in to continue
        </p>
      </div>

      <!-- Autenticación social -->
      <SocialAuth />

      <!-- Divisor -->
      <div
        class="divider flex items-center my-4 text-gray-500 dark:text-gray-400 text-sm"
      >
        <span
          class="flex-grow border-t border-gray-300 dark:border-gray-600"
        ></span>
        <span class="mx-2">or</span>
        <span
          class="flex-grow border-t border-gray-300 dark:border-gray-600"
        ></span>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Campo de correo electrónico -->
        <div class="input-group mb-4">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email address"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-200 ease-in-out dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <!-- Campo de contraseña -->
        <div class="input-group mb-4">
          <PasswordInput v-model="password" :show-strength="false" />
        </div>

        <!-- Opciones del formulario -->
        <div
          class="form-options flex justify-between items-center mb-4 text-sm"
        >
          <label class="remember-me flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="mr-2 leading-tight"
            />
            <span class="text-gray-700 dark:text-gray-300">Remember me</span>
          </label>
          <a
            href="#"
            class="forgot-password text-blue-500 hover:underline focus:underline active:underline"
          >
            Forgot password?
          </a>
        </div>

        <!-- Botón de envío -->
        <button
          type="submit"
          class="submit-btn w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Sign in</span>
          <FontAwesomeIcon
            v-if="isLoading"
            icon="spinner"
            class="animate-spin text-white mx-auto"
            aria-hidden="true"
          />
        </button>
      </form>

      <!-- Enlace para registrarse -->
      <p
        class="auth-switch text-center mt-4 text-gray-700 dark:text-gray-300 text-sm"
      >
        Don't have an account?
        <RouterLink
          to="/auth/register"
          class="text-blue-500 hover:underline focus:underline active:underline"
        >
          Sign up
        </RouterLink>
      </p>
    </div>
  </div>
</template>
