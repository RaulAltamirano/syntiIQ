<script lang="ts" src="./SearchProduct.ts" />

<template>
  <div class="flex gap-4 items-start">
    <!-- Contenedor de búsqueda con posición relativa para el dropdown -->
    <div class="relative flex-1">
      <div class="transition-colors duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <!-- Barra de búsqueda con animación de enfoque -->
        <div class="flex items-center p-3 transition-all duration-300 rounded-lg" :class="{
          'ring-2 ring-blue-500 shadow-blue-100 dark:shadow-blue-900/20': isFocused,
          'bg-gray-50 dark:bg-gray-700': !isFocused
        }">
          <i class="px-2 transition-colors duration-300 text-gray-400 dark:text-gray-500"
            :class="{ 'text-blue-500 dark:text-blue-400': isFocused }">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </i>
          <input type="text" v-model="searchQuery" placeholder="Buscar producto..." @input="handleSearch"
            @focus="handleFocus" @blur="handleBlur"
            class="flex-grow border-none outline-none transition-colors duration-300 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 py-1" />
          <!-- Botón para limpiar búsqueda con animación -->
          <button v-if="searchQuery.length > 0" @click="clearSearch"
            class="p-1 rounded-full transition-all duration-200 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }"
            :leave="{ opacity: 0, scale: 0.8 }">
            <font-awesome-icon :icon="['fas', 'times-circle']" />
          </button>
          <!-- Spinner durante la búsqueda -->
          <div v-if="isLoading" class="ml-2" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }">
            <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        </div>

        <!-- Resultados desplegables con animaciones - CONTENIDO ABSOLUTO -->
        <TransitionGroup v-motion :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
          :leave="{ opacity: 0, y: -20, transition: { duration: 200 } }" class="absolute w-full z-10 mt-2">
          <div v-if="showDropdown && filteredProducts.length > 0" key="results"
            class="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-64 overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
            <ul>
              <li v-for="(product, index) in filteredProducts" :key="product.id" v-motion
                :initial="{ opacity: 0, x: -20 }" :enter="{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: index * 50,
                    duration: 250
                  }
                }"
                class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-none"
                @click="selectProduct(product)">
                <!-- Información del producto con efectos hover -->
                <div class="flex items-center space-x-4">
                  <div class="relative overflow-hidden rounded-lg w-14 h-14 bg-gray-100 dark:bg-gray-700">
                    <img :src="product.image" alt="Imagen de producto"
                      class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      @error="handleImageError" />
                  </div>
                  <div>
                    <h4
                      class="text-sm font-semibold transition-colors duration-300 text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      v-motion :initial="{ y: 0 }" :hover="{ y: -1 }">
                      {{ product.name }}
                    </h4>
                    <p class="text-xs transition-colors duration-300 text-gray-500 dark:text-gray-400 mt-1">
                      {{ product.characteristics }}
                    </p>
                  </div>
                </div>
                <!-- Precio con animación -->
                <div class="flex flex-col items-end" v-motion :initial="{ scale: 1 }"
                  :hover="{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }">
                  <p class="text-sm font-bold transition-colors duration-300 text-blue-600 dark:text-blue-400">
                    ${{ formatPrice(product.price) }}
                  </p>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ product.category }}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Mensaje de no resultados con animación -->
          <div v-else-if="showDropdown && searchQuery.length > 0 && !isLoading && !filteredProducts.length"
            key="no-results"
            class="mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-colors duration-300 border border-gray-100 dark:border-gray-700"
            v-motion :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 300 } }">
            <font-awesome-icon :icon="['fas', 'search']" class="text-3xl mb-2 text-gray-300 dark:text-gray-600" />
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              No se encontraron productos para "<span class="font-medium">{{ searchQuery }}</span>".
            </p>
            <button @click="clearSearch"
              class="mt-2 text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
              Limpiar búsqueda
            </button>
          </div>

          <!-- Estado de carga -->
          <div v-else-if="showDropdown && isLoading" key="loading"
            class="mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center transition-colors duration-300 border border-gray-100 dark:border-gray-700"
            v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { duration: 200 } }">
            <div class="flex flex-col items-center justify-center">
              <svg class="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Buscando productos...</p>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>


<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
}

/* Animación para los resultados de búsqueda */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>