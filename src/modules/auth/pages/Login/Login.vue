<script lang="ts" src="./Login.ts"/>



<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-gray-700">Iniciar Sesión</h1>
        <p class="text-sm text-center text-gray-500 mb-6">Bienvenido de nuevo, inicia sesión para continuar.</p>
  
        <!-- Botones de Login Social -->
        <div class="space-y-4">
          <button @click="loginWithGoogle" class="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="w-5 h-5 mr-2" />
            Continuar con Google
          </button>
          <button @click="loginWithGitHub" class="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 transition">
            <img src="https://www.svgrepo.com/show/448217/github.svg" alt="GitHub" class="w-5 h-5 mr-2" />
            Continuar con GitHub
          </button>
        </div>
  
        <div class="my-4 flex items-center justify-center space-x-2">
          <div class="h-px w-full bg-gray-300"></div>
          <span class="text-sm text-gray-400">o</span>
          <div class="h-px w-full bg-gray-300"></div>
        </div>
  
        <!-- Formulario de Login -->
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Correo Electrónico</label>
            <input type="email" v-model="email" id="email" placeholder="correo@ejemplo.com" required
                   class="mt-1 w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-600">Contraseña</label>
            <input type="password" v-model="password" id="password" placeholder="******" required
                   class="mt-1 w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition" />
          </div>
          <button type="submit" class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
            Iniciar Sesión
          </button>
        </form>
  
        <p class="mt-6 text-sm text-center text-gray-500">
          ¿No tienes una cuenta?
          <RouterLink :to="{name: 'Register'}" class="text-primary hover:underline">Regístrate</RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  
  
  <style scoped>
  /* Colores personalizados para el diseño */
  :root {
    --primary: #4f46e5;
    --primary-dark: #3730a3;
  }
  </style>
  