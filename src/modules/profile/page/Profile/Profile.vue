<template>
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <!-- Contenedor Principal -->
      <div class="flex flex-col bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full space-y-6 relative">
        <!-- Título -->
        <h2 class="text-3xl font-bold text-gray-800">Mi Perfil</h2>
  
        <!-- Sección de Información Personal -->
        <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
          <div class="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 w-full lg:w-2/3">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Información Personal</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Avatar"
                  class="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h4 class="font-semibold text-gray-700">Juan Pérez</h4>
                  <p class="text-gray-500 text-sm">Correo: juan.perez@example.com</p>
                  <p class="text-gray-500 text-sm">Teléfono: +123 456 789</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Configuraciones -->
          <div class="flex flex-col bg-blue-50 rounded-lg shadow-md p-4 w-full lg:w-1/3 space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">Configuraciones</h3>
  
            <!-- Cambiar Contraseña -->
            <div class="flex flex-col space-y-2">
              <label class="text-sm font-medium text-gray-600">Cambiar Contraseña</label>
              <button
                @click="changePassword"
                class="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Cambiar Contraseña
              </button>
            </div>
  
            <!-- Notificaciones -->
            <div class="flex flex-col space-y-2">
              <label class="text-sm font-medium text-gray-600">Notificaciones</label>
              <div class="flex items-center space-x-2">
                <input
                  v-model="notificationsEnabled"
                  type="checkbox"
                  class="w-5 h-5 text-blue-600 border-gray-300 rounded"
                />
                <p class="text-sm text-gray-700">Recibir notificaciones de promociones y actualizaciones</p>
              </div>
            </div>
  
            <!-- Tema de la Interfaz -->
            <div class="flex flex-col space-y-2">
              <label class="text-sm font-medium text-gray-600">Tema de la Interfaz</label>
              <select
                v-model="selectedTheme"
                @change="changeTheme"
                class="w-full p-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </select>
            </div>
  
            <!-- Idioma -->
            <div class="flex flex-col space-y-2">
              <label class="text-sm font-medium text-gray-600">Idioma</label>
              <select
                v-model="selectedLanguage"
                @change="changeLanguage"
                class="w-full p-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="es">Español</option>
                <option value="en">Inglés</option>
              </select>
            </div>
  
            <!-- Eliminar Cuenta -->
            <div class="flex flex-col space-y-2">
              <label class="text-sm font-medium text-gray-600">Eliminar Cuenta</label>
              <button
                @click="deleteAccount"
                class="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
  
        <!-- Opciones Adicionales -->
        <div class="flex justify-between items-center border-t pt-4">
          <div class="text-lg font-medium text-gray-600">
            <p class="text-xl font-semibold text-gray-800">Opciones Adicionales</p>
          </div>
          <div class="flex space-x-4">
            <button
              @click="viewActivity"
              class="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Ver Actividad
            </button>
            <button
              @click="logOut"
              class="py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "UserProfile",
    setup() {
      // Estado de configuración
      const notificationsEnabled = ref(true);
      const selectedTheme = ref("light");
      const selectedLanguage = ref("es");
  
      // Funciones de configuración
      const changePassword = () => {
        alert("Lógica para cambiar contraseña");
      };
  
      const changeTheme = () => {
        alert(`Tema cambiado a: ${selectedTheme.value}`);
      };
  
      const changeLanguage = () => {
        alert(`Idioma cambiado a: ${selectedLanguage.value}`);
      };
  
      const deleteAccount = () => {
        alert("Cuenta eliminada.");
      };
  
      const viewActivity = () => {
        alert("Mostrando actividad del usuario.");
      };
  
      const logOut = () => {
        alert("Cerrando sesión...");
      };
  
      return {
        notificationsEnabled,
        selectedTheme,
        selectedLanguage,
        changePassword,
        changeTheme,
        changeLanguage,
        deleteAccount,
        viewActivity,
        logOut,
      };
    },
  });
  </script>
  
  <style scoped>
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  
  .scrollbar-thumb-gray-400 {
    scrollbar-color: #a0aec0 #edf2f7;
  }
  
  .scrollbar-thumb-gray-400::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
    background-color: #a0aec0;
    border-radius: 10px;
  }
  
  .scrollbar-track-gray-200::-webkit-scrollbar-track {
    background-color: #edf2f7;
  }
  </style>
  