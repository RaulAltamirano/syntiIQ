<script lang="ts" src="./CheckoutBoxLayout.ts" />

<template>
  <div 
    class="min-h-screen w-full transition-colors duration-300"
    :class="isDark ? 'bg-gray-900' : 'bg-gray-100'"
  >
    <div class="flex">
      <aside 
        class="fixed inset-y-0 left-0 w-64 transition-transform transform lg:translate-x-0 z-20"
        :class="[
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          isDark ? 'bg-gray-800' : 'bg-white border-r border-gray-200'
        ]"
      >
        <NavbarCheckoutBox />
      </aside>
      
      <main 
        class="flex-1 min-h-screen transition-all duration-300 lg:ml-64"
        :class="isDark ? 'bg-gray-900' : 'bg-gray-100'"
      >
      <div class="h-full">
        <RouterView v-slot="{ Component }">
          <div 
          ref="routerView" 
          class="h-full transition-colors duration-300 p-4"
          :class="isDark ? 'bg-gray-900' : 'bg-gray-100'"
          >
          <!-- <StatsCheckoutBox/> -->
              <component :is="Component" />
            </div>
          </RouterView>
        </div>
      </main>
    </div>
  </div>
</template>
