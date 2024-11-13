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
        <RouterLink to="/" class="flex items-center space-x-2">
          <img :src="logo" alt="Logo" class="w-10 h-10" />
          <span class="text-2xl font-bold">SyntiIQ</span>
        </RouterLink>
  
        <!-- Opciones para Usuario Autenticado -->
        <div v-if="isAuthenticated" class="flex items-center space-x-6">
          <!-- Ícono de Wishlist -->
          <RouterLink to="/wishlist" class="relative">
            <FaHeart
              :class="['text-2xl', wishlistAnimation ? 'animate-bounce' : '', 'hover:text-red-500 transition-colors']"
            />
            <span v-if="wishlistCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {{ wishlistCount }}
            </span>
          </RouterLink>
  
          <!-- Ícono de Carrito -->`
          <RouterLink to="/cart" class="relative">
            <FaShoppingCart
              :class="['text-2xl', cartAnimation ? 'animate-bounce' : '', 'hover:text-yellow-500 transition-colors']"
            />
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {{ cartCount }}
            </span>
          </RouterLink>
  
          <!-- Dropdown con Avatar del Usuario -->
          <Menu as="div" class="relative">
            <MenuButton class="flex items-center focus:outline-none">
              <img
                :src="userAvatar || 'https://via.placeholder.com/40'"
                alt="User Avatar"
                class="w-10 h-10 rounded-full border-2 border-white"
              />
            </MenuButton>
  
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems class="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-lg shadow-lg focus:outline-none z-10">
                <div class="px-4 py-3">
                  <span class="text-gray-900 font-semibold">{{ userName }}</span>
                </div>
                <MenuItem>
                  <RouterLink to="/profile" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Mi Perfil
                  </RouterLink>
                </MenuItem>
                <MenuItem>
                  <button
                    @click="onLogout"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
  
        <!-- Botón de Iniciar Sesión -->
        <button v-else @click="onLoginClick" class="bg-success px-4 py-2 rounded-lg text-white">
          Iniciar Sesión
        </button>
      </div>
    </nav>
  </template>
