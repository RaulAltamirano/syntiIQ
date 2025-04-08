<script lang="ts" src="./HeaderCar.ts" />

<template>
  <section class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <!-- Carts container -->
    <div 
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
      class="flex flex-wrap gap-3 w-full md:w-auto"
    >
      <div
        v-for="(cart, index) in carts"
        :key="cart.id"
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: index * 50 } }"
        class="group flex items-center rounded-lg transition-all duration-200 cart-item shadow-sm hover:shadow"
        :class="[
          currentCartIndex === index
            ? (isDark ? 'bg-blue-700 text-white ring-2 ring-blue-500' : 'bg-blue-500 text-white ring-2 ring-blue-400')
            : (isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'),
          cart.showDropdown ? (isDark ? 'bg-gray-700 z-10' : 'bg-gray-300 z-10') : ''
        ]"
        draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragover.prevent="onDragOver($event, index)"
        @dragend="onDragEnd"
        @drop="onDrop"
        @contextmenu.prevent="handleRightClick(index)"
        :aria-grabbed="draggedItem === index ? 'true' : 'false'"
        aria-dropeffect="move"
        role="listitem"
        :aria-label="`Carrito ${cart.name} con ${cart.itemCount || 0} items`"
      >
        <!-- Dropdown menu -->
        <div class="relative">
          <div
            v-if="cart.showDropdown"
            v-motion
            :initial="{ opacity: 0, y: -5 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 200 } }"
            @click="cartStore.switchCart(index)"
            class="absolute left-0 top-full z-20 mt-1 w-56 rounded-md shadow-lg py-1"
            :class="isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'"
            role="menu"
          >
            <button @click.stop="cartStore.duplicateCart(index)" class="menu-item">
              <FontAwesomeIcon icon="copy" class="mr-3" aria-hidden="true" /> 
              <span>Duplicar</span>
            </button>
            <button @click.stop="cartStore.clearCart(index)" class="menu-item">
              <FontAwesomeIcon icon="trash-alt" class="mr-3" aria-hidden="true" /> 
              <span>Vaciar</span>
            </button>
            <button
              @click.stop="carts.length > 1 && cartStore.removeCart(index)"
              class="menu-item"
              :class="carts.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
              :disabled="carts.length <= 1"
            >
              <FontAwesomeIcon icon="trash" class="mr-3" aria-hidden="true" /> 
              <span>Eliminar</span>
            </button>
          </div>
        </div>

        <!-- Editable cart name -->
        <div class="relative flex-grow">
          <div
            v-if="!cart.isEditing"
            @click="cartStore.switchCart(index)"
            @dblclick="startEditing(index)"
            class="px-3 py-2 flex items-center min-h-[40px] cursor-pointer transition-colors duration-150 rounded-l-lg"
            :class="currentCartIndex === index ? '' : 'hover:bg-opacity-80'"
            :aria-label="`Editar nombre del carrito: ${cart.name}`"
            tabindex="0"
            @keydown.enter="startEditing(index)"
          >
            <FontAwesomeIcon
              :icon="getCartIcon(index)"
              class="mr-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <span class="truncate max-w-[120px] select-none font-medium">{{ cart.name }}</span>
          </div>
          <input
            v-else
            ref="editInput"
            v-model="carts[index].name"
            @blur="finishEditing(index)"
            @keyup.enter="finishEditing(index)"
            @keyup.esc="cancelEditing(index)"
            class="input-edit"
            :class="isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'"
            aria-label="Editar nombre del carrito"
          />
        </div>

        <!-- Item count -->
        <button 
          @click="cartStore.switchCart(index)" 
          class="px-3 py-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-1"
          :class="currentCartIndex === index ? 'focus:ring-white focus:ring-offset-blue-700' : 'focus:ring-blue-500'"
          aria-label="Seleccionar carrito"
        >
          <span
            v-if="cart.itemCount"
            v-motion
            :initial="{ scale: 0.8 }"
            :enter="{ scale: 1, transition: { type: 'spring', stiffness: 300 } }"
            class="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold transition-all duration-300"
            :class="[
              currentCartIndex === index
                ? (isDark ? 'bg-blue-900 text-blue-100' : 'bg-blue-700 text-white')
                : (isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-300 text-gray-700')
            ]"
          >
            {{ cart.itemCount }}
          </span>
        </button>

        <!-- Remove button -->
        <button
          @click.stop="carts.length > 1 && cartStore.removeCart(index)"
          class="px-3 py-2 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none transition-opacity duration-200"
          :class="[
            currentCartIndex === index
              ? 'text-white/80 hover:text-white focus:text-white'
              : (isDark ? 'text-gray-400 hover:text-gray-200 focus:text-gray-200' : 'text-gray-500 hover:text-gray-700 focus:text-gray-700'),
            carts.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          :disabled="carts.length <= 1"
          aria-label="Eliminar carrito"
        >
          <FontAwesomeIcon icon="xmark" />
        </button>
      </div>

      <!-- Add new cart -->
      <button
        v-motion
        :initial="{ opacity: 0, x: -10 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
        @click="cartStore.addNewCart"
        class="btn-primary transition-transform duration-200 hover:scale-105 focus:scale-105"
        :class="isDark ? 'bg-green-700 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-gray-900' : 'bg-green-500 hover:bg-green-400 focus:ring-2 focus:ring-green-400 focus:ring-offset-2'"
        aria-label="Crear nuevo carrito"
      >
        <FontAwesomeIcon icon="plus" class="mr-2" aria-hidden="true" /> 
        <span>Nuevo Carrito</span>
      </button>
    </div>

    <!-- Action buttons -->
    <div 
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 300, duration: 300 } }"
      class="flex gap-3 w-full md:w-auto justify-end mt-4 md:mt-0"
    >
      <button
        @click="cartStore.togglePriceChecker"
        class="btn-secondary relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="isDark
          ? (cartStore.isPriceCheckerActive
            ? 'bg-amber-600 hover:bg-amber-500 focus:ring-amber-500 focus:ring-offset-gray-900'
            : 'bg-gray-700 hover:bg-gray-600 focus:ring-gray-600 focus:ring-offset-gray-900')
          : (cartStore.isPriceCheckerActive
            ? 'bg-amber-500 hover:bg-amber-400 focus:ring-amber-400'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400')"
        aria-label="Verificar precio de producto"
      >
        <span class="absolute inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/10"></span>
        <FontAwesomeIcon icon="tag" class="mr-2" aria-hidden="true" /> 
        <span>Verificar Precio</span>
      </button>
      <button
        @click="cartStore.shareCart"
        class="btn-secondary relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="isDark ? 'bg-indigo-700 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-900' : 'bg-indigo-500 hover:bg-indigo-400 focus:ring-indigo-400'"
        aria-label="Compartir carrito actual"
      >
        <span class="absolute inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/10"></span>
        <FontAwesomeIcon icon="share-alt" class="mr-2" aria-hidden="true" /> 
        <span>Compartir</span>
      </button>
    </div>
  </section>

  <!-- Modal precio -->
  <div
    v-if="showPriceChecker"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { duration: 200 } }"
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    @click.self="cartStore.togglePriceChecker"
    role="dialog"
    aria-modal="true"
    aria-labelledby="price-checker-title"
  >
    <div 
      v-motion
      :initial="{ opacity: 0, scale: 0.9 }"
      :enter="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300 } }"
      class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl border dark:border-gray-700 mx-4"
    >
      <div class="flex justify-between items-center mb-5 border-b pb-3 dark:border-gray-700">
        <h3 id="price-checker-title" class="text-xl font-bold dark:text-white">Verificar Precio</h3>
        <button
          @click="cartStore.togglePriceChecker"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-label="Cerrar ventana"
        >
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
      
      <SearchProduct />
      
      <div 
        v-if="selectedProduct" 
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0 }"
        class="space-y-4 text-center mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
      >
        <p class="text-xl font-bold text-gray-800 dark:text-white">
          {{ selectedProduct.name }}
        </p>
        <p class="text-3xl font-bold text-green-600 dark:text-green-400">
          ${{ selectedProduct?.price }}
        </p>
        <p class="text-sm font-medium flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
          <span>Stock disponible:</span>
          <span class="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full">{{ selectedProduct?.stock }}</span>
        </p>
      </div>
      
      <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
        Busca un producto para ver su precio y disponibilidad
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Utilidades para botones y entradas reutilizables */
.btn-primary {
  @apply px-4 py-2 rounded-lg transition-all duration-200 text-white shadow-md flex items-center justify-center font-medium focus:outline-none;
}
.btn-secondary {
  @apply px-4 py-2 rounded-lg transition-all duration-200 text-white shadow-sm flex items-center justify-center font-medium focus:outline-none;
}
.input-edit {
  @apply px-3 py-2 outline-none rounded border-2 w-full h-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150;
}
.menu-item {
  @apply w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors duration-150 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-600;
}

/* Animación para transición de estados */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.cart-item {
  @apply transform transition-all;
}

.cart-item:focus-within {
  @apply outline-none ring-2 ring-blue-500 ring-opacity-50;
}

/* Mejoras de accesibilidad para elementos interactivos */
button:focus, 
div[tabindex="0"]:focus {
  @apply outline-none ring-2 ring-blue-500 ring-opacity-70;
}
</style>