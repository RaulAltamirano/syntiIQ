<script lang="ts" src="./DefaultLayout.ts" />

<template>
  <div class="min-h-screen w-full transition-colors duration-300 overflow-x-hidden"
    :class="[isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800']">
    <!-- Scroll Progress Indicator -->
    <div class="fixed top-0 left-0 w-full h-1 z-[60]">
      <div
        class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-r-full transition-all duration-150 ease-out"
        :style="{ width: `${scrollProgress}%` }" />
    </div>

    <!-- Navbar con useMotion -->
    <div
      ref="navbar"
      class="fixed top-0 w-full z-50"
    >
      <Navbar />
    </div>

    <main class="pt-16">
      <!-- AnimatedBackground con useMotion -->
      <div
        ref="animatedBackground"
        class="fixed inset-0 z-0"
      >
        <AnimatedBackground />
      </div>

      <!-- Contenido principal con useMotion -->
      <div ref="scrollContainer" class="relative z-10 custom-scrollbar">
        <RouterView v-slot="{ Component }">
          <div
            ref="routerView"
            class="relative z-10"
          >
            <component :is="Component" />
          </div>
        </RouterView>
      </div>

      <!-- Scroll to top button -->
      <Transition name="fade">
        <button
          v-show="showScrollTop"
          @click="scrollToTop"
          class="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                 text-white shadow-lg hover:shadow-xl transition-all duration-300 
                 hover:scale-110 z-50 group"
        >
          <!-- <ChevronUp class="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" /> -->
        </button>
      </Transition>
    </main>
  </div>
</template>

<style>
/* Estilos personalizados para el scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.blue.500') theme('colors.gray.200');
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: theme('colors.gray.200');
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, theme('colors.blue.500'), theme('colors.purple.500'));
  border-radius: 4px;
  transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, theme('colors.blue.600'), theme('colors.purple.600'));
}

/* Dark mode scrollbar */
.dark .custom-scrollbar {
  scrollbar-color: theme('colors.blue.400') theme('colors.gray.700');
}

.dark .custom-scrollbar::-webkit-scrollbar-track {
  background: theme('colors.gray.700');
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Remover scrollbar por defecto */
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}


/* Optimizaciones para dispositivos táctiles */
@media (hover: none) {
  .custom-scrollbar {
    scrollbar-width: none;
  }

  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
</style>