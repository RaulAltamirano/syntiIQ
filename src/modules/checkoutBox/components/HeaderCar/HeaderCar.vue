<script lang="ts" src="./HeaderCar.ts" />
<template>
  <div class="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
    <div class="flex flex-wrap gap-2">
      <!-- Lista de carritos con mejores estilos e iconos -->
      <Draggable v-model="carts" group="carts" handle=".drag-handle" class="flex flex-wrap gap-2" @end="saveCarts">
        <div v-for="(cart, index) in carts" :key="cart.id"
          class="flex items-center group rounded-lg transition-all duration-300" :class="[
            currentCartIndex === index
              ? (isDark ? 'bg-blue-700 text-gray-100 shadow-md shadow-blue-900/40' : 'bg-blue-600 text-white shadow-md shadow-blue-600/30')
              : (isDark ? 'bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-gray-200 shadow shadow-gray-900/20' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 shadow shadow-gray-300/30')
          ]">
          <!-- Icono para arrastrar -->
          <span class="drag-handle px-2 cursor-move"
            :class="[currentCartIndex === index ? 'text-white/80 hover:text-white' : (isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600')]">
            <font-awesome-icon icon="bars" />
          </span>

          <!-- Nombre editable del carrito -->
          <div class="relative">
            <span v-if="!cart.isEditing" @click="startEditing(index)"
              class="px-2 py-2 cursor-pointer flex items-center">
              <font-awesome-icon :icon="getCartIcon(index)"
                :class="currentCartIndex === index ? 'text-white/90' : (isDark ? 'text-gray-400' : 'text-gray-500')"
                class="mr-2" />
              {{ cart.name }}
            </span>
            <input v-else ref="editInput" v-model="cart.name" @blur="finishEditing(index)"
              @keyup.enter="finishEditing(index)"
              class="px-2 py-1 outline-none rounded-md border-2 m-1 w-32 transition-all duration-200 focus:ring-2"
              :class="isDark
                ? 'bg-gray-800 border-gray-700 focus:border-blue-600 focus:ring-blue-700/30 text-white'
                : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30 text-gray-800'" />
          </div>

          <!-- Botón para seleccionar carrito -->
          <button @click="switchCart(index)" class="px-3 py-2 rounded-r-lg">
            <span v-if="cart.itemCount"
              class="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold transition-all duration-200" :class="[
                currentCartIndex === index
                  ? (isDark ? 'bg-blue-800/80 text-blue-100' : 'bg-blue-700/80 text-blue-100')
                  : (isDark ? 'bg-gray-900/70 text-gray-300' : 'bg-gray-300/90 text-gray-700')
              ]">
              {{ cart.itemCount }}
            </span>
          </button>

          <!-- Menú desplegable (visible en hover) -->
          <div class="relative">
            <button @click="toggleDropdown(index)"
              class="px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" :class="[
                currentCartIndex === index
                  ? 'text-white/70 hover:text-white'
                  : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
              ]">
              <font-awesome-icon icon="ellipsis-vertical" />
            </button>

            <div v-if="cart.showDropdown"
              class="absolute right-0 mt-2 z-10 rounded-lg shadow-lg overflow-hidden transition-all duration-200"
              :class="isDark
                ? 'bg-gray-800 shadow-gray-900/60 border border-gray-700'
                : 'bg-white shadow-gray-300/60 border border-gray-200'" style="min-width: 150px;">
              <button @click="duplicateCart(index)"
                class="w-full text-left px-4 py-2 flex items-center transition-all duration-200" :class="isDark
                  ? 'text-gray-300 hover:bg-gray-700/70'
                  : 'text-gray-700 hover:bg-gray-100'">
                <font-awesome-icon icon="copy" class="mr-2" :class="isDark ? 'text-blue-400' : 'text-blue-600'" />
                Duplicar
              </button>
              <button @click="clearCart(index)"
                class="w-full text-left px-4 py-2 flex items-center transition-all duration-200" :class="isDark
                  ? 'text-gray-300 hover:bg-gray-700/70'
                  : 'text-gray-700 hover:bg-gray-100'">
                <font-awesome-icon icon="trash-alt" class="mr-2"
                  :class="isDark ? 'text-amber-400' : 'text-amber-600'" />
                Vaciar
              </button>
              <button @click="removeCart(index)"
                class="w-full text-left px-4 py-2 flex items-center transition-all duration-200" :class="[
                  isDark
                    ? 'text-red-300 hover:bg-red-900/30 hover:text-red-200'
                    : 'text-red-600 hover:bg-red-50 hover:text-red-700',
                  carts.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                ]" :disabled="carts.length <= 1">
                <font-awesome-icon icon="trash" class="mr-2" />
                Eliminar carrito
              </button>
            </div>
          </div>
        </div>
      </Draggable>

      <!-- Botón para agregar nuevo carrito -->
      <button @click="addNewCart" class="px-4 py-2 rounded-lg transition-all duration-300 flex items-center shadow"
        :class="[isDark
          ? 'bg-green-700 hover:bg-green-600 text-white shadow-green-900/30 hover:shadow-md hover:shadow-green-800/40'
          : 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/20 hover:shadow-md hover:shadow-green-500/30']">
        <font-awesome-icon icon="plus" class="mr-2" />
        Nuevo Carrito
      </button>
    </div>

    <!-- Botones de acción adicionales -->
    <div class="flex gap-2 mt-2 md:mt-0">
      <button @click="togglePriceChecker"
        class="px-4 py-2 rounded-lg transition-all duration-300 flex items-center shadow" :class="[
          isDark
            ? (isPriceCheckerActive
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30 hover:shadow-md hover:shadow-amber-700/40'
              : 'bg-gray-800 hover:bg-gray-750 text-gray-300 shadow-gray-900/20 hover:shadow-md hover:shadow-gray-900/30')
            : (isPriceCheckerActive
              ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-amber-500/20 hover:shadow-md hover:shadow-amber-400/30'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-gray-300/20 hover:shadow-md hover:shadow-gray-300/30')
        ]">
        <font-awesome-icon icon="tag" class="mr-2" />
        Verificar Precio
      </button>
      <button @click="shareCart" class="px-4 py-2 rounded-lg transition-all duration-300 flex items-center shadow"
        :class="[isDark
          ? 'bg-indigo-700 hover:bg-indigo-600 text-white shadow-indigo-900/30 hover:shadow-md hover:shadow-indigo-800/40'
          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-500/30']">
        <font-awesome-icon icon="share-alt" class="mr-2" />
        Compartir
      </button>
    </div>
  </div>
  <!-- Modal de verificación de precio -->
  <div v-if="showPriceChecker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">Verificar Precio</h3>
        <button @click="togglePriceChecker" class="text-gray-500 hover:text-gray-700">
          <font-awesome-icon icon="times" />
        </button>
      </div>
      <SearchProduct />
      <div class="space-y-4">
        <div v-if="selectedProduct" class="text-center">
          <p class="text-xl font-bold">{{ selectedProduct.name }}</p>
          <p class="text-2xl text-green-600">${{ selectedProduct.price }}</p>
          <p class="text-sm text-gray-500">Stock: {{ selectedProduct.stock }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>
/* Transiciones para los carritos */
.cart-enter-active, .cart-leave-active {
  transition: all 0.3s ease;
}
.cart-enter-from, .cart-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Asegura que los dropdowns permanezcan sobre otros elementos */
.relative {
  position: relative;
}

/* Estilo personalizado para hover en Tailwind */
@variants hover {
  .bg-gray-750 {
    background-color: #2d3748; /* Color entre gray-700 y gray-800 */
  }
}

/* Para añadir efectos sutiles de profundidad */
@media (hover: hover) {
  button:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  
  button:active:not(:disabled) {
    transform: translateY(1px);
  }
}
</style> -->