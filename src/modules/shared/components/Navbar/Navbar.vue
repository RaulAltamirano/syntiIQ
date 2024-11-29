<script lang="ts" src="./Navbar.ts" />

<template>
  <nav
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-500',
      isScrolled 
        ? isDark 
          ? 'bg-gray-900/90 shadow-lg shadow-gray-900/20' 
          : 'bg-white/90 shadow-lg shadow-black/5'
        : isDark 
          ? 'bg-gray-900/60' 
          : 'bg-white/60',
      'backdrop-blur-md'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo Section with animation -->
        <RouterLink 
          :to="{ name: 'Home' }" 
          class="flex items-center space-x-3 group"
        >
          <div class="relative w-8 h-8 animate-logo-float">
            <img 
              :src="logo || '/path-to-your-logo.svg'" 
              alt="SyntiIQ Logo" 
              class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
            />
            <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
          </div>
          <span 
            :class="[
              'text-xl font-semibold transition-colors duration-300',
              isDark 
                ? 'text-white hover:text-primary' 
                : 'text-gray-900 hover:text-primary'
            ]"
          >
            SyntiIQ
          </span>
        </RouterLink>

        <!-- Right Section -->
        <div class="flex items-center space-x-6">
          <!-- Notifications -->
          <button 
            @click="toggleNotifications"
            class="relative p-2 rounded-full transition-transform hover:scale-105"
            :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'"
          >
            <FontAwesomeIcon
              icon="bell"
              :class="[
                'text-xl transition-colors',
                isDark ? 'text-gray-300' : 'text-gray-700',
                { 'animate-notification-ring': hasNewNotifications }
              ]"
            />
            <span
              v-if="notificationCount > 0"
              class="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse"
            >
              {{ notificationCount }}
            </span>
          </button>

          <!-- Cart with bounce animation -->
          <RouterLink 
            :to="{ name: 'Cart' }" 
            class="relative p-2 rounded-full transition-transform hover:scale-105"
            :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'"
          >
            <FontAwesomeIcon
              icon="shopping-bag"
              :class="[
                'text-xl transition-colors',
                isDark ? 'text-gray-300' : 'text-gray-700',
                { 'animate-cart-bounce': cartAnimation }
              ]"
            />
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </RouterLink>

          <!-- User Menu -->
          <div class="relative" >
            <button 
            @click="toggleDropdown"
            class="flex items-center space-x-2 focus:outline-none"
            >
              <div class="relative">
                <img
                :src="userAvatar || '/path-to-default-avatar.jpg'"
                alt="User Avatar"
                class="w-9 h-9 rounded-full object-cover transition-transform duration-300 hover:scale-105"
                :class="isDark ? 'border-2 border-gray-700' : 'border-2 border-gray-200'"
                />
                <div 
                class="absolute inset-0 rounded-full transition-opacity"
                :class="showDropdown ? 'opacity-100' : 'opacity-0'"
                >
                <div class="absolute inset-0 bg-primary/20 rounded-full blur-sm"></div>
                </div>
              </div>
            </button>

            <!-- Enhanced Dropdown Menu -->
            <Transition appear :show="showDropdown" >
              <div v-if="showDropdown"
                class="absolute right-0 mt-3 w-64 origin-top-right rounded-xl overflow-hidden focus:outline-none transform transition-all duration-300"
                :class="isDark ? 'bg-gray-900 ring-1 ring-gray-700' : 'bg-white ring-1 ring-black ring-opacity-5'"
              >
              <!-- User Info Section -->
              <div 
              class="p-4 border-b"
              :class="isDark ? 'border-gray-700' : 'border-gray-200'"
              >
                  <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    Signed in as
                  </p>
                  <p class="text-sm font-medium truncate" :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ userName }}
                  </p>
                </div>

                <div class="py-1">
                  <!-- Theme Toggle Enhanced -->
                  <div class="px-4 py-3">
                    <div class="flex items-center justify-between">
                      <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                        Tema
                      </span>
                      <button 
                        @click="changeTheme"
                        class="relative rounded-full w-12 h-6 transition-colors duration-300 focus:outline-none"
                        :class="isDark ? 'bg-primary' : 'bg-gray-200'"
                      >
                        <span
                          class="absolute inset-y-0 left-0 w-6 h-6 transition-transform duration-300 rounded-full flex items-center justify-center"
                          :class="[
                            isDark ? 'transform translate-x-6 bg-white' : 'translate-x-0 bg-white',
                            'shadow-md'
                          ]"
                        >
                          <FontAwesomeIcon
                            :icon="isDark ? 'moon' : 'sun'"
                            class="text-xs"
                            :class="isDark ? 'text-primary' : 'text-yellow-500'"
                          />
                        </span>
                      </button>
                    </div>
                  </div>

                  <!-- Menu Items -->
                  <button
                    v-for="(item, index) in menuItems"
                    :key="index"
                    @click="item.action"
                    class="flex items-center w-full px-4 py-2 text-sm transition-colors duration-200"
                    :class="[
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100',
                      item.danger && 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                    ]"
                  >
                    <FontAwesomeIcon :icon="item.icon" class="w-4 h-4 mr-3" />
                    {{ item.label }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@keyframes logo-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes notification-ring {
  0% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
  100% { transform: rotate(-15deg); }
}

@keyframes cart-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}


.animate-notification-ring {
  animation: notification-ring 0.5s ease-in-out;
}

.animate-cart-bounce {
  animation: cart-bounce 0.5s ease-in-out;
}

/* Dropdown animations */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
