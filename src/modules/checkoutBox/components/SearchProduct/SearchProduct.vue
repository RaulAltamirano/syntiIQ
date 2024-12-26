<script lang="ts" src="./SearchProduct.ts"/>

<template>
  <div class="relative" ref="searchContainer">
    <!-- Barra de búsqueda -->
    <div class="flex items-center bg-white shadow rounded-lg p-2">
      <i class="text-gray-400 px-2">
        <font-awesome-icon icon="magnifying-glass" />
      </i>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar producto..."
        @input="handleSearch"
        @focus="showDropdown = true"
        class="flex-grow border-none outline-none text-gray-700"
      />
    </div>

    <!-- Lista de coincidencias -->
    <div
      v-if="showDropdown && filteredProducts.length > 0"
      class="absolute bg-white shadow-lg rounded-lg mt-2 w-full max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 z-10"
    >
      <ul>
        <li
          v-for="product in filteredProducts"
          :key="product.id"
          class="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click="selectProduct(product)"
        >
          <!-- Información del producto -->
          <div class="flex items-center space-x-4">
            <img :src="product.image" alt="Imagen de producto" class="w-12 h-12 rounded object-cover" />
            <div>
              <h4 class="text-sm font-semibold text-gray-700">{{ product.name }}</h4>
              <p class="text-xs text-gray-500">{{ product.characteristics }}</p>
            </div>
          </div>
          <!-- Precio -->
          <p class="text-sm font-bold text-gray-700">${{ product.price }}</p>
        </li>
      </ul>
    </div>

    <!-- Sin coincidencias -->
    <div
      v-else-if="showDropdown && searchQuery.length > 0 && !filteredProducts.length"
      class="absolute bg-white shadow-lg rounded-lg mt-2 w-full p-4 text-center text-gray-500 text-sm"
    >
      No se encontraron productos.
    </div>
  </div>
</template>
  
  
  
  <style scoped>
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  
  .scrollbar-thumb-gray-400 {
    scrollbar-color: #a0aec0 transparent;
  }
  
  .scrollbar-track-gray-200 {
    scrollbar-color: transparent #edf2f7;
  }
  </style>
  