<template>
  <div class="flex justify-center items-center min-h-screen transition-colors duration-300">
    <!-- Contenedor Principal con Glassmorfismo -->
    <div class="flex flex-col p-6 max-w-4xl w-full space-y-6 relative rounded-xl " :class="[
      isDark
        ? 'bg-gray-900/40 text-white'
        : 'bg-white/80 text-gray-800 shadow-lg'
    ]">
      <!-- Contenido -->
      <TitleCard title="Profile" icon="id-card" />


      <!-- Sección de Información Personal -->
      <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mt-6">
        <!-- Tarjeta de Información Personal -->
        <div class="flex flex-col rounded-lg p-4 w-full lg:w-2/3 transition-all duration-300"
          :class="isDark ? 'bg-gray-800/50' : 'bg-gray-50/80 shadow-md'">
          <h3 class="text-lg font-semibold mb-4">Información Personal</h3>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <!-- Avatar con animación flotante -->
              <div class="icon-container relative">
                <img src="https://via.placeholder.com/150" alt="Avatar"
                  class="w-24 h-24 rounded-full object-cover transform transition-all duration-500 group-hover:scale-105" />
              </div>
              <div>
                <h4 class="font-semibold" :class="isDark ? 'text-gray-200' : 'text-gray-700'">
                  Juan Pérez
                </h4>
                <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  Correo: juan.perez@example.com
                </p>
                <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  Teléfono: +123 456 789
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Configuraciones -->
        <div class="flex flex-col rounded-lg p-4 w-full lg:w-1/3 space-y-4 transition-all duration-300"
          :class="isDark ? 'bg-gray-800/50' : 'bg-blue-50/80 shadow-md'">
          <h3 class="text-lg font-semibold">Configuraciones</h3>



          <!-- Notificaciones -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">Notificaciones</span>
            <input v-model="notificationsEnabled" type="checkbox" class="w-5 h-5 rounded transition-colors duration-300"
              :class="isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'" />
          </div>

          <!-- Idioma -->
          <div class="flex flex-col space-y-2">
            <label class="text-sm font-medium">Idioma</label>
            <select v-model="selectedLanguage" @change="changeLanguage"
              class="w-full p-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2"
              :class="isDark ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-100 focus:ring-blue-400'">
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>

          <!-- Botones de Acción -->
          <button @click="changePassword"
            class="w-full py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg bg-yellow-500 text-white hover:bg-yellow-600">
            Cambiar Contraseña
          </button>

          <button @click="deleteAccount"
            class="w-full py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg bg-red-600 text-white hover:bg-red-700">
            Eliminar Cuenta
          </button>
        </div>
      </div>

      <!-- Opciones Adicionales -->
      <div class="flex justify-between items-center border-t pt-4 mt-6"
        :class="isDark ? 'border-gray-700' : 'border-gray-200'">
        <div class="text-lg font-medium">
          <p class="text-xl font-semibold">Opciones Adicionales</p>
        </div>
        <div class="flex space-x-4">
          <button @click="viewActivity"
            class="py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg bg-green-600 text-white hover:bg-green-700">
            Ver Actividad
          </button>
          <button @click="logOut"
            class="py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            :class="isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-900'">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useThemeStore } from "../../../shared/store/ThemeStore";
import { storeToRefs } from "pinia";
import TitleCard from "../../../shared/components/TitleCard/TitleCard.vue";

export default defineComponent({
  name: "UserProfile",
  components: {
    TitleCard
  },
  setup() {
    const themeStore = useThemeStore()
    const { isDark } = storeToRefs(themeStore)
    const notificationsEnabled = ref(true);
    const selectedLanguage = ref("es");

    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
    };

    const changePassword = () => {
      alert("Lógica para cambiar contraseña");
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
      isDark,
      notificationsEnabled,
      selectedLanguage,
      toggleDarkMode,
      changePassword,
      changeLanguage,
      deleteAccount,
      viewActivity,
      logOut,
    };
  },
});
</script>

<style scoped>
.icon-container {
  animation: float 6s ease-in-out infinite;
}

/* @keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
} */

/* Scrollbar styles */
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