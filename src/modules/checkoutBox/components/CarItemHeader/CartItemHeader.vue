<script lang="ts" src="./CartItemHeader.ts" />

<template>
  <div
    :class="containerClasses"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent="onDragOver"
    @dragend="onDragEnd"
    @drop="onDrop"
    @contextmenu.prevent="handleRightClick(index)"
    :aria-grabbed="false"
    aria-dropeffect="move"
    role="listitem"
    v-motion="{
      initial: { x: -10, opacity: 0 },
      enter: { 
        x: 0, 
        opacity: 1,
        transition: { duration: 200, delay: index * 50 }
      }
    }"
  >
    <!-- Dropdown menu -->
    <div class="relative">
      <div
        v-if="cart.showDropdown"
        @click="cartStore.switchCart(index)"
        class="absolute left-0 z-20 mt-1 w-48 rounded-md shadow-lg py-1"
        :class="isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'"
        role="menu"
        v-motion="{
          initial: { opacity: 0, y: -5 },
          enter: { opacity: 1, y: 0, transition: { duration: 150 } }
        }"
      >
        <button 
          @click.stop="cartStore.duplicateCart(index)" 
          class="block w-full text-left px-4 py-2 text-sm"
          :class="isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'"
        >
          <font-awesome-icon icon="copy" class="mr-3" /> Duplicar
        </button>
        <button 
          @click.stop="cartStore.clearCart(index)" 
          class="block w-full text-left px-4 py-2 text-sm"
          :class="isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'"
        >
          <font-awesome-icon icon="trash-alt" class="mr-3" /> Vaciar
        </button>
        <button
          @click.stop="canDelete && cartStore.removeCart(index)"
          class="block w-full text-left px-4 py-2 text-sm"
          :class="[
            isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100',
            !canDelete ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          :disabled="!canDelete"
        >
          <font-awesome-icon icon="trash" class="mr-3" /> Eliminar
        </button>
      </div>
    </div>

    <!-- Editable cart name -->
    <div class="relative flex-grow">
      <div
        v-if="!cart.isEditing"
        @click="cartStore.switchCart(index)"
        @dblclick="startEditing(index)"
        class="px-3 py-2 flex items-center min-h-[40px] cursor-pointer"
        :aria-label="`Editar nombre del carrito: ${cart.name}`"
        tabindex="0"
        @keydown.enter="startEditing(index)"
      >
        <font-awesome-icon
          :icon="getCartIcon(index)"
          class="mr-2 flex-shrink-0"
        />
        <span class="truncate max-w-[100px] select-none">{{ cart.name }}</span>
      </div>
      <input
        v-else
        ref="editInput"
        v-model="cart.name"
        @blur="finishEditing(index)"
        @keyup.enter="finishEditing(index)"
        @keyup.esc="cancelEditing(index)"
        class="w-full px-3 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300'"
        aria-label="Editar nombre del carrito"
      />
    </div>

    <!-- Item count -->
    <button @click="cartStore.switchCart(index)" class="px-3 py-2">
      <span
        v-if="cart.itemCount"
        :class="countBadgeClasses"
      >
        {{ cart.itemCount }}
      </span>
    </button>

    <!-- Remove button -->
    <button
      @click.stop="canDelete && cartStore.removeCart(index)"
      :class="removeButtonClasses"
      :disabled="!canDelete"
      aria-label="Eliminar carrito"
    >
      <font-awesome-icon icon="xmark" />
    </button>
  </div>
</template>