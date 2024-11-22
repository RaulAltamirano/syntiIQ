<script lang="ts" src="./Navbar.ts" />

<template>
  <nav
    :class="[
      'fixed top-0 w-full z-50 transition-colors duration-300 text-white p-4 backdrop-blur-lg',
      isScrolled ? 'bg-primary shadow-lg' : 'bg-primary/60'
    ]"
  >
    <div class="flex items-center justify-between max-w-7xl mx-auto">
      <!-- Logo y Título -->
      <RouterLink :to="{ name: 'Home' }" class="flex items-center space-x-2">
        <img :src="logo || 'https://via.placeholder.com/40'" alt="Logo" class="w-10 h-10" />
        <span class="text-2xl font-bold">SyntiIQ</span>
      </RouterLink>

      <!-- Opciones para Usuario Autenticado -->
      <div class="flex items-center space-x-6">
        <!-- Wishlist -->
        <RouterLink 
          :to="{ name: 'Wishlist'}"
          class="relative">
          <FontAwesomeIcon
            icon="heart"
            :class="['text-2xl', wishlistAnimation ? 'animate-bounce' : '', 'hover:text-red-500 transition-colors']"
          />
          <span
            v-if="wishlistCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ wishlistCount }}
          </span>
        </RouterLink>

        <!-- Carrito -->
        <RouterLink :to="{name: 'Cart'}" class="relative">
          
          <FontAwesomeIcon
            icon="cart-shopping"
            :class="['text-2xl', cartAnimation ? 'animate-bounce' : '', 'hover:text-yellow-500 transition-colors']"
          />
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </RouterLink>

        <!-- Usuario -->
        <div class="relative">
          <img
            :src="userAvatar || 'https://via.placeholder.com/40'"
            alt="User Avatar"
            @click="showDropdown = !showDropdown"
            class="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
          />
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-200 rounded-lg shadow-lg"
          >
            <div class="px-4 py-3">
              <span class="text-gray-900 font-semibold">{{ userName }}</span>
            </div>
            <button
              @click="navigateTo('Home')"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Mi Perfil
            </button>
            <button
              @click="onLogout"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>