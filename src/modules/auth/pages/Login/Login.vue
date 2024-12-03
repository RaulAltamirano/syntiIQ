<script lang="ts" src="./Login.ts"/>


<template>
  <div class="w-full p-4 md:p-8">
    <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h1 class="text-xl md:text-2xl font-bold text-gray-800 text-center">Iniciar Sesión</h1>
      <p class="text-sm text-center text-gray-500 mt-2 mb-6">Bienvenido de nuevo</p>

      <!-- Social Login -->
      <div class="space-y-3">
        <button @click="loginWithGoogle" 
                class="flex items-center justify-center w-full py-2.5 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
          <img src="https://www.flaticon.es/icono-gratis/cromo_888846?term=google&related_id=888846" alt="Google" class="w-5 h-5 mr-2" />
          Continuar con Google
        </button>

        <button @click="loginWithGitHub" 
                class="flex items-center justify-center w-full py-2.5 px-4 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
          <img src="../../../../assets//vue.svg" alt="GitHub" class="w-5 h-5 mr-2" />
          Continuar con GitHub
        </button>
      </div>

      <div class="my-6 flex items-center space-x-2">
        <div class="h-px w-full bg-gray-200"></div>
        <span class="text-sm text-gray-400 px-2">o</span>
        <div class="h-px w-full bg-gray-200"></div>
      </div>

      <!-- Form -->
      <form @submit.prevent="onLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input type="email" 
                 v-model="email" 
                 id="email" 
                 placeholder="correo@ejemplo.com" 
                 required
                 class="mt-1 w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" 
                 v-model="password" 
                 id="password" 
                 placeholder="******" 
                 required
                 class="mt-1 w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        </div>

        <button type="submit" 
                class="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
          Iniciar Sesión
        </button>
      </form>

      <p class="mt-6 text-sm text-center text-gray-500">
        ¿No tienes una cuenta?
        <RouterLink :to="{name: 'Register'}" class="text-indigo-600 hover:underline ml-1">
          Regístrate
        </RouterLink>
      </p>
    </div>

    <NotificationModal
        :is-open="isNotificationOpen"
        :title="'¡Éxito!'"
        :message="'La operación se completó correctamente'"
        :type="'success'"
        :duration="5000"
        @close="closeNotification"
      />
  </div>
</template>


<style scoped>
.router-link-active {
  @apply text-indigo-700;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #f9fafb inset;
}
</style>