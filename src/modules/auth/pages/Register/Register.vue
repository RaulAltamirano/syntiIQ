<script lang="ts" src="./Register.ts"/>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-gray-700">Crear Cuenta</h1>
        <p class="text-sm text-center text-gray-500 mb-6">Regístrate para empezar a usar nuestros servicios.</p>
  
        <!-- Formulario de Registro -->
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Nombre Completo</label>
            <input type="text" v-model="name" id="name" placeholder="Tu nombre completo" required
                   class="mt-1 w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition" />
          </div>
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
            Registrarse
          </button>
        </form>
  
        <p class="mt-6 text-sm text-center text-gray-500">
          ¿Ya tienes una cuenta?
          <RouterLink to="/login" class="text-primary hover:underline">Inicia Sesión</RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  